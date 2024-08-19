import CodeEditor, { Lang } from '@/components/CodeEditor';
import { getRulesGetCanUsedResources } from '@/services/rulex/guizeguanli';
import type { ModalFormProps, ProFormInstance } from '@ant-design/pro-components';
import {
  ModalForm,
  ProForm,
  ProFormList,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useIntl, useRequest } from '@umijs/max';
import { Button, Space } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { defaultConfig } from '.';
import { TplDataSource, TplDataType } from '../enum';
import { TplItem, ValConfig } from '../typings';
import CopyButton from './CopyButton';

type UsageModalProps = ModalFormProps & {
  data: TplItem;
  changeConfig: (value: ValConfig) => void;
};

const UsageModal = ({ data, changeConfig, ...props }: UsageModalProps) => {
  const formRef = useRef<ProFormInstance>();
  const { formatMessage } = useIntl();
  const [copyData, setCopyData] = useState<Pick<TplItem, 'label' | 'apply'>>({});

  const { data: resourceData } = useRequest(() => getRulesGetCanUsedResources());

  const getTargetValue = (type = TplDataType.STRING, value: any) => {
    if (type === TplDataType.STRING) {
      return `"${value}"`;
    }
    if (type === TplDataType.SELECT) {
      return value ? `"${value}"` : `""`;
    }
    // if (type === TplDataType.OBJECT) {
    //   const result = value?.reduce((acc: any, item: any) => {
    //     return `${acc}${item.name} = ${item.defaultValue},\n`;
    //   }, '');

    //   return value ? `{\n${result}}` : '{}';
    // }

    return `${value}`;
  };

  const handleOnCancel = () => {
    formRef.current?.resetFields();
    changeConfig(defaultConfig);
  };

  useEffect(() => {
    const newVal = data?.variables;

    if (!newVal) return;

    const originCode = data?.apply;
    let newCode = originCode;

    newVal?.forEach((item) => {
      const source = item.name || '';
      const target = getTargetValue(item.type, item?.value);

      if (item.type === 'select') {
        newCode = item?.value ? newCode?.replace(source, target) : originCode;
      } else {
        newCode = newCode?.replace(source, target);
      }
    });

    formRef.current?.setFieldsValue({
      variables: newVal,
      code: newCode,
    });
    setCopyData({ label: data.label, apply: newCode });
  }, [data.variables]);

  return (
    <ModalForm
      formRef={formRef}
      title={formatMessage({ id: 'component.modal.title.settingVar' })}
      layout="horizontal"
      modalProps={{ onCancel: handleOnCancel, maskClosable: false }}
      onValuesChange={(changedValue) => {
        if (changedValue?.variables) {
          const newVariables = data.variables?.map((origItem, index) => {
            const changedVar = changedValue.variables[index];

            return changedVar ? { ...origItem, value: changedVar.value } : origItem;
          });

          changeConfig({
            open: true,
            data: { ...data, variables: newVariables },
          });
        }
      }}
      submitter={{
        render: () => [
          <Button key="cancel" onClick={handleOnCancel}>
            {formatMessage({ id: 'button.cancel' })}
          </Button>,
          <CopyButton {...copyData} key="copy-item" />,
        ],
      }}
      {...props}
    >
      <ProFormList
        name="variables"
        min={1}
        creatorButtonProps={false}
        actionRender={() => []}
        alwaysShowItemLabel={true}
        className="mb-[0] variable-list"
      >
        {({ key }) => {
          const { label, dataSource, type } = formRef.current?.getFieldValue('variables')[key];

          const isIncludes = Object.values(TplDataSource).includes(dataSource);
          const getOptions = () => {
            if (isIncludes) {
              return (
                resourceData &&
                resourceData[dataSource]?.map((item: any) => ({
                  label: item.name,
                  value: item.uuid,
                }))
              );
            } else {
              return dataSource;
            }
          };

          return type === TplDataType.STRING ? (
            <ProFormText key={key} label={label} name="value" width="md" />
          ) : (
            <ProFormSelect
              key={key}
              label={label}
              name="value"
              width="md"
              options={getOptions()}
              allowClear={false}
              fieldProps={
                isIncludes
                  ? {
                      optionRender: ({ label, value }) => (
                        <Space>
                          <span>{label}</span>
                          <span className="text-[12px] text-[#000000A6]">{value}</span>
                        </Space>
                      ),
                    }
                  : {}
              }
              placeholder={formatMessage({ id: 'component.form.placeholder.varValue.select' })}
            />
          );
        }}
      </ProFormList>
      <ProForm.Item name="code">
        <CodeEditor readOnly lang={Lang.LUA} />
      </ProForm.Item>
    </ModalForm>
  );
};

export default UsageModal;
