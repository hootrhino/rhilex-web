import { useEffect, useRef, useState } from 'react';

import type { ProFormInstance } from '@ant-design/pro-components';
import {
  BetaSchemaForm,
  PageContainer,
  ProCard,
  ProConfigProvider,
  ProFormProps,
  ProFormSelect,
  ProSkeleton,
} from '@ant-design/pro-components';

import useGoBack from '@/hooks/useGoBack';
import { FooterToolbar } from '@ant-design/pro-components';
import { Button, Popconfirm, Space } from 'antd';
import omit from 'lodash/omit';

import { message } from '@/components/PopupHack';
import ProSegmented from '@/components/ProSegmented';
import { postDevicesCreate, putDevicesUpdate } from '@/services/rulex/shebeiguanli';
import { history, useModel, useParams } from '@umijs/max';
import cloneDeep from 'lodash/cloneDeep';
import { columns } from './columns';
import './index.less';
import {
  defaultAisConfig,
  defaultHostConfig,
  defaultModbusConfig,
  defaultProtocolConfig,
} from './initialValue';

// type SchemaFormProps<T = any> = ProFormProps & {
//   // title?: string;
//   // goBack: string;
//   // columns: T[];
//   //initialValue: T;
//   // loading?: boolean;
//   // deviceId: string;
// };

const DefaultListUrl = '/device/list';

export const toolTip = (url?: string) => (
  <a href={url ? url : 'http://www.hootrhino.com/'} target="_blank" rel="noreferrer">
    前往官方文档主页查看更多帮助信息
  </a>
);

export const processColumns = (columns: any) => {
  return columns.map((col: any) => {
    if (col.valueType === 'group') {
      return { ...col, columns: processColumns(col.columns) };
    }

    if (col.valueType === 'dependency') {
      return {
        ...col,
        columns: (params: any) => {
          return processColumns(col.columns(params));
        },
      };
    }
    if (col.valueType === 'formList') {
      if (col.mode === 'single') {
        return {
          ...omit(col, ['mode']),
          columns: processColumns(col.columns),
          fieldProps: {
            creatorButtonProps: false,
            copyIconProps: false,
            deleteIconProps: false,
          },
        };
      } else {
        return {
          ...omit(col, ['mode']),
          columns: processColumns(col.columns),
          fieldProps: {
            // min: 1,
            creatorButtonProps: { position: 'top', style: {width: 'calc(100vw - 500px)'}},
            creatorRecord: col?.initialValue,
          },
        };
      }
    }

    return {
      ...omit(col, ['required']),
      width: col?.width || 'md',
      fieldProps: {
        placeholder: col?.valueType === 'select' ? `请选择${col?.title}` : `请输入${col?.title}`,
      },
      formItemProps: {
        rules: [
          {
            required: col?.required,
            message: col?.valueType === 'select' ? `请选择${col?.title}` : `请输入${col?.title}`,
          },
        ],
      },
      tooltip: col?.tooltip === true ? toolTip : toolTip(col?.tooltip),
    };
  });
};

