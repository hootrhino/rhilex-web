import type { OutendItem } from '@/pages/Outend';
import { OutendType, outendTypeOption } from '@/pages/Outend/enum';
import { postRulesCreate } from '@/services/rhilex/guizeguanli';
import { getDevicesDetail } from '@/services/rhilex/shebeiguanli';
import { getOutendsList } from '@/services/rhilex/shuchuziyuanguanli';
import { getDataToQuickAction } from '@/templates/BuildIn/dataToTpl';
import { FormItemType } from '@/utils/enum';
import { generateRandomId, validateFormItem } from '@/utils/utils';
import type { ModalFormProps } from '@ant-design/pro-components';
import {
  ModalForm,
  ProFormDependency,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useIntl, useParams, useRequest } from '@umijs/max';
import { Empty, message, Space } from 'antd';
import type { Rule } from 'antd/es/form';
import { useEffect } from 'react';
import { DefaultFailed, DefaultSuccess } from '../initialValues';

type QuickFormProps = ModalFormProps & {
  reload: () => void;
};

const QuickForm = ({ reload, ...props }: QuickFormProps) => {
  const { formatMessage } = useIntl();
  const { deviceId, inendId } = useParams();

  // 获取设备详情
  const { data: deviceDetail, run: getDeviceDetail } = useRequest(
    (params: API.getDevicesDetailParams) => getDevicesDetail(params),
    {
      manual: true,
    },
  );
  console.log(deviceDetail);
  useEffect(() => {
    if (deviceId) {
      getDeviceDetail({ uuid: deviceId });
    }
  }, [deviceId]);

  return (
    <ModalForm
      title={formatMessage({ id: 'ruleConfig.title.new' })}
      initialValues={{ name: `RULE_${generateRandomId()}`, targetType: OutendType.MQTT }}
      width="30%"
      modalProps={{ destroyOnClose: true, maskClosable: false }}
      onFinish={async ({ targetId, targetType, ...values }) => {
        try {
          const batchRequest = deviceDetail?.config?.commonConfig?.batchRequest;
          console.log(batchRequest);
          const params = {
            name: values?.name || '',
            description: values?.description || '',
            fromSource: inendId ? [inendId] : [],
            fromDevice: deviceId ? [deviceId] : [],
            success: DefaultSuccess,
            failed: DefaultFailed,
            actions: getDataToQuickAction(targetType, targetId, batchRequest),
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
        label={formatMessage({ id: 'ruleConfig.form.title.targetType' })}
        options={Object.keys(outendTypeOption).map((key) => ({
          label: outendTypeOption[key],
          value: key,
        }))}
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
        {({ targetType }) => (
          <ProFormSelect
            name="targetId"
            label={formatMessage({ id: 'ruleConfig.form.title.targetId' })}
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
                message: formatMessage({ id: 'placeholder.select' }, { text: ' UUID' }),
              },
            ]}
            placeholder={formatMessage({ id: 'placeholder.select' }, { text: ' UUID' })}
            allowClear={false}
          />
        )}
      </ProFormDependency>

      <ProFormText
        label={formatMessage({ id: 'table.title.desc' })}
        name="description"
        placeholder={formatMessage({ id: 'placeholder.desc' })}
      />
    </ModalForm>
  );
};

export default QuickForm;
