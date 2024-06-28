import ProDescriptions from '@/components/ProDescriptions';
import ProTag, { StatusType } from '@/components/ProTag';
import { getTransceiverDetail, postTransceiverCtrl } from '@/services/rulex/tongxinmozu';
import { IconFont } from '@/utils/utils';
import { green } from '@ant-design/colors';
import { getIntl, getLocale } from '@umijs/max';
import type { ModalProps } from 'antd';
import { Button, Modal, Progress, Space } from 'antd';
import { TransceiverTopic, TransceiverType, TransceiverTypeOption } from '../enum';

type DetailProps = ModalProps & {
  name: string;
  type: number;
};

const intl = getIntl(getLocale());
const labelWidth = getLocale() === 'en-US' ? 120 : 80;

const Detail = ({ name, type, ...props }: DetailProps) => {
  // 基本信息
  const columns = [
    {
      title: intl.formatMessage({ id: 'com.table.title.name' }),
      dataIndex: 'name',
    },
    {
      title: intl.formatMessage({ id: 'com.table.title.type' }),
      dataIndex: 'type',
      renderText: (type: number) => (
        <Space>
          <span>{TransceiverTypeOption[type]?.text}</span>
          <IconFont type={`icon-com-${TransceiverTypeOption[type]?.icon}`} />
        </Space>
      ),
    },
    {
      title: intl.formatMessage({ id: 'com.table.title.model' }),
      dataIndex: 'model',
    },
    {
      title: intl.formatMessage({ id: 'com.table.title.vendor' }),
      dataIndex: 'vendor',
    },
    {
      title: intl.formatMessage({ id: 'com.table.title.firmware' }),
      dataIndex: 'firmware',
      hideInTable: true,
    },
    {
      title: intl.formatMessage({ id: 'com.table.title.mac' }),
      dataIndex: 'mac',
      hideInTable: true,
    },
    {
      title: intl.formatMessage({ id: 'com.table.title.status' }),
      dataIndex: 'status',
      renderText: (status: number) => <ProTag type={StatusType.COM}>{status}</ProTag>,
    },
  ];

  // 信号强度
  const csqColumns = [
    {
      title: intl.formatMessage({ id: 'com.table.title.cops' }),
      dataIndex: 'cops',
    },
    {
      title: 'ICCID',
      dataIndex: 'iccid',
    },
    {
      title: intl.formatMessage({ id: 'com.table.title.csq' }),
      dataIndex: 'csq',
      renderText: (csq: number) => {
        const base = 31 / 100;
        const percent = csq ? csq / base : 0;

        return <Progress steps={10} size={20} percent={percent} strokeColor={green[6]} />;
      },
    },
  ];

  return (
    <Modal
      destroyOnClose
      title={intl.formatMessage({ id: 'com.modal.title.detail' })}
      footer={
        <Button key="close" type="primary" onClick={props.onCancel}>
          {intl.formatMessage({ id: 'button.close' })}
        </Button>
      }
      {...props}
    >
      <ProDescriptions
        title={intl.formatMessage({ id: 'com.modal.title.detail.basic' })}
        columns={columns}
        labelWidth={labelWidth}
        request={async () => {
          const res = await getTransceiverDetail({ name });

          return Promise.resolve({
            success: true,
            data: res?.data,
          });
        }}
      />
      {type === TransceiverType.MN4G && (
        <ProDescriptions
          title={intl.formatMessage({ id: 'com.modal.title.detail.csq' })}
          columns={csqColumns}
          labelWidth={labelWidth}
          request={async () => {
            const res = await postTransceiverCtrl({ name, args: '', topic: TransceiverTopic.CSQ });

            return Promise.resolve({
              success: true,
              data: (res as any)?.result,
            });
          }}
        />
      )}
    </Modal>
  );
};

export default Detail;
