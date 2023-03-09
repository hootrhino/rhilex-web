import React, { useRef } from 'react';

import { history, useParams } from 'umi';

import type { ProFormInstance } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import { cloneDeep } from 'lodash';

import { getDevices, postDevices, putDevices } from '@/services/rulex/shebeiguanli';

import './index.less';

export type UpdateFormProps = {};

const UpdateForm: React.FC<UpdateFormProps> = () => {
  const formRef = useRef<ProFormInstance>();
  const { id } = useParams();

  // 新建&编辑
  const onFinish = async (values: any) => {
    try {
      let params = cloneDeep(values);
      if (params.type === 'YK08_RELAY') {
        params = {
          ...params,

          config: {
            ...params?.config,
            registers: [],
            slaverIds: [params?.config?.slaverIds],
          },
        };
      }
      if (['KCOMMANDER', 'NIREN_RELAY'].includes(params.type)) {
        params = {
          ...params,
          config: {},
        };
      }
      if (id) {
        await putDevices({ ...params, uuid: id });
      } else {
        await postDevices(params);
      }
      message.success(id ? '更新成功' : '新建成功');
      history.push('/devices/list');
      return true;
    } catch (error) {
      return false;
    }
  };

  // 获取详情
  useRequest(() => getDevices({ params: { uuid: id } }), {
    onSuccess: (res: any) => formRef.current?.setFieldsValue(res?.data),
  });

  const renderYK08Form = () => {
    return (
      <>
        <ProFormSelect
          label="Modbus 模式"
          name={['config', 'mode']}
          options={[
            { label: 'RTU', value: 'RTU' },
            // { label: 'TCP', value: 'TCP' },
          ]}
          placeholder="请选择Modbus 模式"
          rules={[{ required: true, message: '请选择Modbus 模式' }]}
        />
        <ProFormDigit
          label="从设备ID"
          name={['config', 'slaverIds']}
          rules={[{ required: true, message: '请输入设备ID' }]}
        />
        <ProFormDigit
          label="超时时间"
          tooltip="单位为秒"
          name={['config', 'timeout']}
          rules={[{ required: true, message: '请输入超时时间' }]}
        />

        <ProFormDigit
          label="采集频率"
          tooltip="单位为秒"
          name={['config', 'frequency']}
          rules={[{ required: true, message: '请输入采集频率' }]}
        />
        <ProFormText
          label="串口路径"
          name={['config', 'config', 'uart']}
          placeholder="请输入本地系统的串口路径"
          rules={[
            {
              required: true,
              message: '请输入本地系统的串口路径',
            },
          ]}
        />

        <ProFormSelect
          label="波特率"
          name={['config', 'config', 'baudRate']}
          placeholder="请选择串口通信波特率"
          rules={[{ required: true, message: '请选择串口通信波特率' }]}
          options={[
            { label: '4800', value: 4800 },
            { label: '9600', value: 9600 },
            { label: '115200', value: 115200 },
          ]}
        />
        <ProFormDigit
          label="数据位"
          name={['config', 'config', 'dataBits']}
          placeholder="请输入串口通信数据位"
          rules={[{ required: true, message: '请输入串口通信数据位' }]}
        />
        <ProFormSelect
          label="奇偶校验"
          name={['config', 'config', 'parity']}
          placeholder="请选择奇偶校验"
          rules={[
            {
              required: true,
              message: '请选择奇偶校验',
            },
          ]}
          options={[
            { label: '奇校验', value: 'E' },
            { label: '偶校验', value: 'O' },
            { label: '不校验', value: 'N' },
          ]}
        />
        <ProFormDigit
          label="停止位"
          name={['config', 'config', 'stopBits']}
          rules={[{ required: true, message: '请输入串口通信停止位' }]}
        />
      </>
    );
  };

  const renderSnmpForm = () => {
    return (
      <>
        <ProFormText
          label="主机地址"
          name={['config', 'target']}
          placeholder="请输入主机地址"
          rules={[
            {
              required: true,
              message: '请输入主机地址',
            },
          ]}
        />
        <ProFormDigit
          label="主机端口"
          name={['config', 'port']}
          placeholder="请输入主机端口"
          rules={[
            {
              required: true,
              message: '请输入主机端口',
            },
          ]}
        />
        <ProFormSelect
          label="通信协议"
          name={['config', 'transport']}
          placeholder="请选择通信协议"
          rules={[{ required: true, message: '请选择通信协议' }]}
          options={[
            { label: 'TCP', value: 'tcp' },
            { label: 'UDP', value: 'udp' },
          ]}
        />
        <ProFormText
          label="Community"
          name={['config', 'community']}
          placeholder="请输入Community"
          rules={[
            {
              required: true,
              message: '请输入Community',
            },
          ]}
        />
        <ProFormSwitch name={['config', 'autoRequest']} label="是否启动轮询" />
        <ProFormDigit
          label="采集频率"
          tooltip="单位为秒"
          name={['config', 'frequency']}
          rules={[{ required: true, message: '请输入采集频率' }]}
        />
        <ProFormText
          label="用户名"
          name={['config', 'username']}
          placeholder="请输入用户名"
          rules={[
            {
              required: true,
              message: '请输入用户名',
            },
          ]}
        />
        <ProFormSelect
          label="安全模式"
          name={['config', 'securityModel']}
          placeholder="请选择安全模式"
          rules={[{ required: true, message: '请选择安全模式' }]}
          options={[
            { label: '不认证', value: 0 },
            { label: 'V3 认证', value: 3 },
          ]}
        />
        <ProFormDependency name={['config', 'securityModel']}>
          {({ config: { securityModel } }) =>
            securityModel === 3 ? (
              <>
                <ProFormSelect
                  label="消息选项"
                  name={['config', 'snmpV3MsgFlags']}
                  placeholder="请选择消息选项"
                  rules={[{ required: true, message: '请选择消息选项' }]}
                  options={[
                    { label: 'NoAuthNoPriv', value: 0 },
                    { label: 'AuthNoPriv', value: 1 },
                    { label: 'AuthPriv', value: 2 },
                    { label: 'Reportable', value: 3 },
                  ]}
                />
                <ProFormSelect
                  label="SNMP 认证协议"
                  name={['config', 'snmpV3AuthProtocol']}
                  placeholder="请选择 SNMP 认证协议"
                  rules={[{ required: true, message: '请选择 SNMP 认证协议' }]}
                  options={[
                    { label: 'NoAuth', value: 1 },
                    { label: 'MD5', value: 2 },
                    { label: 'SHA', value: 3 },
                    { label: 'SHA224', value: 4 },
                    { label: 'SHA256', value: 5 },
                    { label: 'SHA384', value: 6 },
                    { label: 'SHA512', value: 7 },
                  ]}
                />

                <ProFormText
                  label="SNMP 认证密钥"
                  name={['config', 'authenticationPassphrase']}
                  placeholder="请选择 SNMP 认证密钥"
                  rules={[{ required: true, message: '请选择 SNMP 认证密钥' }]}
                />
                <ProFormSelect
                  label="私有认证协议"
                  name={['config', 'privacyProtocol']}
                  placeholder="请选择私有认证协议"
                  rules={[{ required: true, message: '请选择私有认证协议' }]}
                  options={[
                    { label: 'NoPriv', value: 1 },
                    { label: 'DES', value: 2 },
                    { label: 'AES', value: 3 },
                    { label: 'AES192', value: 4 },
                    { label: 'AES256', value: 5 },
                    { label: 'AES192C', value: 6 },
                    { label: 'AES256C', value: 7 },
                  ]}
                />
                <ProFormText
                  label="私有认证协议密钥"
                  name={['config', 'privacyPassphrase']}
                  placeholder="请输入私有认证协议密钥"
                  rules={[
                    {
                      required: true,
                      message: '请输入私有认证协议密钥',
                    },
                  ]}
                />
              </>
            ) : null
          }
        </ProFormDependency>
      </>
    );
  };

  const renderUserG776Form = () => {
    return (
      <>
        <ProFormText
          label="数据 Tag"
          name={['config', 'tag']}
          placeholder="给数据打个tag"
          rules={[
            {
              required: true,
              message: '请输入数据tag',
            },
          ]}
        />
        <ProFormText
          label="串口路径"
          name={['config', 'uart']}
          placeholder="请输入本地系统的串口路径"
          rules={[
            {
              required: true,
              message: '请输入本地系统的串口路径',
            },
          ]}
        />

        <ProFormSelect
          label="波特率"
          name={['config', 'baudRate']}
          placeholder="请选择串口通信波特率"
          rules={[{ required: true, message: '请选择串口通信波特率' }]}
          options={[
            { label: '4800', value: 4800 },
            { label: '9600', value: 9600 },
            { label: '115200', value: 115200 },
          ]}
        />
        <ProFormDigit
          label="数据位"
          name={['config', 'dataBits']}
          placeholder="请输入串口通信数据位"
          rules={[{ required: true, message: '请输入串口通信数据位' }]}
        />
        <ProFormText
          label="协议分隔符"
          name={['config', 'decollator']}
          placeholder="请输入协议分隔符"
          rules={[
            {
              required: true,
              message: '请输入协议分隔符',
            },
          ]}
        />
        <ProFormSwitch name={['config', 'autoRequest']} label="是否启动轮询" />
        <ProFormDigit
          label="采集频率"
          tooltip="单位为秒"
          name={['config', 'frequency']}
          rules={[{ required: true, message: '请输入采集频率' }]}
        />
        <ProFormDigit
          label="超时时间"
          tooltip="单位为秒"
          name={['config', 'timeout']}
          rules={[{ required: true, message: '请输入超时时间' }]}
        />
        <ProFormSelect
          label="奇偶校验"
          name={['config', 'parity']}
          placeholder="请选择奇偶校验"
          rules={[
            {
              required: true,
              message: '请选择奇偶校验',
            },
          ]}
          options={[
            { label: '奇校验', value: 'E' },
            { label: '偶校验', value: 'O' },
            { label: '不校验', value: 'N' },
          ]}
        />
        <ProFormDigit
          label="停止位"
          name={['config', 'stopBits']}
          rules={[{ required: true, message: '请输入串口通信停止位' }]}
        />
      </>
    );
  };

  return (
    <PageContainer header={{ title: id ? '编辑设备' : '新建设备' }}>
      <ProCard>
        <ProForm
          className="device"
          formRef={formRef}
          layout="horizontal"
          labelCol={{ span: 2 }}
          submitter={{
            render: (props, dom) => {
              return <FooterToolbar>{dom}</FooterToolbar>;
            },
          }}
          onFinish={onFinish}
          initialValues={{
            config: {
              mode: 'RTU',
              timeout: 5,
              frequency: 5,
              decollator: '/n',
              dataBits: 8,
              stopBits: 1,
              securityModel: 0,
              target: '127.0.0.1',
              transport: 'udp',
              community: 'public',
              port: 161,
              slaverIds: 1,
              config: {
                baudRate: 9600,
                dataBits: 8,
                parity: 'N',
                stopBits: 1,
              },
            },
          }}
        >
          <ProFormText
            label="设备名称"
            placeholder="请输入设备名称"
            name="name"
            rules={[
              {
                required: true,
                message: '请输入设备名称',
              },
            ]}
          />
          <ProFormSelect
            label="设备类型"
            name="type"
            options={[
              { label: '远程继电器控制器', value: 'YK08_RELAY' },
              { label: 'SNMP协议采集器', value: 'GENERIC_SNMP' },
              { label: '利亚德大屏', value: 'KCOMMANDER' },
              { label: '泥人门禁网关', value: 'NIREN_RELAY' },
              // { label: 'TSS200环境传感器', value: 'TSS200V02' },
              { label: '有人4G串口通信DTU', value: 'USER_G776' },
            ]}
            placeholder="请选择资源类型"
            rules={[{ required: true, message: '请选择资源类型' }]}
          />
          <ProFormDependency name={['type']}>
            {({ type }) => {
              return ['YK08_RELAY', 'TSS200V02', 'GENERIC_SNMP', 'USER_G776'].includes(type) ? (
                <ProForm.Item label="设备配置">
                  <ProCard
                    bordered
                    bodyStyle={{ paddingBlockEnd: 0 }}
                    className="device-config-card"
                  >
                    {type === 'YK08_RELAY' && renderYK08Form()}
                    {/* {type === 'TSS200V02' && renderTSSForm()} */}
                    {type === 'GENERIC_SNMP' && renderSnmpForm()}
                    {type === 'USER_G776' && renderUserG776Form()}
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
  );
};

export default UpdateForm;
