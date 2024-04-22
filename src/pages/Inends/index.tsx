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
import { useModel, useRequest } from '@umijs/max';
import { baseColumns } from './columns';
import Detail from './Detail';
import { InendsType } from './enum';

export type InendsItem = {
  name: string;
  type: InendsType;
  state: number;
  description: string;
  config: Record<string, any>;
  uuid: string;
};

const Inends = () => {
  const actionRef = useRef<ActionType>();
  const { detailConfig, setConfig } = useModel('useSource');
  const [open, setOpen] = useState<boolean>(false);
  const [restartId, setRestartId] = useState<string>('');

  // 删除
  const { run: remove } = useRequest(
    (params: API.deleteInendsDelParams) => deleteInendsDel(params),
    {
      manual: true,
      onSuccess: () => {
        actionRef.current?.reload();
        message.success('删除成功');
      },
    },
  );

  const getMenuItems = (type: InendsType) => {
    let newItems = [
      { key: 'restart', label: '重启资源', icon: <PoweroffOutlined />, danger: true },
      { key: 'rule', label: '规则配置', icon: <SettingOutlined /> },
    ];

    if ([InendsType.COAP, InendsType.RULEX_UDP, InendsType.HTTP].includes(type)) {
      newItems = [...newItems, { key: 'sub-device', label: '查看子设备', icon: <HddOutlined /> }];
    }

    return newItems;
  };

  const columns: ProColumns<InendsItem>[] = (baseColumns as ProColumns<InendsItem>[]).concat([
    {
      title: '操作',
      width: 210,
      fixed: 'right',
      key: 'option',
      valueType: 'option',
      render: (_, { uuid, type }) => [
        <a key="detail" onClick={() => setConfig({ open: true, uuid })}>
          详情
        </a>,
        <a key="edit" onClick={() => history.push(`/inends/edit/${uuid}`)}>
          编辑
        </a>,
        <Popconfirm
          title="确定要删除此资源?"
          onConfirm={() => remove({ uuid })}
          okText="是"
          cancelText="否"
          key="remove"
        >
          <a>删除</a>
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
                  history.push(`/inends/${uuid}/rule`);
                  break;
                case 'sub-device':
                  history.push(`/inends/${uuid}/sub-device`);
                  break;
                default:
                  break;
              }
            },
          }}
        >
          <a>
            高级操作 <DownOutlined />
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
              onClick={() => history.push('/inends/new')}
            >
              新建
            </Button>,
          ]}
        />
      </PageContainer>
      <Detail {...detailConfig} onClose={() => setConfig({ ...detailConfig, open: false })} />
      <ProConfirmModal
        open={open}
        onCancel={() => setOpen(false)}
        title="确定执行重启操作吗？"
        okText="确定重启"
        afterOkText="重启"
        content="重启过程会短暂（5-10秒）断开资源连接，需谨慎操作"
        handleOnEnd={() => {
          actionRef.current?.reload();
          message.success('重启成功');
          setOpen(false);
        }}
        handleOnOk={async () => {
          await putInendsRestart({ uuid: restartId });
        }}
      />
    </>
  );
};

export default Inends;
