import type { LogRef } from '@/components/ProLog';
import ProLog from '@/components/ProLog';
import { handleNewMessage } from '@/utils/utils';
import { useIntl, useModel } from '@umijs/max';
import type { ModalProps } from 'antd';
import { Button, Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';

type LogDetailProps = ModalProps & {
  uuid: string;
};

const LogDetail = ({ uuid, onCancel, ...props }: LogDetailProps) => {
  const { latestMessage } = useModel('useWebsocket');
  const { formatMessage } = useIntl();
  const [ruleLog, setLog] = useState<string[]>([]);
  const logRef = useRef<LogRef>(null);

  const handleOnClearLog = () => {
    setLog([]);
    logRef.current?.clearLog();
  };

  const handleOnCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onCancel) {
      onCancel(e);
    }
    handleOnClearLog();
  };

  useEffect(() => {
    if (props?.open) {
      const newData = handleNewMessage(ruleLog, latestMessage?.data, `rule/log/${uuid}`);
      setLog(newData);
    } else {
      handleOnClearLog();
    }
  }, [latestMessage]);

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
      <ProLog
        hidePadding
        headStyle={{ paddingBlock: 0 }}
        topic={`rule/log/${uuid}`}
        dataSource={ruleLog}
        ref={logRef}
      />
    </Modal>
  );
};

export default LogDetail;
