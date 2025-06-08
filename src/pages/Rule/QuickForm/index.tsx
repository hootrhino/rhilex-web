import type { OutendItem } from '@/pages/Outend';
import { OutendType, outendTypeOption } from '@/pages/Outend/enum';
import { postRulesCreate } from '@/services/rhilex/guizeguanli';
import { getDevicesDetail } from '@/services/rhilex/shebeiguanli';
import { getOutendsList } from '@/services/rhilex/shuchuziyuanguanli';
import { getDataToQuickAction } from '@/templates/BuildIn/dataToTpl';
import { FormItemType } from '@/utils/enum';
import { generateRandomId, validateFormItem } from '@/utils/utils';
import type { ModalFormProps, ProFormInstance } from '@ant-design/pro-components';
import {
  ModalForm,
  ProFormDependency,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useIntl, useParams, useRequest } from '@umijs/max';
import { Empty, message, Space } from 'antd';
import type { Rule } from 'antd/es/form';
import { useEffect, useRef } from 'react';
import { DefaultFailed, DefaultSuccess } from '../initialValues';

type QuickFormProps = ModalFormProps & {
  reload: () => void;
};

const QuickForm = ({ reload, ...props }: QuickFormProps) => {
  const formRef = useRef<ProFormInstance>();
  const { formatMessage } = useIntl();
  const { deviceId, inendId } = useParams();

  // 获取设备详情
  const { data: deviceDetail, run: getDeviceDetail } = useRequest(
    (params: API.getDevicesDetailParams) => getDevicesDetail(params),
    {
      manual: true,
    },
  );

  useEffect(() => {
    if (deviceId) {
      getDeviceDetail({ uuid: deviceId });
    }
  }, [deviceId]);

  return (
    <ModalForm
      formRef={formRef}
      title={formatMessage({ id: 'ruleConfig.title.new' })}
      initialValues={{ name: `RULE_${generateRandomId()}`, targetType: OutendType.MQTT }}
      width="30%"
      modalProps={{ destroyOnClose: true, maskClosable: false }}
      onFinish={async ({ targetId, targetType, ...values }) => {
        try {
          const batchRequest = deviceDetail?.config?.commonConfig?.batchRequest;
          const actions = getDataToQuickAction(targetType, targetId, batchRequest);

          const params = {
            name: values?.name || '',
            description: values?.description || '',
            fromSource: inendId ? [inendId] : [],
            fromDevice: deviceId ? [deviceId] : [],
            success: DefaultSuccess,
            failed: DefaultFailed,
            actions,
          };

          await postRulesCreate(params);
          reload();
          message.success(formatMessage({ id: 'message.success.new' }));

          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      }}
      onValuesChange={(values) => {
        if (values?.targetType) {
          formRef.current?.setFieldsValue({ targetId: undefined });
        }
      }}
      {...props}
    >
      <ProFormText
        label={formatMessage({ id: 'form.title.name' })}
        name="name"
        placeholder={formatMessage({ id: 'form.placeholder.name' })}
        rules={[
          {
            required: true,
            message: formatMessage({ id: 'form.placeholder.name' }),
          },
          {
            validator: (_rule: Rule, value: string) => validateFormItem(value, FormItemType.NAME),
          },
        ]}
      />
      <ProFormSelect
        name="targetType"
        label={formatMessage({ id: 'ruleConfig.form.title.resourceType' })}
        options={[
          {
            label: <span>{formatMessage({ id: 'ruleConfig.title.group.dataTo' })}</span>,
            title: 'dataTo',
            options: Object.keys(outendTypeOption).map((key) => ({
              label: outendTypeOption[key],
              value: key,
            })),
          },
        ]}
        placeholder={formatMessage({ id: 'form.placeholder.type' })}
        rules={[
          {
            required: true,
            message: formatMessage({ id: 'form.placeholder.type' }),
          },
        ]}
        allowClear={false}
      />
      <ProFormDependency name={['targetType']} labelCol={{ span: 4 }}>
        {({ targetType }) => {
          return (
            <ProFormSelect
              name="targetId"
              label={formatMessage({
                id: 'ruleConfig.form.title.resourceId',
              })}
              fieldProps={{
                notFoundContent: (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={formatMessage({ id: 'ruleConfig.empty.targetId' })}
                  />
                ),
                optionRender: (option) => (
                  <Space>
                    <span>{option?.label}</span>
                    <span className="text-[12px] text-[#000000A6]">{option?.value}</span>
                  </Space>
                ),
              }}
              params={{ targetType }}
              request={async () => {
                const res = await getOutendsList();

                return (res as any)?.data
                  ?.filter((item: OutendItem) => item.type === targetType)
                  .map((item: OutendItem) => ({
                    label: item.name,
                    value: item.uuid,
                  }));
              }}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'ruleConfig.form.placeholder.targetId' }),
                },
              ]}
              placeholder={formatMessage({ id: 'ruleConfig.form.placeholder.targetId' })}
              allowClear={false}
            />
          );
        }}
      </ProFormDependency>

      <ProFormText
        label={formatMessage({ id: 'table.title.desc' })}
        name="description"
        placeholder={formatMessage({ id: 'form.placeholder.desc' })}
      />
    </ModalForm>
  );
};

export default QuickForm;
