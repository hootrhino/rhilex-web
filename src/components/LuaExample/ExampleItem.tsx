import { CaretRightOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ModalForm,
  ProForm,
  ProFormDigit,
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
      extra: <Extra data={item} handleOnCopy={() => setValConfig({ open: true, data: item })} />,
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
    if (valModalConfig.data) {
      let newCode = valModalConfig.data?.apply;
      valModalConfig.data?.variables?.forEach((item) => {
        if (item.value) {
          const source = item.name || '';
          const target = item.type === 'string' ? `'${item.value}'` : item.value;
          newCode = newCode?.replace(source, target);
        }
      });

      formRef.current?.setFieldsValue({
        variables: valModalConfig.data?.variables,
        code: newCode,
      });
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
          open={valModalConfig.open}
          modalProps={{ onCancel: handleOnCancel }}
          labelCol={{ span: 4 }}
          onValuesChange={(changedValue) => {
            if (changedValue) {
              const newVal = valModalConfig?.data.variables?.map((item) =>
                item.name === Object.keys(changedValue)?.[0]
                  ? { ...item, value: changedValue[item.name] }
                  : item,
              );
              setValConfig({
                ...valModalConfig,
                data: { ...valModalConfig.data, variables: newVal },
              });
            }
          }}
          submitter={{
            render: () => {
              return [
                <Button key="cancel" onClick={handleOnCancel}>
                  取消
                </Button>,
                <CopyButton data={valModalConfig?.data} key="copy" />,
              ];
            },
          }}
        >
          {valModalConfig.data?.variables?.map(({ name, type, label }) => (
            <>
              {type === 'string' && (
                <ProFormText
                  key={name}
                  label={`${label} (${name})`}
                  name={name}
                  width="md"
                  placeholder="请输入变量值"
                />
              )}
              {type === 'number' && (
                <ProFormDigit
                  key={name}
                  label={`${label} (${name})`}
                  name={name}
                  width="md"
                  placeholder="请输入变量值"
                />
              )}
              {type === 'boolean' && (
                <ProFormSelect
                  key={name}
                  label={`${label} (${name})`}
                  name={name}
                  width="md"
                  valueEnum={{
                    true: 'true',
                    false: 'false',
                  }}
                  placeholder="请选择变量值"
                />
              )}
            </>
          ))}
          <ProForm.Item name="code">
            <CodeEditor height="150px" />
          </ProForm.Item>
        </ModalForm>
      </>
    )
  );
};

export default ExampleItem;
