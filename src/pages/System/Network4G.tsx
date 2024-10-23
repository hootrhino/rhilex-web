import { getSettingsCtrlTree } from '@/services/rhilex/wangluopeizhi';
import {
  getMn4GInfo,
  postMn4GTurnoff,
  postMn4GTurnon,
} from '@/services/rhilex/yidongwangluo4Gshezhi';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProCard, ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { useIntl, useRequest } from '@umijs/max';
import { Button, Empty, message, Progress, Tag } from 'antd';
import { useEffect, useRef } from 'react';

const Network4G = () => {
  const { formatMessage } = useIntl();
  const formRef = useRef<ProFormInstance>();

  // 获取设备树
  const { data: ifaceData } = useRequest(() => getSettingsCtrlTree(), {
    formatResult: (res) => res.data.net4g,
  });

  // 详情
  const { data: detail, run: getDetail } = useRequest(
    (params: API.getSettingsEthParams) => getMn4GInfo(params),
    {
      manual: true,
    },
  );

  const handleOnReload = () => {
    const iface = ifaceData?.[0].name;
    if (iface) {
      getDetail({ iface });
    }
    message.success(formatMessage({ id: 'system.message.success.setting' }));
  };

  const getCSQPercent = () => {
    const csq = detail?.csq || 0;
    const percent = (csq / 31) * 100;

    return ~~percent;
  };

  useEffect(() => {
    if (ifaceData && ifaceData?.length > 0) {
      if (ifaceData[0].name) {
        getDetail({ iface: ifaceData[0].name });
      }
    }
  }, [ifaceData]);

  useEffect(() => {
    if (detail) {
      formRef.current?.setFieldsValue({ ...detail, interface: ifaceData?.[0].name });
    }
  }, [detail]);

  return (
    <ProCard
      title={formatMessage({ id: 'system.tab.setting' }, { item: '4G' })}
      className="h-full"
      headStyle={{ paddingBlock: 0 }}
      bodyStyle={
        ifaceData && ifaceData.length > 0
          ? {}
          : { display: 'flex', justifyContent: 'center', alignItems: 'center' }
      }
    >
      {ifaceData && ifaceData.length > 0 ? (
        <ProForm
          readonly
          formRef={formRef}
          initialValues={{ up: false }}
          layout="horizontal"
          labelCol={{ span: 3 }}
          submitter={{
            render: () => (
              <ProForm.Item
                labelCol={{ span: 3 }}
                label={<div className="invisible">action</div>}
                colon={false}
              >
                <div className="max-w-[200px] flex justify-end">
                  <Button
                    type="primary"
                    onClick={async () => {
                      if (detail?.up) {
                        await postMn4GTurnoff();
                      } else {
                        await postMn4GTurnon();
                      }
                      handleOnReload();
                    }}
                  >
                    {formatMessage({ id: `system.button.${detail?.up ? 'turnOff' : 'turnOn'}` })}
                  </Button>
                </div>
              </ProForm.Item>
            ),
          }}
        >
          <ProFormSelect
            name="interface"
            label={formatMessage({ id: 'system.form.title.interface' })}
            readonly
            options={ifaceData?.map((item) => ({ label: item?.name, value: item?.name }))}
          />
          <ProForm.Item name="csq" label={formatMessage({ id: 'system.form.title.csq' })}>
            <Progress steps={5} percent={getCSQPercent()} size={20} className="block" />
          </ProForm.Item>
          <ProFormText name="iccid" label="ICCID" readonly />
          <ProFormText
            name="imel"
            label={formatMessage({ id: 'system.form.title.imel' })}
            readonly
          />
          <ProFormText
            name="cops"
            label={formatMessage({ id: 'system.form.title.cops' })}
            readonly
          />
          <ProForm.Item name="up" label={formatMessage({ id: 'system.form.title.up' })}>
            <Tag color={detail?.up ? 'green' : 'default'}>
              {formatMessage({ id: `status.${detail?.up ? 'yes' : 'no'}` })}
            </Tag>
          </ProForm.Item>
        </ProForm>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={formatMessage({ id: 'system.desc.empty' })}
        />
      )}
    </ProCard>
  );
};

export default Network4G;
