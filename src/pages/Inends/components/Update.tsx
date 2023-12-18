import { useEffect, useRef, useState } from 'react';

import { history, useParams, useRequest } from 'umi';

import { message } from '@/components/PopupHack';
import useGoBack from '@/hooks/useGoBack';
import {
  getInendsDetail,
  postInendsCreate,
  putInendsUpdate,
} from '@/services/rulex/shuruziyuanguanli';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormDigit,
  ProFormList,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import random from 'lodash/random';
import {
  defaultConfig,
  defaultIothubConfig,
  eventEnum,
  modeEnum,
  typeEnum,
} from './initialValue';

const DefaultListUrl = '/inends/list';

const UpdateForm = () => {
  const formRef = useRef<ProFormInstance>();
  const { uuid } = useParams();
  const { showModal } = useGoBack();
  const [loading, setLoading] = useState<boolean>(false);
  const randomNumber = random(1000, 9999);
  const defaultValue = { type: 'COAP', config: defaultConfig['COAP'] }

  // 获取详情
  const { data: detail } = useRequest(
    () => getInendsDetail({uuid: uuid || ''}),
    {
      ready: !!uuid,
      refreshDeps: [uuid]
    },
  );

  // 新建&编辑
  const handleOnFinish = async (values: any) => {
    setLoading(true);
    try {
      const params = {
        ...values,
        config: values?.config?.[0],
      };
      if (uuid) {
        await putInendsUpdate({ ...params, uuid });
        message.success('更新成功');
      } else {
        const { msg } = await postInendsCreate(params);
        if (msg === 'Success') {
          message.success('创建成功');
        } else {
          message.warning(`创建成功，但是暂时无法正常工作，请及时调整配置参数。错误信息：${msg}`);
        }
      }
      setLoading(false);
      history.push(DefaultListUrl);
      return true;
    } catch (error) {
      setLoading(false);
      history.push(DefaultListUrl);
      return false;
    }
  };

  useEffect(() => {
    if (detail) {
      formRef.current?.setFieldsValue({ ...detail, config: [detail?.config] });
    } else {
      formRef.current?.setFieldsValue(defaultValue);
    }
  }, [detail]);

  return (
    <PageContainer
      header={{ title: uuid ? '编辑资源' : '新建资源' }}
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
                        uuid
                          ? { ...detail, config: [detail?.config] }
                          : defaultValue,
                      );
                    }}
                  >
                    <Button>重置</Button>
                  </Popconfirm>

                  <Button key="submit" type="primary" onClick={submit} loading={loading}>
                    提交
                  </Button>
                </FooterToolbar>
              );
            },
          }}
          onValuesChange={(changedValue) => {
            if (!changedValue?.type) return;

            let config;
            if (changedValue?.type === 'GENERIC_IOT_HUB') {
              config = defaultIothubConfig(randomNumber);
            } else {
              config = defaultConfig[changedValue?.type]
            }

            formRef.current?.setFieldsValue({
              config: changedValue?.type === detail?.type ? [detail?.config] : config,
            });
          }}
        >
          <ProForm.Group>
            <ProFormText
              label="资源名称"
              name="name"
              width="md"
              placeholder="请输入资源名称"
              rules={[
                {
                  required: true,
                  message: '请输入资源名称',
                },
              ]}
            />
            <ProFormSelect
              label="资源类型"
              name="type"
              valueEnum={typeEnum}
              width="md"
              placeholder="请选择资源类型"
              rules={[
                {
                  required: true,
                  message: '请选择资源类型',
                },
              ]}
            />
            <ProFormText label="备注" name="description" width="md" placeholder="请输入备注" />
          </ProForm.Group>
          <ProForm.Group title="资源配置" titleStyle={{ marginBlockEnd: 24 }}>
            <ProFormDependency name={['type']}>
              {({ type }) => {
                if (!type) return;

                return (
                  <ProFormList
                    name="config"
                    creatorButtonProps={false}
                    copyIconProps={false}
                    deleteIconProps={false}
                  >
                    <>
                      <ProForm.Group>
                        {type === 'INTERNAL_EVENT' ? (
                          <ProFormSelect
                            label="事件类型"
                            name="type"
                            valueEnum={eventEnum}
                            width="md"
                            placeholder="请选择事件类型"
                            rules={[
                              {
                                required: true,
                                message: '请选择事件类型',
                              },
                            ]}
                          />
                        ) : (
                          <>
                            <ProFormText
                              name="host"
                              label="服务地址"
                              width="md"
                              placeholder="请输入服务地址"
                              rules={[{ required: true, message: '请输入服务地址' }]}
                            />
                            <ProFormDigit
                              name="port"
                              label="端口"
                              width="md"
                              placeholder="请输入端口"
                              rules={[{ required: true, message: '请输入端口' }]}
                            />
                          </>
                        )}

                        {type === 'GENERIC_IOT_HUB' && (
                          <>
                            <ProFormSelect
                              label="模式"
                              name="mode"
                              width="md"
                              valueEnum={modeEnum}
                              placeholder="请选择模式"
                              rules={[
                                {
                                  required: true,
                                  message: '请选择模式',
                                },
                              ]}
                            />
                            <ProFormText
                              label="产品 ID"
                              name="productId"
                              width="md"
                              placeholder="请输入产品 ID"
                              rules={[
                                {
                                  required: true,
                                  message: '请输入产品 ID',
                                },
                              ]}
                            />
                          </>
                        )}

                        {type === 'NATS_SERVER' && (
                          <ProFormText
                            label="主题"
                            name="topic"
                            width="md"
                            placeholder="请输入主题"
                            rules={[
                              {
                                required: true,
                                message: '请输入主题',
                              },
                            ]}
                          />
                        )}
                      </ProForm.Group>
                      {type === 'GENERIC_IOT_HUB' && (
                        <ProForm.Group>
                          <ProFormText
                            label="设备名"
                            name="deviceName"
                            width="md"
                            placeholder="请输入设备名"
                            rules={[
                              {
                                required: true,
                                message: '请输入设备名',
                              },
                            ]}
                          />
                          <ProFormText
                            label="客户端 ID"
                            name="clientId"
                            width="md"
                            placeholder="请输入客户端 ID"
                            rules={[
                              {
                                required: true,
                                message: '请输入客户端 ID',
                              },
                            ]}
                          />
                          <ProFormText
                            label="用户名称"
                            name="username"
                            width="md"
                            placeholder="请输入用户名称"
                            rules={[
                              {
                                required: true,
                                message: '请输入用户名称',
                              },
                            ]}
                          />
                          <ProFormText.Password
                            label="用户密码"
                            name="password"
                            width="md"
                            placeholder="请输入用户密码"
                            rules={[
                              {
                                required: true,
                                message: '请输入用户密码',
                              },
                            ]}
                          />
                        </ProForm.Group>
                      )}
                    </>
                  </ProFormList>
                );
              }}
            </ProFormDependency>
          </ProForm.Group>
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default UpdateForm;
