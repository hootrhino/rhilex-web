import { useEffect, useRef } from 'react';

import { useParams } from 'umi';

import {
  BetaSchemaForm,
  PageContainer,
  ProCard,
  ProConfigProvider,
  ProFormInstance,
  ProFormProps,
} from '@ant-design/pro-components';

import FormFooter from '@/components/FromFooter';
import useGoBack from '@/hooks/useGoBack';
import { AutoComplete, Segmented } from 'antd';
import omit from 'lodash/omit';

type SchemaFormProps<T = any> = ProFormProps & {
  title?: string;
  goBack: string;
  columns: T[];
  initialValue: T;
};

export const toolTip = (
  <a
    href="https://github.com/i4de/rulex/blob/master/device/custom_protocol_device.md"
    target="_blank"
    rel="noreferrer"
  >
    详细戳这里
  </a>
);

const customizeValueType = {
  segmented: {
    renderFormItem: (_: any, props: any) => (
      <Segmented
        block
        style={{ width: 440 }}
        options={[
          { label: '是', value: 'true' },
          { label: '否', value: 'false' },
        ]}
        {...props?.fieldProps}
      />
    ),
  },
  autoComplete: {
    renderFormItem: (_: any, props: any) => (
      <AutoComplete
        style={{ width: 440 }}
        options={[]}
        placeholder="请输入本地系统的串口路径"
        {...props?.fieldProps}
      />
    ),
  },
};

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
            itemRender: ({ listDom, action }: any, { record }: any) => (
              <ProCard
                bordered
                extra={action}
                title={record?.name}
                style={{
                  marginBlockEnd: 8,
                }}
              >
                {listDom}
              </ProCard>
            ),
          },
        };
      }
    }

    return {
      ...omit(col, ['required']),
      width: 'lg',
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
      tooltip: col?.tooltip === true ? toolTip : col?.tooltip,
    };
  });
};

const SchemaForm = ({ title, columns, initialValue, goBack, onFinish }: SchemaFormProps) => {
  const formRef = useRef<ProFormInstance>();
  const { id } = useParams();
  const { showModal } = useGoBack();

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
                  <FormFooter
                    onReset={() => (id ? formRef.current?.setFieldsValue(initialValue) : reset())}
                    onSubmit={submit}
                  />
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
