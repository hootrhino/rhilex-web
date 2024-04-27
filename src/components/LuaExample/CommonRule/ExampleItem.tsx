import CodeEditor, { Lang } from '@/components/CodeEditor';
import { getRulesGetCanUsedResources } from '@/services/rulex/guizeguanli';
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
import { useRequest } from '@umijs/max';
import type { CollapseProps } from 'antd';
import { Button, Collapse, Divider, Space, theme } from 'antd';
import { useEffect, useRef, useState } from 'react';
import CopyButton from './CopyButton';
import ExampleItemChild from './ExampleItemChild';

type TplVariables = {
  name?: string;
  type?: string;
  label?: string;
  value?: number | string;
  dataSource?: 'device' | 'outend';
};

type baseTplItem = {
  label?: string;
  apply?: string;
  type?: string;
  detail?: string;
  gid?: string;
  uuid?: string;
  variables?: TplVariables[];
};

// 代码模板
export type TplItem = baseTplItem & {
  usage?: baseTplItem;
};

export type TplGroupItem = {
  uuid: string;
  name: string;
  children: TplItem[];
};

type ExampleItemProps = CollapseProps & {
  type: string; // 'built-in' | 'custom' | 'quick'
  dataSource: TplGroupItem[];
};

const title = {
  'built-in': '内置模板',
  custom: '自定义模板',
  quick: '快捷模板',
};

const ExampleItem = ({ type, dataSource, ...props }: ExampleItemProps) => {
  const { token } = theme.useToken();
  const formRef = useRef<ProFormInstance>();
  const [valModalConfig, setValConfig] = useState<{ open: boolean; data: TplItem }>({
    open: false,
    data: {},
  });
  const [copyData, setCopyData] = useState<TplItem>({});

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

  const getTargetValue = (type: string, value: any) => {
    if (type === 'string') {
      return `"${value}"`;
    }
    if (type === 'select') {
      return value ? `"${value}"` : `""`;
    }

    return value;
  };

  const renderFormList = (key: number) => {
    const { label, type, dataSource } = formRef.current?.getFieldValue('variables')[key];

    let commonConfig = {
      key,
      label,
      name: 'value',
      width: 'md',
      placeholder: '请输入变量值',
      labelCol: { flex: '130px' },
    } as any;

    const optionData = () => {
      if (type === 'boolean') {
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

    if (['boolean', 'select'].includes(type)) {
      commonConfig = {
        ...commonConfig,
        options: optionData(),
        placeholder: '请选择变量值',
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

  useEffect(() => {
    if (valModalConfig.data.variables) {
      const originCode = valModalConfig.data?.apply;
      let newCode = originCode;
      const newVal = valModalConfig.data?.variables;
      newVal?.forEach((item) => {
        const source = item.name || '';
        const target = getTargetValue(item.type || 'string', item?.value);

        if (type === 'select') {
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
    }
  }, [valModalConfig]);

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
        title="设置变量"
        layout="horizontal"
        labelWrap={true}
        open={valModalConfig.open}
        modalProps={{ onCancel: handleOnCancel }}
        onValuesChange={(changedValue) => {
          if (changedValue?.variables) {
            const newVariables = valModalConfig?.data.variables?.map((origItem, index) => {
              const changedVar = changedValue.variables[index];

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
                取消
              </Button>,
              <CopyButton data={copyData} key="copy" />,
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
          className="mb-[0]"
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
