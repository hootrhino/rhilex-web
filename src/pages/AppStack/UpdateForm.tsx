import FormFooter from '@/components/FromFooter';
import FullScreenEditor from '@/components/FullScreenEditor';
import GoBackFooter from '@/components/GoBackFooter';
import { getApp,postApp,putApp } from '@/services/rulex/qingliangyingyong';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormSegmented,
  ProFormText,
} from '@ant-design/pro-components';
import { message, Modal } from 'antd';
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
  title: '离开可能会丢失数据，确定要返回列表吗？',
  footer: [<GoBackFooter onConfirm={() => history.push('/app-stack/list')} key="gobackFooter" />],
  onOk: () => history.push('/app-stack/list'),
  onCancel: () => Modal.destroyAll(),
};

const UpdateForm = () => {
  const formRef = useRef<ProFormInstance>();
  const { id } = useParams();
  const editorRef = useRef(null);
  const [modal, contextHolder] = Modal.useModal();

  // 获取详情
  const { run: getDetail, data: detail } = useRequest(() => getApp({ uuid: id || '' }), {
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
                  <FormFooter
                    onReset={() =>
                      id
                        ? formRef.current?.setFieldsValue({
                            ...detail,
                            autoStart: detail?.autoStart?.toString(),
                          })
                        : reset()
                    }
                    onSubmit={submit}
                  />
                );
              },
            }}
            onFinish={handleOnFinish}
          >
            <ProFormText
              name="name"
              label="APP 名称"
              rules={[{ required: true, message: '请输入 APP 名称' }]}
            />
            <ProFormText
              name="version"
              label="APP 版本"
              rules={[{ required: true, message: '请输入 APP 版本' }]}
            />
            <ProFormSegmented
              name="autoStart"
              label="是否自启"
              valueEnum={{
                true: '是',
                false: '否',
              }}
              width="md"
              fieldProps={{ block: true } as any}
              rules={[{ required: true, message: '请选择是否自启' }]}
            />
            {id && (
              <ProForm.Item
                name="luaSource"
                label="Lua 源码"
                rules={[
                  { required: true, message: '请输入 Lua 源码' },
                  // {
                  //   validator(_, value) {
                  //     console.log(value);
                  //     if (!value) {
                  //       return Promise.reject(new Error('请输入 Lua 源码'));
                  //     }
                  //     return Promise.resolve();
                  //   },
                  // },
                ]}
              >
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
