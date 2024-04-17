import PageContainer from '@/components/PageContainer';
import { getDevicesDetail } from '@/services/rulex/shebeiguanli';
import { getShellyGen1List } from '@/services/rulex/shellyshebei';
import {
  CheckCircleOutlined,
  ControlOutlined,
  EllipsisOutlined,
  FileSearchOutlined,
  MinusCircleOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import type { CheckGroupValueType } from '@ant-design/pro-card/es/components/CheckCard/Group';
import { CheckCard } from '@ant-design/pro-components';
import { useParams, useRequest } from '@umijs/max';
import { Divider, Dropdown, Space, Switch, Tag } from 'antd';
import { useState } from 'react';
import { avatar, DefaultImg } from './images';

const ShellyDevice = () => {
  const { deviceId } = useParams();
  const [checkedItem, setCheckedItem] = useState<CheckGroupValueType>([]);

  // 获取设备详情
  const { data: deviceDetail } = useRequest(() => getDevicesDetail({ uuid: deviceId || '' }), {
    ready: !!deviceId,
    refreshDeps: [deviceId],
  });

  // 获取 Shelly 子设备列表
  const { data: subDeviceList } = useRequest(() => getShellyGen1List({ uuid: deviceId || '' }), {
    pollingInterval: 5000,
    ready: !!deviceId,
    refreshDeps: [deviceId],
  });

  return (
    <>
      <PageContainer
        backUrl={`/device/list`}
        title={`设备 ${deviceDetail?.name || ''} - 子设备列表`}
      >
        <CheckCard.Group multiple onChange={(value) => setCheckedItem(value)} value={checkedItem}>
          {subDeviceList?.map((item) => (
            <CheckCard
              key={item.id}
              avatar={item.app ? avatar[item.app] : DefaultImg}
              value={item.id}
              title={<div className="truncate w-[180px]">{item.name}</div>}
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
                            <Tag
                              color={i.status ? 'success' : 'default'}
                              icon={i.status ? <CheckCircleOutlined /> : <MinusCircleOutlined />}
                              bordered={false}
                            >{`${i.id + 1}`}</Tag>
                            {!lastChild && <Divider type="vertical" />}
                          </div>
                        );
                      })}
                    </Space>
                  </div>
                  <div className="mt-[10px] flex">
                    <div className="pr-[10px] w-[60px]">Output</div>
                    <Space>
                      {item?.switch?.map((item) => (
                        <Switch
                          key={item.id}
                          checkedChildren={(item?.id || 0) + 1}
                          unCheckedChildren={(item?.id || 0) + 1}
                          checked={item?.output}
                          size="small"
                          onClick={(checked, e) => e.stopPropagation()}
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
                    onClick: ({ domEvent }) => {
                      domEvent.stopPropagation();
                    },
                    items: [
                      {
                        label: '刷新状态',
                        key: 'refresh-status',
                        icon: <ReloadOutlined />,
                      },
                      {
                        label: '查看详情',
                        key: 'detail',
                        icon: <FileSearchOutlined />,
                      },
                      {
                        label: '设备控制台',
                        key: 'device-control',
                        icon: <ControlOutlined />,
                      },
                    ],
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
      </PageContainer>
    </>
  );
};

export default ShellyDevice;
