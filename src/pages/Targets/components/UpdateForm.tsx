import React, { useEffect, useRef } from 'react';

import type { Item } from '..';
import {
  ModalForm,
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { isEmpty } from 'lodash';

import './index.less';

export type FormItem = {
  name: string;
  type: string;
  description: string;
  config: any;
  uuid?: string;
};

export type UpdateFormProps = {
  updateModalVisible: boolean;
  values?: Item | undefined;
  onSubmit: (values: FormItem) => void;
  onCancel: () => void;
  onVisibleChange: (value: boolean) => void;
};

// const renderMQTTForm = (type: string) => {
//   return (
//     <div className={type === 'telemetering' ? 'telemeter-config' : 'target-config'}>
//       <ProFormText
//         label="服务地址"
//         name="server"
//         rules={[{ required: true, message: '请输入服务地址' }]}
//       />
//       <ProFormDigit
//         label="服务端口"
//         name="port"
//         rules={[{ required: true, message: '请输入服务端口' }]}
//       />
//       <ProFormText
//         label="订阅 Topic"
//         name="theme"
//         rules={[{ required: true, message: '请输入订阅 Topic' }]}
//       />
//       {type === 'telemetering' && renderTelemeterForm()}
//       <ProFormText
//         label="客户端 ID"
//         name="clientId"
//         rules={[{ required: true, message: '请输入客户端ID' }]}
//       />
//       <ProFormText
//         label="MQTT 用户名"
//         name="username"
//         rules={[{ required: true, message: '请输入用户名' }]}
//       />
//       <ProFormText.Password
//         label="MQTT 密码"
//         name="password"
//         rules={[{ required: true, message: '请输入密码' }]}
//       />
//     </div>
//   );
// };

// const renderTelemeterForm = () => {
//   return (
//     <>
//       <ProFormText
//         label="拓扑同步 Topic"
//         name="theme"
//         rules={[{ required: true, message: '请输入拓扑同步 Topic' }]}
//       />
//       <ProFormText
//         label="日志同步 Topic"
//         name="theme"
//         rules={[{ required: true, message: '请输入日志同步 Topic' }]}
//       />
//       <ProFormText
//         label="自定义数据上传 Topic"
//         name="theme"
//         rules={[{ required: true, message: '请输入自定义数据上传 Topic' }]}
//       />
//       <ProFormText
//         label="状态同步 Topic"
//         name="theme"
//         rules={[{ required: true, message: '请输入状态同步 Topic' }]}
//       />
//     </>
//   );
// };

const renderMongoForm = () => {
  return (
    <div className="mongo-config">
      <ProFormText
        label="MongoDB URL"
        name={['config', 'mongoUrl']}
        rules={[{ required: true, message: '请输入 MongoDB URL' }]}
      />
      <ProFormText
        label="MongoDB 数据库"
        name={['config', 'database']}
        rules={[{ required: true, message: '请输入 MongoDB 数据库' }]}
      />
      <ProFormText
        label="MongoDB 集合"
        name={['config', 'collection']}
        rules={[{ required: true, message: '请输入 MongoDB 集合' }]}
      />
    </div>
  );
};

// const renderTDEngineForm = () => {
//   return (
//     <div className="tdEngine-config">
//       <ProFormText
//         label="服务地址"
//         name="server"
//         rules={[{ required: true, message: '请输入服务地址' }]}
//       />
//       <ProFormDigit
//         label="服务端口"
//         name="port"
//         rules={[{ required: true, message: '请输入服务端口' }]}
//       />
//       <ProFormText
//         label="用户名"
//         name="username"
//         rules={[{ required: true, message: '请输入用户名' }]}
//       />
//       <ProFormText.Password
//         label="密码"
//         name="password"
//         rules={[{ required: true, message: '请输入密码' }]}
//       />
//       <ProFormText
//         label="数据库名"
//         name="username"
//         rules={[{ required: true, message: '请输入数据库名' }]}
//       />
//       <ProFormText
//         label="建库 SQL"
//         name="username"
//         rules={[{ required: true, message: '请输入建库 SQL' }]}
//       />
//       <ProFormText
//         label="建表 SQL"
//         name="username"
//         rules={[{ required: true, message: '请输入建表 SQL' }]}
//       />
//       <ProFormText
//         label="插入 SQL"
//         name="username"
//         rules={[{ required: true, message: '请输入 SQL' }]}
//       />
//     </div>
//   );
// };

const UpdateForm: React.FC<UpdateFormProps> = ({
  onSubmit,
  onCancel,
  updateModalVisible,
  values,
}) => {
  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    if (!isEmpty(values)) {
      formRef.current?.setFieldsValue(values);
    } else {
      formRef.current?.setFieldsValue({
        name: undefined,
        type: undefined,
        description: undefined,
      });
    }
  }, [values]);

  return (
    <ModalForm
      title={values?.uuid ? '编辑目标' : '新建目标'}
      formRef={formRef}
      layout="horizontal"
      labelCol={{ span: 3 }}
      visible={updateModalVisible}
      onFinish={async (data: FormItem) => await onSubmit(data)}
      modalProps={{ maskClosable: false, onCancel }}
    >
      <ProFormText
        label="目标名称"
        name="name"
        rules={[
          {
            required: true,
            message: '目标名称为必填项',
          },
        ]}
      />
      <ProFormSelect
        label="目标类型"
        name="type"
        options={[
          // { label: 'MQTT 桥接', value: 'bridging' },
          // { label: 'MQTT 遥测', value: 'telemetering' },
          { label: 'MongoDB', value: 'MONGO_SINGLE' },
          // { label: 'TdEngine', value: 'tdEngine' },
        ]}
        placeholder="请选择目标类型"
        rules={[{ required: true, message: '请选择目标类型' }]}
      />
      <ProFormDependency name={['type']}>
        {({ type }) => {
          return type ? (
            <ProForm.Item label="目标配置">
              <ProCard bordered bodyStyle={{ paddingBlockEnd: 0 }}>
                {/* {['bridging', 'telemetering'].includes(type) && renderMQTTForm(type)} */}
                {type === 'MONGO_SINGLE' && renderMongoForm()}
                {/* {type === 'tdEngine' && renderTDEngineForm()} */}
              </ProCard>
            </ProForm.Item>
          ) : null;
        }}
      </ProFormDependency>
      <ProFormTextArea
        label="备注信息"
        name="description"
        rules={[{ required: true, message: '请输入备注信息' }]}
      />
    </ModalForm>
  );
};

export default UpdateForm;
