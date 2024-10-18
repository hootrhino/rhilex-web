import { message } from '@/components/PopupHack';
import {
  getSettingsCtrlTree,
  getSettingsEth,
  postSettingsEth,
} from '@/services/rhilex/wangluopeizhi';
import { FormItemType } from '@/utils/enum';
import { omit } from '@/utils/redash';
import { validateFormItem } from '@/utils/utils';
import { PlusCircleOutlined } from '@ant-design/icons';
import type { FormListActionType, ProFormInstance } from '@ant-design/pro-components';
import {
  ProCard,
  ProForm,
  ProFormList,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components';
import { useIntl, useRequest } from '@umijs/max';
import { useSize } from 'ahooks';
import { Empty, Space, Tooltip } from 'antd';
import { Rule } from 'antd/es/form';
import { useEffect, useRef } from 'react';

type DnsListItem = {
  dns: string;
};

type BaseFormItem = {
  interface: string;
  address: string;
  netmask: string;
  gateway: string;
  dhcp_enabled: boolean;
  dnsList: DnsListItem[];
};

type UpdateParams = Omit<BaseFormItem, 'dnsList'> & {
  dns: string[];
};

const NetworkConfig = () => {
  const formRef = useRef<ProFormInstance>();
  const actionRef = useRef<FormListActionType>();
  const sizeRef = useRef(null);
  const size = useSize(sizeRef);
  const { formatMessage } = useIntl();

  // 获取设备树
  const { data: ifaceData } = useRequest(() => getSettingsCtrlTree(), {
    formatResult: (res) => res.data.network,
  });

  // 详情
  const { data: detail, run: getDetail } = useRequest(
    (params: API.getSettingsEthParams) => getSettingsEth(params),
    {
      manual: true,
    },
  );

  // 更新
  const handleOnFinish = async ({ dnsList, ...values }: BaseFormItem) => {
    try {
      const params = {
        ...values,
        dns: dnsList?.map((item: { dns: string }) => item.dns),
      };
      await postSettingsEth(params as UpdateParams);
      message.success(formatMessage({ id: 'message.success.update' }));

      return true;
    } catch (error) {
      return false;
    }
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
      const dnsList = detail.dns?.map((item) => ({ dns: item }));

      formRef.current?.setFieldsValue({
        ...omit(detail, ['dns']),
        dnsList,
        interface: detail?.interface || ifaceData?.[0].name,
        dhcp_enabled: detail?.dhcp_enabled || false,
      });
    }
  }, [detail]);

  return (
    <ProCard
      title={formatMessage({ id: 'system.tab.network' })}
      className="h-full"
      headStyle={{ paddingBlock: 0 }}
      bodyStyle={
        ifaceData && ifaceData.length > 0
          ? {}
          : { display: 'flex', justifyContent: 'center', alignItems: 'center' }
      }
      ref={sizeRef}
    >
      {ifaceData && ifaceData.length > 0 ? (
        <ProForm
          formRef={formRef}
          onFinish={handleOnFinish}
          initialValues={{ dhcp_enabled: false }}
          layout={size && size?.width < 1000 ? 'vertical' : 'horizontal'}
          labelCol={size && size?.width < 1000 ? {} : { span: 3 }}
          onValuesChange={(changedValue) => {
            if (changedValue?.interface && detail) {
              formRef.current?.setFieldsValue({ ...detail[changedValue?.interface] });
            }
          }}
          submitter={{
            render: (props, dom) => (
              <ProForm.Item
                labelCol={{ span: 3 }}
                label={<div className="invisible">action</div>}
                colon={false}
              >
                <div className="max-w-[552px] flex justify-end">
                  <Space>{dom}</Space>
                </div>
              </ProForm.Item>
            ),
          }}
        >
          <ProFormSelect
            name="interface"
            label={formatMessage({ id: 'system.form.title.interface' })}
            width="xl"
            allowClear={false}
            options={ifaceData?.map((item) => ({ label: item?.name, value: item?.name }))}
            placeholder={formatMessage({ id: 'system.form.rules.interface' })}
            rules={[
              { required: true, message: formatMessage({ id: 'system.form.rules.interface' }) },
            ]}
          />
          <ProFormText
            name="address"
            label={formatMessage({ id: 'system.form.title.address' })}
            width="xl"
            placeholder={formatMessage({ id: 'system.form.rules.address' })}
            rules={[
              { required: true, message: formatMessage({ id: 'system.form.rules.address' }) },
              {
                validator: (_rule: Rule, value: string) => validateFormItem(value, FormItemType.IP),
              },
            ]}
          />
          <ProFormText
            name="netmask"
            label={formatMessage({ id: 'system.form.title.netmask' })}
            width="xl"
            placeholder={formatMessage({ id: 'system.form.rules.netmask' })}
            rules={[
              { required: true, message: formatMessage({ id: 'system.form.rules.netmask' }) },
              {
                validator: (_rule: Rule, value: string) =>
                  validateFormItem(value, FormItemType.NETMASK),
              },
            ]}
          />
          <ProFormText
            name="gateway"
            label={formatMessage({ id: 'system.form.title.gateway' })}
            width="xl"
            placeholder={formatMessage({ id: 'system.form.rules.gateway' })}
            rules={[
              { required: true, message: formatMessage({ id: 'system.form.rules.gateway' }) },
              {
                validator: (_rule: Rule, value: string) =>
                  validateFormItem(value, FormItemType.GATEWAY),
              },
            ]}
          />

          <ProFormList
            actionRef={actionRef}
            name="dnsList"
            label={formatMessage({ id: 'system.form.title.dns' })}
            min={1}
            creatorButtonProps={false}
            creatorRecord={{
              dns: '',
            }}
            actionRender={(props, action, defaultActionDom) => {
              return [
                <Tooltip key="add" title={formatMessage({ id: 'system.tooltip.new' })}>
                  <PlusCircleOutlined onClick={() => action.add()} className="ml-[10px]" />
                </Tooltip>,
                ...defaultActionDom,
              ];
            }}
            required
          >
            <ProFormText
              name="dns"
              width="xl"
              placeholder={formatMessage({ id: 'system.form.rules.dns' })}
              rules={[{ required: true, message: formatMessage({ id: 'system.form.rules.dns' }) }]}
            />
          </ProFormList>
          <ProFormSwitch
            name="dhcp_enabled"
            label={formatMessage({ id: 'system.form.title.dhcpEnabled' })}
            checkedChildren={formatMessage({ id: 'system.switch.checked' })}
            unCheckedChildren={formatMessage({ id: 'system.switch.unchecked' })}
            rules={[{ required: true }]}
          />
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

export default NetworkConfig;
