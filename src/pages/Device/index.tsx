import PageContainer from '@/components/PageContainer';
import { message, modal } from '@/components/PopupHack';
import ProConfirmModal from '@/components/ProConfirmModal';
import {
  deleteDevicesDel,
  getDevicesDetail,
  getDevicesDeviceErrMsg,
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
  ExceptionOutlined,
  HddOutlined,
  PlayCircleOutlined,
  PlusOutlined,
  PoweroffOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProCard, ProTable } from '@ant-design/pro-components';
import { history, useModel, useRequest } from '@umijs/max';
import { Button, Dropdown, Popconfirm, Space } from 'antd';
import type { ItemType } from 'antd/es/menu/hooks/useItems';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { useRef, useState } from 'react';
import CameraDetail from './Camera';
import { baseColumns } from './columns';
import Detail from './Detail';
import { DeviceType, OutputMode } from './enum';
import type { GroupConfig } from './Group';
import GroupList, { DEFAULT_CONFIG } from './Group';
import SchemaDetail from './SchemaDetail';

export type DeviceItem = {
  name: string;
  type: DeviceType;
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
  const [videoConfig, setVideoConfig] = useState<{
    deviceName: string | undefined;
    outputMode: OutputMode;
  }>({ deviceName: '', outputMode: OutputMode.LOCAL_JPEG_STREAM_SERVER });

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
      await putDevicesUpdate({ ...data, schemaId: '' } as any).then(() =>
        message.success('解绑成功'),
      );
      actionRef.current?.reload();
    }
  };

  // 查看异常弹窗
  const { run: getErrorMsg } = useRequest(
    (params: API.getDevicesDeviceErrMsgParams) => getDevicesDeviceErrMsg(params),
    {
      manual: true,
      onSuccess: (res) =>
        modal.error({
          title: '设备异常信息',
          content: <div className="flex flex-wrap">{res}</div>,
          okText: '关闭',
        }),
    },
  );

  const getMenuItems = ({ type = DeviceType.GENERIC_PROTOCOL, schemaId = '', state = 0 }) => {
    const baseItems = [
      { key: 'restart', label: '重启设备', icon: <PoweroffOutlined />, danger: true },
    ] as ItemType[];
    const showErr = state === 0;
    const errItem = { key: 'error', label: '查看异常', icon: <ExceptionOutlined /> };
    const ruleItem = { key: 'rule', label: '规则配置', icon: <SettingOutlined /> };
    const schemaItem = { key: 'schema', label: '数据模型', icon: <ApartmentOutlined /> };
    const unbindItem = { key: 'unbind', label: '解绑数据模型', icon: <DisconnectOutlined /> };

    let newItems = [...baseItems];

    switch (type) {
      case DeviceType.GENERIC_CAMERA:
        newItems = [...newItems, { key: 'video', label: '查看视频', icon: <PlayCircleOutlined /> }];
        break;
      case DeviceType.SHELLY_GEN1_PROXY_SERVER:
        newItems = [
          ...newItems,
          ruleItem,
          { key: 'shelly-device', label: '查看子设备', icon: <HddOutlined /> },
        ];
        break;
      case DeviceType.GENERIC_SNMP:
        newItems = [
          ...newItems,
          ruleItem,
          schemaItem,
          schemaId ? unbindItem : null,
          { key: 'snmp-sheet', label: 'SNMP 对象列表', icon: <ControlOutlined /> },
        ];
        break;
      case DeviceType.GENERIC_MODBUS:
        newItems = [
          ...newItems,
          ruleItem,
          schemaItem,
          schemaId ? unbindItem : null,
          { key: 'modbus-sheet', label: '点位表配置', icon: <ControlOutlined /> },
        ];
        break;
      case DeviceType.SIEMENS_PLC:
        newItems = [
          ...newItems,
          ruleItem,
          schemaItem,
          schemaId ? unbindItem : null,
          { key: 'plc-sheet', label: '点位表配置', icon: <ControlOutlined /> },
        ];
        break;
      default:
        newItems = [...newItems, ruleItem, schemaItem, schemaId ? unbindItem : null];
        break;
    }

    return [...newItems, showErr ? errItem : null];
  };

  const handleOnMenu = ({ key }: MenuInfo, { uuid, gid, name, config }: Partial<DeviceItem>) => {
    switch (key) {
      case 'restart':
        setOpen(true);
        setActiveDevice(uuid);
        break;
      case 'rule':
        history.push(`/device/${gid}/${uuid}/rule`);
        break;
      case 'snmp-sheet':
        history.push(`/device/${gid}/${uuid}/snmp-sheet`);
        break;
      case 'plc-sheet':
        history.push(`/device/${gid}/${uuid}/plc-sheet`);
        break;
      case 'modbus-sheet':
        history.push(`/device/${gid}/${uuid}/modbus-sheet`);
        break;
      case 'schema':
        setOpenSchema(true);
        setActiveDevice(uuid);
        setActiveDeviceName(name || '');
        break;
      case 'video':
        if (config?.outputMode === OutputMode.REMOTE_STREAM_SERVER) {
          modal.info({
            title: '查看视频',
            content: (
              <div className="break-all">
                此模式下流媒体被中转到第三方地址，当前{config?.inputAddr}
                已经成功推送到{config?.outputAddr}，请在对应的平台上查看或者播放。
              </div>
            ),
            width: 500,
          });
        } else {
          setOpenVideo(true);
          setVideoConfig({ deviceName: name, outputMode: config?.outputMode });
        }

        break;
      case 'unbind':
        handleOnUnbind(uuid);
        break;
      case 'error':
        getErrorMsg({ uuid });
        break;
      case 'shelly-device':
        history.push(`/device/${gid}/${uuid}/sub-device`);
        break;
      default:
        break;
    }
  };

  const actionColumns: ProColumns<Partial<DeviceItem>>[] = [
    {
      title: '操作',
      width: 210,
      fixed: 'right',
      key: 'option',
      valueType: 'option',
      render: (_, record) => {
        const { uuid, gid, type, schemaId, state } = record;

        return (
          <Space>
            <a key="detail" onClick={() => setDeviceConfig({ open: true, uuid })}>
              详情
            </a>
            <a key="edit" onClick={() => history.push(`/device/${gid}/edit/${uuid}`)}>
              编辑
            </a>
            <Popconfirm
              title="确定要删除此设备?"
              onConfirm={() => remove({ uuid })}
              okText="是"
              cancelText="否"
              key="remove"
            >
              <a>删除</a>
            </Popconfirm>
            <Dropdown
              menu={{
                items: getMenuItems({ type, schemaId, state }),
                onClick: (info: MenuInfo) => handleOnMenu(info, record),
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
      <CameraDetail
        open={openVideo}
        onCancel={() => {
          setOpenVideo(false);
        }}
        {...videoConfig}
      />
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
