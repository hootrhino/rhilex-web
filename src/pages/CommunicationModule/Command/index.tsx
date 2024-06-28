import { postTransceiverCtrl } from '@/services/rulex/tongxinmozu';
import { cn } from '@/utils/utils';
import { getIntl, getLocale, useRequest } from '@umijs/max';
import type { ModalProps } from 'antd';
import { Button, Form, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import type { TransceiverCtrlParams } from '..';
import { TransceiverTopic } from '../enum';

type SendCommandProps = ModalProps & {
  name: string;
  onCancel: () => void;
};

const intl = getIntl(getLocale());

const SendCommand = ({ name, onCancel, ...props }: SendCommandProps) => {
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
      title={intl.formatMessage({ id: 'com.modal.title.command' })}
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
            run({ args, name, topic: TransceiverTopic.SEND });
          }
        }}
      >
        <Form.Item
          label={intl.formatMessage({ id: 'com.form.title.cmd' })}
          name="args"
          rules={[
            { required: true, message: intl.formatMessage({ id: 'com.form.placeholder.cmd' }) },
          ]}
        >
          <TextArea rows={4} placeholder={intl.formatMessage({ id: 'com.form.placeholder.cmd' })} />
        </Form.Item>
        <Form.Item className="send-button-item">
          <Button type="primary" htmlType="submit" className={cn('w-full')} loading={loading}>
            {intl.formatMessage({ id: 'com.button.send' })}
          </Button>
        </Form.Item>
      </Form>
      {result && (
        <div>
          <div className="pb-[8px]">{intl.formatMessage({ id: 'com.form.title.result' })}</div>
          <TextArea autoSize={{ minRows: 2, maxRows: 5 }} value={result} variant="borderless" />
        </div>
      )}
    </Modal>
  );
};

export default SendCommand;
