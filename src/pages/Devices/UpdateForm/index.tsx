import { useEffect, useRef, useState } from 'react';

import type { ProFormInstance } from '@ant-design/pro-components';
import {
  BetaSchemaForm,
  PageContainer,
  ProCard,
  ProConfigProvider,
  ProFormProps,
  ProFormSelect,
} from '@ant-design/pro-components';

import useGoBack from '@/hooks/useGoBack';
import { Space } from 'antd';

import { message } from '@/components/PopupHack';
import ProSegmented from '@/components/ProSegmented';
import {
  getDevicesDetail,
  postDevicesCreate,
  putDevicesUpdate,
} from '@/services/rulex/shebeiguanli';

import Title from '@/components/FormTitle';
import ProFormSubmitter from '@/components/ProFormSubmitter';
import useBeforeUnloadConfirm from '@/hooks/useBeforeUnload';
import { getHwifaceList } from '@/services/rulex/jiekouguanli';
import { getSchemaList } from '@/services/rulex/shujumoxing';
import { formatHeaders2Arr, formatHeaders2Obj, processColumns } from '@/utils/utils';
import { history, useModel, useParams, useRequest } from '@umijs/max';
import { columns } from './columns';
import './index.less';

const DefaultListUrl = '/device/list';

// TCP 配置
export const defaultHostConfig = [
  {
    port: 3399,
    host: '127.0.0.1',
    timeout: 3000,
  },
];

export const defaultConfig = {
  GENERIC_PROTOCOL: {
    commonConfig: [
      {
        retryTime: 5,
        mode: 'UART',
      },
    ],
    hostConfig: defaultHostConfig,
  },
  GENERIC_MODBUS: {
    commonConfig: [
      {
        autoRequest: 'false',
        mode: 'UART',
      },
    ],
    hostConfig: defaultHostConfig,
  },
  GENERIC_AIS_RECEIVER: {
    commonConfig: [
      {
        parseAis: 'false',
        gwsn: 'HR0001',
        mode: 'UART',
      },
    ],
    hostConfig: [
      {
        port: 6005,
        host: '0.0.0.0',
        timeout: 3000,
      },
    ],
  },
  SIEMENS_PLC: {
    commonConfig: [
      {
        autoRequest: 'false',
        host: '127.0.0.1:102',
        model: 'S71200',
        rack: 0,
        slot: 1,
        timeout: 3000,
        idleTimeout: 5000,
      },
    ],
  },
  GENERIC_HTTP_DEVICE: {
    commonConfig: [
      {
        autoRequest: 'false',
        timeout: 3000,
        frequency: 1000,
      },
    ],
    httpConfig: [
      {
        url: 'http://127.0.0.1:8080',
      },
    ],
  },
};

// 根据 PLC 型号改变 rack&slot 默认值
export const defaultModelConfig = {
  S7200: {
    slot: 2,
  },
  S7300: {
    slot: 2,
  },
  S7400: {
    slot: 2,
  },
  S71200: {
    slot: 1,
  },
  S71500: {
    slot: 1,
  },
};

