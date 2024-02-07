import { App } from 'antd';
import { AsyncStorageTable } from './AsyncStorageTable';

export default function Main() {
  return (
    <App style={{ width: '100%', height: '100%', padding: '0.75em', overflowY: 'scroll' }}>
      <AsyncStorageTable />
      <p>
        By default, the reload button will not update any fields you have changed. To fully update
        the list hold the <code>Shift</code> key when clicking the reload button.
      </p>
    </App>
  );
}
