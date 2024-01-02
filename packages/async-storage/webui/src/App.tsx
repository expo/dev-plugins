import { DeleteOutlined, PlusOutlined, ReloadOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Flex, Input, Table, theme as antTheme } from 'antd';
import React, { Reducer, useEffect, useReducer } from 'react';
import { usePluginStore } from './usePluginStore';

export default function App() {
  const { token } = antTheme.useToken();

  const { entries, update, set, remove } = usePluginStore(console.error);

  useEffect(() => {
    setTimeout(() => {
      update().catch(console.error);
    }, 10);
  }, []);

  // 'set', 'replace'
  const [inProgressEdits, updateInProgressEdits] = useReducer<
    Reducer<Record<string, string | null>, Record<string, string | null>>
  >((state, payload) => {
    return {
      ...state,
      ...payload,
    };
  }, {});

  return (
    <Table
      dataSource={entries}
      pagination={false}
      columns={[
        { title: 'Key', dataIndex: 'key', key: 'key' },
        {
          title: 'Value',
          dataIndex: 'key',
          key: 'value',
          render(key) {
            return (
              <Input.TextArea
                value={
                  (inProgressEdits[key] || entries.find((entry) => entry.key === key)?.value) ?? ''
                }
                onChange={(e) => {
                  updateInProgressEdits({ [key]: e.target.value });
                }}
              />
            );
          },
        },
        {
          title: 'Actions',
          key: 'key',
          render(value, record, index) {
            return (
              <Flex>
                <Button
                  onClick={() => remove(record.key).catch(console.error)}
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
          <Button onClick={() => update().catch(console.error)} icon={<ReloadOutlined />} />
          <Button
            onClick={() => {
              const key = prompt('Key');
              const value = prompt('Value');
              if (key && value) {
                set(key, value).catch(console.error);
              }
            }}
            icon={<PlusOutlined />}
          />
        </Flex>
      )}
    />
  );
}
