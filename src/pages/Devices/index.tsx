import GroupList, { DEFAULT_CONFIG } from '@/components/GroupList';
import { message } from '@/components/PopupHack';
import ProConfirmModal from '@/components/ProConfirmModal';
import {
  deleteDevicesDel,
  getDevicesListByGroup,
  getDevicesProperties,
  putDevicesRestart,
} from '@/services/rulex/shebeiguanli';
import { DEFAULT_GROUP_KEY_DEVICE, GROUP_TYPE_DEVICE } from '@/utils/constant';
import { getName } from '@/utils/utils';
import {
  ApartmentOutlined,
  ControlOutlined,
  DownOutlined,
  PlusOutlined,
  PoweroffOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProCard, ProTable } from '@ant-design/pro-components';
import { history, useModel, useRequest } from '@umijs/max';
import { Button, Drawer, Dropdown, Popconfirm, Space } from 'antd';
import type { ItemType } from 'antd/es/menu/hooks/useItems';
import { useRef, useState } from 'react';
import { getBaseColumns } from '../SchemaMgt/Property';
import { baseColumns } from './columns';
import Detail from './Detail';

export type DeviceItem = {
  name: string;
  type: string;
  state: number;
  schemaId: string;
  description: string;
  config: Record<string, any>;
  [key: string]: any;
};

const Devices = () => {
  const {
    groupList,
    getGroupList,
    detailConfig,
    setDeviceConfig,
    activeGroupKey,
    setActiveGroupKey,
  } = useModel('useDevice');

  const [groupConfig, setGroupConfig] = useState<GroupConfig>(DEFAULT_CONFIG);
  const [open, setOpen] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [total, setTotal] = useState<number>(0);
  const [openSchema, setOpenSchema] = useState<boolean>(false);
  const [activeDevice, setActiveDevice] = useState<string>('');
  const [activeDeviceName, setActiveDeviceName] = useState<string>('');

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
        actionRef.current?.reload();
        message.success('删除成功');
      },
    },
  );

  const getMenuItems = (type: string) => {
    const showSheet = ['GENERIC_MODBUS', 'SIEMENS_PLC'].includes(type);
    let items = [
      { key: 'restart', label: '重启设备', icon: <PoweroffOutlined />, danger: true },
      { key: 'rule', label: '规则配置', icon: <SettingOutlined /> },
      { key: 'schema', label: '数据模型', icon: <ApartmentOutlined /> },
    ] as ItemType[];

    if (showSheet) {
      items = [...items, { key: 'specific-sheet', label: '点位表配置', icon: <ControlOutlined /> }];
    }

    return items;
  };

  const actionColumns: ProColumns<Partial<DeviceItem>>[] = [
    {
      title: '操作',
      width: 210,
      fixed: 'right',
      key: 'option',
      valueType: 'option',
      render: (_, { uuid, gid, type, name }) => {
        return (
          <Space>
            <a key="detail" onClick={() => setDeviceConfig({ open: true, uuid })}>
              详情
            </a>
            <a key="edit" onClick={() => history.push(`/device/${gid}/edit/${uuid}`)}>
              编辑
            </a>
            <Popconfirm
              title="确定要删除该设备?"
              onConfirm={() => remove({ uuid })}
              okText="是"
              cancelText="否"
              key="remove"
            >
              <a>删除</a>
            </Popconfirm>
            <Dropdown
              menu={{
                items: getMenuItems(type || ''),
                onClick: ({ key }) => {
                  switch (key) {
                    case 'restart':
                      setOpen(true);
                      setActiveDevice(uuid);
                      break;
                    case 'rule':
                      history.push(`/device/${gid}/${uuid}/rule`);
                      break;
                    case 'specific-sheet':
                      history.push(`/device/${gid}/${uuid}/specific-sheet/${type}`);
                      break;
                    case 'schema':
                      setOpenSchema(true);
                      setActiveDevice(uuid);
                      setActiveDeviceName(name || '');
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
            </Dropdown>
          </Space>
        );
      },
    },
  ];

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
              itemCount={total}
              config={groupConfig}
              groupRoot={DEFAULT_GROUP_KEY_DEVICE}
              groupType={GROUP_TYPE_DEVICE}
              onReset={handleOnReset}
              onRefresh={handleOnRefresh}
              updateActiveGroup={setActiveGroupKey}
              updateConfig={setGroupConfig}
            />
          </ProCard>
          <ProCard
            title={
              getName(groupList || [], activeGroupKey)
                ? `${getName(groupList || [], activeGroupKey)} - 设备列表`
                : '设备列表'
            }
          >
            <ProTable
              actionRef={actionRef}
              rowKey="uuid"
              columns={[...baseColumns, ...actionColumns] as ProColumns<Partial<DeviceItem>>[]}
              search={false}
              params={{ uuid: activeGroupKey }}
              request={async ({ current, pageSize, ...keyword }) => {
                const { data } = await getDevicesListByGroup({
                  current,
                  size: pageSize,
                  ...keyword,
                });
                setTotal(data?.total || 0);
                return Promise.resolve({
                  data: data?.records || [],
                  total: data?.total || 0,
                  success: true,
                });
              }}
              pagination={{
                defaultPageSize: 10,
                hideOnSinglePage: true,
              }}
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
      <Detail {...detailConfig} onClose={() => setDeviceConfig({ uuid: '', open: false })} />
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
          await putDevicesRestart({ uuid: activeDevice });
        }}
      />
      <Drawer
        open={openSchema}
        title={activeDeviceName ? `设备 ${activeDeviceName} - 数据模型` : '数据模型'}
        placement="right"
        width="50%"
        destroyOnClose
        maskClosable={false}
        onClose={() => setOpenSchema(false)}
      >
        <ProTable
          rowKey="uuid"
          search={false}
          options={false}
          columns={getBaseColumns(true)}
          params={{ uuid: activeDevice }}
          request={async ({ current, pageSize, ...keyword }) => {
            const { data } = await getDevicesProperties({
              current,
              size: pageSize,
              ...keyword,
            });

            return Promise.resolve({
              data: data?.records || [],
              total: data?.total || 0,
              success: true,
            });
          }}
          pagination={{
            defaultPageSize: 10,
            hideOnSinglePage: true,
          }}
        />
      </Drawer>
    </>
  );
};

export default Devices;
