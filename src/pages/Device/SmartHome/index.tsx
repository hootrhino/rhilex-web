import PageContainer from '@/components/PageContainer';
import { message, modal } from '@/components/PopupHack';
import { getDevicesDetail } from '@/services/rulex/shebeiguanli';
import {
  getShellyGen1List,
  getShellyGen1Pro1Switch1Toggle,
  postShellyGen1Pro1ConfigWebHook,
  postShellyGen1Scan,
} from '@/services/rulex/shellyshebei';
import {
  CheckCircleOutlined,
  ClearOutlined,
  ControlOutlined,
  EllipsisOutlined,
  FileSearchOutlined,
  MinusCircleOutlined,
  ReloadOutlined,
  ScanOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { CheckGroupValueType } from '@ant-design/pro-card/es/components/CheckCard/Group';
import { CheckCard, ProCard } from '@ant-design/pro-components';
import { history, useIntl, useParams, useRequest } from '@umijs/max';
import { Button, Divider, Dropdown, Space, Switch, Tag } from 'antd';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { useState } from 'react';
import Detail from './Detail';
import ProTag from '@/components/ProTag';

export enum AppType {
  PRO1 = 'Pro1',
  PLUS2PM = 'Plus2PM',
  PRO4PM = 'Pro4PM',
}

enum OpType {
  SET_WEBHOOK = 'set_webhook',
  CLEAR_WEBHOOK = 'clear_webhook',
}

type ShellyItem = {
  ip?: string;
  name?: string;
  id?: string;
  mac?: string;
  slot?: number;
  model?: string;
  gen?: number;
  fw_id?: string;
  ver?: string;
  app?: string;
  auth_en?: boolean;
  auth_domain?: null;
  [key: string]: any;
};

const ShellySubDevice = () => {
  const { deviceId } = useParams();
  const { formatMessage } = useIntl();
  const [checkedItem, setCheckedItem] = useState<CheckGroupValueType>([]);

  // 获取设备详情
  const { data: deviceDetail } = useRequest(() => getDevicesDetail({ uuid: deviceId || '' }), {
    ready: !!deviceId,
    refreshDeps: [deviceId],
  });

  // 获取 Shelly 子设备列表
  const { data: subDeviceList, run: getSubDeviceList } = useRequest(
    () => getShellyGen1List({ uuid: deviceId || '' }),
    {
      pollingInterval: 5000,
      ready: !!deviceId,
      refreshDeps: [deviceId],
    },
  );

  // 扫描设备
  const { run: scan, loading: scanLoading } = useRequest(
    (params: API.postShellyGen1ScanParams) => postShellyGen1Scan(params),
    {
      manual: true,
      onSuccess: () => {
        getSubDeviceList();
        message.success(formatMessage({ id: 'message.success.scan' }));
      },
    },
  );

  // Pro1 开关控制
  const { run: pro1Toggle } = useRequest(
    (params: API.getShellyGen1Pro1Switch1ToggleParams) => getShellyGen1Pro1Switch1Toggle(params),
    {
      manual: true,
      onSuccess: () => {
        getSubDeviceList();
      },
    },
  );

  // 快速接入&清除所有配置
  const { run: pro1Config } = useRequest(
    (params: API.postShellyGen1Pro1ConfigWebHookParams) => postShellyGen1Pro1ConfigWebHook(params),
    {
      manual: true,
    },
  );

  const handleOnMenu = ({ domEvent, key }: MenuInfo, item: ShellyItem) => {
    const port = deviceDetail?.config?.commonConfig?.webHookPort;
    const ip = window.location.hostname;

    switch (key) {
      case 'detail':
        if (item.mac && deviceId) {
          modal.info({
            title: formatMessage({ id: 'device.title.detail.smartHome' }, { name: item.name }),
            width: '45%',
            content: <Detail mac={item.mac} deviceId={deviceId} ip={item.ip} />,
            okText: formatMessage({ id: 'button.close' }),
            closable: true,
          });
        }
        break;
      case 'device-control':
        window.open(`http://${item?.ip}:80`, '_blank');
        break;
      case 'config-webhook':
        if (item?.app === AppType.PRO1 && item.ip) {
          pro1Config({
            opType: OpType.SET_WEBHOOK,
            deviceIp: item.ip,
            gwIp: ip,
            webHookPort: port,
          }).then(() => message.success(formatMessage({ id: 'device.message.success.config' })));
        }
        break;
      case 'clear-webhook':
        if (item?.app === AppType.PRO1 && item.ip) {
          pro1Config({
            opType: OpType.CLEAR_WEBHOOK,
            deviceIp: item.ip,
            gwIp: ip,
            webHookPort: port,
          }).then(() => message.success(formatMessage({ id: 'device.message.success.clear' })));
        }
        break;
      default:
        break;
    }
    domEvent.stopPropagation();
  };

  const renderMenuItem = [
    {
      label: formatMessage({ id: 'button.checkDetail' }),
      key: 'detail',
      icon: <FileSearchOutlined />,
    },
    {
      label: formatMessage({ id: 'device.button.control' }),
      key: 'device-control',
      icon: <ControlOutlined />,
    },
    {
      label: formatMessage({ id: 'device.button.configWebhook' }),
      key: 'config-webhook',
      icon: <SettingOutlined />,
    },
    {
      label: formatMessage({ id: 'device.button.clearWebhook' }),
      key: 'clear-webhook',
      icon: <ClearOutlined />,
    },
  ];

  return (
    <PageContainer
      onBack={() => history.push('/device/list')}
      title={formatMessage({ id: 'device.title.subDevice' }, { name: deviceDetail?.name || '' })}
      extra={
        <Space>
          <Button
            key="scan"
            type="primary"
            icon={<ScanOutlined />}
            onClick={() => deviceId && scan({ uuid: deviceId })}
            loading={scanLoading}
          >
            {formatMessage({ id: 'device.button.scan' })}
          </Button>
          <Button
            ghost
            key="reload"
            type="primary"
            icon={<ReloadOutlined />}
            onClick={() => {
              getSubDeviceList().then(() =>
                message.success(formatMessage({ id: 'device.button.refresh' })),
              );
            }}
          >
            {formatMessage({ id: 'device.button.refresh' })}
          </Button>
        </Space>
      }
    >
      <ProCard>
        <CheckCard.Group multiple onChange={(value) => setCheckedItem(value)} value={checkedItem}>
          {subDeviceList?.map((item) => (
            <CheckCard
              key={item.id}
              value={item.id}
              title={
                <div className="flex items-center truncate w-[200px]">
                  {item.name}
                  <ProTag className="ml-[10px]" color="blue">
                    {item.app}
                  </ProTag>
                </div>
              }
              description={
                <div>
                  <div className="text-[#000] text-opacity-50 text-[12px]">{item.ip}</div>
                  <div className="mt-[10px] flex">
                    <div className="pr-[10px] w-[60px]">Input</div>
                    <Space>
                      {item?.input?.map((i) => {
                        const lastChild = item?.input?.[item?.input?.length - 1]?.id === i.id;
                        return (
                          <div key={i.id} className="input-tag-wrapper">
                            <ProTag
                              color={i.status ? 'success' : 'default'}
                              icon={i.status ? <CheckCircleOutlined /> : <MinusCircleOutlined />}
                              bordered={false}
                            >{`${i.id + 1}`}</ProTag>
                            {!lastChild && <Divider type="vertical" />}
                          </div>
                        );
                      })}
                    </Space>
                  </div>
                  <div className="mt-[10px] flex">
                    <div className="pr-[10px] w-[60px]">Output</div>
                    <Space>
                      {item?.switch?.map((s) => (
                        <Switch
                          key={s.id}
                          checkedChildren={(s?.id || 0) + 1}
                          unCheckedChildren={(s?.id || 0) + 1}
                          checked={s?.output}
                          size="small"
                          onClick={(checked, e) => {
                            if (item.app === AppType.PRO1 && item.ip) {
                              pro1Toggle({ ip: item.ip });
                            }
                            e.stopPropagation();
                          }}
                        />
                      ))}
                    </Space>
                  </div>
                </div>
              }
              extra={
                <Dropdown
                  placement="bottom"
                  menu={{
                    onClick: (info) => handleOnMenu(info, item),
                    items: renderMenuItem,
                  }}
                >
                  <EllipsisOutlined
                    style={{ fontSize: 22, color: 'rgba(0,0,0,0.5)' }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </Dropdown>
              }
            />
          ))}
        </CheckCard.Group>
      </ProCard>
    </PageContainer>
  );
};

export default ShellySubDevice;
