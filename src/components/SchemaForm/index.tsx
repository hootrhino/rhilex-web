import { useEffect, useRef } from 'react';

import {
  BetaSchemaForm,
  PageContainer,
  ProCard,
  ProConfigProvider,
  ProFormInstance,
  ProFormProps,
  ProFormSelect,
} from '@ant-design/pro-components';

import useGoBack from '@/hooks/useGoBack';
import { FooterToolbar } from '@ant-design/pro-components';
import { Button, ConfigProvider, Popconfirm, Segmented, Space } from 'antd';
import omit from 'lodash/omit';

import { useModel } from '@umijs/max';
import LuaEditor from '../LuaEditor';
import './index.less';

type SchemaFormProps<T = any> = ProFormProps & {
  title?: string;
  goBack: string;
  columns: T[];
  initialValue: T;
  loading?: boolean;
};

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
            min: 1,
            creatorButtonProps: { position: 'top' },
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
  const { showModal } = useGoBack();
  const { groupList } = useModel('useDevice');
  const { data: portList, run: getPort } = useModel('usePort');

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
            className="w-[328px]"
            options={[
              { label: '是', value: 'true' },
              { label: '否', value: 'false' },
            ]}
            {...props?.fieldProps}
          />
        </ConfigProvider>
      ),
    },
    luaCode: {
      renderFormItem: (_: any, props: any) => (
        <LuaEditor {...props?.fieldProps} className="w-full" />
      ),
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

  useEffect(() => {
    formRef.current?.setFieldsValue({
      ...initialValue,
    });
  }, [initialValue]);

  useEffect(() => {
    getPort();
  }, []);

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
