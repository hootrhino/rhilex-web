import { useEffect, useRef } from 'react';

import {
  BetaSchemaForm,
  PageContainer,
  ProCard,
  ProConfigProvider,
  ProFormInstance,
  ProFormProps,
} from '@ant-design/pro-components';

import useGoBack from '@/hooks/useGoBack';
import { getUarts } from '@/services/rulex/xitongshuju';
import { FooterToolbar } from '@ant-design/pro-components';
import { AutoComplete, Button, ConfigProvider, Popconfirm, Segmented } from 'antd';
import omit from 'lodash/omit';
import { useRequest } from 'umi';
import FullScreenEditor from '../FullScreenEditor';

import './index.less';

type SchemaFormProps<T = any> = ProFormProps & {
  title?: string;
  goBack: string;
  columns: T[];
  initialValue: T;
  loading?: boolean;
};

export const toolTip = (url?: string) => (
  <a
    href={url ? url : 'https://github.com/i4de/rulex/blob/master/device/custom_protocol_device.md'}
    target="_blank"
    rel="noreferrer"
  >
    详细戳这里
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
            min: 1,
            creatorButtonProps: { position: 'top' },
            creatorRecord: col?.initialValue,
          },
        };
      }
    }

    return {
      ...omit(col, ['required']),
      width: col?.width || 'lg',
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

const SchemaForm = ({
  title,
  columns,
  initialValue,
  goBack,
  loading,
  onFinish,
  onValuesChange,
}: SchemaFormProps) => {
  const formRef = useRef<ProFormInstance>();
  const editorRef = useRef(null);
  const { showModal } = useGoBack();

  const { data: uartOptions } = useRequest(() => getUarts(), {
    formatResult: (res) => res?.data?.map((item: string) => ({ value: item })),
  });

  const customizeValueType = {
    segmented: {
      renderFormItem: (_: any, props: any) => (
        <ConfigProvider
          theme={{
            components: {
              Segmented: {
                itemSelectedColor: '#fff',
                itemSelectedBg: '#1890ff',
              },
            },
          }}
        >
          <Segmented
            block
            className="w-[440px]"
            options={[
              { label: '是', value: 'true' },
              { label: '否', value: 'false' },
            ]}
            {...props?.fieldProps}
          />
        </ConfigProvider>
      ),
    },
    autoComplete: {
      renderFormItem: (_: any, props: any) => (
        <AutoComplete
          className="w-[440px]"
          options={uartOptions}
          placeholder="请输入本地系统的串口路径"
          {...props?.fieldProps}
        />
      ),
    },
    luaCode: {
      renderFormItem: (_: any, props: any) => (
        <FullScreenEditor ref={editorRef} {...props?.fieldProps} />
      ),
    },
  };

  useEffect(() => {
    formRef.current?.setFieldsValue({
      ...initialValue,
    });
  }, [initialValue]);

  return (
    <PageContainer header={{ title: title || '' }} onBack={() => showModal({ url: goBack })}>
      <ProConfigProvider valueTypeMap={customizeValueType} hashed={false}>
        <ProCard>
          <BetaSchemaForm
            layoutType="Form"
            formRef={formRef}
            columns={processColumns(columns)}
            onFinish={onFinish}
            submitter={{
              render: ({ reset, submit }) => {
                return (
                  <FooterToolbar>
                    <Popconfirm
                      key="reset"
                      title="重置可能会丢失数据，确定要重置吗？"
                      onConfirm={() => {
                        reset();
                        formRef.current?.setFieldsValue(initialValue);
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
            onValuesChange={onValuesChange}
          />
        </ProCard>
      </ProConfigProvider>
    </PageContainer>
  );
};

export default SchemaForm;
