import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Button, Progress, Space } from 'antd';
import { useRef } from 'react';

const FourGConfig = () => {
  const formRef = useRef<ProFormInstance>();

  const handleOnFinish = async (values) => {
    console.log(values);
    try {
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <>
      <div className="text-[20px] mb-[12px] font-medium">4G配置</div>
      <ProForm
        formRef={formRef}
        onFinish={handleOnFinish}
        layout="horizontal"
        labelCol={{ span: 2 }}
        initialValues={{ zone: 'Asia/Shanghai' }}
        submitter={{
          render: () => (
            <Space className="flex justify-end">
              <Button type="primary">重启4G网卡</Button>
            </Space>
          ),
        }}
      >
        <ProFormText name="" label="运营商" placeholder="请输入运营商" disabled />
        <ProFormText name="" label="ICCID" placeholder="请输入ICCID" disabled />
        <ProForm.Item name="" label="信号强度">
          <Progress steps={10} percent={30} size={20} />
        </ProForm.Item>
      </ProForm>
    </>
  );
};

export default FourGConfig;
