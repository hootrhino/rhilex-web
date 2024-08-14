import type { LogRef } from '@/components/ProLog';
import ProLog from '@/components/ProLog';
import { useIntl } from '@umijs/max';
import type { ModalProps } from 'antd';
import { Button, Modal } from 'antd';
import { useRef } from 'react';

type LogDetailProps = ModalProps & {
  uuid: string;
};

const LogDetail = ({ uuid, onCancel, ...props }: LogDetailProps) => {
  const { formatMessage } = useIntl();
  const logRef = useRef<LogRef>(null);

  const handleOnCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onCancel) {
      onCancel(e);
    }
    logRef.current?.clearLog();
  };

  return (
    <Modal
      title={formatMessage({ id: 'ruleConfig.title.log' })}
      width="65%"
      destroyOnClose
      footer={
        <Button type="primary" onClick={handleOnCancel}>
          {formatMessage({ id: 'button.close' })}
        </Button>
      }
      onCancel={handleOnCancel}
      {...props}
    >
      <ProLog topic={`rule/log/${uuid}`} ref={logRef} />
    </Modal>
  );
};

export default LogDetail;
