import type { OutendItem } from '@/pages/Outend';
import { dataToType, OutendType, outendTypeOption } from '@/pages/Outend/enum';
import { postRulesCreate } from '@/services/rhilex/guizeguanli';
import { getOutendsList } from '@/services/rhilex/shuchuziyuanguanli';
import { FormItemType } from '@/utils/enum';
import { validateFormItem } from '@/utils/utils';
import type { ModalFormProps } from '@ant-design/pro-components';
import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { useIntl, useParams } from '@umijs/max';
import { Empty, message, Space } from 'antd';
import type { Rule } from 'antd/es/form';
import { DefaultFailed, DefaultSuccess } from '../Update';

type QuickFormProps = ModalFormProps & {
  reload: () => void;
};

const QuickForm = ({ reload, ...props }: QuickFormProps) => {
  const { formatMessage } = useIntl();
  const { deviceId, inendId } = useParams();

  const getActions = (type: OutendType, uuid: string) => {
    const target = dataToType[type];

    return `Actions = {
      function(args)
          local dataT, err = json:J2T(args)
          if (err ~= nil) then
              Throw(err)
              return true, args
          end
          for _, value in pairs(dataT) do
              local params = {}
              params[value['tag']] = value.value
              local json = json:T2J({
                  id = time:TimeMs(),
                  method = "thing.event.property.post",
                  params = params
              })
              local err = data:To${target}("${uuid}", json)
              if err ~= nil then
                  Throw(err)
              end
          end
          return true, args
      end
    }`;
  };

  return (
    <ModalForm
      title={formatMessage({ id: 'ruleConfig.title.new' })}
      initialValues={{ name: '', targetType: OutendType.MQTT }}
      width="30%"
      modalProps={{ destroyOnClose: true, maskClosable: false }}
      onFinish={async ({ targetId, targetType, ...values }) => {
        try {
          const params = {
            name: values?.name || '',
            description: values?.description || '',
            fromSource: inendId ? [inendId] : [],
            fromDevice: deviceId ? [deviceId] : [],
            success: DefaultSuccess,
            failed: DefaultFailed,
            actions: getActions(targetType, targetId),
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
        label={formatMessage({ id: 'ruleConfig.form.title.name' })}
        name="name"
        placeholder={formatMessage({ id: 'ruleConfig.form.placeholder.name' })}
        rules={[
          {
            required: true,
            message: formatMessage({ id: 'ruleConfig.form.placeholder.name' }),
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
        placeholder={formatMessage({ id: 'ruleConfig.form.placeholder.targetType' })}
        rules={[
          {
            required: true,
            message: formatMessage({ id: 'ruleConfig.form.placeholder.targetType' }),
          },
        ]}
        allowClear={false}
      />
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
        request={async () => {
          const res = await getOutendsList();

          return (res as any)?.data.map((item: OutendItem) => ({
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
      <ProFormText
        label={formatMessage({ id: 'table.desc' })}
        name="description"
        placeholder={formatMessage({ id: 'placeholder.desc' })}
      />
    </ModalForm>
  );
};

export default QuickForm;
