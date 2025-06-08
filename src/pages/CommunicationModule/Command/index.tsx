import { postTransceiverCtrl } from '@/services/rhilex/tongxinmozu';
import { cn } from '@/utils/utils';
import { getIntl, getLocale, useRequest } from '@umijs/max';
import type { ModalProps } from 'antd';
import { Button, Form, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import type { TransceiverCtrlParams } from '..';
import { TopicType, TransceiverTopic } from '../enum';

type SendCommandProps = ModalProps & {
  name: string;
  type: number;
  onCancel: () => void;
};

const { formatMessage } = getIntl(getLocale());

const SendCommand = ({ name, type, onCancel, ...props }: SendCommandProps) => {
  const [form] = Form.useForm();
  const [result, setResult] = useState<string>();

  // 发送指令
  const { run, loading } = useRequest(
    (params: TransceiverCtrlParams) => postTransceiverCtrl(params),
    {
      manual: true,
      onSuccess: (data) => {
        setTimeout(() => {
          setResult(data.result);
        }, 1000);
      },
      onError: () => setResult('Error'),
    },
  );

  return (
    <Modal
      destroyOnClose
      title={formatMessage({ id: 'com.modal.title.command' })}
      onCancel={() => {
        onCancel();
        setResult(undefined);
        form.resetFields();
      }}
      footer={false}
      {...props}
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={({ args }) => {
          if (args && name) {
            setResult('loading...');
            run({ args, name, topic: TransceiverTopic[type]?.[TopicType.SEND] });
          }
        }}
      >
        <Form.Item
          label={formatMessage({ id: 'com.form.title.cmd' })}
          name="args"
          rules={[{ required: true, message: formatMessage({ id: 'com.form.placeholder.cmd' }) }]}
        >
          <TextArea rows={4} placeholder={formatMessage({ id: 'com.form.placeholder.cmd' })} />
        </Form.Item>
        <Form.Item className="send-button-item">
          <Button type="primary" htmlType="submit" className={cn('w-full')} loading={loading}>
            {formatMessage({ id: 'com.button.send' })}
          </Button>
        </Form.Item>
      </Form>
      {result && (
        <div>
          <div className="pb-[8px]">{formatMessage({ id: 'com.form.title.result' })}</div>
          <TextArea autoSize={{ minRows: 2, maxRows: 5 }} value={result} variant="borderless" />
        </div>
      )}
    </Modal>
  );
};

export default SendCommand;
