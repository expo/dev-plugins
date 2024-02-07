import {
  DeleteOutlined,
  PlusOutlined,
  ReloadOutlined,
  SaveOutlined,
  SisternodeOutlined,
  SubnodeOutlined,
} from '@ant-design/icons';
import ReactJsonView from '@microlink/react-json-view';
import { App, Button, Flex, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAddEntryDialog } from './modal/useAddEntryDialog';
import { useRemoveEntryModal } from './modal/useRemoveEntryModal';
import { usePluginStore } from './usePluginStore';
import { useTableData } from './useTableData';

export function AsyncStorageTable() {
  const { message } = App.useApp();
  const { entries, update, set, remove, ready } = usePluginStore((error: unknown) => {
    message.error(String(error));
    console.error(error);
  });

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
        loading={!ready}
        bordered
        size="middle"
        style={{ width: '100%' }}
        dataSource={rows}
        pagination={false}
        expandable={{
          rowExpandable(record) {
            return record.json != null;
          },
          expandedRowRender(record) {
            if (!record.json) return null;
            return (
              <ReactJsonView
                src={record.json}
                name={record.key}
                onEdit={(e) => {
                  updateInProgressEdits({ [record.key]: JSON.stringify(e.updated_src) });
                }}
                onAdd={(e) => {
                  updateInProgressEdits({ [record.key]: JSON.stringify(e.updated_src) });
                }}
                onDelete={(e) => {
                  updateInProgressEdits({ [record.key]: JSON.stringify(e.updated_src) });
                }}
              />
            );
          },
          expandIcon: ({ expanded, expandable, onExpand, record }) =>
            expandable ? (
              <Button
                icon={expanded ? <SisternodeOutlined /> : <SubnodeOutlined />}
                onClick={(event) => onExpand(record, event)}
                type="text"
              />
            ) : null,
        }}
        columns={[
          { title: 'Key', dataIndex: 'key', key: 'key', width: 1 },
          {
            title: 'Value',
            dataIndex: 'editedValue',
            key: 'editedValue',
            onCell(record) {
              return {
                style: {
                  border: inProgressEdits[record.key] != null ? '1px solid #1890ff' : undefined,
                  backgroundColor: '#eee6',
                },
                contentEditable: true,
                title: 'Value',
                onInput(e) {
                  updateInProgressEdits({ [record.key]: e.currentTarget.textContent });
                },
              };
            },
            shouldCellUpdate(record, prevRecord) {
              return record.editedValue !== prevRecord.editedValue;
            },
          },
          {
            title: 'Actions',
            key: 'action',
            width: 1,
            render(_, record) {
              return (
                <Flex gap="0.5em" style={{ marginLeft: '0.5em', marginRight: '0.5em' }}>
                  <Button
                    onClick={() => showRemoveEntryModal(record.key)}
                    icon={<DeleteOutlined />}
                  />
                  <Button
                    onClick={() => {
                      const value = inProgressEdits[record.key];
                      set(record.key, value ?? '')
                        .then(() => {
                          updateInProgressEdits({ [record.key]: null });
                        })
                        .catch(console.error);
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
            <h1>React Native MMKV Devtools</h1>
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
      />
    </>
  );
}
