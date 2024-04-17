import { message, modal } from '@/components/PopupHack';
import { getMn4GInfo, postSettingsMn4GRestart } from '@/services/rulex/yidongwangluo4Gshezhi';
import { green } from '@ant-design/colors';
import { PoweroffOutlined, ReloadOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProCard, ProForm, ProFormText } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Progress, Space } from 'antd';
import { useRef } from 'react';

const FourGConfig = () => {
  const formRef = useRef<ProFormInstance>();

  // 详情
  const {
    data: detail,
    run: getDetail,
    loading: detailLoading,
  } = useRequest(() => getMn4GInfo(), {
    onSuccess: (data) => {
      formRef.current?.setFieldsValue({ ...data });
    },
  });

  // 重启4G
  const { run: restart } = useRequest(() => postSettingsMn4GRestart(), {
    manual: true,
    onSuccess: () => {
      message.success('重启成功');
    },
  });

  const getCsqPercent = () => {
    const base = 31 / 100;
    const percent = detail?.csq ? detail?.csq / base : 0;

    return ~~percent;
  };

  return (
    <ProCard title="4G 配置">
      <ProForm
        formRef={formRef}
        layout="horizontal"
        labelCol={{ span: 2 }}
        initialValues={{ zone: 'Asia/Shanghai', csq: 0 }}
        submitter={{
          render: () => (
            <Space>
              <Button
                type="primary"
                onClick={getDetail}
                loading={detailLoading}
                icon={<ReloadOutlined />}
              >
                刷新状态
              </Button>
              <Button
                type="primary"
                danger
                onClick={() =>
                  modal.confirm({
                    title: '确定执行重启操作吗？',
                    content: '重启 4G 网卡会造成短时间内移动网络处于离线状态，请谨慎操作',
                    okText: '确认重启',
                    onOk: restart,
                  })
                }
                icon={<PoweroffOutlined />}
              >
                重启 4G 网卡
              </Button>
            </Space>
          ),
        }}
      >
        <ProFormText name="cops" label="运营商" placeholder="" readonly width="xl" />
        <ProFormText name="iccid" label="ICCID" placeholder="" readonly width="xl" />
        <ProForm.Item name="csq" label="信号强度">
          <Progress steps={10} size={20} percent={getCsqPercent()} strokeColor={green[6]} />
        </ProForm.Item>
      </ProForm>
    </ProCard>
  );
};

export default FourGConfig;
