import { getOutendsDetail, postOutends, putOutends } from '@/services/rulex/shuchuziyuanguanli';

import { message } from '@/components/PopupHack';
import ProSegmented from '@/components/ProSegmented';
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
import random from 'lodash/random';
import { useEffect, useRef, useState } from 'react';
import { history, useParams, useRequest } from 'umi';
import {
  defaultMongoConfig,
  defaultMqttConfig,
  defaultTcpConfig,
  defaultTdConfig,
  defaultUdpConfig,
  modeEnum,
  typeEnum,
} from './initialValue';

type UpdateFormItem = {
  name: string;
  type: string;
  config: Record<string, any>[];
};

type submitterProps = {
  reset: () => void;
  submit: () => void;
};

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

  const handleOnFinish = async (values: any) => {
    setLoading(true);

    try {
      const formatConfig = values?.config?.[0];
      let params = {
        ...values,
        config: formatConfig,
      };

      if (values?.type === 'TCP_TRANSPORT') {
        params = {
          ...values,
          config: {
            ...formatConfig,
            allowPing: formatConfig?.allowPing === 'true' ? true : false,
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

  const handleOnReset = () => {
    if (detail) {
      if (detail?.type === 'TCP_TRANSPORT') {
        formRef.current?.setFieldsValue({
          ...detail,
          config: [{ ...detail?.config, allowPing: detail?.config?.allowPing.toString() }],
        });
      } else {
        formRef.current?.setFieldsValue({
          ...detail,
          config: [detail?.config],
        });
      }
    } else {
      formRef.current?.setFieldsValue({
        type: 'MONGO_SINGLE',
        config: defaultMongoConfig,
      });
    }
  };

  const handleOnValuesChange = (changedValue: UpdateFormItem) => {
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
      case 'TCP_TRANSPORT':
        config = defaultTcpConfig;
        break;
      case 'TDENGINE':
        config = defaultTdConfig;
        break;
      default:
        config = defaultMongoConfig;
        break;
    }

    formRef.current?.setFieldsValue({
      config: changedValue?.type === detail?.type ? [detail?.config] : config,
    });
  };

  const renderSubmitter = ({ reset, submit }: submitterProps) => {
    return (
      <FooterToolbar>
        <Popconfirm
          key="reset"
          title="重置可能会丢失数据，确定要重置吗？"
          onConfirm={() => {
            reset();
            handleOnReset();
          }}
        >
          <Button>重置</Button>
        </Popconfirm>

        <Button key="submit" type="primary" onClick={submit} loading={loading}>
          提交
        </Button>
      </FooterToolbar>
    );
  };

  useEffect(() => {
    handleOnReset();
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
            render: ({ reset, submit }) => renderSubmitter({ reset, submit }),
          }}
          onValuesChange={handleOnValuesChange}
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
                          label="主机地址"
                          name="host"
                          width="md"
                          placeholder="请输入主机地址"
                          rules={[{ required: true, message: '请输入主机地址' }]}
                        />
                        <ProFormDigit
                          label="端口"
                          name="port"
                          width="md"
                          placeholder="请输入端口"
                          rules={[{ required: true, message: '请输入端口' }]}
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
                        label="主机地址"
                        name="host"
                        width="md"
                        placeholder="请输入主机地址"
                        rules={[{ required: true, message: '请输入主机地址' }]}
                      />
                      <ProFormDigit
                        label="端口"
                        name="port"
                        width="md"
                        placeholder="请输入端口"
                        rules={[{ required: true, message: '请输入端口' }]}
                      />
                    </ProForm.Group>
                  )}
                  {type === 'TCP_TRANSPORT' && (
                    <>
                      <ProForm.Group>
                        <ProFormSelect
                          label="传输模式"
                          name="dataMode"
                          valueEnum={modeEnum}
                          width="md"
                          placeholder="请选择传输模式"
                          rules={[
                            {
                              required: true,
                              message: '请选择传输模式',
                            },
                          ]}
                        />
                        <ProForm.Item label="开启心跳" name="allowPing">
                          <ProSegmented width="md" />
                        </ProForm.Item>
                        <ProFormText
                          label="心跳包内容"
                          name="pingPacket"
                          width="md"
                          placeholder="请输入心跳包内容"
                          rules={[
                            {
                              required: true,
                              message: '请输入心跳包内容',
                            },
                          ]}
                        />
                        <ProFormDigit
                          label="主机地址"
                          name="host"
                          width="md"
                          placeholder="请输入主机地址"
                          rules={[{ required: true, message: '请输入主机地址' }]}
                        />
                      </ProForm.Group>
                      <ProForm.Group>
                        <ProFormDigit
                          label="端口"
                          name="port"
                          width="md"
                          placeholder="请输入端口"
                          rules={[{ required: true, message: '请输入端口' }]}
                        />
                        <ProFormDigit
                          label="超时时间（毫秒）"
                          name="timeout"
                          width="md"
                          placeholder="请输入超时时间（毫秒）"
                          rules={[{ required: true, message: '请输入超时时间（毫秒）' }]}
                        />
                      </ProForm.Group>
                    </>
                  )}
                  {type === 'TDENGINE' && (
                    <>
                      <ProForm.Group>
                        <ProFormText
                          label="FQDN"
                          name="fqdn"
                          width="md"
                          placeholder="请输入 FQDN"
                          rules={[
                            {
                              required: true,
                              message: '请输入 FQDN',
                            },
                          ]}
                        />
                        <ProFormDigit
                          label="端口"
                          name="port"
                          width="md"
                          placeholder="请输入端口"
                          rules={[{ required: true, message: '请输入端口' }]}
                        />
                        <ProFormText
                          label="用户名"
                          name="username"
                          width="md"
                          placeholder="请输入用户名"
                          rules={[
                            {
                              required: true,
                              message: '请输入用户名',
                            },
                          ]}
                        />
                        <ProFormText.Password
                          label="密码"
                          name="password"
                          width="md"
                          placeholder="请输入密码"
                          rules={[
                            {
                              required: true,
                              message: '请输入密码',
                            },
                          ]}
                        />
                      </ProForm.Group>
                      <ProForm.Group>
                        <ProFormText
                          label="数据库名"
                          name="dbName"
                          width="md"
                          placeholder="请输入数据库名"
                          rules={[
                            {
                              required: true,
                              message: '请输入数据库名',
                            },
                          ]}
                        />
                      </ProForm.Group>
                    </>
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
