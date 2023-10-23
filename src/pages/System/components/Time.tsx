import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ProForm,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormSwitch,
} from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import { useRef } from 'react';

const TimeConfig = () => {
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
      <div className="text-[20px] mb-[12px] font-medium">时间配置</div>
      <ProForm
        formRef={formRef}
        onFinish={handleOnFinish}
        layout="horizontal"
        labelCol={{ span: 2 }}
        initialValues={{ zone: 'Asia/Shanghai' }}
        submitter={{
          render: (props, dom) => (
            <Space className="flex justify-end">
              {dom}
              <Button type="primary">立即同步NTP</Button>
            </Space>
          ),
        }}
      >
        <ProFormSelect
          options={[
            { label: '中国', value: 'Asia/Shanghai' },
            { label: '日本', value: 'Asia/Tokyo' },
          ]}
          name="zone"
          label="时区选择"
          width="xl"
          placeholder="请选择时区"
        />
        <ProFormDateTimePicker name="time" label="系统时间" width="xl" placeholder="请选择时间" />
        <ProFormSwitch
          name="switch"
          label="NTP 同步"
          checkedChildren="开启"
          unCheckedChildren="关闭"
        />
      </ProForm>
    </>
  );
};

export default TimeConfig;
