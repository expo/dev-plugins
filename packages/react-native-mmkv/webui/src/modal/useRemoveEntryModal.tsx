import { App } from 'antd';
import { useCallback } from 'react';

export function useRemoveEntryModal({ remove }: { remove: (key: string) => Promise<void> }): {
  showRemoveEntryModal: (key: string) => void;
} {
  const { modal } = App.useApp();

  const showRemoveEntryModal = useCallback(
    (key: string) => {
      modal.confirm({
        title: 'Would you like to remove this entry?',
        content: `Delete ${key}?`,
        onOk: () => remove(key),
      });
    },
    [modal, remove]
  );

  return { showRemoveEntryModal };
}
