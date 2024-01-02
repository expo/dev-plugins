import { Form, Input, Modal } from 'antd';
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

  const reset = useCallback(() => {
    setKey('');
    setValue('');
  }, [setKey, setValue]);

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
            set(key, value).then(() => {
              setShown(false);
              reset();
            });
          }}
          okButtonProps={{
            disabled: !key || !value,
          }}>
          <Form.Item label="Key">
            <Input value={key} onChange={(e) => setKey(e.target.value)} required />
          </Form.Item>
          <Form.Item label="Value">
            <Input.TextArea value={value} onChange={(e) => setValue(e.target.value)} required />
          </Form.Item>
        </Modal>
      </Form>
    ),
    showing: shown,
  };
}
