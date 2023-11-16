import { RocketOutlined, GithubOutlined } from '@ant-design/icons';
import { Typography, Button, Row, Col, Space } from 'antd';
import React from 'react';

export function Header({ onRefresh, onClear }: { onRefresh: () => void; onClear: () => void }) {
  return (
    <Row align="bottom">
      <Col span={16}>
        <Typography.Title level={3}>
          <RocketOutlined />
          &nbsp;Apollo DevTools
        </Typography.Title>
      </Col>
      <Col span={8} style={{ marginBottom: '0.5em' }}>
        <Space size="small" wrap>
          <Button type="default" size="small" onClick={onRefresh}>
            Refresh
          </Button>
          <Button type="default" size="small" onClick={onClear}>
            Clear
          </Button>
          <Button
            icon={<GithubOutlined />}
            onClick={() => {
              window.open('https://github.com/expo/dev-plugins', '_blank');
            }}
            type="link">
            Github
          </Button>
        </Space>
      </Col>
    </Row>
  );
}
