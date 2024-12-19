import { ExclamationCircleFilled } from '@ant-design/icons';
import { history, useIntl, useModel } from '@umijs/max';
import { useCountDown } from 'ahooks';
import type { ModalProps } from 'antd';
import { Button, Modal, Space } from 'antd';
import { useState } from 'react';

type ProConfirmModalProps = ModalProps & {
  content?: string | React.ReactNode;
  afterOkText?: string;
  handleOnOk?: () => void;
};

const ProConfirmModal = ({
  open,
  onCancel,
  okText,
  afterOkText,
  handleOnOk,
  content,
  ...props
}: ProConfirmModalProps) => {
  const [targetDate, setTargetDate] = useState<number>();
  const { formatMessage } = useIntl();
  const { cancel } = useModel('useSystem');

  const okButtonText = okText || formatMessage({ id: 'button.comfirm' });

  const [countdown] = useCountDown({
    targetDate,
    onEnd: () => {
      setTargetDate(undefined);
      onCancel();
      localStorage.clear();
      history.push('/login');
    },
  });

  return (
    <Modal
      title={
        <Space align="center">
          <ExclamationCircleFilled style={{ color: '#faad14', fontSize: 22 }} />
          <span>{formatMessage({ id: 'modal.title.confirm' })}</span>
        </Space>
      }
      open={open}
      destroyOnClose
      onCancel={onCancel}
      styles={{ header: { borderBottom: 'none', padding: '16px 24px 0 24px' } }}
      width={400}
      footer={
        <Space>
          <Button onClick={onCancel} disabled={countdown !== 0}>
            {formatMessage({ id: 'button.cancel' })}
          </Button>
          <Button
            type="primary"
            onClick={async () => {
              setTargetDate(Date.now() + 10000);
              cancel();
              handleOnOk!();
            }}
          >
            {countdown === 0
              ? okButtonText
              : formatMessage(
                  { id: 'component.button.countdown' },
                  {
                    countdown: Math.round(countdown / 1000),
                    text: afterOkText || formatMessage({ id: 'button.restart' }),
                  },
                )}
          </Button>
        </Space>
      }
      {...props}
    >
      {content || formatMessage({ id: 'modal.content.restart' })}
    </Modal>
  );
};

export default ProConfirmModal;
