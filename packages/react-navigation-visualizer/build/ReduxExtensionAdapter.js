import { nanoid } from 'nanoid/non-secure';
/**
 * A stub Redux extension connector for `useReduxDevToolsExtension`
 */
export class ReduxExtensionAdapter {
    client = null;
    reduxExtensionListener = null;
    init(value) {
        this.client?.sendMessage('init', {
            id: nanoid(),
            value,
        });
    }
    send(action, state) {
        this.client?.sendMessage('action', {
            id: nanoid(),
            action,
            state,
        });
    }
    subscribe(reduxExtensionListener) {
        this.reduxExtensionListener = reduxExtensionListener;
    }
    resetRoot(value) {
        this.reduxExtensionListener?.({ type: 'DISPATCH', state: JSON.stringify(value) });
    }
    setClient(client) {
        this.client = client;
    }
}
//# sourceMappingURL=ReduxExtensionAdapter.js.map