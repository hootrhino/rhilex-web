import {
  getOutendsDetail,
  postOutendsCreate,
  putOutendsUpdate,
} from '@/services/rulex/shuchuziyuanguanli';

import HttpHeadersTitle from '@/components/HttpHeadersTitle';
import { message } from '@/components/PopupHack';
import ProSegmented from '@/components/ProSegmented';
import UnitTitle from '@/components/UnitTitle';
import useGoBack from '@/hooks/useGoBack';
import { PlusCircleOutlined } from '@ant-design/icons';
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
import { Button, Popconfirm, Tooltip } from 'antd';
import { isEmpty } from 'lodash';
import random from 'lodash/random';
import { useEffect, useRef, useState } from 'react';
import { history, useParams, useRequest } from 'umi';
import { defaultConfig, modeEnum, typeEnum } from './initialValue';
import { formatHeaders } from '@/utils/utils';

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
  const { uuid } = useParams();
  const { showModal } = useGoBack();
  const randomNumber = random(1000, 9999);
  const [loading, setLoading] = useState<boolean>(false);

  // 获取详情
  const { data: detail } = useRequest(() => getOutendsDetail({ uuid: uuid || '' }), {
    ready: !!uuid,
  });

  const handleOnFinish = async (values: any) => {
    setLoading(true);

    try {
      const formatConfig = values?.config?.[0];
      let params = {
        ...values,
        config: formatConfig,
      };

      if (params.type === 'HTTP') {
        params = {
          ...params,
          config: {
            ...formatConfig,
            headers: formatHeaders(formatConfig?.headers),
          },
        };
      }

      if (uuid) {
        await putOutendsUpdate({ ...params, uuid });
        message.success('更新成功');
      } else {
        const { msg } = await postOutendsCreate(params);
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
      if (detail?.type === 'HTTP') {
        const newHeaders = !isEmpty(detail?.config?.headers)
          ? Object.keys(detail?.config?.headers)?.map((item) => ({
              k: item,
              v: detail?.config?.headers[item],
            }))
          : [{ k: '', v: '' }];

        formRef.current?.setFieldsValue({
          ...detail,
          config: [{ ...detail?.config, headers: newHeaders }],
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
        config: defaultConfig['MONGO_SINGLE'],
      });
    }
  };

  const handleOnValuesChange = (changedValue: UpdateFormItem) => {
    if (!changedValue?.type) return;
    let config: any = [];

    if (changedValue?.type === 'MQTT') {
      config = defaultConfig['MQTT']?.map((item) => ({
        ...item,
        clientId: `eekit${randomNumber}`,
        pubTopic: `eekit${randomNumber}`,
      }));
    } else {
      config = defaultConfig[changedValue?.type];
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
                          <ProFormText
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
                          label={<UnitTitle title="超时时间" />}
                          name="timeout"
                          width="md"
                          placeholder="请输入超时时间（毫秒）"
                          rules={[{ required: true, message: '请输入超时时间（毫秒）' }]}
                        />
                        <ProFormText
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
                          <ProForm.Item
                            required
                            label="开启心跳"
                            name="allowPing"
                            transform={(value: string) => ({
                              allowPing: value === 'true' ? true : false,
                            })}
                            convertValue={(value: boolean) => value?.toString()}
                          >
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
                            label={<UnitTitle title="超时时间" />}
                            name="timeout"
                            width="md"
                            placeholder="请输入超时时间（毫秒）"
                            rules={[{ required: true, message: '请输入超时时间（毫秒）' }]}
                          />
                        </ProForm.Group>
                        <ProForm.Group>
                          <ProFormText
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
                    {type === 'HTTP' && (
                      <>
                        <ProFormText
                          label="请求地址"
                          name="url"
                          width="md"
                          placeholder="请输入请求地址"
                          rules={[
                            {
                              required: true,
                              message: '请输入请求地址',
                            },
                          ]}
                        />
                        <ProFormList
                          name="headers"
                          label={<HttpHeadersTitle />}
                          min={1}
                          creatorButtonProps={false}
                          creatorRecord={{
                            k: '',
                            v: '',
                          }}
                          actionRender={(props, action, defaultActionDom) => {
                            return [
                              <Tooltip key="add" title="新建一行">
                                <PlusCircleOutlined
                                  onClick={() => action.add()}
                                  className="ml-[10px]"
                                />
                              </Tooltip>,
                              ...defaultActionDom,
                            ];
                          }}
                        >
                          <ProForm.Group>
                            <ProFormText name="k" width="md" placeholder="请输入 key" />
                            <ProFormDependency name={['k', 'v']}>
                              {({ k, v }) => {
                                const isSuccess = !k || (k && v);

                                return (
                                  <ProFormText
                                    name="v"
                                    width="md"
                                    placeholder="请输入 value"
                                    validateStatus={isSuccess ? '' : 'error'}
                                  />
                                );
                              }}
                            </ProFormDependency>
                          </ProForm.Group>
                        </ProFormList>
                      </>
                    )}
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
