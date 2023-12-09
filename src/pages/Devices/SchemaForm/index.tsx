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
import { FooterToolbar } from '@ant-design/pro-components';
import { Button, Popconfirm, Space } from 'antd';
import omit from 'lodash/omit';

import { message } from '@/components/PopupHack';
import ProSegmented from '@/components/ProSegmented';
import { postDevicesCreate, putDevicesUpdate } from '@/services/rulex/shebeiguanli';

import { string2Boolean } from '@/utils/utils';
import { history, useModel, useParams } from '@umijs/max';
import cloneDeep from 'lodash/cloneDeep';
import { columns } from './columns';
import Title from './FormTitle';
// import Extra from './GroupTitleExtra';
import './index.less';
import {
  defaultAisConfig,
  defaultHostConfig,
  defaultModbusConfig,
  defaultPlcConfig,
  defaultProtocolConfig,
} from './initialValue';

const DefaultListUrl = '/device/list';

export const processColumns = (columns: any) => {
  return columns.map((col: any) => {
    // let title;

    if (col.valueType === 'group') {
      // if (col.title === '寄存器配置') {
      //   title = <Extra title={col.title} />;
      // } else {
      //   title = col.title;
      // }
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
            creatorButtonProps: {
              position: 'top',
              creatorButtonText: '添加点位',
              style: { width: 'calc(100vw - 500px)' },
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
  const { groupList, detail, getDetail } = useModel('useDevice');
  const { data: portList, run: getPort } = useModel('usePort');
  const [loading, setLoading] = useState<boolean>(false);

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
      const commonConfigParams = params.config.commonConfig?.map((item) => {
        if (item?.autoRequest) {
          return { ...item, autoRequest: string2Boolean(item?.autoRequest) };
        }
        if (item?.parseAis) {
          return { ...item, parseAis: string2Boolean(item?.parseAis) };
        }
        return item;
      });

      const hostConfigParams = params?.config?.hostConfig?.[0];

      const newConfig = {
        ...params.config,
        commonConfig: commonConfigParams?.[0],
        hostConfig: hostConfigParams,
      };

      params = {
        ...params,
        config: commonConfigParams?.[0]?.mode === 'TCP' ? newConfig : omit(newConfig, 'hostConfig'),
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

    if (['GENERIC_MODBUS', 'S1200PLC'].includes(type)) {
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
      case 'S1200PLC':
        newConfig = defaultPlcConfig;
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
    getPort();
  }, []);

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
    </PageContainer>
  );
};

export default SchemaForm;
