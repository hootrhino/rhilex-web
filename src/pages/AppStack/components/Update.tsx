import { message } from '@/components/PopupHack';

import ProCodeEditor from '@/components/ProCodeEditor';
import ProSegmented from '@/components/ProSegmented';
import useGoBack from '@/hooks/useGoBack';
import { getAppDetail, postAppCreate, putAppUpdate } from '@/services/rulex/qingliangyingyong';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import { useEffect, useRef } from 'react';
import { history, useParams, useRequest } from 'umi';

type CreatAppParams = {
  name: string;
  version: string;
  autoStart: boolean;
  description: string;
};

type UpdateAppParams = CreatAppParams & {
  uuid: string;
  luaSource: string;
};

const DefaultListUrl = '/app-stack/list';

const defaultValue = {
  name: '',
  version: '1.0.0',
  type: 'lua',
  autoStart: 'true',
  luaSource: '',
  description: '',
};

const UpdateForm = () => {
  const { id } = useParams();
  const { showModal } = useGoBack();
  const formRef = useRef<ProFormInstance>();

  // 获取详情
  const { run: getDetail, data: detail } = useRequest(
    (params: API.getAppDetailParams) => getAppDetail(params),
    {
      manual: true,
      formatResult: (res) => res?.data,
    },
  );

  // 新建
  const { run: add, loading: addLoading } = useRequest(
    (params: CreatAppParams) => postAppCreate(params),
    {
      manual: true,
      onSuccess: () => {
        message.success('新建成功');
        history.push(DefaultListUrl);
      },
    },
  );

  // 编辑
  const { run: update, loading: updateLoading } = useRequest(
    (params: UpdateAppParams) => putAppUpdate(params),
    {
      manual: true,
      onSuccess: () => {
        message.success('更新成功');
        history.push(DefaultListUrl);
      },
    },
  );

  const handleOnFinish = async (values: any) => {
    try {
      const params = {
        ...values,
        type: 'lua',
      };
      if (id) {
        update({ ...params, uuid: id });
      } else {
        add(params);
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    if (detail) {
      formRef.current?.setFieldsValue(detail);
    } else {
      formRef.current?.setFieldsValue(defaultValue);
    }
  }, [detail]);

  useEffect(() => {
    if (id) {
      getDetail({ uuid: id });
    }
  }, [id]);

  return (
    <PageContainer
      header={{ title: id ? '更新应用' : '新建应用' }}
      onBack={() => showModal({ url: DefaultListUrl })}
    >
      <ProCard>
        <ProForm
          formRef={formRef}
          onFinish={handleOnFinish}
          submitter={{
            render: ({ reset, submit }) => {
              return (
                <FooterToolbar>
                  <Popconfirm
                    key="reset"
                    title="重置可能会丢失数据，确定要重置吗？"
                    onConfirm={() => {
                      reset();
                      formRef.current?.setFieldsValue(
                        id ? { ...defaultValue, ...detail } : defaultValue,
                      );
                    }}
                  >
                    <Button>重置</Button>
                  </Popconfirm>

                  <Button
                    key="submit"
                    type="primary"
                    onClick={submit}
                    loading={addLoading || updateLoading}
                  >
                    提交
                  </Button>
                </FooterToolbar>
              );
            },
          }}
        >
          <ProForm.Group>
            <ProFormText
              label="APP 名称"
              name="name"
              width="md"
              placeholder="请输入 APP 名称"
              rules={[{ required: true, message: '请输入 APP 名称' }]}
            />
            <ProFormText
              label="APP 版本"
              name="version"
              width="md"
              placeholder="请输入 APP 版本"
              rules={[{ required: true, message: '请输入 APP 版本' }]}
            />
            <ProForm.Item
              label="是否自启"
              name="autoStart"
              required
              transform={(value: string) => ({ autoStart: value === 'true' ? true : false })}
              convertValue={(value: boolean) => value?.toString()}
            >
              <ProSegmented width="md" />
            </ProForm.Item>
            <ProFormText label="备注" name="description" width="md" placeholder="请输入备注" />
          </ProForm.Group>
          <ProFormDependency name={['type']}>
            {({ type }) => {
              if (type !== 'lua') return;
              return (
                id && <ProCodeEditor label="Lua 源码" name="luaSource" ref={formRef} required />
              );
            }}
          </ProFormDependency>
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default UpdateForm;
