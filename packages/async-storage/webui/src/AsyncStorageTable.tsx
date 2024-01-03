import { DeleteOutlined, PlusOutlined, ReloadOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Flex, Input, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAddEntryDialog } from './modal/useAddEntryDialog';
import { useRemoveEntryModal } from './modal/useRemoveEntryModal';
import { usePluginStore } from './usePluginStore';
import { useTableData } from './useTableData';

export function AsyncStorageTable() {
  const { entries, update, set, remove, ready } = usePluginStore(console.error);

  const { showRemoveEntryModal } = useRemoveEntryModal({ remove });
  const { showAddEntryDialog, AddEntryDialog, showing } = useAddEntryDialog({ set });

  const [initialUpdate, setInitialUpdate] = useState(false);
  useEffect(() => {
    if (!initialUpdate && ready) {
      update()
        .then(() => setInitialUpdate(true))
        .catch(console.error);
    }
  }, [initialUpdate, ready]);

  const { rows, inProgressEdits, updateInProgressEdits } = useTableData({ entries });

  return (
    <>
      {AddEntryDialog}
      <Table
        style={{ width: '100%' }}
        dataSource={rows}
        pagination={false}
        columns={[
          { title: 'Key', dataIndex: 'key', key: 'key' },
          {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            render(value, { key, editedValue }) {
              return (
                <Input.TextArea
                  value={editedValue ?? value}
                  onChange={(e) => {
                    updateInProgressEdits({ [key]: e.target.value });
                  }}
                  style={{
                    boxShadow: inProgressEdits[key] != null ? '0 0 0 2px #1890ff' : undefined,
                  }}
                />
              );
            },
          },
          {
            title: 'Actions',
            key: 'action',
            render(_, record) {
              return (
                <Flex>
                  <Button
                    onClick={() => showRemoveEntryModal(record.key)}
                    icon={<DeleteOutlined />}
                  />
                  <Button
                    onClick={() => {
                      const value = inProgressEdits[record.key];
                      if (value) {
                        set(record.key, value).catch(console.error);
                      }
                    }}
                    icon={<SaveOutlined />}
                  />
                </Flex>
              );
            },
          },
        ]}
        title={() => (
          <Flex align="center" justify="center" gap="0.5em">
            <h1>Async Storage Devtools</h1>
            <Button
              onClick={({ shiftKey }) => {
                if (shiftKey) {
                  updateInProgressEdits('clear');
                }
                update().catch(console.error);
              }}
              icon={<ReloadOutlined />}
            />
            <Button
              onClick={() => showAddEntryDialog()}
              icon={<PlusOutlined />}
              disabled={showing}
            />
          </Flex>
        )}
        caption={
          <p>
            By default, the reload button will not update any fields you have edited (even if they
            have been saved!). To fully update the list, click the reload button while holding the{' '}
            <code>Shift</code> key.
          </p>
        }
      />
    </>
  );
}
