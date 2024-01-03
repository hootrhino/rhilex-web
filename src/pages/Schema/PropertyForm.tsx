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
import { useRef, useState } from 'react';
import type { ActiveSchema, Property } from '.';
import { rwEnum, typeEnum, unitOptions } from './enum';

type PropertyFormProps = ModalFormProps & {
  activeSchema: ActiveSchema;
};

const PropertyForm = ({ activeSchema, ...props }: PropertyFormProps) => {
  const formRef = useRef<ProFormInstance>();
  const [initialValue, setInitialValue] = useState<Partial<Property>>();

  return (
    <ModalForm
      // title={initialValue?.uuid ? '更新物模型' : '新建物模型'}
      title="新增属性"
      formRef={formRef}
      width="50%"
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
        // afterOpenChange(open) {
        //   if (!open) {
        //     setInitialValue({});
        //   }
        // },
      }}
      initialValues={{ rw: 'R', type: 'STRING', rule: { latitude: 0, longitude: 0 } }}
      {...props}
    >
      <ProForm.Group>
        <ProFormText
          name="label"
          label="属性名称"
          placeholder="请输入属性名称"
          rules={[{ required: true, message: '请输入属性名称' }]}
          width="lg"
        />
        <ProFormText
          name="name"
          label="标志符"
          placeholder="请输入标志符"
          rules={[{ required: true, message: '请输入标志符' }]}
          width="lg"
        />
      </ProForm.Group>

      <ProFormSelect
        name="type"
        label="数据类型"
        valueEnum={typeEnum}
        placeholder="请选择标志符"
        rules={[{ required: true, message: '请选择标志符' }]}
      />
      <ProFormDependency name={['type']} labelCol={{ span: 4 }}>
        {({ type }) => {
          if (!type) return null;
          let dom: React.ReactNode;
          if (type === 'STRING') {
            dom = (
              <ProFormDigit
                name={['rule', 'maxLength']}
                width="lg"
                label="最大长度"
                placeholder="请输入最大长度"
              />
            );
          }
          if (type === 'INTEGER') {
            dom = (
              <ProFormDigitRange
                label="取值范围"
                name={['rule', 'range']}
                separator="~"
                placeholder={['最小值', '最大值']}
                separatorWidth={60}
                rules={[{ required: true, message: '请输入取值范围' }]}
              />
            );
          }
          if (type === 'FLOAT') {
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
          if (type === 'BOOL') {
            dom = (
              <>
                <ProFormText
                  label="布尔值-true"
                  name={['rule', 'trueLabel']}
                  placeholder="比如：开启"
                  width="sm"
                />
                <ProFormText
                  label="布尔值-false"
                  name={['rule', 'falseLabel']}
                  placeholder="比如：关闭"
                  width="sm"
                />
              </>
            );
          }
          if (type === 'GEO') {
            dom = (
              <>
                <ProFormDigit
                  label="经度"
                  name={['rule', 'latitude']}
                  placeholder="请输入经度"
                  width="sm"
                />
                <ProFormDigit
                  label="纬度"
                  name={['rule', 'longitude']}
                  placeholder="请输入维度"
                  width="sm"
                />
              </>
            );
          }

          return (
            <ProCard bordered ghost>
              <ProForm.Group style={{ padding: 10 }}>
                <ProFormText
                  name={['rule', 'defaultValue']}
                  width="md"
                  label="默认值"
                  placeholder="请输入默认值"
                />
                {dom}
              </ProForm.Group>
            </ProCard>
          );
        }}
      </ProFormDependency>

      <ProForm.Item name="unit" label="单位" className="mt-[16px]">
        <AutoComplete options={unitOptions} style={{ width: '100%' }} placeholder="请输入单位" />
      </ProForm.Item>

      <ProFormRadio.Group
        name="rw"
        label="读写"
        valueEnum={rwEnum}
        rules={[{ required: true, message: '请选择读写' }]}
      />
      <ProFormText name="description" label="描述" placeholder="请输入描述" />
    </ModalForm>
  );
};

export default PropertyForm;
