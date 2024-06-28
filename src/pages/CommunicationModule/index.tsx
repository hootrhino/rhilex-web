import { modal } from '@/components/PopupHack';
import PageContainer from '@/components/ProPageContainer';
import ProTag, { StatusType } from '@/components/ProTag';
import { getTransceiverList } from '@/services/rulex/tongxinmozu';
import { IconFont } from '@/utils/utils';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { getLocale, useIntl } from '@umijs/max';
import { Space } from 'antd';
import { useState } from 'react';
import Command from './Command';
import Detail from './Detail';
import { TransceiverTypeOption } from './enum';

export type ComItem = {
  name: string;
  type: number;
  model: string;
  status: number;
  vendor: string;
  [key: string]: any;
};

const CommunicationModule = () => {
  const { formatMessage } = useIntl();

  const [activeName, setActiveName] = useState<string>('');
  const [openCommand, setOpenCommand] = useState<boolean>(false);
  const [openDetail, setOpenDetail] = useState<boolean>(false);

  const columns: ProColumns<ComItem>[] = [
    {
      title: formatMessage({ id: 'com.table.title.name' }),
      dataIndex: 'name',
    },
    {
      title: formatMessage({ id: 'com.table.title.type' }),
      dataIndex: 'type',
      renderText: (type: number) => (
        <Space>
          <IconFont
            type={`icon-com-${TransceiverTypeOption[type].icon}`}
            style={{ fontSize: 18 }}
          />
          <span>{TransceiverTypeOption[type].text}</span>
        </Space>
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
      title: formatMessage({ id: 'com.table.title.status' }),
      dataIndex: 'status',
      renderText: (status: number) => <ProTag type={StatusType.COM}>{status}</ProTag>,
    },
    {
      title: formatMessage({ id: 'table.option' }),
      valueType: 'option',
      width: getLocale() === 'en-US' ? 250 : 180,
      render: (_, { name, status, errMsg }) => [
        <a
          key="detail"
          onClick={() => {
            if (!name) return;

            setOpenDetail(true);
            setActiveName(name);
          }}
        >
          {formatMessage({ id: 'button.detail' })}
        </a>,
        <a
          key="command"
          onClick={() => {
            if (!name) return;

            setOpenCommand(true);
            setActiveName(name);
          }}
        >
          {formatMessage({ id: 'com.button.cmd' })}
        </a>,
        <a
          key="error"
          onClick={() => {
            modal.error({
              title: formatMessage({ id: 'com.modal.title.error' }),
              content: <div className="flex flex-wrap">{errMsg}</div>,
              okText: formatMessage({ id: 'button.close' }),
            });
          }}
          className={status === 1 ? 'hidden' : 'block'}
        >
          {formatMessage({ id: 'button.error' })}
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
      <Command
        name={activeName}
        open={openCommand}
        onCancel={() => {
          setOpenCommand(false);
          setActiveName('');
        }}
      />
      <Detail
        name={activeName}
        open={openDetail}
        onCancel={() => {
          setOpenDetail(false);
          setActiveName('');
        }}
      />
    </>
  );
};

export default CommunicationModule;
