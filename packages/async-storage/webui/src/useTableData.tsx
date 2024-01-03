// Import all the hooks
import { Reducer, useEffect, useReducer, useState } from 'react';

export type TableRow = {
  key: string;
  value: string;
  editedValue?: string;
  json: object | null;
};

function hasJsonStructure(str: unknown): object | false {
  if (typeof str !== 'string') return false;
  try {
    const result = JSON.parse(str);
    const type = Object.prototype.toString.call(result);
    return type === '[object Object]' || type === '[object Array]' ? result : false;
  } catch (err) {
    return false;
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

  const [rows, updateRows] = useState<TableRow[]>([]);

  useEffect(() => {
    updateRows(
      entries.map((entry) => {
        const editedValue = (inProgressEdits[entry.key] || entry.value) ?? '';
        return {
          key: entry.key,
          value: entry.value ?? '',
          editedValue,
          json: hasJsonStructure(editedValue) || null,
        };
      })
    );
  }, [entries, inProgressEdits]);

  return {
    rows,
    inProgressEdits,
    updateInProgressEdits,
  };
}
