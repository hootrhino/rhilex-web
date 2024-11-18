import { DataType } from '@/pages/Device/DataPoints/enum';
import { postModbusMasterSheetWriteModbusSheet } from '@/services/rhilex/modbusMasterdianweiguanli';
import { ModalForm, ModalFormProps, ProFormDigit, ProFormText } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Rule } from 'antd/es/form';
import { message } from '../PopupHack';

type UpdateParams = {
  uuid: string;
  tag: string;
  type: string;
};

type UpdateRegisterProps = ModalFormProps & {
  data: UpdateParams;
  dataType: string;
};

const UpdateRegister = ({ data, dataType, ...props }: UpdateRegisterProps) => {
  const { formatMessage } = useIntl();

  const getUpdateRegisterFormItem = () => {
    let max = 255;
    let min = 0;

    switch (dataType) {
      case DataType.BYTE:
        max = 255;
        break;
      case DataType.UINT16:
        max = 65535;
        break;
      case DataType.UINT32:
        max = 4294967295;
        break;
      case DataType.INT16:
        min = -32768;
        max = 32768;
        break;
      case DataType.INT32:
        min = -2147483648;
        max = 2147483648;
        break;
      case DataType.FLOAT32:
        min = -3.4028235e38;
        max = 3.4028235e38;
        break;
      default:
        break;
    }

    if ([DataType.BYTE, DataType.UINT16, DataType.UINT32].includes(dataType as DataType)) {
      return (
        <ProFormDigit
          label={formatMessage({ id: 'device.modal.content.update.register.form.title' })}
          name="value"
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'device.modal.content.update.register.form.placeholder',
              }),
            },
            {
              type: 'integer',
              min: 0,
              message: formatMessage(
                { id: 'device.modal.content.update.register.form.rule' },
                { min, max },
              ),
            },
            {
              type: 'integer',
              max,
              message: formatMessage(
                { id: 'device.modal.content.update.register.form.rule' },
                { min, max },
              ),
            },
          ]}
          placeholder={formatMessage({
            id: 'device.modal.content.update.register.form.placeholder',
          })}
        />
      );
    }

    return (
      <ProFormText
        label={formatMessage({ id: 'device.modal.content.update.register.form.title' })}
        name="value"
        rules={[
          {
            required: true,
            message: formatMessage({ id: 'device.modal.content.update.register.form.placeholder' }),
          },
          {
            validator: (_rule: Rule, value: string) => {
              if (
                [DataType.INT16, DataType.INT32, DataType.FLOAT32].includes(dataType as DataType)
              ) {
                if (isNaN(Number(value))) {
                  return Promise.reject(
                    formatMessage({ id: 'device.modal.content.update.register.form.rule.valid' }),
                  );
                }

                const numericValue = Number(value);
                if (numericValue < Number(min) || numericValue > Number(max)) {
                  return Promise.reject(
                    formatMessage(
                      { id: 'device.modal.content.update.register.form.rule' },
                      { min, max },
                    ),
                  );
                }

                return Promise.resolve();
              } else {
                return Promise.resolve();
              }
            },
          },
        ]}
        placeholder={formatMessage({ id: 'device.modal.content.update.register.form.placeholder' })}
      />
    );
  };

  return (
    <ModalForm
      title={formatMessage({ id: 'device.modal.title.update.register' })}
      width="40%"
      layout="horizontal"
      modalProps={{ destroyOnClose: true, maskClosable: false }}
      onFinish={async ({ value }) => {
        const params = {
          ...data,
          value: value.toString(),
        };

        await postModbusMasterSheetWriteModbusSheet(params);
        message.success(formatMessage({ id: 'message.success.update' }));
        return true;
      }}
      {...props}
    >
      {getUpdateRegisterFormItem()}
    </ModalForm>
  );
};

export default UpdateRegister;
