import { useEffect, useRef, useState } from 'react';

import { history, useParams, useRequest } from 'umi';

import { message } from '@/components/PopupHack';
import useGoBack from '@/hooks/useGoBack';
import { getInendsDetail, postInends, putInends } from '@/services/rulex/shuruziyuanguanli';
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
  defaultCoapConfig,
  defaultGrpcConfig,
  defaultHttpConfig,
  defaultIothubConfig,
  defaultNatsConfig,
  defaultUdpConfig,
  modeEnum,
  typeEnum,
} from './initialValue';

const DefaultListUrl = '/inends/list';

const UpdateForm = () => {
  const formRef = useRef<ProFormInstance>();
  const { id } = useParams();
  const { showModal } = useGoBack();
  const [loading, setLoading] = useState<boolean>(false);
  const randomNumber = random(1000, 9999);

  // 获取详情
  const { run: getDetail, data: detail } = useRequest(
    (params: API.getInendsDetailParams) => getInendsDetail(params),
    {
      manual: true,
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
      if (id) {
        await putInends({ ...params, uuid: id });
        message.success('更新成功');
      } else {
        const { msg } = await postInends(params);
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
      return false;
    }
  };

  useEffect(() => {
    if (detail) {
      formRef.current?.setFieldsValue({ ...detail, config: [detail?.config] });
    } else {
      formRef.current?.setFieldsValue({ type: 'COAP', config: defaultCoapConfig });
    }
  }, [detail]);

  useEffect(() => {
    if (id) {
      getDetail({ uuid: id });
    }
  }, [id]);

  return (
    <PageContainer
      header={{ title: id ? '编辑资源' : '新建资源' }}
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
                        id
                          ? { ...detail, config: [detail?.config] }
                          : { type: 'COAP', config: defaultCoapConfig },
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

            switch (changedValue?.type) {
              case 'COAP':
                config = defaultCoapConfig;

                break;
              case 'GENERIC_IOT_HUB':
                config = defaultIothubConfig(randomNumber);

                break;
              case 'RULEX_UDP':
                config = defaultUdpConfig;

                break;
              case 'HTTP':
                config = defaultHttpConfig;
                break;
              case 'NATS_SERVER':
                config = defaultNatsConfig;

                break;
              case 'GRPC':
                config = defaultGrpcConfig;
                break;
              default:
                config = defaultCoapConfig;
                break;
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
          <ProFormDependency name={['type']}>
            {({ type }) => {
              return (
                <ProFormList
                  name="config"
                  label="资源配置"
                  creatorButtonProps={false}
                  copyIconProps={false}
                  deleteIconProps={false}
                >
                  {type === 'GENERIC_IOT_HUB' ? (
                    <>
                      <ProForm.Group>
                        <ProFormDigit
                          name="host"
                          label="主机地址"
                          width="md"
                          placeholder="请输入主机地址"
                          rules={[{ required: true, message: '请输入主机地址' }]}
                        />
                        <ProFormDigit
                          name="port"
                          label="服务端口"
                          width="md"
                          placeholder="请输入服务端口"
                          rules={[{ required: true, message: '请输入服务端口' }]}
                        />
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
                      </ProForm.Group>
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
                    </>
                  ) : (
                    <ProForm.Group>
                      <ProFormDigit
                        name="host"
                        label="主机地址"
                        width="md"
                        placeholder="请输入主机地址"
                        rules={[{ required: true, message: '请输入主机地址' }]}
                      />
                      <ProFormDigit
                        name="port"
                        label="服务端口"
                        width="md"
                        placeholder="请输入服务端口"
                        rules={[{ required: true, message: '请输入服务端口' }]}
                      />
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
                  )}
                </ProFormList>
              );
            }}
          </ProFormDependency>
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default UpdateForm;
