import ProCodeEditor from '@/components/ProCodeEditor';
import { getUserluaDetail } from '@/services/rulex/yonghudingyiluamoban';
import { PlusCircleOutlined } from '@ant-design/icons';
import type { ModalFormProps, ProFormInstance } from '@ant-design/pro-components';
import {
  ModalForm,
  ProForm,
  ProFormList,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useIntl, useRequest } from '@umijs/max';
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
  const { formatMessage } = useIntl();

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
      title={
        tplId
          ? formatMessage({ id: 'component.modal.title.editRule' })
          : formatMessage({ id: 'component.modal.title.newRule' })
      }
      width="45%"
      formRef={formRef}
      initialValues={initialValue}
      {...props}
    >
      <ProForm.Group>
        <ProFormText
          name="label"
          label={formatMessage({ id: 'component.form.title.name' })}
          width="md"
          placeholder={formatMessage({ id: 'component.form.placeholder.name' })}
          rules={[
            { required: true, message: formatMessage({ id: 'component.form.placeholder.name' }) },
          ]}
        />
        <ProFormText
          name="detail"
          label={formatMessage({ id: 'table.desc' })}
          width="md"
          placeholder={formatMessage({ id: 'placeholder.desc' })}
          rules={[{ required: true, message: formatMessage({ id: 'placeholder.desc' }) }]}
        />
      </ProForm.Group>
      <ProCodeEditor
        name="apply"
        label={formatMessage({ id: 'component.form.title.apply' })}
        ref={formRef}
        required
        showTpl={false}
        collapsible={false}
      />
      <ProFormList
        required
        name="variables"
        label={formatMessage({ id: 'component.form.title.var' })}
        min={1}
        creatorButtonProps={false}
        creatorRecord={initialVariable}
        actionRender={(_, action, defaultActionDom) => {
          return [
            <Tooltip key="add" title={formatMessage({ id: 'component.tooltip.newVar' })}>
              <PlusCircleOutlined onClick={() => action.add()} className="ml-[10px]" />
            </Tooltip>,
            ...defaultActionDom,
          ];
        }}
      >
        <ProForm.Group>
          <ProFormText
            name="label"
            width="sm"
            placeholder={formatMessage({ id: 'component.form.placeholder.varDesc' })}
          />
          <ProFormText
            name="name"
            width="sm"
            placeholder={formatMessage({ id: 'component.form.placeholder.varName' })}
          />
          <ProFormSelect
            name="type"
            width="sm"
            placeholder={formatMessage({ id: 'component.form.placeholder.varType' })}
            options={['string', 'number', 'boolean']}
          />
        </ProForm.Group>
      </ProFormList>
    </ModalForm>
  );
};

export default UpdateForm;
