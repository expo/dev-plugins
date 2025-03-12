import { type DevToolsPluginClient } from 'expo/devtools';
import { nanoid } from 'nanoid/non-secure';

type ReduxExtensionEventListener = (message: { type: string; [key: string]: any }) => void;

/**
 * A stub Redux extension connector for `useReduxDevToolsExtension`
 */
export class ReduxExtensionAdapter {
  private client: DevToolsPluginClient | null = null;
  private reduxExtensionListener: ReduxExtensionEventListener | null = null;

  init(value: any): void {
    this.client?.sendMessage('init', {
      id: nanoid(),
      value,
    });
  }

  send(action: any, state: any): void {
    this.client?.sendMessage('action', {
      id: nanoid(),
      action,
      state,
    });
  }

  subscribe(reduxExtensionListener: ReduxExtensionEventListener) {
    this.reduxExtensionListener = reduxExtensionListener;
  }

  resetRoot(value: any): void {
    this.reduxExtensionListener?.({ type: 'DISPATCH', state: JSON.stringify(value) });
  }

  setClient(client: DevToolsPluginClient | null) {
    this.client = client;
  }
}
