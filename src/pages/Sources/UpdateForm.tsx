import { useEffect,useRef } from 'react';

import { history,useParams,useRequest } from 'umi';

import type { ProFormInstance } from '@ant-design/pro-components';
import {
PageContainer,
ProCard,
ProForm,
ProFormDependency,
ProFormDigit,
ProFormSelect,
ProFormText,
ProFormTextArea
} from '@ant-design/pro-components';
import { message,Modal } from 'antd';

import FormFooter from '@/components/FromFooter';
import GoBackFooter from '@/components/GoBackFooter';
import { getInends,postInends,putInends } from '@/services/rulex/shuruziyuanguanli';

const config = {
  title: '离开可能会丢失数据，确定要返回列表吗？',
  footer: [<GoBackFooter onConfirm={() => history.push('/inends/list')} key="gobackFooter" />],
  onOk: () => history.push('/inends/list'),
  onCancel: () => Modal.destroyAll(),
};

const UpdateForm = () => {
  const formRef = useRef<ProFormInstance>();
  const { id } = useParams();
  const [modal, contextHolder] = Modal.useModal();

  // 新建&编辑
  const onFinish = async (values: any) => {
    try {
      if (id) {
        await putInends({ ...values, uuid: id });
        message.success('更新成功');
      } else {
        await postInends(values);
        message.success('新建成功');
      }

      history.push('/inends/list');
      return true;
    } catch (error) {
      return false;
    }
  };

  // 获取详情
  const { run: getDetail, data: detail } = useRequest(() => getInends({ params: { uuid: id } }), {
    manual: true,
    onSuccess: (data: any) => {
      formRef.current?.setFieldsValue(data);
    },
  });

  useEffect(() => {
    if (id) {
      getDetail();
    } else {
      formRef.current?.setFieldsValue({
        config: { host: '127.0.0.1' },
      });
    }
  }, [id]);

  return (
    <>
      <PageContainer
        header={{ title: id ? '编辑资源' : '新建资源' }}
        onBack={() => modal.warning(config)}
      >
        <ProCard>
          <ProForm
            className="source"
            formRef={formRef}
            submitter={{
              render: ({ reset, submit }) => {
                return (
                  <FormFooter
                    onReset={() => (id ? formRef.current?.setFieldsValue(detail) : reset())}
                    onSubmit={submit}
                  />
                );
              },
            }}
            onFinish={onFinish}
            onValuesChange={(changedValue) => {
              switch (changedValue?.type) {
                case 'COAP':
                  formRef.current?.setFieldsValue({ config: { port: 2582 } });
                  break;
                case 'GENERIC_IOT_HUB':
                  formRef.current?.setFieldsValue({ config: { port: 1883 } });
                  break;
                case 'RULEX_UDP':
                  formRef.current?.setFieldsValue({ config: { port: 2583 } });
                  break;
                case 'HTTP':
                  formRef.current?.setFieldsValue({ config: { port: 2584 } });
                  break;
                case 'NATS_SERVER':
                  formRef.current?.setFieldsValue({ config: { port: 4222 } });
                  break;
                case 'GRPC':
                  formRef.current?.setFieldsValue({ config: { port: 2585 } });
                  break;
                default:
                  break;
              }
            }}
          >
            <ProFormText
              label="资源名称"
              name="name"
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
              options={[
                { label: 'COAP 协议支持', value: 'COAP' },
                { label: 'IoTHUB 平台支持', value: 'GENERIC_IOT_HUB' },
                { label: 'UUDP 协议支持', value: 'RULEX_UDP' },
                { label: 'HTTP 协议支持', value: 'HTTP' },
                { label: 'Nats 中间件支持', value: 'NATS_SERVER' },
                { label: 'GRPC 协议支持', value: 'GRPC' },
              ]}
              placeholder="请选择资源类型"
              rules={[{ required: true, message: '请选择资源类型' }]}
            />
            <ProFormDependency name={['type']}>
              {({ type }) => {
                return type ? (
                  <ProForm.Item label="资源配置">
                    <ProCard bordered bodyStyle={{ paddingBlockEnd: 0 }}>
                      <>
                        <ProFormText
                          label="主机地址"
                          name={['config', 'host']}
                          rules={[{ required: true, message: '请输入主机地址' }]}
                        />
                        <ProFormDigit
                          label="服务端口"
                          name={['config', 'port']}
                          rules={[{ required: true, message: '请输入服务端口' }]}
                        />
                        {['GENERIC_IOT_HUB', 'NATS_SERVER'].includes(type) && (
                          <>
                            {type === 'GENERIC_IOT_HUB' && (
                              <>
                                <ProFormText
                                  label="产品 ID"
                                  name={['config', 'productId']}
                                  rules={[{ required: true, message: '请输入产品 ID' }]}
                                />
                                <ProFormText
                                  label="设备名"
                                  name={['config', 'deviceName']}
                                  rules={[{ required: true, message: '请输入设备名' }]}
                                />
                                <ProFormText
                                  label="客户端 ID"
                                  name={['config', 'clientId']}
                                  rules={[{ required: true, message: '请输入客户端ID' }]}
                                />
                              </>
                            )}

                            <ProFormText
                              label="用户名称"
                              name={['config', 'username']}
                              rules={[{ required: true, message: '请输入用户名称' }]}
                            />
                            <ProFormText.Password
                              label="用户密码"
                              name={['config', 'password']}
                              rules={[{ required: true, message: '请输入用户密码' }]}
                            />
                            {type === 'NATS_SERVER' && (
                              <ProFormText
                                label="主题"
                                name={['config', 'topic']}
                                rules={[{ required: true, message: '请输入主题' }]}
                              />
                            )}
                          </>
                        )}
                      </>
                    </ProCard>
                  </ProForm.Item>
                ) : null;
              }}
            </ProFormDependency>
            <ProFormTextArea
              label="备注信息"
              name="description"
              placeholder="请输入备注信息"
              rules={[{ required: true, message: '请输入备注信息' }]}
            />
          </ProForm>
        </ProCard>
      </PageContainer>
      {contextHolder}
    </>
  );
};

export default UpdateForm;
