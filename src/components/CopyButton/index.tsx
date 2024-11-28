import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { useIntl } from '@umijs/max';
import { Button } from 'antd';
import type { BaseButtonProps } from 'antd/es/button/button';
import { useId, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

type CopyButtonProps = {
  text: string | undefined;
} & BaseButtonProps;

const CopyButton = ({ text = '', ...props }: CopyButtonProps) => {
  const [copied, setCopied] = useState<string>();
  const { formatMessage } = useIntl();

  const handleOnCopy = (text: string, result: boolean) => {
    setCopied(result ? text : '');
    setTimeout(() => {
      setCopied('');
    }, 1500);
  };

  return (
    <CopyToClipboard key={useId()} text={text} onCopy={handleOnCopy}>
      <Button
        key="copy"
        type="primary"
        onClick={(e) => e.stopPropagation()}
        icon={
          copied === text ? (
            <CheckOutlined style={{ color: props?.ghost ? '#52c41a' : '#fff' }} />
          ) : (
            <CopyOutlined style={{ color: props?.ghost ? '#1677ff' : '#fff' }} />
          )
        }
        {...props}
      >
        {formatMessage({ id: 'button.copy' })}
      </Button>
    </CopyToClipboard>
  );
};

export default CopyButton;
