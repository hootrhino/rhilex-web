import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { useIntl } from '@umijs/max';
import { Button } from 'antd';
import type { BaseButtonProps } from 'antd/es/button/button';
import { useId, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import type { TplItem } from '../typings';

type CopyButtonProps = Pick<TplItem, 'apply'> & BaseButtonProps;

const CopyButton = ({ apply, ...props }: CopyButtonProps) => {
  const [copied, setCopied] = useState<string>();
  const { formatMessage } = useIntl();

  const handleOnCopy = (text: string, result: boolean) => {
    setCopied(result ? text : '');
    setTimeout(() => {
      setCopied('');
    }, 1500);
  };

  return (
    <CopyToClipboard key={useId()} text={apply || ''} onCopy={handleOnCopy}>
      <Button
        key="copy"
        type="primary"
        onClick={(e) => e.stopPropagation()}
        icon={
          copied === apply ? (
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
