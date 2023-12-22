import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import type { BaseButtonProps } from 'antd/es/button/button';
import { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

type CopyButtonProps = {
  data: TplItem;
} & BaseButtonProps;

const CopyButton = ({ data: { label, apply }, ...props }: CopyButtonProps) => {
  const [copied, setCopied] = useState<string>('');

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
        key="copy"
        type="primary"
        onClick={(e) => e.stopPropagation()}
        icon={copied === apply ? <CheckOutlined /> : <CopyOutlined />}
        {...props}
      >
        复制 Lua
      </Button>
    </CopyToClipboard>
  );
};

export default CopyButton;
