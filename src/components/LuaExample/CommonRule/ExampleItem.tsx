import CodeEditor, { Lang } from '@/components/CodeEditor';
import { getRulesGetCanUsedResources } from '@/services/rulex/guizeguanli';
import { getDatacenterSchemaDdlDefine } from '@/services/rulex/shujuzhongxin';
import { CaretRightOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ModalForm,
  ProForm,
  ProFormDigit,
  ProFormList,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useIntl, useRequest } from '@umijs/max';
import type { CollapseProps } from 'antd';
import { Button, Collapse, Divider, Space, theme } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { ExampleType, TplDataSource, TplDataType } from '../enum';
import type { TplGroupItem, TplItem } from '../typings';
import CopyButton from './CopyButton';
import ExampleItemChild from './ExampleItemChild';

export type ExampleItemProps = CollapseProps & {
  type: ExampleType;
  dataSource: TplGroupItem[];
};

const ExampleItem = ({ type, dataSource, ...props }: ExampleItemProps) => {
  const { token } = theme.useToken();
  const formRef = useRef<ProFormInstance>();
  const { formatMessage } = useIntl();
  const [valModalConfig, setValConfig] = useState<{ open: boolean; data: TplItem }>({
    open: false,
    data: {},
  });
  const [copyData, setCopyData] = useState<TplItem>({});
  const [schemaId, setSchemaId] = useState<string | undefined>('');

  const title = {
    [ExampleType.BUILTIN]: formatMessage({ id: 'component.title.builtInTpl' }),
    [ExampleType.CUSTOM]: formatMessage({ id: 'component.title.customTpl' }),
    [ExampleType.QUICK]: formatMessage({ id: 'component.title.quickTpl' }),
  };

  const panelStyle: React.CSSProperties = {
    marginBottom: 12,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  const { data: resourceData } = useRequest(() => getRulesGetCanUsedResources());

  const getItemsChildren = (data: TplItem[]) =>
    data?.map((item) => ({
      key: item.detail,
      label: (
        <Space>
          <span>{item.detail}</span>
          <span className="text-[12px] text-[#000000A6]">{item.label}</span>
        </Space>
      ),
      style: panelStyle,
      children: (
        <>
          <ExampleItemChild
            type={type}
            data={item}
            handleOnCopy={() => setValConfig({ open: true, data: item })}
            className="pb-[20px]"
          />
          {item?.usage && (
            <ExampleItemChild
              isUsage
              type={type}
              data={item.usage}
              handleOnCopy={() => setValConfig({ open: true, data: item.usage || {} })}
            />
          )}
        </>
      ),
    }));

  const getItems = () =>
    dataSource.map((tpl: TplGroupItem) => ({
      key: tpl.uuid,
      label: tpl.name,
      style: panelStyle,
      children: <Collapse bordered={false} items={getItemsChildren(tpl.children)} />,
    }));

  const handleOnCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setValConfig({ open: false, data: {} });
  };

  const getTargetValue = (type = TplDataType.STRING, value: any) => {
    if (type === TplDataType.STRING) {
      return `"${value}"`;
    }
    if (type === TplDataType.SELECT) {
      return value ? `"${value}"` : `""`;
    }
    if (type === TplDataType.OBJECT) {
      const result = value?.reduce((acc: any, item: any) => {
        return `${acc}${item.name} = ${item.defaultValue},\n`;
      }, '');

      return value ? `{\n${result}}` : '{}';
    }

    return `${value}`;
  };

  const renderFormList = (key: number) => {
    if (formRef.current?.getFieldValue('variables')[key]?.hideInForm) return;

    const { label, type, dataSource } = formRef.current?.getFieldValue('variables')[key];

    let commonConfig = {
      key,
      label,
      name: 'value',
      width: 'md',
      placeholder: formatMessage({ id: 'component.form.placeholder.varValue' }),
    } as any;

    const optionData = () => {
      if (type === TplDataType.BOOLEAN) {
        return [
          { label: 'true', value: true },
          { label: 'false', value: false },
        ];
      } else {
        return resourceData
          ? resourceData[dataSource]?.map((item: any) => ({
              label: (
                <>
                  <span>{item?.name}</span>
                  <Divider type="vertical" />
                  <span className="text-[12px] text-[#000000A6]">{item?.uuid}</span>
                </>
              ),
              value: item.uuid,
            }))
          : [];
      }
    };

    if ([TplDataType.BOOLEAN, TplDataType.SELECT].includes(type)) {
      commonConfig = {
        ...commonConfig,
        options: optionData(),
        placeholder: formatMessage({ id: 'component.form.placeholder.varValue.select' }),
        allowClear: false,
      };
    }

    const typeMap = {
      number: ProFormDigit,
      boolean: ProFormSelect,
      string: ProFormText,
      select: ProFormSelect,
    };

    const ComponentType = typeMap[type];
    return <ComponentType {...commonConfig} />;
  };

  const { run: getSchema } = useRequest(
    (params: API.getDatacenterSchemaDDLDefineParams) => getDatacenterSchemaDdlDefine(params),
    {
      manual: true,
      onSuccess: (data) => {
        const tpl = formRef.current?.getFieldsValue();
        let newVariables = tpl.variables;

        newVariables = newVariables?.map((v: any) => {
          if (v.name === 'schema') {
            return {
              ...v,
              value: data?.filter((item) => !['id', 'create_at'].includes(item.name)),
            };
          }
          return v;
        });

        setValConfig({
          ...valModalConfig,
          data: { ...valModalConfig.data, variables: newVariables },
        });
      },
    },
  );

  useEffect(() => {
    const newVal = valModalConfig.data?.variables;

    if (!newVal) return;

    const originCode = valModalConfig.data?.apply;
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
    setCopyData({ ...valModalConfig.data, apply: newCode });
  }, [valModalConfig]);

  useEffect(() => {
    if (schemaId) {
      getSchema({ uuid: schemaId });
    }
  }, [schemaId]);

  return dataSource && dataSource?.length > 0 ? (
    <>
      {type !== 'built-in' && <Divider />}
      <div className="mb-[16px] font-medium text-[16px]">{title[type]}</div>
      <Collapse
        bordered={false}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        style={{ background: token.colorBgContainer }}
        items={getItems()}
        expandIconPosition="end"
        {...props}
      />
      <ModalForm
        formRef={formRef}
        title={formatMessage({ id: 'component.modal.title.settingVar' })}
        layout="horizontal"
        open={valModalConfig.open}
        modalProps={{ onCancel: handleOnCancel, maskClosable: false }}
        onValuesChange={(changedValue) => {
          if (changedValue?.variables) {
            const newVariables = valModalConfig?.data.variables?.map((origItem, index) => {
              const changedVar = changedValue.variables[index];
              if (origItem.name === 'uuid' && origItem?.dataSource === TplDataSource.SCHEMA) {
                setSchemaId(changedVar?.value);
              }

              return changedVar ? { ...origItem, value: changedVar.value } : origItem;
            });

            setValConfig({
              ...valModalConfig,
              data: { ...valModalConfig.data, variables: newVariables },
            });
          }
        }}
        submitter={{
          render: () => {
            return [
              <Button key="cancel" onClick={handleOnCancel}>
                {formatMessage({ id: 'button.cancel' })}
              </Button>,
              <CopyButton data={copyData} key="copy" ghost />,
            ];
          },
        }}
      >
        <ProFormList
          name="variables"
          min={1}
          creatorButtonProps={false}
          actionRender={() => []}
          alwaysShowItemLabel={true}
          className="mb-[0] variable-list"
        >
          {({ key }) => renderFormList(key)}
        </ProFormList>
        <ProForm.Item name="code">
          <CodeEditor readOnly lang={Lang.LUA} />
        </ProForm.Item>
      </ModalForm>
    </>
  ) : null;
};

export default ExampleItem;
