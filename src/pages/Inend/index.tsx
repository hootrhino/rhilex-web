import { useRef, useState } from 'react';

import { history } from 'umi';

import {
  DownOutlined,
  HddOutlined,
  PlusOutlined,
  PoweroffOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Dropdown, Popconfirm } from 'antd';

import PageContainer from '@/components/PageContainer';
import { message } from '@/components/PopupHack';
import ProConfirmModal from '@/components/ProConfirmModal';
import {
  deleteInendsDel,
  getInendsList,
  putInendsRestart,
} from '@/services/rulex/shuruziyuanguanli';
import { useIntl, useModel, useRequest } from '@umijs/max';
import { baseColumns } from './columns';
import Detail from './Detail';
import { InendType } from './enum';

export type InendItem = {
  name: string;
  type: InendType;
  state: number;
  description: string;
  config: Record<string, any>;
  uuid: string;
};

const Inend = () => {
  const actionRef = useRef<ActionType>();
  const { detailConfig, setConfig } = useModel('useSource');
  const { formatMessage } = useIntl();
  const [open, setOpen] = useState<boolean>(false);
  const [restartId, setRestartId] = useState<string>('');

  // 删除
  const { run: remove } = useRequest(
    (params: API.deleteInendsDelParams) => deleteInendsDel(params),
    {
      manual: true,
      onSuccess: () => {
        actionRef.current?.reload();
        message.success(formatMessage({ id: 'message.success.remove' }));
      },
    },
  );

  const getMenuItems = (type: InendType) => {
    let newItems = [
      {
        key: 'restart',
        label: formatMessage({ id: 'button.reload' }),
        icon: <PoweroffOutlined />,
        danger: true,
      },
      { key: 'rule', label: formatMessage({ id: 'button.ruleConfig' }), icon: <SettingOutlined /> },
    ];

    if ([InendType.COAP, InendType.RULEX_UDP, InendType.HTTP].includes(type)) {
      newItems = [
        ...newItems,
        {
          key: 'sub-device',
          label: formatMessage({ id: 'button.subDevice' }),
          icon: <HddOutlined />,
        },
      ];
    }

    return newItems;
  };

  const columns: ProColumns<InendItem>[] = (baseColumns as ProColumns<InendItem>[]).concat([
    {
      title: formatMessage({ id: 'table.option' }),
      width: 230,
      fixed: 'right',
      key: 'option',
      valueType: 'option',
      render: (_, { uuid, type }) => [
        <a key="detail" onClick={() => setConfig({ open: true, uuid })}>
          {formatMessage({ id: 'button.detail' })}
        </a>,
        <a key="edit" onClick={() => history.push(`/inend/edit/${uuid}`)}>
          {formatMessage({ id: 'button.edit' })}
        </a>,
        <Popconfirm
          title={formatMessage({ id: 'inend.popconfirm.title.remove' })}
          onConfirm={() => remove({ uuid })}
          okText={formatMessage({ id: 'button.yes' })}
          cancelText={formatMessage({ id: 'button.no' })}
          key="remove"
        >
          <a>{formatMessage({ id: 'button.remove' })}</a>
        </Popconfirm>,
        <Dropdown
          key="advance-action"
          menu={{
            items: getMenuItems(type),
            onClick: ({ key }) => {
              switch (key) {
                case 'restart':
                  setOpen(true);
                  setRestartId(uuid);
                  break;
                case 'rule':
                  history.push(`/inend/${uuid}/rule`);
                  break;
                case 'sub-device':
                  history.push(`/inend/${uuid}/sub-device`);
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
            const res = await getInendsList();

            return Promise.resolve({
              data: (res as any)?.data,
              success: true,
            });
          }}
          search={false}
          pagination={false}
          toolBarRender={() => [
            <Button
              key="new"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => history.push('/inend/new')}
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
        okText={formatMessage({ id: 'button.restart.comfirm' })}
        afterOkText={formatMessage({ id: 'button.restart' })}
        content={formatMessage({ id: 'inend.modal.content.restart' })}
        handleOnEnd={() => {
          actionRef.current?.reload();
          message.success(formatMessage({ id: 'message.success.restart' }));
          setOpen(false);
        }}
        handleOnOk={async () => {
          await putInendsRestart({ uuid: restartId });
        }}
      />
    </>
  );
};

export default Inend;
