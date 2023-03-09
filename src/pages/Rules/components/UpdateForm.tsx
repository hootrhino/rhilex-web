import React, { useEffect, useRef, useState } from 'react';
// import AceEditor from 'react-ace';
// import type { IAceEditorProps } from 'react-ace';

import { useRequest } from 'umi';

import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ModalForm,
  ProFormDependency,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import type { Item } from '..';
// import 'ace-builds/src-noconflict/ext-language_tools';
// import 'ace-builds/src-noconflict/mode-lua';
// import 'ace-builds/src-noconflict/theme-monokai';
import { omit } from 'lodash';

import { getDevices } from '@/services/rulex/shebeiguanli';
import { getInends } from '@/services/rulex/shuruziyuanguanli';

export type FormItem = {
  actions: string;
  description: string;
  failed: string;
  fromSource: string[];
  fromDevice: string[];
  name: string;
  success: string;
};

export type UpdateFormProps = {
  updateModalVisible: boolean;
  values?: Item | undefined;
  onSubmit: (values: FormItem) => void;
  onCancel: () => void;
  onVisibleChange: (value: boolean) => void;
};

// const Editor = (props: IAceEditorProps) => (
//   <AceEditor
//     mode="lua"
//     theme="monokai"
//     setOptions={{
//       enableBasicAutocompletion: true,
//       enableLiveAutocompletion: true,
//       enableSnippets: true,
//       showLineNumbers: true,
//       showPrintMargin: false,
//       tabSize: 2,
//     }}
//     fontSize={16}
//     style={{ width: '100%', height: 300 }}
//     {...props}
//   />
// );

const defaultActions = `Actions = {
  function(data)
    --rulexlib:log(data)
    return true, data
  end
}`;
const defaultSuccess = `function Success()
--rulexlib:log("success")
end`;
const defaultFailed = `function Failed(error)
  rulexlib:log(error)
end`;

const UpdateForm: React.FC<UpdateFormProps> = ({
  onSubmit,
  onCancel,
  updateModalVisible,
  values,
}) => {
  const formRef = useRef<ProFormInstance>();
  const [sources, setSources] = useState([]);

  // 输入资源列表
  const getSourceList = useRequest(() => getInends(), {
    formatResult: (res: any) => res?.data,
    onSuccess: (data) => {
      const options = data?.map((item: any) => ({ label: item?.name, value: item?.uuid }));
      setSources(options);
    },
  });

  // 设备列表
  const getDeviceList = useRequest(() => getDevices(), {
    manual: true,
    formatResult: (res) => res?.data,
    onSuccess: (data) => {
      const options = data?.map((item: any) => ({ label: item?.name, value: item?.uuid }));
      setSources(options);
    },
  });

  useEffect(() => {
    if (values?.id) {
      formRef.current?.setFieldsValue(values);
    } else {
      formRef.current?.setFieldsValue({
        name: undefined,
        fromSource: undefined,
        fromDevice: undefined,
        description: undefined,
        actions: defaultActions,
        success: defaultSuccess,
        failed: defaultFailed,
        type: 'fromSource',
      });
    }
  }, [values]);

  return (
    <ModalForm
      title={values?.id ? '编辑规则' : '新建规则'}
      formRef={formRef}
      visible={updateModalVisible}
      onFinish={async (data) => {
        let params = omit(data, ['type']);
        params = {
          ...params,
          fromSource: params?.fromSource ? [params?.fromSource] : [],
          fromDevice: params?.fromDevice ? [params?.fromDevice] : [],
        };

        await onSubmit(params as FormItem);
      }}
      modalProps={{ maskClosable: false, onCancel }}
      initialValues={{
        actions: defaultActions,
        success: defaultSuccess,
        failed: defaultFailed,
        type: 'fromSource',
      }}
      onValuesChange={(changedValue) => {
        if (changedValue?.type === 'fromSource') {
          getSourceList?.run();
        } else if (changedValue?.type === 'fromDevice') {
          getDeviceList?.run();
        }
      }}
    >
      <ProFormText
        label="规则名称"
        name="name"
        rules={[
          {
            required: true,
            message: '规则名称为必填项',
          },
        ]}
      />
      <ProFormRadio.Group
        name="type"
        label="数据来源"
        options={[
          {
            label: '输入资源',
            value: 'fromSource',
          },
          {
            label: '设备',
            value: 'fromDevice',
          },
        ]}
      />
      <ProFormDependency name={['type']}>
        {({ type }) => {
          if (type === 'fromSource') {
            return (
              <ProFormSelect
                label="输入资源"
                name="fromSource"
                options={sources}
                placeholder="请选择数据源"
                rules={[{ required: true, message: '请选择数据源' }]}
              />
            );
          } else {
            return (
              <ProFormSelect
                label="输入资源"
                name="fromDevice"
                options={sources}
                placeholder="请选择数据源"
                rules={[{ required: true, message: '请选择数据源' }]}
              />
            );
          }
        }}
      </ProFormDependency>

      {/* <ProForm.Item
        label="规则回调"
        name="actions"
        rules={[{ required: true, message: '请输入规则回调' }]}
      >
        <Editor />
      </ProForm.Item>
      <ProForm.Item
        label="成功回调"
        name="success"
        rules={[{ required: true, message: '请输入成功回调' }]}
      >
        <Editor />
      </ProForm.Item>
      <ProForm.Item
        label="失败回调"
        name="failed"
        rules={[{ required: true, message: '请输入失败回调' }]}
      >
        <Editor />
      </ProForm.Item> */}
      <ProFormTextArea label="备注信息" name="description" />
    </ModalForm>
  );
};

export default UpdateForm;
