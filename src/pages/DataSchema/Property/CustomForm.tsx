import { message } from '@/components/PopupHack';
import {
  postSchemaPropertiesCreate,
  putSchemaPropertiesUpdate,
} from '@/services/rhilex/shujumoxing';
import type { ModalFormProps, ProFormInstance } from '@ant-design/pro-components';
import {
  ModalForm,
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormDigit,
  ProFormDigitRange,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useIntl, useModel } from '@umijs/max';
import { AutoComplete } from 'antd';
import { useEffect, useRef } from 'react';
import type { Property } from '../typings';
import { RW, rwOption, Type, typeOption, unitOptions } from './enum';

const defaultProperty = {
  rw: RW.R,
  type: Type.STRING,
  rule: { latitude: 0, longitude: 0, max: 0, range: [0, 0], round: 2 },
};

type PropertyFormProps = ModalFormProps & {
  initialValue: Partial<Property>;
  reload: () => void;
};

const CustomPropertyForm = ({ initialValue, reload, ...props }: PropertyFormProps) => {
  const formRef = useRef<ProFormInstance>();
  const { formatMessage } = useIntl();
  const { activeSchema } = useModel('useSchema');

  useEffect(() => {
    formRef.current?.setFieldsValue(
      initialValue?.uuid
        ? {
            ...initialValue,
            rule: {
              ...initialValue?.rule,
              range: [initialValue?.rule?.min, initialValue?.rule?.max],
            },
          }
        : defaultProperty,
    );
  }, [initialValue]);

  return (
    <ModalForm
      title={formatMessage({
        id: `schemaMgt.modal.title.property.${initialValue?.uuid ? 'update' : 'new'}`,
      })}
      formRef={formRef}
      width="60%"
      initialValues={defaultProperty}
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
      }}
      onFinish={async (values) => {
        let info = formatMessage({ id: 'message.success.new' });
        let params = {
          ...values,
          unit: values?.unit || '',
          rule:
            {
              ...values?.rule,
              defaultValue: '0',
            } || {},
          schemaId: activeSchema.uuid,
        };
        if (initialValue?.uuid) {
          info = formatMessage({ id: 'message.success.update' });
          await putSchemaPropertiesUpdate({ ...params, uuid: initialValue.uuid } as any);
        } else {
          await postSchemaPropertiesCreate(params as any);
        }

        message.success(info);
        reload();
        return true;
      }}
      {...props}
    >
      <ProForm.Group>
        <ProFormText
          name="label"
          label={formatMessage({ id: 'form.title.name' })}
          placeholder={formatMessage({ id: 'form.placeholder.name' })}
          rules={[{ required: true, message: formatMessage({ id: 'form.placeholder.name' }) }]}
          width="md"
        />
        <ProFormText
          name="name"
          label={formatMessage({ id: 'schemaMgt.form.title.id' })}
          placeholder={formatMessage({ id: 'schemaMgt.form.placeholder.id' })}
          rules={[
            { required: true, message: formatMessage({ id: 'schemaMgt.form.placeholder.id' }) },
          ]}
          width="md"
        />
        <ProFormSelect
          name="type"
          label={formatMessage({ id: 'form.title.type' })}
          valueEnum={typeOption}
          placeholder={formatMessage({ id: 'form.placeholder.type' })}
          width="md"
          fieldProps={{ allowClear: false }}
          rules={[{ required: true, message: formatMessage({ id: 'form.placeholder.type' }) }]}
        />
      </ProForm.Group>

      <ProFormDependency name={['type']} labelCol={{ span: 4 }}>
        {({ type }) => {
          if (!type) return null;
          let dom: React.ReactNode;
          if (type === Type.STRING) {
            dom = (
              <ProFormDigit
                name={['rule', 'max']}
                width="md"
                label={formatMessage({ id: 'schemaMgt.form.title.max' })}
                placeholder={formatMessage({ id: 'schemaMgt.form.placeholder.max' })}
              />
            );
          }
          if (type === Type.INTEGER) {
            dom = (
              <ProFormDigitRange
                label={formatMessage({ id: 'schemaMgt.form.title.range' })}
                name={['rule', 'range']}
                separator="~"
                placeholder={[
                  formatMessage({ id: 'schemaMgt.form.title.range.min' }),
                  formatMessage({ id: 'schemaMgt.form.title.range.max' }),
                ]}
                separatorWidth={60}
                rules={[
                  { required: true, message: formatMessage({ id: 'schemaMgt.form.rules.range' }) },
                ]}
                transform={(values) => ({
                  rule: {
                    min: values?.[0],
                    max: values?.[1],
                  },
                })}
              />
            );
          }
          if (type === Type.FLOAT) {
            dom = (
              <>
                <div className="w-[250px]">
                  <ProFormDigitRange
                    label={formatMessage({ id: 'schemaMgt.form.title.range' })}
                    name={['rule', 'range']}
                    separator="~"
                    placeholder={[
                      formatMessage({ id: 'schemaMgt.form.title.range.min' }),
                      formatMessage({ id: 'schemaMgt.form.title.range.max' }),
                    ]}
                    separatorWidth={30}
                    rules={[
                      {
                        required: true,
                        message: formatMessage({ id: 'schemaMgt.form.rules.range' }),
                      },
                    ]}
                    transform={(values) => ({
                      rule: {
                        min: values?.[0],
                        max: values?.[1],
                      },
                    })}
                  />
                </div>

                <ProFormDigit
                  name={['rule', 'round']}
                  width="sm"
                  label={formatMessage({ id: 'schemaMgt.form.title.round' })}
                  placeholder={formatMessage({ id: 'schemaMgt.form.placeholder.round' })}
                  rules={[
                    {
                      required: true,
                      message: formatMessage({ id: 'schemaMgt.form.placeholder.round' }),
                    },
                  ]}
                />
              </>
            );
          }
          if (type === Type.BOOL) {
            dom = (
              <>
                <ProFormText
                  label="true"
                  name={['rule', 'trueLabel']}
                  placeholder={formatMessage({ id: 'schemaMgt.form.placeholder.true' })}
                  width="sm"
                />
                <ProFormText
                  label="false"
                  name={['rule', 'falseLabel']}
                  placeholder={formatMessage({ id: 'schemaMgt.form.placeholder.false' })}
                  width="sm"
                />
              </>
            );
          }
          if (type === Type.GEO) {
            dom = (
              <>
                <ProFormDigit
                  label={formatMessage({ id: 'schemaMgt.form.title.latitude' })}
                  name={['rule', 'latitude']}
                  placeholder={formatMessage({ id: 'schemaMgt.form.placeholder.latitude' })}
                  width="md"
                />
                <ProFormDigit
                  label={formatMessage({ id: 'schemaMgt.form.title.longitude' })}
                  name={['rule', 'longitude']}
                  placeholder={formatMessage({ id: 'schemaMgt.form.placeholder.longitude' })}
                  width="md"
                />
              </>
            );
          }

          return (
            <>
              <ProCard
                ghost
                title={
                  <div className="text-[14px] font-medium">
                    {formatMessage({ id: 'schemaMgt.title.card' })}
                  </div>
                }
              >
                <ProForm.Group>{dom}</ProForm.Group>
              </ProCard>
              <ProForm.Group style={{ marginTop: 24 }}>
                {![Type.STRING, Type.GEO].includes(type) && (
                  <ProForm.Item
                    name="unit"
                    label={formatMessage({ id: 'schemaMgt.form.title.unit' })}
                    className="w-[328px]"
                    hidden={type === Type.BOOL}
                  >
                    <AutoComplete
                      options={unitOptions}
                      style={{ width: '100%' }}
                      placeholder={formatMessage({ id: 'schemaMgt.form.placeholder.unit' })}
                    />
                  </ProForm.Item>
                )}

                <ProFormText
                  name="description"
                  label={formatMessage({ id: 'table.title.desc' })}
                  placeholder={formatMessage({ id: 'placeholder.desc' })}
                  width="md"
                />
                <ProFormRadio.Group
                  name="rw"
                  label={formatMessage({ id: 'schemaMgt.form.title.rw' })}
                  valueEnum={rwOption}
                />
              </ProForm.Group>
            </>
          );
        }}
      </ProFormDependency>
    </ModalForm>
  );
};

export default CustomPropertyForm;
