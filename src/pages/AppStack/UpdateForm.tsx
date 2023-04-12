import FullScreenEditor from '@/components/FullScreenEditor';
import { getApp, postApp, putApp } from '@/services/rulex/qingliangyingyong';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProCard,
  ProForm,
  ProFormSegmented,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, message, Modal, Popconfirm } from 'antd';
import { useEffect, useRef } from 'react';
import { history, useParams, useRequest } from 'umi';

type FormItem = {
  name: string;
  version: string;
  autoStart: boolean;
  description: string;
  luaSource: string;
};

const config = {
  title: '你还有表单未提交，确定要返回列表吗？',
  okText: '确定',
  onOk: () => history.push('/app-stack/list'),
};

const UpdateForm = () => {
  const formRef = useRef<ProFormInstance>();
  const { id } = useParams();
  const editorRef = useRef(null);
  const [modal, contextHolder] = Modal.useModal();

  // 获取详情
  const { run: getDetail } = useRequest(() => getApp({ uuid: id || '' }), {
    manual: true,
    formatResult: (res) => res?.data,
    onSuccess: (data) =>
      formRef.current?.setFieldsValue({
        ...data,
        autoStart: data?.autoStart?.toString(),
      }),
  });

  // 新建 & 编辑
  const handleOnFinish = async (values: FormItem) => {
    try {
      const params = { ...values, autoStart: Boolean(values?.autoStart) };
      if (id) {
        await putApp({ ...params, uuid: id });
      } else {
        await postApp(params);
      }
      message.success(id ? '更新成功' : '新建成功');
      history.push('/app-stack/list');
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    if (id) {
      getDetail();
    } else {
      formRef.current?.setFieldsValue({
        name: '',
        version: '',
        autoStart: 'true',
        luaSource: '',
        description: '',
      });
    }
  }, [id]);

  return (
    <>
      <PageContainer
        header={{ title: id ? '更新应用' : '新建应用' }}
        onBack={() => modal.warning(config)}
      >
        <ProCard>
          <ProForm
            formRef={formRef}
            submitter={{
              render: ({ reset, submit }) => {
                return (
                  <FooterToolbar>
                    <Popconfirm
                      key="reset"
                      title="重置会清空表单，确定要重置吗？"
                      onConfirm={reset}
                    >
                      <Button>重置</Button>
                    </Popconfirm>

                    <Button key="submit" type="primary" onClick={submit}>
                      提交
                    </Button>
                  </FooterToolbar>
                );
              },
            }}
            onFinish={handleOnFinish}
          >
            <ProFormText name="name" label="APP 名称" />
            <ProFormText name="version" label="APP 版本" />
            <ProFormSegmented
              name="autoStart"
              label="是否自启"
              valueEnum={{
                true: '是',
                false: '否',
              }}
              width="md"
              fieldProps={{ block: true } as any}
            />
            {id && (
              <ProForm.Item name="luaSource" label="Lua 源码">
                <FullScreenEditor ref={editorRef} />
              </ProForm.Item>
            )}
            <ProFormText name="description" label="描述信息" />
          </ProForm>
        </ProCard>
      </PageContainer>
      {contextHolder}
    </>
  );
};

export default UpdateForm;
