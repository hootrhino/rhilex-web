import ProDescriptions from '@/components/ProDescriptions';
import ProTag, { StatusType } from '@/components/ProTag';
import { getTransceiverDetail, postTransceiverCtrl } from '@/services/rhilex/tongxinmozu';
import { IconFont } from '@/utils/utils';
import { green } from '@ant-design/colors';
import { getIntl, getLocale } from '@umijs/max';
import type { ModalProps } from 'antd';
import { Button, Modal, Progress, Space } from 'antd';
import { TopicType, TransceiverTopic, TransceiverType, TransceiverTypeOption } from '../enum';

type DetailProps = ModalProps & {
  name: string;
  type: number;
};

const { formatMessage } = getIntl(getLocale());
const labelWidth = getLocale() === 'en-US' ? 120 : 80;

const Detail = ({ name, type, ...props }: DetailProps) => {
  // 基本信息
  const columns = [
    {
      title: formatMessage({ id: 'table.title.name' }),
      dataIndex: 'name',
    },
    {
      title: formatMessage({ id: 'table.title.type' }),
      dataIndex: 'type',
      renderText: (type: number) =>
        type ? (
          <Space>
            <span>{TransceiverTypeOption[type]?.text}</span>
            <IconFont type={`icon-com-${TransceiverTypeOption[type]?.icon}`} />
          </Space>
        ) : (
          '-'
        ),
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
      title: formatMessage({ id: 'com.table.title.firmware' }),
      dataIndex: 'firmware',
      hideInTable: true,
    },
    {
      title: formatMessage({ id: 'com.table.title.mac' }),
      dataIndex: 'mac',
      hideInTable: true,
    },
    {
      title: formatMessage({ id: 'table.title.status' }),
      dataIndex: 'status',
      renderText: (status: number) => <ProTag type={StatusType.COM}>{status || 0}</ProTag>,
    },
  ];

  // 参数配置
  const parameterColumns = {
    [TransceiverType.MN4G]: [
      {
        title: formatMessage({ id: 'com.table.title.cops' }),
        dataIndex: 'cops',
      },
      {
        title: 'ICCID',
        dataIndex: 'iccid',
      },
      {
        title: formatMessage({ id: 'com.table.title.csq' }),
        dataIndex: 'csq',
        renderText: (csq: number) => {
          const base = 31 / 100;
          const percent = csq ? csq / base : 0;

          return <Progress steps={10} size={20} percent={percent} strokeColor={green[6]} />;
        },
      },
    ],
    [TransceiverType.BLE]: [
      {
        title: formatMessage({ id: 'com.table.title.bleName' }),
        dataIndex: 'name',
      },
      {
        title: formatMessage({ id: 'com.table.title.bleMac' }),
        dataIndex: 'mac',
      },
    ],
  };

  // 获取参数 title
  const parameterTitle = {
    [TransceiverType.MN4G]: '4G',
    [TransceiverType.BLE]: formatMessage({ id: 'com.modal.title.detail.parameter.ble' }),
  };

  return (
    <Modal
      destroyOnClose
      title={formatMessage({ id: 'com.modal.title.detail' })}
      footer={
        <Button key="close" type="primary" onClick={props.onCancel}>
          {formatMessage({ id: 'button.close' })}
        </Button>
      }
      {...props}
    >
      <ProDescriptions
        title={formatMessage({ id: 'com.modal.title.detail.basic' })}
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
      {[TransceiverType.MN4G, TransceiverType.BLE].includes(type) && (
        <ProDescriptions
          title={formatMessage(
            { id: 'com.modal.title.detail.parameter' },
            { type: parameterTitle[type] },
          )}
          columns={parameterColumns[type]}
          labelWidth={labelWidth}
          request={async () => {
            const res = await postTransceiverCtrl({
              name,
              args: '',
              topic: TransceiverTopic[type]?.[TopicType.INFO],
            });

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
