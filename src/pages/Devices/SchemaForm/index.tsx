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
import omit from 'lodash/omit';

import { message } from '@/components/PopupHack';
import ProSegmented from '@/components/ProSegmented';
import {
  getDevicesDetail,
  postDevicesCreate,
  putDevicesUpdate,
} from '@/services/rulex/shebeiguanli';

import ProFormSubmitter from '@/components/ProFormSubmitter';
import { getHwifaceList } from '@/services/rulex/jiekouguanli';
import { formatHeaders2Arr, formatHeaders2Obj } from '@/utils/utils';
import { history, useModel, useParams, useRequest } from '@umijs/max';
import cloneDeep from 'lodash/cloneDeep';
import { columns } from './columns';
import Title from './FormTitle';
import './index.less';
import { defaultConfig, defaultHostConfig, defaultModelConfig } from './initialValue';

const DefaultListUrl = '/device/list';

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
            creatorButtonProps: {
              position: 'top',
            },
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
    };
  });
};

const SchemaForm = ({}: ProFormProps) => {
  const formRef = useRef<ProFormInstance>();
  const { showModal } = useGoBack();
  const { deviceId, groupId } = useParams();
  const { groupList, setActiveGroupKey } = useModel('useDevice');
  // const { data: portList, run: getPort } = useModel('usePort');
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
          // options={portList?.map((item) => ({
          //   label: (
          //     <Space>
          //       <span>{item?.name}</span>
          //       <span className="text-[12px] text-[#000000A6]">{item?.alias}</span>
          //     </Space>
          //   ),
          //   value: item.uuid,
          // }))}
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
      let params = cloneDeep(values);
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

  // useEffect(() => {
  //   getPort();
  // }, []);

  return (
    <PageContainer
      header={{ title: <Title deviceId={deviceId} /> }}
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

export default SchemaForm;
