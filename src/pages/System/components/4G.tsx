import { message } from '@/components/PopupHack';
import { get4gInfo, postSettings4gRestart } from '@/services/rulex/4Gshezhi';
import { green } from '@ant-design/colors';
import { PoweroffOutlined, ReloadOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Progress, Space } from 'antd';
import { useRef } from 'react';
import Title from './TItle';

const FourGConfig = () => {
  const formRef = useRef<ProFormInstance>();

  // 详情
  const {
    data: detail,
    run: getDetail,
    loading: detailLoading,
  } = useRequest(() => get4gInfo(), {
    onSuccess: (data) => {
      formRef.current?.setFieldsValue({ ...data });
    },
  });

  // 重启4G
  const { run: restart, loading } = useRequest(() => postSettings4gRestart(), {
    manual: true,
    onSuccess: () => {
      message.success('重启成功');
    },
  });

  return (
    <>
    <Title name='4G 配置' />
      <ProForm
        formRef={formRef}
        layout="horizontal"
        labelCol={{ span: 2 }}
        initialValues={{ zone: 'Asia/Shanghai', csq: 29 }}
        submitter={{
          render: () => (
            <Space>
              <Button
                type="primary"
                onClick={restart}
                loading={loading}
                icon={<PoweroffOutlined />}
              >
                重启 4G 网卡
              </Button>
              <Button
                type="primary"
                onClick={getDetail}
                loading={detailLoading}
                icon={<ReloadOutlined />}
              >
                刷新状态
              </Button>
            </Space>
          ),
        }}
      >
        <ProFormText name="cops" label="运营商" placeholder="" disabled width="xl" />
        <ProFormText name="iccid" label="ICCID" placeholder="" disabled width="xl" />
        <ProForm.Item name="csq" label="信号强度">
          <Progress steps={10} size={20} percent={detail?.csq || 0} strokeColor={green[6]} />
        </ProForm.Item>
      </ProForm>
    </>
  );
};

export default FourGConfig;
