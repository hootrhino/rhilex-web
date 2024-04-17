import PageContainer from '@/components/PageContainer';
import { getDevicesDetail } from '@/services/rulex/shebeiguanli';
import { getShellyGen1List } from '@/services/rulex/shellyshebei';
import { ProCard } from '@ant-design/pro-components';
import { useParams, useRequest } from '@umijs/max';
import { Badge } from 'antd';
import { Pro1 } from './images';

const ShellyDevice = () => {
  const { deviceId } = useParams();

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
  // TODO item.name 超长显示省略号
  return (
    <>
      <PageContainer
        backUrl={`/device/list`}
        title={`设备 ${deviceDetail?.name || ''} - 子设备列表`}
      >
        {subDeviceList?.map((item) => (
          <ProCard
            boxShadow
            key={item.id}
            title={item.ip}
            extra={item.name}
            layout="center"
            direction="column"
            style={{ maxWidth: 300, height: 200 }}
            actions={
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  flexWrap: 'wrap',
                  // padding: 12,
                  flex: 1,
                  gap: 8,
                }}
              >
                <Badge status="success" text="input1" />
                <Badge status="processing" text="input2" />
                <Badge status="error" text="input3" />
                <Badge status="warning" text="input4" />
                <Badge status="warning" text="input4" />
                <Badge status="warning" text="output1" />
                <Badge status="warning" text="output2" />
                <Badge status="warning" text="output3" />
                <Badge status="warning" text="output4" />
              </div>
            }
          >
            {item.app === 'Pro1' && <img src={Pro1} className="h-[100px]" />}
          </ProCard>
        ))}
      </PageContainer>
    </>
  );
};

export default ShellyDevice;
