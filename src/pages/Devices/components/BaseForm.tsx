import { useEffect,useRef } from 'react';

import { history, useParams } from 'umi';

import type { ProFormInstance } from '@ant-design/pro-components';
import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { message, Modal } from 'antd';
import { cloneDeep } from 'lodash';

import FormFooter from '@/components/FromFooter';
import GoBackFooter from '@/components/GoBackFooter';
import { getDevices, postDevices, putDevices } from '@/services/rulex/shebeiguanli';
import G776Form from './G776';
import GenericProtocolForm from './GenericProtocol';
import SnmpForm from './Snmp';
import YK08Form from './YK08';

const config = {
  title: '离开可能会丢失数据，确定要返回列表吗？',
  footer: [<GoBackFooter onConfirm={() => history.push('/device/list')} key="gobackFooter" />],
  onOk: () => history.push('/outends/list'),
  onCancel: () => Modal.destroyAll(),
};

const BaseForm = () => {
  const formRef = useRef<ProFormInstance>();
  const { id } = useParams();
  const [modal, contextHolder] = Modal.useModal();

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
      history.push('/device/list');
      return true;
    } catch (error) {
      return false;
    }
  };

  // 获取详情
  const { run: getDetail, data: detail } = useRequest(() => getDevices({ params: { uuid: id } }), {
    onSuccess: (res: any) => formRef.current?.setFieldsValue(res?.data),
  });

  useEffect(() => {
    if (id) {
      getDetail();
    } else {
      formRef.current?.setFieldsValue({
        type: 'YK08_RELAY',
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
      });
    }
  }, [id]);

  return (
    <>
      <PageContainer
        header={{ title: id ? '编辑设备' : '新建设备' }}
        onBack={() => modal.warning(config)}
      >
        <ProCard>
          <ProForm
            className="device"
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
          >
            <ProForm.Group>
              <ProFormText
                width="lg"
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
                width="md"
                label="设备类型"
                name="type"
                options={[
                  { label: '远程继电器控制器', value: 'YK08_RELAY' },
                  { label: 'SNMP协议采集器', value: 'GENERIC_SNMP' },
                  { label: '利亚德大屏', value: 'KCOMMANDER' },
                  { label: '泥人门禁网关', value: 'NIREN_RELAY' },
                  { label: '有人4G串口通信DTU', value: 'USER_G776' },
                  { label: '自定义串口协议', value: 'GENERIC_PROTOCOL' },
                ]}
                placeholder="请选择资源类型"
                rules={[{ required: true, message: '请选择资源类型' }]}
              />
              <ProFormText
                width="xl"
                label="备注信息"
                name="description"
                placeholder="请输入备注信息"
                rules={[{ required: true, message: '请输入备注信息' }]}
              />
            </ProForm.Group>

            <ProFormDependency name={['type']}>
              {({ type }) => {
                return ['YK08_RELAY', 'GENERIC_PROTOCOL', 'GENERIC_SNMP', 'USER_G776'].includes(
                  type,
                ) ? (
                  <ProForm.Item label="设备配置">
                    <ProCard
                      bordered
                      bodyStyle={{ paddingBlockEnd: 0 }}
                      className="device-config-card"
                    >
                      {type === 'YK08_RELAY' && <YK08Form />}
                      {type === 'GENERIC_SNMP' && <SnmpForm />}
                      {type === 'USER_G776' && <G776Form />}
                      {type === 'GENERIC_PROTOCOL' && <GenericProtocolForm />}
                    </ProCard>
                  </ProForm.Item>
                ) : null;
              }}
            </ProFormDependency>
          </ProForm>
        </ProCard>
      </PageContainer>
      {contextHolder}
    </>
  );
};

export default BaseForm;
