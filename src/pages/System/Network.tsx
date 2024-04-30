import { message } from '@/components/PopupHack';
import { getSettingsEth, postSettingsEth } from '@/services/rulex/wangluopeizhi';
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
import { useIntl, useModel, useRequest } from '@umijs/max';
import { Tooltip } from 'antd';
import { Rule } from 'antd/es/form';
import { useRef } from 'react';

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

const initialValue = {
  interface: 'eth0',
  address: '192.168.199.1',
  netmask: '255.255.255.0',
  gateway: '192.168.199.1',
  dnsList: [{ dns: '8.8.8.8' }, { dns: '114.114.114.114' }],
};

const NetworkConfig = () => {
  const formRef = useRef<ProFormInstance>();
  const actionRef = useRef<FormListActionType>();
  const { interfaceOption } = useModel('useSystem');
  const { formatMessage } = useIntl();

  // 详情
  const { data: detail } = useRequest(() => getSettingsEth(), {
    onSuccess: (data) => {
      if (!data) {
        formRef.current?.setFieldsValue(initialValue);
      } else {
        const dnsList = data['eth0'].dns?.map((item) => ({ dns: item }));
        formRef.current?.setFieldsValue({ ...omit(data['eth0'], ['dns']), dnsList });
      }
    },
  });

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

  return (
    <ProCard title={formatMessage({ id: 'system.tab.network' })}>
      <ProForm
        formRef={formRef}
        onFinish={handleOnFinish}
        layout="horizontal"
        labelCol={{ span: 2 }}
        onValuesChange={(changedValue) => {
          if (changedValue?.interface && detail) {
            formRef.current?.setFieldsValue({ ...detail[changedValue?.interface] });
          }
        }}
        submitter={{
          render: (props, dom) => dom,
        }}
      >
        <ProFormSelect
          options={interfaceOption}
          name="interface"
          label={formatMessage({ id: 'system.form.title.interface' })}
          width="xl"
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
                <PlusCircleOutlined onClick={() => action.add()} className="ml-[10px]" />{' '}
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
    </ProCard>
  );
};

export default NetworkConfig;
