import { message, modal } from '@/components/PopupHack';
import ProConfirmModal from '@/components/ProConfirmModal';
import PageContainer from '@/components/ProPageContainer';
import {
  deleteDevicesDel,
  getDevicesDeviceErrMsg,
  getDevicesListByGroup,
  putDevicesRestart,
} from '@/services/rhilex/shebeiguanli';
import { defaultPagination, DEFAULT_GROUP_KEY_DEVICE, MAX_TOTAL } from '@/utils/constant';
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

const Devices = () => {
  const actionRef = useRef<ActionType>();
  const { formatMessage } = useIntl();
  const { isFreeTrial, detailConfig, total, changeConfig, initialConfig, changeTotal } =
    useModel('useCommon');

  const [open, setOpen] = useState<boolean>(false);
  const [activeDevice, setActiveDevice] = useState<string>('');
  const [activeGroupKey, setActiveGroupKey] = useState<string>(DEFAULT_GROUP_KEY_DEVICE);
  const [groupConfig, setGroupConfig] = useState<GroupConfig>(DEFAULT_CONFIG);
  const [title, setTitle] = useState<string>('');

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
          content: <div className="break-words">{res}</div>,
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

  const getMenuItems = ({ type = DeviceType.GENERIC_UART_RW, state = 0 }) => {
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
      case DeviceType.GENERIC_SNMP:
      case DeviceType.GENERIC_MODBUS_MASTER:
      case DeviceType.GENERIC_MODBUS_SLAVER:
      case DeviceType.GENERIC_MBUS_EN13433_MASTER:
      case DeviceType.SIEMENS_PLC:
      case DeviceType.GENERIC_BACNET_IP:
      case DeviceType.BACNET_ROUTER_GW:
      case DeviceType.DLT6452007_MASTER:
      case DeviceType.CJT1882004_MASTER:
      case DeviceType.SZY2062016_MASTER:
      case DeviceType.GENERIC_USER_PROTOCOL:
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

  const handleOnMenu = ({ key }: MenuInfo, { uuid, gid, type, config }: Partial<DeviceItem>) => {
    switch (key) {
      case 'restart':
        setOpen(true);
        setActiveDevice(uuid);
        break;
      case 'rule':
        localStorage.setItem(
          'testDataConfig',
          JSON.stringify({
            enableBatchRequest: config?.commonConfig?.batchRequest,
            ruleType: type,
          }),
        );

        history.push(`/device/${gid}/${uuid}/rule`);
        break;
      case 'data-sheet':
        if (!type) return;

        if (type === DeviceType.GENERIC_MODBUS_SLAVER) {
          history.push(`/device/${gid}/${uuid}/registers`);
        } else {
          localStorage.setItem('deviceType', type);
          history.push(`/device/${gid}/${uuid}/data-sheet`);
        }

        break;
      case 'error':
        getErrorMsg({ uuid });
        break;
      default:
        break;
    }
  };

  const actionColumns: ProColumns<Partial<DeviceItem>>[] = [
    {
      title: formatMessage({ id: 'table.title.option' }),
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
                disabled={isFreeTrial}
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
              columns={[...baseColumns(), ...actionColumns] as any}
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
              onDataSourceChange={(d) => changeTotal(d.length)}
              pagination={defaultPagination}
              toolBarRender={() => [
                <Button
                  key="new"
                  type="primary"
                  icon={<PlusOutlined />}
                  disabled={isFreeTrial && total >= MAX_TOTAL}
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
      <ProConfirmModal
        open={open}
        onCancel={() => setOpen(false)}
        handleOnOk={async () => {
          await putDevicesRestart({ uuid: activeDevice });
        }}
      />
    </>
  );
};

export default Devices;
