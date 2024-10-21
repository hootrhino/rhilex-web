import { DownOutlined, PlusOutlined, PoweroffOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { Button, Dropdown, Popconfirm } from 'antd';
import { useRef, useState } from 'react';

import { message } from '@/components/PopupHack';
import ProConfirmModal from '@/components/ProConfirmModal';
import PageContainer from '@/components/ProPageContainer';
import {
  deleteOutendsDel,
  getOutendsList,
  putOutendsRestart,
} from '@/services/rhilex/shuchuziyuanguanli';
import { MAX_TOTAL } from '@/utils/constant';
import { useIntl } from '@umijs/max';
import { baseColumns } from './Columns';
import Detail from './Detail';

export type OutendItem = {
  name: string;
  type: string;
  state: number;
  description: string;
  uuid: string;
  [key: string]: any;
};

const Outend = () => {
  const actionRef = useRef<ActionType>();
  const { formatMessage } = useIntl();
  const { isFreeTrial, total, detailConfig, changeTotal, initialConfig, changeConfig } =
    useModel('useCommon');

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
      title: formatMessage({ id: 'table.title.option' }),
      valueType: 'option',
      key: 'option',
      width: 230,
      render: (_, { uuid }) => [
        <a key="detail" onClick={() => changeConfig({ open: true, uuid })}>
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
          onDataSourceChange={(d) => changeTotal(d.length)}
          toolBarRender={() => [
            <Button
              type="primary"
              key="new"
              onClick={() => history.push('/outend/new')}
              icon={<PlusOutlined />}
              disabled={isFreeTrial && total >= MAX_TOTAL}
            >
              {formatMessage({ id: 'button.new' })}
            </Button>,
          ]}
        />
      </PageContainer>
      <Detail {...detailConfig} onClose={initialConfig} />
      <ProConfirmModal
        open={open}
        onCancel={() => setOpen(false)}
        handleOnOk={async () => {
          await putOutendsRestart({ uuid: restartId });
        }}
      />
    </>
  );
};

export default Outend;
