import { useEffect,useRef,useState } from 'react';

import { history,useParams } from 'umi';

import {
PageContainer,
ProCard,
ProForm,
ProFormDependency,
ProFormInstance,
ProFormSelect,
ProFormText
} from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { Modal } from 'antd';
import { cloneDeep } from 'lodash';

import FormFooter from '@/components/FromFooter';
import GoBackFooter from '@/components/GoBackFooter';
import { message,modal } from '@/components/PopupHack';
import { getDevices,postDevices,putDevices } from '@/services/rulex/shebeiguanli';
import G776Form from './G776';
import GenericProtocolForm from './GenericProtocol';
import ModbusForm from './Modbus';
import SnmpForm from './Snmp';

export const toolTip = (
  <a
    href="https://github.com/i4de/rulex/blob/master/device/custom_protocol_device.md"
    target="_blank"
    rel="noreferrer"
  >
    详细戳这里
  </a>
);

export const DEFAULT_DEVICE_CONFIG = {
  type: 1,
  rw: 1,
  checkAlgorithm: 'NONECHECK',
  bufferSize: 0,
  timeSlice: 10,
  timeout: 30,
  checksumValuePos: 0,
  checksumBegin: 0,
  checksumEnd: 0,
  weight: 1,
  initValue: 0,
  autoRequest: 'false',
  onCheckError: 'IGNORE',
};

const DEFAULT_UART_CONFIG = [
  {
    timeout: 30,
    baudRate: 9600,
    dataBits: 8,
    parity: 'N',
    stopBits: 1,
    uart: 'COM1',
  },
];

const DEFAULT_SNMP_CONFIG = [
  {
    securityModel: 0,
    target: '127.0.0.1',
    transport: 'udp',
    community: 'public',
    port: 161,
  },
];

const DEFAULT_COMMON_CONFIG = [
  {
    frequency: 3000,
    retryTime: 5,
    autoRequest: 'false',
    separator: 'LF',
    transport: 'rs485rawserial',
    mode: 'RTU',
    timeout: 30
  },
];

const DEFAULT_TCP_CONFIG = [
  {
    host: '127.0.0.1',
    port: 502,
  },
];

export const DEFAULT_REGISTER_CONFIG = {
  weight: 1,
  initValue: 0,
  slaverId: 1,
  address: 0,
  quantity: 1,
};

const config = {
  title: '离开可能会丢失数据，确定要返回列表吗？',
  footer: [<GoBackFooter onConfirm={() => history.push('/device/list')} key="gobackFooter" />],
  onOk: () => history.push('/outends/list'),
  onCancel: () => Modal.destroyAll(),
};

const BaseForm = () => {
  const formRef = useRef<ProFormInstance>();
  const { id } = useParams();
  const [mode, setMode] = useState<string>('rtu');

  // 新建&编辑
  const onFinish = async (values: any) => {
    try {
      let params = cloneDeep(values);
      const deviceConfigFormat = new Object();

      params?.config?.deviceConfig?.forEach((item: any) => {
        deviceConfigFormat[item?.name] = {
          ...item,
          autoRequest: Boolean(item?.autoRequest),
          autoRequestGap: 0,
          timeSlice: [3, 4].includes(item?.type) ? item?.timeSlice : 0,
        };
      });

      params = {
        ...params,
        config: {
          ...params?.config,
          commonConfig: {
            ...params?.config?.commonConfig?.[0],
            autoRequest: Boolean(params?.config?.commonConfig?.[0]?.autoRequest),
          },
          snmpConfig: params?.config?.snmpConfig?.[0],
          deviceConfig: deviceConfigFormat,
          uartConfig: params?.config?.uartConfig?.[0],
          rtuConfig: params?.config?.rtuConfig?.[0],
          registers: params?.config?.registers?.map((item: Record<string, any>) => ({
            ...item,
            value: '',
          })),
        },
      };

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
    manual: true,
    onSuccess: (res: any) =>
      formRef.current?.setFieldsValue({
        ...res?.data,
        config: {
          ...res?.data?.config,
          commonConfig: [res?.data?.config?.commonConfig],
          deviceConfig:
            res?.data?.config?.deviceConfig && Object.values(res?.data?.config?.deviceConfig),
          snmpConfig: [res?.data?.config?.snmpConfig],
          uartConfig: [res?.data?.config?.uartConfig],
        },
      }),
  });

  useEffect(() => {
    if (id) {
      getDetail();
    } else {
      formRef.current?.setFieldsValue({
        type: 'GENERIC_SNMP',
        config: {
          commonConfig: DEFAULT_COMMON_CONFIG,
          snmpConfig: DEFAULT_SNMP_CONFIG,
          uartConfig: DEFAULT_UART_CONFIG,
          deviceConfig: [DEFAULT_DEVICE_CONFIG],
          rtuConfig: DEFAULT_UART_CONFIG,
          tcpConfig: DEFAULT_TCP_CONFIG,
          registers: [DEFAULT_REGISTER_CONFIG],
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
            onValuesChange={(changeValues) => {
              if (changeValues?.config?.commonConfig) {
                const changeMode = changeValues?.config?.commonConfig?.[0]?.mode;
                setMode(changeMode);
              }
            }}
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
                width="lg"
                label="设备类型"
                name="type"
                options={[
                  { label: 'SNMP协议采集器', value: 'GENERIC_SNMP' },
                  { label: '有人4G串口通信DTU', value: 'USER_G776' },
                  { label: '自定义串口协议', value: 'GENERIC_PROTOCOL' },
                  { label: '通用Modbus协议采集器', value: 'MODBUS' },
                ]}
                placeholder="请选择资源类型"
                rules={[{ required: true, message: '请选择资源类型' }]}
              />
              <ProFormText
                width="lg"
                label="备注信息"
                name="description"
                placeholder="请输入备注信息"
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
                } else if (type === 'MODBUS') {
                  return <ModbusForm mode={mode} />;
                } else {
                  return null;
                }
              }}
            </ProFormDependency>
          </ProForm>
        </ProCard>
      </PageContainer>
    </>
  );
};

export default BaseForm;
