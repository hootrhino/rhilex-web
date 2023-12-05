import {
  CaretRightOutlined,
  CheckOutlined,
  CopyOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { history } from '@umijs/max';
import type { DrawerProps } from 'antd';
import { Button, Collapse, Divider, Drawer, Input, Space, theme, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CodeEditor from '../CodeEditor';
import type { Data, Template } from '../LuaEditor/constant';
import { luaTemplates } from '../LuaEditor/constant';

type LuaExampleProps = DrawerProps;

const LuaExample = ({ ...props }: LuaExampleProps) => {
  const [templateData, setTplData] = useState<Template[]>([]);
  const [copied, setCopied] = useState<string>('');
  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    marginBottom: 12,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  const filterData = (value: string) => {
    let filtered = [...luaTemplates];
    const regex = new RegExp(value, 'i');

    return filtered
      .map((item) => {
        let matchItem = { ...item };

        // 搜索标题
        if (matchItem.title.includes(value)) {
          return matchItem;
        }

        // 搜索内层
        matchItem.data = item.data.filter(
          (child) => child.label.match(regex) || child.detail.match(regex),
        );
        return matchItem.data?.length > 0 ? matchItem : null;
      })
      .filter((item) => item);
  };

  // 搜索快捷模板
  const handleOnSearch = (value: string) => {
    if (!value) {
      setTplData(luaTemplates);
    } else {
      const newData = filterData(value.toLowerCase());
      setTplData(newData as Template[]);
    }
  };

  const getItemsChildren = (data: Data[]) => {
    return data.map((item) => ({
      key: item.label,
      label: (
        <Typography.Paragraph
          style={{
            marginBottom: 0,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Space>
            <span>{item.detail}</span>
            <span className="text-[12px] text-[#000000A6]">{item.label}</span>
          </Space>
        </Typography.Paragraph>
      ),
      style: panelStyle,
      children: <CodeEditor value={item.apply} readOnly height="150px" />,
      extra: (
        <CopyToClipboard
          key={item.apply}
          text={item.apply}
          onCopy={(text, result) => {
            setCopied(result ? text : '');
            setTimeout(() => {
              setCopied('');
            }, 1500);
          }}
        >
          <Button
            type="primary"
            size="small"
            ghost
            onClick={(e) => e.stopPropagation()}
            icon={copied === item.apply ? <CheckOutlined /> : <CopyOutlined />}
          >
            复制 Lua
          </Button>
        </CopyToClipboard>
      ),
    }));
  };

  const getItems = () =>
    templateData.map((tpl: Template) => ({
      key: tpl.key,
      label: tpl.title,
      style: panelStyle,
      children: <Collapse bordered={false} items={getItemsChildren(tpl.data)} />,
    }));

  useEffect(() => {
    setTplData(luaTemplates);
  }, []);

  return (
    <Drawer
      destroyOnClose
      maskClosable={false}
      title="常用 Lua 示例"
      placement="right"
      size="large"
      extra={
        <Space>
          <Input
            allowClear
            placeholder="搜索模板"
            size="small"
            prefix={<SearchOutlined />}
            onChange={(e) => handleOnSearch(e.target.value)}
          />
          <Button
            ghost
            size="small"
            type="primary"
            onClick={() => history.push('/custom-tpl')}
            icon={<EditOutlined />}
          >
            去自定义模板
          </Button>
        </Space>
      }
      {...props}
    >
      <div className="mb-[16px] text-[18px]">内置模板</div>
      <Collapse
        bordered={false}
        defaultActiveKey={['data']}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        style={{ background: token.colorBgContainer }}
        items={getItems()}
        expandIconPosition="end"
      />
      <Divider />
      <div className="my-[16px] text-[18px]">自定义模板</div>
    </Drawer>
  );
};

export default LuaExample;
