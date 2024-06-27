import PageContainer from '@/components/ProPageContainer';
import ProTag, { StatusType } from '@/components/ProTag';
import { getTransceiverList, postTransceiverCtrl } from '@/services/rulex/tongxinmozu';
import { cn } from '@/utils/utils';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { getLocale, useIntl, useRequest } from '@umijs/max';
import { Button, Form, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';

type TransceiverCtrlParams = {
  name: string;
  cmd: string;
};

type ComItem = {
  name: string;
  type: number;
  model: string;
  status: number;
  vendor: string;
};

enum TransceiverType {
  COMMON_RF = 0,
  WIFI = 1,
  BLC = 2,
  BLE = 3,
  ZIGBEE = 4,
  RF24g = 5,
  RF433M = 6,
  MN4G = 7,
  MN5G = 8,
  NBIoT = 9,
  LORA = 10,
  LORA_WAN = 11,
}

const CommunicationModule = () => {
  const { formatMessage } = useIntl();
  const [form] = Form.useForm();

  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>();
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

  const columns: ProColumns<Partial<ComItem>>[] = [
    {
      title: formatMessage({ id: 'com.table.title.name' }),
      dataIndex: 'name',
    },
    {
      title: formatMessage({ id: 'com.table.title.type' }),
      dataIndex: 'type',
      renderText: (type: number) => TransceiverType[type],
    },
    {
      title: formatMessage({ id: 'com.table.title.model' }),
      dataIndex: 'model',
    },
    {
      title: formatMessage({ id: 'com.table.title.vendor' }),
      dataIndex: 'vendor',
    },
    {
      title: formatMessage({ id: 'com.table.title.status' }),
      dataIndex: 'status',
      renderText: (status: number) => <ProTag type={StatusType.COM}>{status}</ProTag>,
    },
    {
      title: formatMessage({ id: 'table.option' }),
      valueType: 'option',
      width: getLocale() === 'en-US' ? 150 : 100,
      render: (_, { name }) => [
        <a
          key="command"
          onClick={() => {
            if (!name) return;

            setOpen(true);
            setName(name);
          }}
        >
          {formatMessage({ id: 'com.button.cmd' })}
        </a>,
      ],
    },
  ];

  return (
    <>
      <PageContainer>
        <ProTable
          rowKey="name"
          rootClassName="stripe-table"
          columns={columns}
          search={false}
          pagination={false}
          request={async () => {
            const { data } = await getTransceiverList();

            return Promise.resolve({
              data,
              success: true,
            });
          }}
        />
      </PageContainer>
      <Modal
        destroyOnClose
        title={formatMessage({ id: 'com.modal.title' })}
        open={open}
        onCancel={() => {
          setOpen(false);
          setResult(undefined);
          form.resetFields();
        }}
        footer={false}
      >
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={({ cmd }) => {
            if (cmd && name) {
              setResult('loading...');
              run({ cmd, name });
            }
          }}
        >
          <Form.Item
            label={formatMessage({ id: 'com.form.title.cmd' })}
            name="cmd"
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
    </>
  );
};

export default CommunicationModule;
