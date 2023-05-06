import FormFooter from '@/components/FromFooter';
import FullScreenEditor from '@/components/FullScreenEditor';
import { message } from '@/components/PopupHack';
import useGoBack from '@/hooks/useGoBack';
import { getApp,postApp,putApp } from '@/services/rulex/qingliangyingyong';
import {
PageContainer,
ProCard,
ProForm,
ProFormInstance,
ProFormSegmented,
ProFormSelect,
ProFormText
} from '@ant-design/pro-components';
import { useEffect,useRef } from 'react';
import { history,useParams,useRequest } from 'umi';

type FormItem = {
  name: string;
  version: string;
  autoStart: boolean;
  description: string;
  luaSource: string;
};

const UpdateForm = () => {
  const formRef = useRef<ProFormInstance>();
  const { id } = useParams();
  const editorRef = useRef(null);
  const { showModal } = useGoBack();

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
        // if (code === 200) {
        //   message.success('更新成功');
        //   history.push('/app-stack/list');
        // } else {
        //   message.error(msg || '更新失败');
        // }
        message.success('更新成功');
          history.push('/app-stack/list');
      } else {
        await postApp(params);
        message.success('新建成功');
        history.push('/app-stack/list');
      }
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
        version: '1.0.0',
        type: 'lua',
        autoStart: 'true',
        luaSource: '',
        description: '',
      });
    }
  }, [id]);

  return (
    <PageContainer
      header={{ title: id ? '更新应用' : '新建应用' }}
      onBack={() => showModal({url: '/app-stack/list'})}
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
          <ProForm.Group>
            <ProFormText
              width="lg"
              name="name"
              label="APP 名称"
              rules={[{ required: true, message: '请输入 APP 名称' }]}
            />
            <ProFormText
              width="lg"
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
              width="lg"
              fieldProps={{ block: true } as any}
              rules={[{ required: true, message: '请选择是否自启' }]}
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormSelect
              width="lg"
              label="脚本类型"
              name="type"
              tooltip={
                <a href="https://rulex.pages.dev/" target="_blank" rel="noreferrer">
                  详细戳这里
                </a>
              }
              options={[
                { label: 'LUA脚本', value: 'lua' },
                // { label: '规则表达式', value: 'expr' },
              ]}
              placeholder="请选择脚本类型"
              rules={[{ required: true, message: '请选择脚本类型' }]}
            />
            <ProFormText width="lg" name="description" label="描述信息" />
          </ProForm.Group>

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
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default UpdateForm;
