import { getSoftRouterDhcpClients } from '@/services/rulex/luyoushezhi';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProCard, ProForm } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { useRef } from 'react';
import Title from './TItle';

const RoutingConfig = () => {
  const formRef = useRef<ProFormInstance>();
  // TODO 获取 DHCP 无返回
  const { data } = useRequest(() => getSoftRouterDhcpClients());
  console.log(data);

  // TODO
  const handleOnFinish = async () => {};

  return (
    <>
      <Title name="路由设置" />
      <ProForm
        formRef={formRef}
        onFinish={handleOnFinish}
        layout="horizontal"
        labelCol={{ span: 2 }}
        submitter={{
          render: (props, dom) => dom,
        }}
      >
        <ProCard title="IP 地址设置" className="mb-[12px]">
          11
        </ProCard>
        <ProCard title="DHCP 设置" className="mb-[12px]">
          11
        </ProCard>
        <ProCard title="客户端管理">11</ProCard>
      </ProForm>
    </>
  );
};

export default RoutingConfig;
