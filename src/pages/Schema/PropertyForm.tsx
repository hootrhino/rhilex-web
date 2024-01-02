import type { ModalFormProps, ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { AutoComplete } from 'antd';
import { useRef } from 'react';
import type { ActiveSchema } from '.';
import { rwEnum, typeEnum, unitOptions } from './enum';

type PropertyFormProps = ModalFormProps & {
  activeSchema: ActiveSchema;
};

const PropertyForm = ({ activeSchema, ...props }: PropertyFormProps) => {
  const formRef = useRef<ProFormInstance>();

  return (
    <ModalForm
      // title={initialValue?.uuid ? '更新物模型' : '新建物模型'}
      title="新增属性"
      formRef={formRef}
      width="40%"
      layout="horizontal"
      labelCol={{ span: 4 }}
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
        // afterOpenChange(open) {
        //   if (!open) {
        //     setInitialValue({});
        //   }
        // },
      }}
      // onFinish={async (value) => {
      //   let params = {
      //     ...value,
      //     schema: { iotProperties: [] },
      //   };
      //   if (initialValue?.uuid) {
      //     params = {
      //       ...params,
      //       uuid: initialValue?.uuid,
      //     };
      //   }

      //   handleOnUpdate(params, initialValue?.uuid ? 'edit' : 'new');
      // }}
      {...props}
    >
      <ProFormText
        name="label"
        width="lg"
        label="属性名称"
        placeholder="请输入属性名称"
        rules={[{ required: true, message: '请输入属性名称' }]}
      />
      <ProFormText
        name="name"
        width="lg"
        label="标志符"
        placeholder="请输入标志符"
        rules={[{ required: true, message: '请输入标志符' }]}
      />
      <ProFormSelect
        name="type"
        width="lg"
        label="数据类型"
        valueEnum={typeEnum}
        placeholder="请选择标志符"
        rules={[{ required: true, message: '请选择标志符' }]}
      />
      <ProForm.Item name="unit" label="单位" rules={[{ required: true, message: '请输入单位' }]}>
        <AutoComplete options={unitOptions} style={{ width: 440 }} placeholder="请输入单位" />
      </ProForm.Item>
      <ProFormSelect
        name="rw"
        width="lg"
        label="读写"
        valueEnum={rwEnum}
        placeholder="请选择读写"
        rules={[{ required: true, message: '请选择读写' }]}
      />
      <ProFormText name="description" width="lg" label="描述" placeholder="请输入描述" />
    </ModalForm>
  );
};

export default PropertyForm;
