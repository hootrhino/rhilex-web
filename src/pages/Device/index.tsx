import { message, modal } from '@/components/PopupHack';
import ProConfirmModal from '@/components/ProConfirmModal';
import PageContainer from '@/components/ProPageContainer';
import {
  deleteDevicesDel,
  getDevicesDeviceErrMsg,
  getDevicesListByGroup,
  putDevicesRestart,
} from '@/services/rhilex/shebeiguanli';
import { defaultPagination, DEFAULT_GROUP_KEY_DEVICE } from '@/utils/constant';
import {
  ControlOutlined,
  DownOutlined,
  ExceptionOutlined,
  PlusOutlined,
  PoweroffOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProCard, ProTable } from '@ant-design/pro-components';
import { history, useIntl, useModel, useRequest } from '@umijs/max';
import { Button, Dropdown, Popconfirm, Space } from 'antd';
import type { ItemType } from 'antd/es/menu/interface';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { useRef, useState } from 'react';
import { baseColumns } from './Columns';
import Detail from './Detail';
import { DeviceType } from './enum';
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

const sheetType = {
  [DeviceType.GENERIC_SNMP]: 'snmp-sheet',
  [DeviceType.SIEMENS_PLC]: 'plc-sheet',
  [DeviceType.GENERIC_MODBUS_MASTER]: 'modbus-master-sheet',
  [DeviceType.GENERIC_MODBUS_SLAVER]: 'modbus-slaver-registers',
  [DeviceType.GENERIC_BACNET_IP]: 'bacnet-sheet',
  [DeviceType.BACNET_ROUTER_GW]: 'bacnet-router-sheet',
};

