import PageContainer from '@/components/PageContainer';
import { message, modal } from '@/components/PopupHack';
import ProConfirmModal from '@/components/ProConfirmModal';
import {
  deleteDevicesDel,
  getDevicesDeviceErrMsg,
  getDevicesGroup,
  getDevicesListByGroup,
  putDevicesRestart,
} from '@/services/rulex/shebeiguanli';
import { DEFAULT_GROUP_KEY_DEVICE, GROUP_TYPE_DEVICE } from '@/utils/constant';
import { getName } from '@/utils/utils';
import {
  ControlOutlined,
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
import { history, useIntl, useModel, useRequest } from '@umijs/max';
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

export type DeviceItem = {
  name: string;
  type: DeviceType;
  state: number;
  description: string;
  config: Record<string, any>;
  [key: string]: any;
};

const Devices = () => {
  const actionRef = useRef<ActionType>();

  const { detailConfig, setDeviceConfig, activeGroupKey, setActiveGroupKey } =
    useModel('useDevice');
  const { product } = useModel('useSystem');
  const { formatMessage } = useIntl();

  const [groupConfig, setGroupConfig] = useState<GroupConfig>(DEFAULT_CONFIG);
  const [open, setOpen] = useState<boolean>(false);
  const [openVideo, setOpenVideo] = useState<boolean>(false);

  const [total, setTotal] = useState<number>(0);

  const [activeDevice, setActiveDevice] = useState<string>('');
  const [videoConfig, setVideoConfig] = useState<{
    deviceName: string | undefined;
    outputMode: OutputMode;
  }>({ deviceName: '', outputMode: OutputMode.LOCAL_JPEG_STREAM_SERVER });

  // 设备分组列表
  const { data: groupList, run: getGroupList } = useRequest(() => getDevicesGroup());

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
        message.success(formatMessage({ id: 'message.success.remove' }));
      },
    },
  );

  // 查看异常弹窗
  const { run: getErrorMsg } = useRequest(
    (params: API.getDevicesDeviceErrMsgParams) => getDevicesDeviceErrMsg(params),
    {
      manual: true,
      onSuccess: (res) =>
        modal.error({
          title: formatMessage({ id: 'device.title.modal.error.device' }),
          content: <div className="flex flex-wrap">{res}</div>,
          okText: formatMessage({ id: 'button.close' }),
        }),
    },
  );

  const getMenuItems = ({ type = DeviceType.GENERIC_PROTOCOL, state = 0 }) => {
    const baseItems = [
      {
        key: 'restart',
        label: formatMessage({ id: 'button.restartDevice' }),
        icon: <PoweroffOutlined />,
        danger: true,
      },
    ] as ItemType[];
    const showErr = state === 0;
    const errItem = {
      key: 'error',
      label: formatMessage({ id: 'button.error' }),
      icon: <ExceptionOutlined />,
    };
    const ruleItem = {
      key: 'rule',
      label: formatMessage({ id: 'button.ruleConfig' }),
      icon: <SettingOutlined />,
    };

    let newItems = [...baseItems];

    switch (type) {
      case DeviceType.GENERIC_CAMERA:
        newItems = [
          ...newItems,
          {
            key: 'video',
            label: formatMessage({ id: 'device.button.camera' }),
            icon: <PlayCircleOutlined />,
          },
        ];
        break;
      case DeviceType.SMART_HOME_CONTROLLER:
        newItems = [
          ...newItems,
          ruleItem,
          {
            key: 'sub-device',
            label: formatMessage({ id: 'button.subDevice' }),
            icon: <HddOutlined />,
          },
        ];
        break;
      case DeviceType.GENERIC_SNMP:
        newItems = [
          ...newItems,
          ruleItem,
          {
            key: 'snmp-sheet',
            label: formatMessage({ id: 'device.button.snmp' }),
            icon: <ControlOutlined />,
          },
        ];
        break;
      case DeviceType.GENERIC_MODBUS:
        newItems = [
          ...newItems,
          ruleItem,
          {
            key: 'modbus-sheet',
            label: formatMessage({ id: 'device.button.sheet' }),
            icon: <ControlOutlined />,
          },
        ];
        break;
      case DeviceType.SIEMENS_PLC:
        newItems = [
          ...newItems,
          ruleItem,
          {
            key: 'plc-sheet',
            label: formatMessage({ id: 'device.button.sheet' }),
            icon: <ControlOutlined />,
          },
        ];
        break;
      default:
        newItems = [...newItems, ruleItem];
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
      case 'video':
        if (config?.outputMode === OutputMode.REMOTE_STREAM_SERVER) {
          modal.info({
            title: formatMessage({ id: 'device.modal.title.camera' }),
            content: (
              <div className="break-all">
                {formatMessage(
                  { id: 'device.modal.content.camera' },
                  { inputAddr: config?.inputAddr, outputAddr: config?.outputAddr },
                )}
              </div>
            ),
            width: 500,
          });
        } else {
          setOpenVideo(true);
          setVideoConfig({ deviceName: name, outputMode: config?.outputMode });
        }

        break;
      case 'error':
        getErrorMsg({ uuid });
        break;
      case 'sub-device':
        history.push(`/device/${gid}/${uuid}/sub-device`);
        break;
      default:
        break;
    }
  };

  const actionColumns: ProColumns<Partial<DeviceItem>>[] = [
    {
      title: formatMessage({ id: 'table.option' }),
      width: 230,
      fixed: 'right',
      key: 'option',
      valueType: 'option',
      render: (_, record) => {
        const { uuid, gid, type, state } = record;

        return (
          <Space>
            <a key="detail" onClick={() => setDeviceConfig({ open: true, uuid })}>
              {formatMessage({ id: 'button.detail' })}
            </a>
            <a key="edit" onClick={() => history.push(`/device/${gid}/edit/${uuid}`)}>
              {formatMessage({ id: 'button.edit' })}
            </a>
            <Popconfirm
              title={formatMessage({ id: 'device.modal.title.remove' })}
              onConfirm={() => remove({ uuid })}
              okText={formatMessage({ id: 'button.yes' })}
              cancelText={formatMessage({ id: 'button.no' })}
              key="remove"
            >
              <a>{formatMessage({ id: 'button.remove' })}</a>
            </Popconfirm>
            <Dropdown
              menu={{
                items: getMenuItems({ type, state }),
                onClick: (info: MenuInfo) => handleOnMenu(info, record),
              }}
            >
              <a>
                {formatMessage({ id: 'button.advancedOption' })} <DownOutlined />
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
            title={formatMessage({ id: 'device.title.group' })}
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
                {formatMessage({ id: 'button.new' })}
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
                ? `${getName(groupList || [], activeGroupKey)} - ${formatMessage({
                    id: 'device.title.list',
                  })}`
                : formatMessage({ id: 'device.title.list' })
            }
          >
            <ProTable
              actionRef={actionRef}
              rowKey="uuid"
              columns={[...baseColumns(product), ...actionColumns] as any}
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
                  data: data?.records,
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
                  {formatMessage({ id: 'button.new' })}
                </Button>,
              ]}
            />
          </ProCard>
        </ProCard>
      </PageContainer>
      <Detail {...detailConfig} onClose={() => setDeviceConfig({ uuid: '', open: false })} />
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
        title={formatMessage({ id: 'modal.title.confirm' })}
        okText={formatMessage({ id: 'button.restart.comfirm' })}
        afterOkText={formatMessage({ id: 'button.restart' })}
        content={formatMessage({ id: 'device.modal.content.restart' })}
        handleOnEnd={() => {
          actionRef.current?.reload();
          message.success(formatMessage({ id: 'message.success.restart' }));
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
