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
import { AutoComplete } from 'antd';
import { useEffect, useRef } from 'react';
import type { Property } from '..';
import { RW, rwOption, Type, typeOption, unitOptions } from '../enum';

const defaultProperty = {
  rw: RW.R,
  type: Type.STRING,
  rule: { latitude: 0, longitude: 0, max: 0, range: [0, 0], round: 2 },
};

type PropertyFormProps = ModalFormProps & {
  initialValue: Partial<Property>;
};

const PropertyForm = ({ initialValue, ...props }: PropertyFormProps) => {
  const formRef = useRef<ProFormInstance>();

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
      title={initialValue?.uuid ? '更新属性' : '新增属性'}
      formRef={formRef}
      width="50%"
      initialValues={defaultProperty}
      onValuesChange={(changedValue) => {
        if (['INTEGER', 'FLOAT'].includes(changedValue?.type)) {
          formRef.current?.setFieldsValue({ rule: { defaultValue: 0 } });
        }
        if (changedValue?.type === Type.BOOL) {
          formRef.current?.setFieldsValue({ rule: { defaultValue: false } });
        }
      }}
      {...props}
    >
      <ProForm.Group>
        <ProFormText
          name="label"
          label="属性名称"
          placeholder="请输入属性名称"
          rules={[{ required: true, message: '请输入属性名称' }]}
          width="md"
        />
        <ProFormText
          name="name"
          label="标志符"
          placeholder="请输入标志符"
          rules={[{ required: true, message: '请输入标志符' }]}
          width="md"
        />
      </ProForm.Group>

      <ProFormSelect
        name="type"
        label="数据类型"
        valueEnum={typeOption}
        placeholder="请选择数据类型"
        width="md"
        rules={[{ required: true, message: '请选择数据类型' }]}
      />
      <ProFormDependency name={['type']} labelCol={{ span: 4 }}>
        {({ type }) => {
          if (!type) return null;
          let dom: React.ReactNode;
          if (type === Type.STRING) {
            dom = (
              <ProFormDigit
                name={['rule', 'max']}
                width="md"
                label="最大长度"
                placeholder="请输入最大长度"
              />
            );
          }
          if (type === Type.INTEGER) {
            dom = (
              <ProFormDigitRange
                label="取值范围"
                name={['rule', 'range']}
                separator="~"
                placeholder={['最小值', '最大值']}
                separatorWidth={60}
                rules={[{ required: true, message: '请输入取值范围' }]}
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
                    label="取值范围"
                    name={['rule', 'range']}
                    separator="~"
                    placeholder={['最小值', '最大值']}
                    separatorWidth={30}
                    rules={[{ required: true, message: '请输入取值范围' }]}
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
                  label="小数位"
                  placeholder="请输入小数位"
                  rules={[{ required: true, message: '请输入小数位' }]}
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
                  placeholder="比如：开启"
                  width="sm"
                />
                <ProFormText
                  label="false"
                  name={['rule', 'falseLabel']}
                  placeholder="比如：关闭"
                  width="sm"
                />
              </>
            );
          }
          if (type === Type.GEO) {
            dom = (
              <>
                <ProFormDigit
                  label="经度"
                  name={['rule', 'latitude']}
                  placeholder="请输入经度"
                  width="md"
                />
                <ProFormDigit
                  label="纬度"
                  name={['rule', 'longitude']}
                  placeholder="请输入维度"
                  width="md"
                />
              </>
            );
          }

          return (
            <ProCard
              ghost
              title={<div className="text-[14px] font-normal">数据定义</div>}
              headStyle={{ paddingBlockStart: 0 }}
            >
              <ProForm.Group style={{ padding: 10, border: '1px solid #0505050f' }}>
                {['STRING', 'INTEGER', 'FLOAT', 'BOOL'].includes(type) && (
                  <ProFormText
                    name={['rule', 'defaultValue']}
                    width="md"
                    label="默认值"
                    placeholder="请输入默认值"
                  />
                )}

                {dom}
              </ProForm.Group>
            </ProCard>
          );
        }}
      </ProFormDependency>
      <ProForm.Group style={{ marginTop: 24 }}>
        <ProForm.Item name="unit" label="单位" className="w-[328px]">
          <AutoComplete options={unitOptions} style={{ width: '100%' }} placeholder="请输入单位" />
        </ProForm.Item>

        <ProFormRadio.Group
          name="rw"
          label="读写"
          valueEnum={rwOption}
          rules={[{ required: true, message: '请选择读写' }]}
        />
      </ProForm.Group>

      <ProFormText name="description" label="描述" placeholder="请输入描述" width="md" />
    </ModalForm>
  );
};

export default PropertyForm;