const Devices = () => {
  const actionRef = useRef<ActionType>();

  const { detailConfig, changeConfig, initialConfig } = useModel('useCommon');
  const { product } = useModel('useSystem');
  const { formatMessage } = useIntl();

  const [open, setOpen] = useState<boolean>(false);
  const [activeDevice, setActiveDevice] = useState<string>('');
  const [activeGroupKey, setActiveGroupKey] = useState<string>(DEFAULT_GROUP_KEY_DEVICE);
  const [groupConfig, setGroupConfig] = useState<GroupConfig>(DEFAULT_CONFIG);
  const [title, setTitle] = useState<string>('');
  // const [openVideo, setOpenVideo] = useState<boolean>(false);
  // const [videoConfig, setVideoConfig] = useState<{
  //   deviceName: string | undefined;
  //   outputMode: OutputMode;
  // }>({ deviceName: '', outputMode: OutputMode.LOCAL_JPEG_STREAM_SERVER });

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

  const getSheetLabel = (type: DeviceType) => {
    if (type === DeviceType.GENERIC_SNMP) {
      return formatMessage({ id: 'device.button.snmp' });
    }

    if (type === DeviceType.GENERIC_MODBUS_SLAVER) {
      return formatMessage({ id: 'device.button.registers' });
    }

    return formatMessage({ id: 'device.button.sheet' });
  };

  const getMenuItems = ({ type = DeviceType.GENERIC_UART_PROTOCOL, state = 0 }) => {
    const baseItems = [
      {
        key: 'restart',
        label: formatMessage({ id: 'button.reload' }),
        icon: <PoweroffOutlined />,
        danger: true,
      },
      {
        key: 'rule',
        label: formatMessage({ id: 'button.ruleConfig' }),
        icon: <SettingOutlined />,
      },
    ] as ItemType[];
    const showErr = state === 0;
    const errItem = {
      key: 'error',
      label: formatMessage({ id: 'button.error' }),
      icon: <ExceptionOutlined />,
    };

    let newItems = [...baseItems];

    switch (type) {
      // TODO 暂无需求，先隐藏
      // case DeviceType.GENERIC_CAMERA:
      //   newItems = [
      //     ...newItems,
      //     {
      //       key: 'video',
      //       label: formatMessage({ id: 'device.button.camera' }),
      //       icon: <PlayCircleOutlined />,
      //     },
      //   ];
      //   break;
      case DeviceType.GENERIC_SNMP:
      case DeviceType.GENERIC_MODBUS_MASTER:
      case DeviceType.GENERIC_MODBUS_SLAVER:
      case DeviceType.SIEMENS_PLC:
      case DeviceType.GENERIC_BACNET_IP:
      case DeviceType.BACNET_ROUTER_GW:
        newItems = [
          ...newItems,
          {
            key: 'data-sheet',
            label: getSheetLabel(type),
            icon: <ControlOutlined />,
          },
        ];
        break;
      default:
        newItems = [...newItems];
        break;
    }

    return [...newItems, showErr ? errItem : null];
  };

  const handleOnMenu = ({ key }: MenuInfo, { uuid, gid, type }: Partial<DeviceItem>) => {
    switch (key) {
      case 'restart':
        setOpen(true);
        setActiveDevice(uuid);
        break;
      case 'rule':
        history.push(`/device/${gid}/${uuid}/rule`);
        break;
      case 'data-sheet':
        if (!type) return;
        history.push(`/device/${gid}/${uuid}/${sheetType[type]}`);
        break;
      // TODO 暂无需求，先隐藏
      // case 'video':
      //   if (config?.outputMode === OutputMode.REMOTE_STREAM_SERVER) {
      //     modal.info({
      //       title: formatMessage({ id: 'device.modal.title.camera' }),
      //       content: (
      //         <div className="break-all">
      //           {formatMessage(
      //             { id: 'device.modal.content.camera' },
      //             { inputAddr: config?.inputAddr, outputAddr: config?.outputAddr },
      //           )}
      //         </div>
      //       ),
      //       width: 500,
      //     });
      //   } else {
      //     setOpenVideo(true);
      //     setVideoConfig({ deviceName: name, outputMode: config?.outputMode });
      //   }

      //   break;
      case 'error':
        getErrorMsg({ uuid });
        break;
      default:
        break;
    }
  };

  const actionColumns: ProColumns<Partial<DeviceItem>>[] = [
    {
      title: formatMessage({ id: 'table.option' }),
      width: 230,
      key: 'option',
      valueType: 'option',
      render: (_, record) => {
        const { uuid, gid, type, state } = record;

        return (
          <Space>
            <a key="detail" onClick={() => changeConfig({ open: true, uuid })}>
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
              activeKey={activeGroupKey}
              config={groupConfig}
              changeActiveKey={setActiveGroupKey}
              changeConfig={setGroupConfig}
              changeTitle={setTitle}
            />
          </ProCard>
          <ProCard
            title={
              title
                ? `${title} - ${formatMessage({
                    id: 'device.title.list',
                  })}`
                : formatMessage({ id: 'device.title.list' })
            }
          >
            <ProTable
              actionRef={actionRef}
              rowKey="uuid"
              rootClassName="stripe-table"
              columns={[...baseColumns(product), ...actionColumns] as any}
              search={false}
              params={{ uuid: activeGroupKey }}
              request={async ({ current, pageSize, ...keyword }) => {
                const { data } = await getDevicesListByGroup({
                  current,
                  size: pageSize,
                  ...keyword,
                });

                return Promise.resolve({
                  data: data?.records,
                  total: data?.total || 0,
                  success: true,
                });
              }}
              pagination={defaultPagination}
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
      <Detail {...detailConfig} onClose={initialConfig} />
      {/* <CameraDetail
        open={openVideo}
        onCancel={() => {
          setOpenVideo(false);
        }}
        {...videoConfig}
      /> */}
      <ProConfirmModal
        open={open}
        onCancel={() => setOpen(false)}
        title={formatMessage({ id: 'modal.title.confirm' })}
        okText={formatMessage({ id: 'button.comfirm' })}
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
