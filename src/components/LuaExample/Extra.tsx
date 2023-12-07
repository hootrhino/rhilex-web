import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

type ExtraProps = {
  data: TplItem;
};

const Extra = ({ data }: ExtraProps) => {
  const [copied, setCopied] = useState<string>('');
  const { apply, label } = data;

  return (
    <CopyToClipboard
      key={label}
      text={apply || ''}
      onCopy={(text, result) => {
        setCopied(result ? text : '');
        setTimeout(() => {
          setCopied('');
        }, 1500);
      }}
    >
      <Button
        type="primary"
        size="small"
        ghost
        onClick={(e) => e.stopPropagation()}
        icon={copied === apply ? <CheckOutlined /> : <CopyOutlined />}
      >
        复制 Lua
      </Button>
    </CopyToClipboard>
  );
};

export default Extra;
