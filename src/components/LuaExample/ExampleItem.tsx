import { CaretRightOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Collapse, theme } from 'antd';
import CodeEditor from '../CodeEditor';
import Extra from './Extra';
import Label from './Label';

type ExampleItemProps = CollapseProps & {
  type: 'built-in' | 'custom';
  dataSource: TplGroupItem[];
};

const ExampleItem = ({ type, dataSource, ...props }: ExampleItemProps) => {
  const { token } = theme.useToken();

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
      extra: <Extra data={item} />,
    }));
  };

  const getItems = () =>
    dataSource.map((tpl: TplGroupItem) => ({
      key: tpl.uuid,
      label: tpl.name,
      style: panelStyle,
      children: <Collapse bordered={false} items={getItemsChildren(tpl.children)} />,
    }));

  return (
    dataSource &&
    dataSource?.length > 0 && (
      <>
        <div className="mb-[16px] text-[18px]">
          {type === 'built-in' ? '内置模板' : '自定义模板'}
        </div>
        <Collapse
          bordered={false}
          defaultActiveKey={['data']}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          style={{ background: token.colorBgContainer }}
          items={getItems()}
          expandIconPosition="end"
          {...props}
        />
      </>
    )
  );
};

export default ExampleItem;
