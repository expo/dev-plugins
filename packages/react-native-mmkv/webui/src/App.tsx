import { Spin } from 'antd';
import { useConnectedClient } from './useConnectedClient';
import { MMKVStorageTable } from './MMKVStorageTable';


export default function App() {
  const connectedClient = useConnectedClient()

  if(!connectedClient) {
    return (<Spin style={{alignSelf: "center", justifySelf: "center", width: "100%"}} />)
  }

  return <MMKVStorageTable client={connectedClient} />
}