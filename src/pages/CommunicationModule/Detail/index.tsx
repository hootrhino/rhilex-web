import ProDescriptions from '@/components/ProDescriptions';
import ProTag, { StatusType } from '@/components/ProTag';
import { getTransceiverDetail } from '@/services/rulex/tongxinmozu';
import { IconFont } from '@/utils/utils';
import { getIntl, getLocale } from '@umijs/max';
import type { ModalProps } from 'antd';
import { Button, Modal, Space } from 'antd';
import { TransceiverTypeOption } from '../enum';

type DetailProps = ModalProps & {
  name: string;
};

const intl = getIntl(getLocale());

const Detail = ({ name, ...props }: DetailProps) => {
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
        columns={columns}
        labelWidth={getLocale() === 'en-US' ? 120 : 80}
        request={async () => {
          const res = await getTransceiverDetail({ name });

          return Promise.resolve({
            success: true,
            data: res?.data,
          });
        }}
      />
    </Modal>
  );
};

export default Detail;
