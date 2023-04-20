import { useEffect,useRef } from 'react';

import { history,useParams } from 'umi';

import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormInstance,
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
        type: 'GENERIC_SNMP',
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
                  { label: 'SNMP协议采集器', value: 'GENERIC_SNMP' },
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
                if (type === 'GENERIC_SNMP') {
                  return <SnmpForm />;
                } else if (type === 'USER_G776') {
                  return <G776Form />;
                } else if (type === 'GENERIC_PROTOCOL') {
                  return <GenericProtocolForm />;
                } else {
                  return null;
                }
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
