import JsonFile from '@expo/json-file';
import spawnAsync from '@expo/spawn-async';
import fs from 'fs/promises';
import path from 'path';

import { EXPO_BETA } from './env';
import { installDependenciesAsync, type PackageManagerName } from './resolvePackageManager';
import type { ProjectInfo } from './types';

const debug = require('debug')('create-dev-plugin:createWebUiProject') as typeof console.log;

export async function createWebUiProjectAsync(
  projectRoot: string,
  projectInfo: ProjectInfo,
  packageManager: PackageManagerName
) {
  const webUiRoot = path.join(projectRoot, 'webui');

  // [0] Create the webui project from expo-app
  const templateVersion = EXPO_BETA ? 'next' : 'latest';
  const template = `expo-template-blank-typescript@${templateVersion}`;
  debug(`Using expo template: ${template}`);
  const argTerminator = packageManager === 'npm' ? '--' : '';
  await spawnAsync(
    packageManager,
    [
      'create',
      'expo-app',
      argTerminator,
      '--template',
      template,
      '--yes',
      '--no-install',
      'webui',
    ].filter(Boolean),
    { cwd: projectRoot, stdio: 'ignore' }
  );

  // [1] Remove unnecessary files and set the project as private
  await JsonFile.mergeAsync(path.join(webUiRoot, 'package.json'), {
    name: `${projectInfo.name}-webui`,
    version: '0.0.1-private',
    private: true,
  });
  await Promise.allSettled([
    fs.rm(path.join(webUiRoot, 'assets'), { recursive: true }),
    fs.rm(path.join(webUiRoot, '.git'), { recursive: true }),
    fs.rm(path.join(webUiRoot, '.gitignore')),
  ]);

  // [2] Set baseUrl to the plugin's name
  await JsonFile.writeAsync(path.join(webUiRoot, 'app.json'), {
    expo: {
      web: {
        bundler: 'metro',
      },
      experiments: {
        baseUrl: `/_expo/plugins/${projectInfo.name}`,
      },
    },
  });

  // [3] Install packages
  debug(`Installing packages by ${packageManager}`);
  await installDependenciesAsync(webUiRoot, packageManager, { silent: true });
  debug(`Installing web packages`);
  await spawnAsync(
    'npx',
    ['expo', 'install', 'react-native-web', 'react-dom', '@expo/metro-runtime'],
    {
      cwd: webUiRoot,
      stdio: 'ignore',
    }
  );

  // [4] Overwrite App.tsx
  await fs.writeFile(path.join(webUiRoot, 'App.tsx'), createAppEntryPointContent(projectInfo));
}

function createAppEntryPointContent(projectInfo: ProjectInfo) {
  return `\
import { useDevToolsPluginClient, type EventSubscription } from 'expo/devtools';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const client = useDevToolsPluginClient('${projectInfo.name}');

  useEffect(() => {
    const subscriptions: (EventSubscription | undefined)[] = [];

    subscriptions.push(
      client?.addMessageListener('ping', (data) => {
        alert(\`Received ping from \${data.from}\`);
        client?.sendMessage('ping', { from: 'web' });
      })
    );

    return () => {
      for (const subscription of subscriptions) {
        subscription?.remove();
      }
    };
  }, [client]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        That's the Web UI of the DevTools plugin. You can now edit the UI in the
        App.tsx.
      </Text>
      <Text style={[styles.text, styles.devHint]}>
        For development, you can also add \`devServer\` query string to specify
        the WebSocket target to the app's dev server.
      </Text>
      <Text style={[styles.text, styles.devHint]}>For example:</Text>
      <Pressable
        onPress={() => {
          window.location.href =
            window.location.href + '?devServer=localhost:8080';
        }}
      >
        <Text style={[styles.text, styles.textLink]}>
          {\`\${window.location.href}?devServer=localhost:8080\`}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
  },
  devHint: {
    color: '#666',
  },
  textLink: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
});
`;
}
