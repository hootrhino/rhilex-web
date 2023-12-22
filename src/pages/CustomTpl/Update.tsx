import ProCodeEditor from '@/components/ProCodeEditor';
import ProFormSubmitter from '@/components/ProFormSubmitter';
import useGoBack from '@/hooks/useGoBack';
import {
  getUserluaDetail,
  postUserluaCreate,
  putUserluaUpdate,
} from '@/services/rulex/yonghuLUApianduan';
import { PlusCircleOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormList,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { history, useParams, useRequest } from '@umijs/max';
import { message, Tooltip } from 'antd';
import { useEffect, useRef, useState } from 'react';

type FormParams = {
  label: string;
  apply: string;
  detail: string;
  variables: TplVariables[];
};

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

const UpdateForm = () => {
  const { groupId, tplId } = useParams();
  const formRef = useRef<ProFormInstance>();
  const { showModal } = useGoBack();
  const [loading, setLoading] = useState<boolean>(false);

  // 详情
  const { data: detail } = useRequest(() => getUserluaDetail({ uuid: tplId || '' }), {
    ready: !!tplId,
  });

  const handleOnFinish = async (values: FormParams) => {
    setLoading(true);
    try {
      const params = {
        ...values,
        gid: groupId || '',
        type: 'function',
      };
      if (tplId) {
        // 编辑
        await putUserluaUpdate({ ...params, uuid: tplId });
        message.success('更新成功');
      } else {
        // 新增
        await postUserluaCreate({
          ...params,
          variables: params.variables?.map((val) => ({ ...val, value: '' })),
        });
        message.success('新建成功');
      }
      setLoading(false);
      history.push('/custom-tpl/list');
      return true;
    } catch (error) {
      return false;
    }
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
    <PageContainer
      header={{ title: tplId ? '编辑自定义模板' : '新增自定义模板' }}
      onBack={() => showModal({ url: '/custom-tpl' })}
    >
      <ProCard>
        <ProForm
          formRef={formRef}
          onFinish={handleOnFinish}
          submitter={{
            render: ({ reset, submit }) => (
              <ProFormSubmitter
                handleOnSubmit={submit}
                handleOnReset={() => {
                  reset();
                  handleOnReset();
                }}
                loading={loading}
              />
            ),
          }}
        >
          <ProForm.Group>
            <ProFormText
              name="label"
              label="模板名称"
              width="xl"
              placeholder="请输入模板名称"
              rules={[{ required: true, message: '请输入模板名称' }]}
            />
            <ProFormText
              name="detail"
              label="备注"
              width="xl"
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
            actionRender={(props, action, defaultActionDom) => {
              return [
                <Tooltip key="add" title="新建变量">
                  <PlusCircleOutlined onClick={() => action.add()} className="ml-[10px]" />
                </Tooltip>,
                ...defaultActionDom,
              ];
            }}
          >
            <ProForm.Group>
              <ProFormText name="label" width="md" placeholder='请输入变量描述' />
              <ProFormText name="name" width="md" placeholder='请输入变量名' />
              <ProFormSelect
                name="type"
                width="md"
                placeholder='请选择变量类型'
                options={['string', 'number', 'boolean']}
              />
            </ProForm.Group>
          </ProFormList>
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default UpdateForm;
