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
import { baseColumns } from './columns';
import Detail from './Detail';

export type OutendsItem = {
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

const Outends = () => {
  const actionRef = useRef<ActionType>();
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
      message.success('删除成功');
      return true;
    } catch (error) {
      return false;
    }
  };

  const columns: ProColumns<OutendsItem>[] = (baseColumns as ProColumns<OutendsItem>[]).concat([
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 210,
      fixed: 'right',
      render: (_, { uuid }) => [
        <a key="detail" onClick={() => setConfig({ open: true, uuid })}>
          详情
        </a>,
        <a key="edit" onClick={() => history.push(`/outends/edit/${uuid}`)}>
          编辑
        </a>,
        <Popconfirm
          title="确定要删除该目标？"
          onConfirm={() => handleOnDelete({ uuid })}
          key="remove"
        >
          <a>删除</a>
        </Popconfirm>,
        <Dropdown
          key="advance-action"
          menu={{
            items: [
              { key: 'restart', label: '重启资源', icon: <PoweroffOutlined />, danger: true },
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
              onClick={() => history.push('/outends/new')}
              icon={<PlusOutlined />}
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
        title="确定执行设备重启操作吗？"
        okText="确定重启"
        afterOkText="重启"
        content="重启过程会短暂（5-10秒）断开资源连接，需谨慎操作"
        handleOnEnd={() => {
          actionRef.current?.reload();
          message.success('重启成功');
          setOpen(false);
        }}
        handleOnOk={async () => {
          await putOutendsRestart({ uuid: restartId });
        }}
      />
    </>
  );
};

export default Outends;
