import ProLog from '@/components/ProLog';
import { handleNewMessage } from '@/utils/utils';
import { useIntl, useModel } from '@umijs/max';
import { useLocalStorageState } from 'ahooks';
import type { ModalProps } from 'antd';
import { Button, Modal } from 'antd';
import { useEffect } from 'react';

type LogDetailProps = ModalProps & {
  uuid: string;
};

const LogDetail = ({ uuid, ...props }: LogDetailProps) => {
  const { latestMessage } = useModel('useWebsocket');
  const { formatMessage } = useIntl();

  const [ruleLog, setLog] = useLocalStorageState<string[]>('rule-logs', {
    defaultValue: [],
  });

  useEffect(() => {
    const newData = handleNewMessage(ruleLog, latestMessage?.data, `rule/log/${uuid}`);
    setLog(newData);
  }, [latestMessage]);

  return (
    <Modal
      title={formatMessage({ id: 'ruleConfig.title.log' })}
      width="65%"
      destroyOnClose
      footer={
        <Button type="primary" onClick={props?.onCancel}>
          {formatMessage({ id: 'button.close' })}
        </Button>
      }
      {...props}
    >
      <ProLog
        hidePadding
        headStyle={{ paddingBlock: 0 }}
        topic={`rule/log/${uuid}`}
        dataSource={ruleLog}
      />
    </Modal>
  );
};

export default LogDetail;
