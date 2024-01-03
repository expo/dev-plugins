import { Checkbox, Form, Input, Modal } from 'antd';
import { ReactElement, useCallback, useState } from 'react';

export function useAddEntryDialog({
  set,
}: {
  set: (key: string, value: string) => Promise<void>;
}): {
  showAddEntryDialog: () => void;
  AddEntryDialog: ReactElement;
  showing: boolean;
} {
  const [shown, setShown] = useState(false);

  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [emptyJson, setEmptyJson] = useState(false);
  const [emptyArray, setEmptyArray] = useState(false);

  const reset = useCallback(() => {
    setKey('');
    setValue('');
    setEmptyJson(false);
    setEmptyArray(false);
  }, [setKey, setValue, setEmptyJson, setEmptyArray]);

  const showAddEntryDialog = useCallback(() => {
    reset();
    setShown(true);
  }, [reset, setShown]);

  return {
    showAddEntryDialog,
    AddEntryDialog: (
      <Form>
        <Modal
          open={shown}
          title="Add entry"
          okText="Add"
          cancelText="Cancel"
          onCancel={() => {
            setShown(false);
            reset();
          }}
          onOk={() => {
            let valueToSet = value;
            if (emptyJson && !emptyArray) {
              valueToSet = '{}';
            } else if (emptyArray && !emptyJson) {
              valueToSet = '[]';
            } else if (emptyArray && emptyJson) {
              alert('Cannot create empty JSON object and array at the same time.');
              return;
            }
            set(key, valueToSet).then(() => {
              setShown(false);
              reset();
            });
          }}
          okButtonProps={{
            disabled: !key || (!value && !emptyJson && !emptyArray),
          }}>
          <Form.Item label="Key">
            <Input value={key} onChange={(e) => setKey(e.target.value)} required />
          </Form.Item>
          <Form.Item label="Value">
            <Input.TextArea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
              disabled={emptyJson || emptyArray}
            />
          </Form.Item>
          <Form.Item label="JSON">
            <Checkbox
              checked={emptyJson && !emptyArray}
              onChange={(e) => setEmptyJson(e.target.checked)}
              disabled={emptyArray}>
              Create empty JSON object
            </Checkbox>
          </Form.Item>
          <Form.Item label="Array">
            <Checkbox
              checked={emptyArray && !emptyJson}
              onChange={(e) => setEmptyArray(e.target.checked)}
              disabled={emptyJson}>
              Create empty JSON array
            </Checkbox>
          </Form.Item>
        </Modal>
      </Form>
    ),
    showing: shown,
  };
}
