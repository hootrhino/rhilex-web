import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProCard, ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import { useEffect, useState } from 'react';

import type { GroupConfig } from '@/components/GroupList';
import GroupList, { DEFAULT_CONFIG } from '@/components/GroupList';
import { message } from '@/components/PopupHack';
import StateTag from '@/components/StateTag';
import { deleteDevicesDel } from '@/services/rulex/shebeiguanli';
import { DEFAULT_GROUP_KEY_DEVICE, GROUP_TYPE_DEVICE } from '@/utils/constant';
import { getGroupName } from '@/utils/utils';
import { history, useModel, useRequest } from '@umijs/max';
import Detail from './Detail';
import { typeEnum } from './SchemaForm/columns';

export type DeviceItem = {
  name: string;
  type: string;
  state: number;
  description: string;
  config: Record<string, any>;
  [key: string]: any;
};

const Devices = () => {
  const {
    run: getDeviceList,
    refresh: refresh,
    data: deviceList,
    groupList,
    getGroupList,
    detailConfig,
    setDeviceConfig,
  } = useModel('useDevice');

  const [groupConfig, setGroupConfig] = useState<GroupConfig>(DEFAULT_CONFIG);
  const [activeGroupKey, setActiveGroupKey] = useState<string>(DEFAULT_GROUP_KEY_DEVICE);

  // 重置分组表单
  const handleOnReset = () => {
    getGroupList().then(() => {
      setActiveGroupKey(DEFAULT_GROUP_KEY_DEVICE);
    });
  };

  // 刷新分组列表
  const handleOnRefresh = () => {
    setGroupConfig(DEFAULT_CONFIG);
    getGroupList();
  };

  // 删除设备
  const { run: remove } = useRequest(
    (params: API.deleteDevicesDelParams) => deleteDevicesDel(params),
    {
      manual: true,
      onSuccess: () => {
        getDeviceList({ uuid: activeGroupKey });
        message.success('删除成功');
      },
    },
  );

  const columns: ProColumns<DeviceItem>[] = [
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
      width: 120,
      renderText: (state) => <StateTag state={state} />,
    },
    {
      title: '备注',
      dataIndex: 'description',
      ellipsis: true,
    },
    {
      title: '操作',
      width: 180,
      fixed: 'right',
      key: 'option',
      valueType: 'option',
      render: (_, { uuid, gid }) => [
        <a key="rule" onClick={() => history.push(`/device/${gid}/${uuid}/rule`)}>
          规则配置
        </a>,
        <a key="detail" onClick={() => setDeviceConfig({ open: true, uuid })}>
          详情
        </a>,
        <a key="edit" onClick={() => history.push(`/device/${gid}/edit/${uuid}`)}>
          编辑
        </a>,
        <Popconfirm
          title="确定要删除该设备?"
          onConfirm={() => remove({ uuid })}
          okText="是"
          cancelText="否"
          key="remove"
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  useEffect(() => {
    if (activeGroupKey) {
      getDeviceList({ uuid: activeGroupKey });
    }
  }, [activeGroupKey]);

  return (
    <>
      <PageContainer>
        <ProCard split="vertical">
          <ProCard
            headerBordered
            title="设备分组"
            colSpan="270px"
            extra={
              <Button
                key="add"
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  setGroupConfig({ ...DEFAULT_CONFIG, open: true });
                }}
              >
                新建
              </Button>
            }
            headStyle={{ paddingInline: 16 }}
            bodyStyle={{ paddingInline: 16 }}
          >
            <GroupList
              dataSource={groupList || []}
              activeGroup={activeGroupKey}
              itemCount={deviceList?.length || 0}
              config={groupConfig}
              groupRoot={DEFAULT_GROUP_KEY_DEVICE}
              groupType={GROUP_TYPE_DEVICE}
              onReset={handleOnReset}
              onRefresh={handleOnRefresh}
              updateActiveGroup={setActiveGroupKey}
              updateConfig={setGroupConfig}
            />
          </ProCard>
          <ProCard title={getGroupName(groupList || [], activeGroupKey)}>
            <ProTable
              rowKey="uuid"
              columns={columns}
              dataSource={deviceList as DeviceItem[]}
              search={false}
              pagination={false}
              options={{ reload: () => refresh() }}
              toolBarRender={() => [
                <Button
                  key="new"
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => history.push(`/device/${activeGroupKey}/new`)}
                >
                  新建
                </Button>,
              ]}
            />
          </ProCard>
        </ProCard>
      </PageContainer>
      <Detail {...detailConfig} onClose={() => setDeviceConfig({ ...detailConfig, open: false })} />
    </>
  );
};

export default Devices;
