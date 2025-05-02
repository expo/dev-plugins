import { Spin } from 'antd';

import { MMKVStorageTable } from './MMKVStorageTable';
import { useConnectedClient } from './useConnectedClient';

export default function App() {
  const connectedClient = useConnectedClient();

  if (!connectedClient) {
    return <Spin style={{ alignSelf: 'center', justifySelf: 'center', width: '100%' }} />;
  }

  return <MMKVStorageTable client={connectedClient} />;
}
