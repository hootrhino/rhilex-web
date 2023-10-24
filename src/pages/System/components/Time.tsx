import { message } from '@/components/PopupHack';
import { getSettingsTime, postSettingsTime, putSettingsNtp } from '@/services/rulex/shijianpeizhi';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ProForm,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormSwitch,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Space } from 'antd';
import { useRef } from 'react';

type UpdateParams = {
  sysTime: string;
  sysTimeZone: string;
  enableNtp: boolean;
};

const TimeConfig = () => {
  const formRef = useRef<ProFormInstance>();

  // TODO 详情
  const { run: getWifiList } = useRequest(() => getSettingsTime(), {
    onSuccess: (data) => {
      if (!data) {
        formRef.current?.setFieldsValue({
          sysTimeZone: 'Asia/Shanghai',
          enableNtp: false,
        });
      } else {
        // TODO getSettingsTime 返回数据格式不正确
        console.log(data);
        // formRef.current?.setFieldsValue({ ...omit(data['eth0'], 'dns'), dnsList });
      }
    },
  });

  // 立即更新NTP时间
  const { run: updateNtp } = useRequest(() => putSettingsNtp(), {
    manual: true,
    onSuccess: () => {
      message.success('NTP 时间更新成功');
    },
  });

  const handleOnFinish = async (values: UpdateParams) => {
    try {
      await postSettingsTime(values);
      message.success('更新成功');
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <>
      <div className="text-[20px] mb-[24px] font-medium">时间配置</div>
      <ProForm
        formRef={formRef}
        onFinish={handleOnFinish}
        layout="horizontal"
        labelCol={{ span: 2 }}
        submitter={{
          render: (props, dom) => (
            <Space>
              {dom}
              <Button type="primary" onClick={getWifiList}>
                扫描 WIFI
              </Button>
              <Button type="primary" onClick={updateNtp}>
                立即同步 NTP
              </Button>
            </Space>
          ),
        }}
      >
        <ProFormSelect
          options={[
            { label: '中国', value: 'Asia/Shanghai' },
            { label: '日本', value: 'Asia/Tokyo' },
          ]}
          name="sysTimeZone"
          label="时区选择"
          width="xl"
          placeholder="请选择时区"
          rules={[{ required: true, message: '请选择时区' }]}
        />
        <ProFormDateTimePicker
          name="sysTime"
          label="系统时间"
          width="xl"
          placeholder="请选择时间"
          rules={[{ required: true, message: '请选择时间' }]}
        />
        <ProFormSwitch
          name="enableNtp"
          label="NTP 同步"
          checkedChildren="开启"
          unCheckedChildren="关闭"
          rules={[{ required: true }]}
        />
      </ProForm>
    </>
  );
};

export default TimeConfig;
