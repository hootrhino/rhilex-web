import ProCodeEditor from '@/components/ProCodeEditor';
import { getUserluaDetail } from '@/services/rulex/yonghuLuApianduan';
import { PlusCircleOutlined } from '@ant-design/icons';
import type { ModalFormProps, ProFormInstance } from '@ant-design/pro-components';
import {
  ModalForm,
  ProForm,
  ProFormList,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Tooltip } from 'antd';
import { useEffect, useRef } from 'react';

const initialVariable = {
  label: '',
  name: '',
  type: 'string',
};

const initialValue = {
  label: '',
  apply: '',
  detail: '',
  variables: [{ ...initialVariable }],
};

type RuleUpdateFormProps = ModalFormProps & {
  tplId: string;
};

const UpdateForm = ({ tplId, ...props }: RuleUpdateFormProps) => {
  const formRef = useRef<ProFormInstance>();

  // 详情
  const { data: detail } = useRequest(() => getUserluaDetail({ uuid: tplId || '' }), {
    ready: !!tplId,
  });

  const handleOnReset = () => {
    formRef.current?.setFieldsValue(initialValue);
  };

  useEffect(() => {
    if (detail) {
      formRef.current?.setFieldsValue(detail);
    } else {
      handleOnReset();
    }
  }, [detail]);

  return (
    <ModalForm
      title={tplId ? '编辑规则' : '添加规则'}
      width="45%"
      formRef={formRef}
      initialValues={initialValue}
      {...props}
    >
      <ProForm.Group>
        <ProFormText
          name="label"
          label="模板名称"
          width="md"
          placeholder="请输入模板名称"
          rules={[{ required: true, message: '请输入模板名称' }]}
        />
        <ProFormText
          name="detail"
          label="备注"
          width="md"
          placeholder="请输入模板描述"
          rules={[{ required: true, message: '请输入模板描述' }]}
        />
      </ProForm.Group>
      <ProCodeEditor
        name="apply"
        label="代码"
        ref={formRef}
        required
        showTpl={false}
        collapsible={false}
      />
      <ProFormList
        required
        name="variables"
        label="变量设置"
        min={1}
        creatorButtonProps={false}
        creatorRecord={initialVariable}
        actionRender={(_, action, defaultActionDom) => {
          return [
            <Tooltip key="add" title="新建变量">
              <PlusCircleOutlined onClick={() => action.add()} className="ml-[10px]" />
            </Tooltip>,
            ...defaultActionDom,
          ];
        }}
      >
        <ProForm.Group>
          <ProFormText name="label" width="sm" placeholder="请输入变量描述" />
          <ProFormText name="name" width="sm" placeholder="请输入变量名" />
          <ProFormSelect
            name="type"
            width="sm"
            placeholder="请选择变量类型"
            options={['string', 'number', 'boolean']}
          />
        </ProForm.Group>
      </ProFormList>
    </ModalForm>
  );
};

export default UpdateForm;
