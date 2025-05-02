// Import all the hooks
import { App } from 'antd';
import { Reducer, useEffect, useReducer, useState } from 'react';

export type TableRow = {
  key: string;
  value: string;
  editedValue?: string;
  json: object | null;
};

function jsonStructure(str: unknown): object | null {
  if (typeof str !== 'string') return null;
  try {
    const result = JSON.parse(str);
    const type = Object.prototype.toString.call(result);
    return type === '[object Object]' || type === '[object Array]' ? result : null;
  } catch {
    return null;
  }
}

export function useTableData({
  entries,
}: {
  entries: readonly {
    key: string;
    value: string | null;
  }[];
}) {
  const { message } = App.useApp();

  try {
    const [inProgressEdits, updateInProgressEdits] = useReducer<
      Reducer<Record<string, string | null>, Record<string, string | null> | 'clear'>
    >((state, payload) => {
      if (payload === 'clear') {
        return {};
      }
      return {
        ...state,
        ...payload,
      };
    }, {});

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [rows, updateRows] = useState<TableRow[]>([]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      updateRows(
        entries.map((entry) => {
          const editedValue = (inProgressEdits[entry.key] || entry.value) ?? '';
          return {
            key: entry.key,
            value: entry.value ?? '',
            editedValue,
            json: jsonStructure(editedValue),
          };
        })
      );
    }, [entries, inProgressEdits]);

    return {
      rows,
      inProgressEdits,
      updateInProgressEdits,
    };
  } catch (err) {
    console.error(err);
    message.error(String(err));
    return {
      rows: [],
      inProgressEdits: {},
      updateInProgressEdits: () => {},
    };
  }
}