const UpdateForm = ({}: ProFormProps) => {
  const formRef = useRef<ProFormInstance>();
  const { showModal } = useGoBack();
  const { deviceId, groupId } = useParams();
  const { groupList, setActiveGroupKey } = useModel('useDevice');
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues = {
    type: 'GENERIC_PROTOCOL',
    gid: groupId,
    config: defaultConfig['GENERIC_PROTOCOL'],
  };

  const customizeValueType = {
    segmented: {
      renderFormItem: (_: any, props: any) => <ProSegmented width="md" {...props?.fieldProps} />,
    },
    groupSelect: {
      renderFormItem: (_: any, props: any) => (
        <ProFormSelect
          width="md"
          options={groupList?.map((group) => ({ label: group.name, value: group.uuid }))}
          {...props?.fieldProps}
        />
      ),
    },
    portSelect: {
      renderFormItem: (_: any, props: any) => (
        <ProFormSelect
          width="md"
          request={async () => {
            const { data } = await getHwifaceList();

            return data?.map((item) => ({
              label: (
                <Space>
                  <span>{item?.name}</span>
                  <span className="text-[12px] text-[#000000A6]">{item?.alias}</span>
                </Space>
              ),
              value: item.uuid,
            }));
          }}
          {...props?.fieldProps}
        />
      ),
    },
    schemaSelect: {
      renderFormItem: (_: any, props: any) => (
        <ProFormSelect
          width="md"
          request={async () => {
            const { data } = await getSchemaList();

            return data?.map((item) => ({
              label: item?.name,
              value: item.uuid,
            }));
          }}
          {...props?.fieldProps}
        />
      ),
    },
  };

  // 设备详情
  const { data: detail } = useRequest(() => getDevicesDetail({ uuid: deviceId || '' }), {
    ready: !!deviceId,
  });

  const handleOnFinish = async (values: any) => {
    setLoading(true);
    try {
      let params = { ...values };
      const commonConfigParams = params.config.commonConfig;
      const hostConfigParams = params?.config?.hostConfig?.[0];
      const httpConfigParams = params?.config?.httpConfig?.[0];

      let newConfig = {
        ...params.config,
        commonConfig: commonConfigParams?.[0],
      };

      if (commonConfigParams?.[0]?.mode === 'TCP') {
        newConfig = {
          ...newConfig,
          hostConfig: hostConfigParams,
        };
      }

      if (params?.type === 'GENERIC_HTTP_DEVICE') {
        newConfig = {
          ...newConfig,
          httpConfig: {
            ...httpConfigParams,
            headers:
              httpConfigParams?.headers?.length > 0
                ? formatHeaders2Obj(httpConfigParams?.headers)
                : {},
          },
        };
      }

      params = {
        ...params,
        schemaId: params?.schemaId || '',
        config: newConfig,
      };

      if (deviceId) {
        await putDevicesUpdate({ ...params, uuid: deviceId });
        message.success('更新成功');
      } else {
        const { msg } = await postDevicesCreate(params);

        if (msg === 'Success') {
          message.success('创建成功');
          setActiveGroupKey(groupId ? groupId : 'DROOT');
        } else {
          const info = `创建成功，但是暂时无法正常工作，请及时调整配置参数。错误信息：${msg}`;
          message.warning(info);
        }
      }
      history.push(DefaultListUrl);
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      history.push(DefaultListUrl);
      return false;
    }
  };

  const handleOnUpdateValue = ({ config, type }: any) => {
    const newCommonConfig = config?.commonConfig;
    const newHostConfig = config?.hostConfig;

    let newConfig = {
      ...config,
      commonConfig: [newCommonConfig],
      hostConfig: newHostConfig ? [newHostConfig] : defaultHostConfig,
    };

    if (type === 'GENERIC_HTTP_DEVICE') {
      newConfig = {
        ...newConfig,
        httpConfig: [
          {
            ...newConfig.httpConfig,
            headers: formatHeaders2Arr(newConfig?.httpConfig?.headers),
          },
        ],
      };
    }

    return newConfig;
  };

  const handleOnReset = () => {
    if (deviceId && detail) {
      formRef.current?.setFieldsValue({ ...detail, config: handleOnUpdateValue(detail) });
    } else {
      formRef.current?.setFieldsValue(initialValues);
    }
  };

  const handleOnValuesChange = (changedValue: any) => {
    if (changedValue?.type) {
      const newConfig = defaultConfig[changedValue?.type];

      formRef.current?.setFieldsValue({
        config: changedValue?.type === detail?.type ? handleOnUpdateValue(detail) : newConfig,
      });
    } else {
      const model = changedValue?.config?.commonConfig?.[0]?.model;
      if (model) {
        const defaultPlcConfig = defaultConfig['SIEMENS_PLC'];
        const newCommonConfig = defaultPlcConfig.commonConfig?.map((item) => ({
          ...item,
          ...defaultModelConfig[model],
          model,
        }));
        formRef.current?.setFieldsValue({ config: { commonConfig: newCommonConfig } });
      } else {
        return;
      }
    }
  };

  useEffect(() => {
    handleOnReset();
  }, [detail]);

  useBeforeUnloadConfirm();

  return (
    <PageContainer
      header={{ title: <Title title={deviceId ? '编辑设备' : '新建设备'} /> }}
      onBack={() => showModal({ url: DefaultListUrl })}
    >
      <ProConfigProvider valueTypeMap={customizeValueType} hashed={false}>
        <ProCard>
          <BetaSchemaForm
            layoutType="Form"
            formRef={formRef}
            columns={processColumns(columns)}
            onFinish={handleOnFinish}
            onValuesChange={handleOnValuesChange}
            initialValues={initialValues}
            rootClassName="device-form"
            submitter={{
              render: ({ reset, submit }) => (
                <ProFormSubmitter
                  handleOnSubmit={submit}
                  handleOnReset={() => {
                    reset();
                    handleOnReset();
                  }}
                  loading={loading}
                />
              ),
            }}
          />
        </ProCard>
      </ProConfigProvider>
    </PageContainer>
  );
};

export default UpdateForm;