const SchemaForm = ({}: ProFormProps) => {
  const formRef = useRef<ProFormInstance>();
  const { showModal } = useGoBack();
  const { deviceId, groupId } = useParams();
  const { groupList, detail, getDetail, detailLoading } = useModel('useDevice');
  const { data: portList, run: getPort } = useModel('usePort');
  const [loading, setLoading] = useState<boolean>(false);
  const [spin, setSpin] = useState<boolean>(true);

  const initialValues = {
    type: 'GENERIC_PROTOCOL',
    gid: groupId,
    config: defaultProtocolConfig,
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
          options={portList?.map((item) => ({
            label: (
              <Space>
                <span>{item?.name}</span>
                <span className="text-[12px] text-[#000000A6]">{item?.alias}</span>
              </Space>
            ),
            value: item.uuid,
          }))}
          {...props?.fieldProps}
        />
      ),
    },
  };

  const handleOnFinish = async (values: any) => {
    setLoading(true);
    try {
      let params = cloneDeep(values);
      const commonConfigParams = params.config.commonConfig?.[0];
      const hostConfigParams = params?.config?.hostConfig?.[0];
      const registersParams = params?.config?.registers;

      let newConfig;

      if (params.type === 'GENERIC_PROTOCOL') {
        newConfig = {
          ...params.config,
          commonConfig: commonConfigParams,
          hostConfig: hostConfigParams,
        };
      }

      if (params.type === 'GENERIC_MODBUS') {
        newConfig = {
          ...params.config,
          commonConfig: {
            ...commonConfigParams,
            autoRequest: commonConfigParams?.autoRequest === 'true' ? true : false,
          },
          hostConfig: hostConfigParams,
          registers: registersParams?.map((item: Record<string, any>) => ({
            ...item,
            value: '',
          })),
        };
      }

      if (params.type === 'GENERIC_AIS_RECEIVER') {
        newConfig = {
          ...params.config,
          commonConfig: {
            ...commonConfigParams,
            parseAis: commonConfigParams?.parseAis === 'true' ? true : false,
          },
          hostConfig: hostConfigParams,
        };
      }

      params = {
        ...params,
        config: commonConfigParams.mode === 'TCP' ? newConfig : omit(newConfig, 'hostConfig'),
      };

      if (deviceId) {
        await putDevicesUpdate({ ...params, uuid: deviceId });
        message.success('更新成功');
      } else {
        const { msg } = await postDevicesCreate(params);

        if (msg === 'Success') {
          message.success('创建成功');
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

  const handleOnUpdateValue = ({ type, config }: any) => {
    const newCommonConfig = config?.commonConfig;
    const newHostConfig = config?.hostConfig;

    let newConfig = {
      ...config,
      commonConfig: [newCommonConfig],
      hostConfig: newHostConfig ? [newHostConfig] : defaultHostConfig,
    };

    if (type === 'GENERIC_MODBUS') {
      newConfig = {
        ...newConfig,
        commonConfig: newConfig?.commonConfig?.map((item: any) => ({
          ...item,
          autoRequest: item?.autoRequest.toString(),
        })),
      };
    }
    if (type === 'GENERIC_AIS_RECEIVER') {
      newConfig = {
        ...newConfig,
        commonConfig: newConfig?.commonConfig?.map((item: any) => ({
          ...item,
          parseAis: item?.parseAis.toString(),
        })),
      };
    }

    return newConfig;
  };

  const handleOnReset = () => {
    if (deviceId && detail) {
      const newConfig = handleOnUpdateValue(detail);
      formRef.current?.setFieldsValue({ ...detail, config: newConfig });
    } else {
      formRef.current?.setFieldsValue(initialValues);
    }
  };

  const handleOnValuesChange = (changedValue: any) => {
    if (!changedValue?.type) return;
    let newConfig;

    switch (changedValue?.type) {
      case 'GENERIC_PROTOCOL':
        newConfig = defaultProtocolConfig;
        break;
      case 'GENERIC_MODBUS':
        newConfig = defaultModbusConfig;
        break;
      case 'GENERIC_AIS_RECEIVER':
        newConfig = defaultAisConfig;
        break;
      default:
        newConfig = defaultProtocolConfig;
        break;
    }

    formRef.current?.setFieldsValue({
      config: changedValue?.type === detail?.type ? handleOnUpdateValue(detail) : newConfig,
    });
  };

  useEffect(() => {
    handleOnReset();
  }, [detail]);

  useEffect(() => {
    if (deviceId) {
      getDetail({ uuid: deviceId });
    }
  }, [deviceId]);

  useEffect(() => {
    if (!detailLoading) {
      setSpin(false);
    }
  }, [detailLoading]);

  useEffect(() => {
    getPort();
  }, []);

  return (
    <PageContainer
      header={{ title: deviceId ? '编辑设备' : '新建设备' }}
      onBack={() => showModal({ url: DefaultListUrl })}
    >
      {spin ? (
        <ProSkeleton />
      ) : (
        <ProConfigProvider valueTypeMap={customizeValueType} hashed={false}>
          <ProCard>
            <BetaSchemaForm
              layoutType="Form"
              formRef={formRef}
              columns={processColumns(columns)}
              onFinish={handleOnFinish}
              onValuesChange={handleOnValuesChange}
              initialValues={initialValues}
              rootClassName='device-form'
              submitter={{
                render: ({ reset, submit }) => {
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
                },
              }}
            />
          </ProCard>
        </ProConfigProvider>
      )}
    </PageContainer>
  );
};

export default SchemaForm;
