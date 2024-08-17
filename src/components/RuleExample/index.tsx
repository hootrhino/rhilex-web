import { CodeOutlined, FileTextOutlined } from '@ant-design/icons';
import { useIntl } from '@umijs/max';
import { Button, Drawer, Space } from 'antd';
import { useState } from 'react';
import RuleList from './RuleList';

type RuleExampleProps = {
  name: string;
  handleOnFormatCode: () => void;
};

const RuleExample = ({ name, handleOnFormatCode }: RuleExampleProps) => {
  const { formatMessage } = useIntl();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Space className="w-full justify-between">
        <span>{name}</span>
        <Space>
          <Button
            key="rule"
            type="primary"
            ghost
            size="small"
            icon={<FileTextOutlined />}
            onClick={() => setOpen(true)}
          >
            {formatMessage({ id: 'component.button.rule' })}
          </Button>
          <Button
            type="primary"
            key="code-format"
            size="small"
            icon={<CodeOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              handleOnFormatCode();
            }}
          >
            {formatMessage({ id: 'component.button.format' })}
          </Button>
        </Space>
      </Space>
      <Drawer
        destroyOnClose
        open={open}
        maskClosable={false}
        placement="right"
        size="large"
        title={formatMessage({ id: 'component.tab.example' })}
        onClose={() => setOpen(false)}
      >
        <RuleList />
      </Drawer>
    </>
  );
};

export default RuleExample;
