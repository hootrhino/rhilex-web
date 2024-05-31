import { CodeOutlined, FileTextOutlined } from '@ant-design/icons';
import { useIntl } from '@umijs/max';
import { Button, Space } from 'antd';
import { useState } from 'react';
import LuaExample from '../LuaExample';

type RuleLabelProps = {
  name: string;
  handleOnFormatCode: () => void;
};

const RuleLabel = ({ name, handleOnFormatCode }: RuleLabelProps) => {
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
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
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
      <LuaExample open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default RuleLabel;
