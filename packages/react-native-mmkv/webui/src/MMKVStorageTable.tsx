import { App } from "antd";
import { usePluginStore } from "./usePluginStore";
import { useEffect, useState } from "react";
import { KeyValueStorageTable } from "./KeyValueStorageTable";
import { DevToolsPluginClient } from "expo/build/devtools/DevToolsPluginClient";

export const MMKVStorageTable = ({client}: {client: DevToolsPluginClient}) => {
    const { message } = App.useApp();
    const { entries, update, set, remove } = usePluginStore(client, (error: unknown) => {
      message.error(String(error));
      console.error(error);
    });
  
    const [initialUpdate, setInitialUpdate] = useState(false);
    useEffect(() => {
      if (!initialUpdate) {
        update()
          .then(() => setInitialUpdate(true))
          .catch(console.error);
      }
    }, [initialUpdate]);
  
    return (
      <App style={{ width: '100%', height: '100%', padding: '0.75em', overflowY: 'scroll' }}>
        <KeyValueStorageTable entries={entries} remove={remove} set={set} update={update}/>
        <p>
          By default, the reload button will not update any fields you have changed. To fully update
          the list hold the <code>Shift</code> key when clicking the reload button.
        </p>
      </App>
    );
  }