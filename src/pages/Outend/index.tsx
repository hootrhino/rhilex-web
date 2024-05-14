import { useRef, useState } from 'react';

import { DownOutlined, PlusOutlined, PoweroffOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Dropdown, Popconfirm } from 'antd';
import { history } from 'umi';

import PageContainer from '@/components/PageContainer';
import { message } from '@/components/PopupHack';
import ProConfirmModal from '@/components/ProConfirmModal';
import {
  deleteOutendsDel,
  getOutendsList,
  putOutendsRestart,
} from '@/services/rulex/shuchuziyuanguanli';
import { useIntl } from '@umijs/max';
import { baseColumns } from './columns';
import Detail from './Detail';

export type OutendItem = {
  name: string;
  type: string;
  state: number;
  description: string;
  uuid: string;
  [key: string]: any;
};

type DetailModalConfig = {
  open: boolean;
  uuid: string;
};

const Outend = () => {
  const actionRef = useRef<ActionType>();
  const { formatMessage } = useIntl();
  const [detailConfig, setConfig] = useState<DetailModalConfig>({
    uuid: '',
    open: false,
  });
  const [open, setOpen] = useState<boolean>(false);
  const [restartId, setRestartId] = useState<string>('');

  // 删除
  const handleOnDelete = async (values: API.deleteOutendsDelParams) => {
    try {
      await deleteOutendsDel(values);
      actionRef?.current?.reload();
      message.success(formatMessage({ id: 'message.success.remove' }));
      return true;
    } catch (error) {
      return false;
    }
  };

  const columns: ProColumns<OutendItem>[] = (baseColumns as ProColumns<OutendItem>[]).concat([
    {
      title: formatMessage({ id: 'table.option' }),
      valueType: 'option',
      key: 'option',
      width: 230,
      fixed: 'right',
      render: (_, { uuid }) => [
        <a key="detail" onClick={() => setConfig({ open: true, uuid })}>
          {formatMessage({ id: 'button.detail' })}
        </a>,
        <a key="edit" onClick={() => history.push(`/outend/edit/${uuid}`)}>
          {formatMessage({ id: 'button.edit' })}
        </a>,
        <Popconfirm
          title={formatMessage({ id: 'outend.modal.title.remove' })}
          onConfirm={() => handleOnDelete({ uuid })}
          key="remove"
        >
          <a>{formatMessage({ id: 'button.remove' })}</a>
        </Popconfirm>,
        <Dropdown
          key="advance-action"
          menu={{
            items: [
              {
                key: 'restart',
                label: formatMessage({ id: 'button.reload' }),
                icon: <PoweroffOutlined />,
                danger: true,
              },
            ],
            onClick: ({ key }) => {
              switch (key) {
                case 'restart':
                  setOpen(true);
                  setRestartId(uuid);
                  break;
                default:
                  break;
              }
            },
          }}
        >
          <a>
            {formatMessage({ id: 'button.advancedOption' })} <DownOutlined />
          </a>
        </Dropdown>,
      ],
    },
  ]);

  return (
    <>
      <PageContainer>
        <ProTable
          rowKey="uuid"
          actionRef={actionRef}
          columns={columns}
          rootClassName="stripe-table"
          request={async () => {
            const res = await getOutendsList();

            return Promise.resolve({
              data: (res as any)?.data,
              success: true,
            });
          }}
          search={false}
          pagination={false}
          toolBarRender={() => [
            <Button
              type="primary"
              key="new"
              onClick={() => history.push('/outend/new')}
              icon={<PlusOutlined />}
            >
              {formatMessage({ id: 'button.new' })}
            </Button>,
          ]}
        />
      </PageContainer>
      <Detail {...detailConfig} onClose={() => setConfig({ ...detailConfig, open: false })} />
      <ProConfirmModal
        open={open}
        onCancel={() => setOpen(false)}
        title={formatMessage({ id: 'modal.title.confirm' })}
        okText={formatMessage({ id: 'button.comfirm' })}
        afterOkText={formatMessage({ id: 'button.restart' })}
        content={formatMessage({ id: 'outend.modal.content.restart' })}
        handleOnEnd={() => {
          actionRef.current?.reload();
          message.success(formatMessage({ id: 'message.success.restart' }));
          setOpen(false);
        }}
        handleOnOk={async () => {
          await putOutendsRestart({ uuid: restartId });
        }}
      />
    </>
  );
};

export default Outend;
