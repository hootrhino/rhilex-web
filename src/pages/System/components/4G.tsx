import { message } from '@/components/PopupHack';
import { get4gInfo, postSettings4gRestart } from '@/services/rulex/4Gshezhi';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Progress, Space } from 'antd';
import { useRef } from 'react';

const FourGConfig = () => {
  const formRef = useRef<ProFormInstance>();

  // TODO 详情
  useRequest(() => get4gInfo(), {
    onSuccess: (data) => {
      // TODO 返回参数不明确
      console.log(data);
    },
  });

  // 重启4G
  const { run: restart } = useRequest(() => postSettings4gRestart(), {
    manual: true,
    onSuccess: () => message.success('重启成功'),
  });

  return (
    <>
      <div className="text-[20px] mb-[24px] font-medium">4G 配置</div>
      <ProForm
        formRef={formRef}
        layout="horizontal"
        labelCol={{ span: 2 }}
        initialValues={{ zone: 'Asia/Shanghai' }}
        submitter={{
          render: () => (
            <Space>
              <Button type="primary" onClick={restart}>
                重启 4G 网卡
              </Button>
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
