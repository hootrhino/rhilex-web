import { message } from '@/components/PopupHack';

import { getOutendsDetail, postOutends, putOutends } from '@/services/rulex/shuchuziyuanguanli';

import useGoBack from '@/hooks/useGoBack';
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
import { pick } from 'lodash';
import random from 'lodash/random';
import { useEffect, useRef, useState } from 'react';
import { history, useParams, useRequest } from 'umi';
import { defaultMongoConfig, defaultMqttConfig, defaultUdpConfig, typeEnum } from './initialValue';

// type Config = {
//   host?: string;
//   port?: number;
//   clientId?: string;
//   username?: string;
//   password?: string;
//   productId?: string;
//   deviceName?: string;
//   timeout?: number;
//   [key: string]: any;
// };

// type UpdateFormItem<T = any> = {
//   type: string;
//   name: string;
//   description?: string;
//   config?: T;
//   uuid?: string;
// };

const DefaultListUrl = '/outends/list';

const UpdateForm = () => {
  const formRef = useRef<ProFormInstance>();
  const { id } = useParams();
  const { showModal } = useGoBack();
  const randomNumber = random(1000, 9999);
  const [loading, setLoading] = useState<boolean>(false);

  // 获取详情
  const { run: getDetail, data: detail } = useRequest(
    (params: API.getOutendsDetailParams) => getOutendsDetail(params),
    {
      manual: true,
    },
  );

  const handleOnFinish = async ({ config, ...values }: any) => {
    setLoading(true);
    try {
      let params = {
        ...values,
      };

      if (values?.type === 'MONGO_SINGLE') {
        params = {
          ...params,
          config: {
            ...pick(config?.[0], ['mongoUrl', 'database', 'collection']),
          },
        };
      }
      if (values?.type === 'MQTT') {
        params = {
          ...params,
          config: {
            ...pick(config?.[0], ['port', 'host', 'clientId', 'pubTopic', 'username', 'password']),
          },
        };
      }
      if (values?.type === 'UDP_TARGET') {
        params = {
          ...params,
          config: {
            ...pick(config?.[0], ['port', 'host', 'timeout']),
          },
        };
      }

      if (id) {
        await putOutends({ ...params, uuid: id } as any);
        message.success('更新成功');
      } else {
        const { msg } = await postOutends(params as any);
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
      formRef.current?.setFieldsValue({
        ...detail,
        config: [detail?.config],
      });
    } else {
      formRef.current?.setFieldsValue({
        type: 'MONGO_SINGLE',
        config: defaultMongoConfig,
      });
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
                          : { type: 'MONGO_SINGLE', config: defaultMongoConfig },
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
            let config: any = [];
            switch (changedValue?.type) {
              case 'MONGO_SINGLE':
                config = defaultMongoConfig;
                break;
              case 'MQTT':
                config = defaultMqttConfig(randomNumber);
                break;
              case 'UDP_TARGET':
                config = defaultUdpConfig;
                break;
              default:
                config = defaultMongoConfig;
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
              if (!type) return;

              return (
                <ProFormList
                  name="config"
                  label="资源配置"
                  creatorButtonProps={false}
                  copyIconProps={false}
                  deleteIconProps={false}
                >
                  {type === 'MONGO_SINGLE' && (
                    <ProForm.Group>
                      <ProFormText
                        label="MongoDB URL"
                        name="mongoUrl"
                        width="md"
                        placeholder="请输入 MongoDB URL"
                        rules={[
                          {
                            required: true,
                            message: '请输入 MongoDB URL',
                          },
                        ]}
                      />
                      <ProFormText
                        label="MongoDB 数据库"
                        name="database"
                        width="md"
                        placeholder="请输入 MongoDB 数据库"
                        rules={[
                          {
                            required: true,
                            message: '请输入 MongoDB 数据库',
                          },
                        ]}
                      />
                      <ProFormText
                        label="MongoDB 集合"
                        name="collection"
                        width="md"
                        placeholder="请输入 MongoDB 集合"
                        rules={[
                          {
                            required: true,
                            message: '请输入 MongoDB 集合',
                          },
                        ]}
                      />
                    </ProForm.Group>
                  )}
                  {type === 'MQTT' && (
                    <>
                      <ProForm.Group>
                        <ProFormDigit
                          label="服务地址"
                          name="host"
                          width="md"
                          placeholder="请输入服务地址"
                          rules={[{ required: true, message: '请输入服务地址' }]}
                        />
                        <ProFormDigit
                          label="服务端口"
                          name="port"
                          width="md"
                          placeholder="请输入服务端口"
                          rules={[{ required: true, message: '请输入服务端口' }]}
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
                          label="上报 TOPIC"
                          name="pubTopic"
                          width="md"
                          placeholder="请输入上报 TOPIC"
                          rules={[
                            {
                              required: true,
                              message: '请输入上报 TOPIC',
                            },
                          ]}
                        />
                      </ProForm.Group>
                      <ProForm.Group>
                        <ProFormText
                          label="连接账户"
                          name="username"
                          width="md"
                          placeholder="请输入连接账户"
                          rules={[
                            {
                              required: true,
                              message: '请输入连接账户',
                            },
                          ]}
                        />
                        <ProFormText.Password
                          label="连接密码"
                          name="password"
                          width="md"
                          placeholder="请输入连接密码"
                          rules={[
                            {
                              required: true,
                              message: '请输入连接密码',
                            },
                          ]}
                        />
                      </ProForm.Group>
                    </>
                  )}
                  {type === 'UDP_TARGET' && (
                    <ProForm.Group>
                      <ProFormDigit
                        label="超时时间（毫秒）"
                        name="timeout"
                        width="md"
                        placeholder="请输入超时时间（毫秒）"
                        rules={[{ required: true, message: '请输入超时时间（毫秒）' }]}
                      />
                      <ProFormDigit
                        label="服务地址"
                        name="host"
                        width="md"
                        placeholder="请输入服务地址"
                        rules={[{ required: true, message: '请输入服务地址' }]}
                      />
                      <ProFormDigit
                        label="服务端口"
                        name="port"
                        width="md"
                        placeholder="请输入服务端口"
                        rules={[{ required: true, message: '请输入服务端口' }]}
                      />
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
