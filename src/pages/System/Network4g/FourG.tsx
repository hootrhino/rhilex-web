import { message, modal } from '@/components/PopupHack';
import { getMn4GInfo, postSettingsMn4GRestart } from '@/services/rulex/yidongwangluo4Gshezhi';
import { green } from '@ant-design/colors';
import { PoweroffOutlined, ReloadOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { useIntl, useModel, useRequest } from '@umijs/max';
import { Button, Progress, Space } from 'antd';
import { useRef } from 'react';

const FourGConfig = () => {
  const formRef = useRef<ProFormInstance>();
  const { formatMessage } = useIntl();
  const { activeKey } = useModel('useSystem');

  // 详情
  const {
    data: detail,
    run: getDetail,
    loading: detailLoading,
  } = useRequest(() => getMn4GInfo(), {
    refreshDeps: [activeKey],
    onSuccess: (data) => {
      formRef.current?.setFieldsValue({ ...data });
    },
  });

  // 重启4G
  const { run: restart } = useRequest(() => postSettingsMn4GRestart(), {
    manual: true,
    onSuccess: () => {
      message.success(formatMessage({ id: 'message.success.restart' }));
    },
  });

  const getCsqPercent = () => {
    const base = 31 / 100;
    const percent = detail?.csq ? detail?.csq / base : 0;

    return ~~percent;
  };

  return (
    <ProForm
      formRef={formRef}
      layout="horizontal"
      labelCol={{ span: 4 }}
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
              {formatMessage({ id: 'system.button.reload' })}
            </Button>
            <Button
              type="primary"
              danger
              onClick={() =>
                modal.confirm({
                  title: formatMessage({ id: 'system.modal.title.restart' }),
                  content: formatMessage({ id: 'system.modal.content.restart' }),
                  onOk: restart,
                  okText: formatMessage({ id: 'system.button.confirm.restart' }),
                  cancelText: formatMessage({ id: 'button.cancel' }),
                })
              }
              icon={<PoweroffOutlined />}
            >
              {formatMessage({ id: 'system.button.restart4g' })}
            </Button>
          </Space>
        ),
      }}
    >
      <ProFormText
        name="cops"
        label={formatMessage({ id: 'system.form.title.cops' })}
        placeholder=""
        readonly
        width="xl"
      />
      <ProFormText name="iccid" label="ICCID" placeholder="" readonly width="xl" />
      <ProForm.Item name="csq" label={formatMessage({ id: 'system.form.title.csq' })}>
        <Progress steps={10} size={20} percent={getCsqPercent()} strokeColor={green[6]} />
      </ProForm.Item>
    </ProForm>
  );
};

export default FourGConfig;
