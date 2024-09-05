import CodeEditor, { Lang } from '@/components/CodeEditor';
import { postRulesFormatLua } from '@/services/rhilex/guizeguanli';
import { getUserluaDetail } from '@/services/rhilex/yonghudingyiluamoban';
import { CodeOutlined, PlusCircleOutlined } from '@ant-design/icons';
import type { ModalFormProps, ProFormInstance } from '@ant-design/pro-components';
import {
  ModalForm,
  ProForm,
  ProFormList,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useIntl, useRequest } from '@umijs/max';
import { Button, Space, Tooltip } from 'antd';
import { useEffect, useRef } from 'react';
import { TplDataType } from '../enum';

const initialVariable = {
  label: '',
  name: '',
  type: TplDataType.STRING,
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

  // 代码格式化
  const handleOnFormatCode = async () => {
    const code = formRef.current?.getFieldValue('apply');
    const { data } = await postRulesFormatLua({ source: code });

    formRef.current?.setFieldsValue({ apply: data.source });
  };

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
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
        className: 'rule-modal',
      }}
      className="rule-form"
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
          label={formatMessage({ id: 'table.title.desc' })}
          width="md"
          placeholder={formatMessage({ id: 'placeholder.desc' })}
          rules={[{ required: true, message: formatMessage({ id: 'placeholder.desc' }) }]}
        />
      </ProForm.Group>
      <ProForm.Item
        name="apply"
        rootClassName="rule-label"
        label={
          <Space className="w-full justify-between">
            <span>{formatMessage({ id: 'component.form.title.apply' })}</span>
            <Button
              type="primary"
              key="code-format"
              size="small"
              icon={<CodeOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                handleOnFormatCode();
              }}
            >
              {formatMessage({ id: 'component.button.format' })}
            </Button>
          </Space>
        }
        rules={[
          {
            required: true,
            message: formatMessage(
              { id: 'placeholder.input' },
              { text: formatMessage({ id: 'component.form.title.apply' }) },
            ),
          },
        ]}
        // className="w-full"
      >
        <CodeEditor key="luaSource" minHeight="400px" lang={Lang.LUA} />
      </ProForm.Item>
      <ProFormList
        required
        name="variables"
        label={formatMessage({ id: 'component.form.title.var' })}
        min={1}
        creatorButtonProps={false}
        // creatorRecord={initialVariable}
        actionRender={(_, action, defaultActionDom) => {
          return [
            <Tooltip key="add" title={formatMessage({ id: 'component.tooltip.newVar' })}>
              <PlusCircleOutlined
                onClick={() => action.add(initialVariable)}
                className="ml-[10px]"
              />
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
