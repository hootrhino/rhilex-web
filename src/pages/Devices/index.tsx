import GroupList, { DEFAULT_CONFIG } from '@/components/GroupList';
import { message } from '@/components/PopupHack';
import ProConfirmModal from '@/components/ProConfirmModal';
import {
  deleteDevicesDel,
  getDevicesDetail,
  getDevicesListByGroup,
  putDevicesRestart,
  putDevicesUpdate,
} from '@/services/rulex/shebeiguanli';
import { DEFAULT_GROUP_KEY_DEVICE, GROUP_TYPE_DEVICE } from '@/utils/constant';
import { getName } from '@/utils/utils';
import {
  ApartmentOutlined,
  ControlOutlined,
  DisconnectOutlined,
  DownOutlined,
  PlayCircleOutlined,
  PlusOutlined,
  PoweroffOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProCard, ProTable } from '@ant-design/pro-components';
import { history, useModel, useRequest } from '@umijs/max';
import { Button, Dropdown, Popconfirm, Space } from 'antd';
import type { ItemType } from 'antd/es/menu/hooks/useItems';
import { useRef, useState } from 'react';
import { baseColumns } from './columns';
import Detail from './Detail';
import SchemaDetail from './SchemaDetail';
import VideoDetail from './VideoDetail';

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
  const actionRef = useRef<ActionType>();

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
  const [openSchema, setOpenSchema] = useState<boolean>(false);
  const [openVideo, setOpenVideo] = useState<boolean>(false);

  const [total, setTotal] = useState<number>(0);

  const [activeDevice, setActiveDevice] = useState<string>('');
  const [activeDeviceName, setActiveDeviceName] = useState<string>('');
  const [liveUrl, setLiveUrl] = useState<string>('');

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

  // 解绑数据模型
  const handleOnUnbind = async (uuid: string) => {
    const { data } = await getDevicesDetail({ uuid });
    if (data) {
      await putDevicesUpdate({ ...data, schemaId: '' } as any).then(() => message.success('解绑成功'));
      actionRef.current?.reload();
    }
  };

  const getMenuItems = (type: string, schemaId?: string) => {
    const showSheet = ['GENERIC_MODBUS', 'SIEMENS_PLC'].includes(type);

    let baseItems = [
      { key: 'restart', label: '重启设备', icon: <PoweroffOutlined />, danger: true },
      { key: 'rule', label: '规则配置', icon: <SettingOutlined /> },
    ] as ItemType[];

    if (type === 'GENERIC_CAMERA') {
      // TODO 暂时隐藏查看监控功能
      // baseItems = [...baseItems, { key: 'video', label: '查看视频', icon: <PlayCircleOutlined /> }];
      baseItems = [...baseItems];
    } else {
      baseItems = [...baseItems, { key: 'schema', label: '数据模型', icon: <ApartmentOutlined /> }];

      if (schemaId) {
        baseItems = [
          ...baseItems,
          { key: 'unbind', label: '解绑数据模型', icon: <DisconnectOutlined /> },
        ];
      }

      if (showSheet) {
        baseItems = [
          ...baseItems,
          { key: 'specific-sheet', label: '点位表配置', icon: <ControlOutlined /> },
        ];
      }
    }

    return baseItems;
  };

  const actionColumns: ProColumns<Partial<DeviceItem>>[] = [
    {
      title: '操作',
      width: 210,
      fixed: 'right',
      key: 'option',
      valueType: 'option',
      render: (_, { uuid, gid, type, name, config, schemaId }) => {
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
                items: getMenuItems(type || '', schemaId),
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
                    case 'video':
                      setOpenVideo(true);
                      setLiveUrl(config?.inputMode === 'RTSP' ? config?.rtspUrl : config?.device);
                      break;
                    case 'unbind':
                      handleOnUnbind(uuid);
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
      <SchemaDetail
        activeDevice={activeDevice}
        activeDeviceName={activeDeviceName}
        open={openSchema}
        onClose={() => {
          setOpenSchema(false);
          setActiveDevice('');
        }}
      />
      <VideoDetail open={openVideo} onCancel={() => setOpenVideo(false)} liveUrl={liveUrl} />
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
          setActiveDevice('');
        }}
        handleOnOk={async () => {
          await putDevicesRestart({ uuid: activeDevice });
        }}
      />
    </>
  );
};

export default Devices;
