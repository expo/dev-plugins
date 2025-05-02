import { Typography } from 'antd';
import React, { Fragment } from 'react';
import ReactJson from 'react-json-view';
import { ScrollView } from 'react-native';

import { BlockType } from './types';

export function Details({ selectedItem }: { selectedItem: BlockType }) {
  return (
    <ScrollView>
      <Typography.Title level={4} type="secondary">
        {selectedItem?.operationType}
      </Typography.Title>
      <Typography.Title level={4}>{selectedItem?.name}</Typography.Title>
      <br />

      {selectedItem?.blocks?.map((block, index) => {
        const key = `block${index}`;
        if (block.blockType === 'GQLString') {
          return (
            <Fragment key={key}>
              <Typography.Title key={key} level={4} type="secondary">
                {block?.blockLabel}
              </Typography.Title>
              <Typography.Text style={{ fontSize: 12 }}>
                <pre>{block?.blockValue?.trim()}</pre>
              </Typography.Text>
              <br />
            </Fragment>
          );
        } else if (block.blockType === 'Object') {
          return (
            <Fragment key={key}>
              <Typography.Title level={4} type="secondary">
                {block?.blockLabel}
              </Typography.Title>
              <ReactJson src={block?.blockValue} collapsed />
              <br />
            </Fragment>
          );
        } else {
          return null;
        }
      })}
    </ScrollView>
  );
}
