import {
  DeleteOutlined,
  PlusOutlined,
  ReloadOutlined,
  SaveOutlined,
  SisternodeOutlined,
  SubnodeOutlined,
} from '@ant-design/icons';
import ReactJsonView from '@microlink/react-json-view';
import { Button, Flex, Table } from 'antd';
import React from 'react';

import { useAddEntryDialog } from './modal/useAddEntryDialog';
import { useRemoveEntryModal } from './modal/useRemoveEntryModal';
import { useTableData } from './useTableData';

type KeyValueStorageTableProps = {
  entries: readonly {
    key: string;
    value: string | null;
  }[];
  update: () => Promise<void>;
  set: (key: string, value: string) => Promise<void>;
  remove: (key: string) => Promise<void>;
};

export function KeyValueStorageTable({ remove, set, entries, update }: KeyValueStorageTableProps) {
  const { showRemoveEntryModal } = useRemoveEntryModal({ remove });
  const { showAddEntryDialog, AddEntryDialog, showing } = useAddEntryDialog({ set });

  const { rows, inProgressEdits, updateInProgressEdits } = useTableData({ entries });
  console.log(rows, inProgressEdits, updateInProgressEdits);

  return (
    <>
      {AddEntryDialog}
      <Table
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
