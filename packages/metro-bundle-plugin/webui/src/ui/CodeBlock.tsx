import { type PropsWithChildren } from 'react';
import { Highlight, type PrismTheme } from 'prism-react-renderer';

// NOTE(cedric): these are not imported by `@expo/styleguide/dist/expo-theme.css`,
// but they are required for the syntax highlighting
import '@radix-ui/colors/gray.css';
import '@radix-ui/colors/grayDark.css';

export function CodeBlock({ children }: PropsWithChildren) {
  return (
    <div className="grid grid-cols-2 auto-rows-fr md:grid-cols-2 md:auto-rows-auto max-h-[820px]">
      {children}
    </div>
  );
}

export function CodeBlockSection({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col border-default bg-subtle border border-l-0 first:border-l first:rounded-l-md last:rounded-r-md overflow-hidden">
      {children}
    </div>
  );
}

export function CodeBlockHeader({ children }: { children: string }) {
  return (
    <div className="flex bg-default min-h-[40px] pl-4 border-b border-default">
      <h3 className="flex items-center text-md select-none font-medium truncate">{children}</h3>
    </div>
  );
}

export function CodeBlockContent({ children, language = 'tsx' }: { children: string, language?: string }) {
  return (
    <Highlight code={children} language={language} theme={highlightTheme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre style={style} className="p-4 text-xs overflow-auto">
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              <span className="inline-block text-secondary min-w-8 select-none">{i + 1}</span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

export function guessLanguageFromPath(path: string) {
  const extension = path.split('.').pop();
  switch (extension) {
    case 'ts':
      return 'ts';
    case 'tsx':
      return 'tsx';
    case 'js':
      return 'js';
    case 'jsx':
      return 'jsx';
    case 'json':
      return 'json';
    default:
      return 'tsx';
  }
}

// see: https://github.com/expo/expo/blob/9f8ddc869cceaed41486692057123b83882cb262/docs/global-styles/prism.ts#L46
const highlightTheme: PrismTheme = {
  plain: {},
  styles: [
    {
      types: ['comment', 'block-comment', 'prolog', 'doctype', 'cdata'],
      style: { color: 'var(--gray10)' },
    },
    {
      types: ['operator', 'punctuation'],
      style: { color: 'var(--gray9)' },
    },
    {
      types: ['attr-name', 'boolean', 'function-name', 'constant', 'symbol', 'deleted'],
      style: { color: 'var(--red11)' },
    },
    {
      types: ['selector', 'char', 'builtin', 'script', 'inserted'],
      style: { color: 'var(--green10)' },
    },
    {
      types: ['entity', 'variable'],
      style: { color: 'var(--green11)' },
    },
    {
      types: ['keyword'],
      style: { color: 'var(--pink10)' },
    },
    {
      types: ['property', 'atrule', 'attr-value', 'function'],
      style: { color: 'var(--purple11)' },
    },
    {
      types: ['class-name', 'regex', 'important', 'tag'],
      style: { color: 'var(--orange11)' },
    },
    {
      types: ['number', 'string'],
      style: { color: 'var(--yellow11)' },
    },
    {
      types: ['url', 'literal-property', 'property-access'],
      style: { color: 'var(--blue11)' },
    },
  ],
};
