import { type DevToolsPluginClient } from 'expo/devtools';
type ReduxExtensionEventListener = (message: {
    type: string;
    [key: string]: any;
}) => void;
/**
 * A stub Redux extension connector for `useReduxDevToolsExtension`
 */
export declare class ReduxExtensionAdapter {
    private client;
    private reduxExtensionListener;
    init(value: any): void;
    send(action: any, state: any): void;
    subscribe(reduxExtensionListener: ReduxExtensionEventListener): void;
    resetRoot(value: any): void;
    setClient(client: DevToolsPluginClient | null): void;
}
export {};
//# sourceMappingURL=ReduxExtensionAdapter.d.ts.map