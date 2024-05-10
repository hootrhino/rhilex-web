import { ExclamationCircleFilled } from '@ant-design/icons';
import { useIntl } from '@umijs/max';
import { useCountDown } from 'ahooks';
import type { ModalProps } from 'antd';
import { Button, Modal, Space } from 'antd';
import { useState } from 'react';

type ProConfirmModalProps = ModalProps & {
  afterOkText: string;
  content: string | React.ReactNode;
  handleOnOk?: () => void;
  handleOnEnd?: () => void;
};

const ProConfirmModal = ({
  title,
  open,
  onCancel,
  okText,
  afterOkText,
  handleOnOk,
  handleOnEnd,
  content,
  ...props
}: ProConfirmModalProps) => {
  const [targetDate, setTargetDate] = useState<number>();
  const { formatMessage } = useIntl();

  const [countdown] = useCountDown({
    targetDate,
    onEnd: () => {
      setTargetDate(undefined);
      handleOnEnd!();
    },
  });

  return (
    <Modal
      title={
        <Space align="center">
          <ExclamationCircleFilled style={{ color: '#faad14', fontSize: 22 }} />
          <span>{title}</span>
        </Space>
      }
      open={open}
      destroyOnClose
      onCancel={onCancel}
      rootClassName="none-header-border"
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
              handleOnOk!();
            }}
          >
            {countdown === 0
              ? okText
              : formatMessage(
                  { id: 'component.button.countdown' },
                  { countdown: Math.round(countdown / 1000), text: afterOkText },
                )}
          </Button>
        </Space>
      }
      {...props}
    >
      {content}
    </Modal>
  );
};

export default ProConfirmModal;
