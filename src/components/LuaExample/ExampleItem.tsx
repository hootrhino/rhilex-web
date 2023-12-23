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
import type { CollapseProps } from 'antd';
import { Button, Collapse, theme } from 'antd';
import { useEffect, useRef, useState } from 'react';
import CodeEditor from '../CodeEditor';
import CopyButton from './CopyButton';
import Extra from './Extra';
import Label from './Label';

type ExampleItemProps = CollapseProps & {
  type: 'built-in' | 'custom';
  dataSource: TplGroupItem[];
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

  const getItemsChildren = (data: TplItem[]) => {
    return data.map((item) => ({
      key: item.label,
      label: <Label data={item} />,
      style: panelStyle,
      children: <CodeEditor value={item.apply} readOnly height="150px" />,
      extra: (
        <Extra
          data={item}
          handleOnCopy={() => setValConfig({ open: true, data: item })}
        />
      ),
    }));
  };

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

  useEffect(() => {
    if (valModalConfig.data.variables) {
      let newCode = valModalConfig.data?.apply;
      const newVal = valModalConfig.data?.variables;
      newVal?.forEach((item) => {
        if (item.value) {
          const source = item.name || '';
          const target = item.type === 'string' ? `'${item.value}'` : item.value;
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

  return (
    dataSource &&
    dataSource?.length > 0 && (
      <>
        <div className="mb-[16px] text-[18px]">
          {type === 'built-in' ? '内置模板' : '自定义模板'}
        </div>
        <Collapse
          accordion
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
          >
            {({ key }) => {
              const { name, label, type } = formRef.current?.getFieldValue('variables')[key];

              const commonConfig = {
                key: key,
                label: `${label} (${name})`,
                name: 'value',
                width: 'md',
                placeholder: '请输入变量值',
                labelCol: { flex: '130px' },
              };
              const config =
                type === 'boolean'
                  ? {
                      ...commonConfig,
                      valueEnum: {
                        true: 'true',
                        false: 'false',
                      },
                      placeholder: '请选择变量值',
                    }
                  : commonConfig;
              const typeMap = {
                number: ProFormDigit,
                boolean: ProFormSelect,
                string: ProFormText,
              };

              const ComponentType = typeMap[type];

              return <ComponentType {...config} />;
            }}
          </ProFormList>
          <ProForm.Item name="code">
            <CodeEditor height="150px" />
          </ProForm.Item>
        </ModalForm>
      </>
    )
  );
};

export default ExampleItem;
