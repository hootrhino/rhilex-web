import { useRef, useState } from 'react';

import { history } from 'umi';

import { DownOutlined, PlusOutlined, PoweroffOutlined, SettingOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Dropdown, Popconfirm } from 'antd';

import { message } from '@/components/PopupHack';
import ProConfirmModal from '@/components/ProConfirmModal';
import StateTag from '@/components/StateTag';
import {
  deleteInendsDel,
  getInendsList,
  putInendsRestart,
} from '@/services/rulex/shuruziyuanguanli';
import { useModel, useRequest } from '@umijs/max';
import Detail from './components/Detail';
import { typeEnum } from './components/enum';

export type InendsItem = {
  name: string;
  type: string;
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

  const columns: ProColumns<InendsItem>[] = [
    {
      title: 'UUID',
      dataIndex: 'uuid',
      ellipsis: true,
      copyable: true,
    },
    {
      title: '名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '类型',
      dataIndex: 'type',
      valueEnum: typeEnum,
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: 100,
      renderText: (state) => <StateTag state={state} />,
    },
    {
      title: '备注',
      dataIndex: 'description',
      ellipsis: true,
    },
    {
      title: '操作',
      width: 210,
      fixed: 'right',
      key: 'option',
      valueType: 'option',
      render: (_, { uuid }) => [
        <a key="detail" onClick={() => setConfig({ open: true, uuid })}>
          详情
        </a>,
        <a key="edit" onClick={() => history.push(`/inends/edit/${uuid}`)}>
          编辑
        </a>,
        <Popconfirm
          title="确定要删除该资源?"
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
            items: [
              { key: 'restart', label: '重启资源', icon: <PoweroffOutlined />, danger: true },
              { key: 'rule', label: '规则配置', icon: <SettingOutlined /> },
            ],
            onClick: ({ key }) => {
              switch (key) {
                case 'restart':
                  setOpen(true);
                  setRestartId(uuid);
                  break;
                case 'rule':
                  history.push(`/inends/${uuid}/rule`);
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
  ];

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
