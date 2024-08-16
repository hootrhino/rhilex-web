import { builtInLuaTpl, quickLuaTpl } from '@/templates';
import { Product } from '@/utils/enum';
import { CaretRightOutlined } from '@ant-design/icons';
import { useIntl, useModel } from '@umijs/max';
import { Collapse, Divider, Space, theme } from 'antd';
import { useState } from 'react';
import { ExampleType } from '../enum';
import type { TplGroupItem, TplItem, ValConfig } from '../typings';
import ExampleItemChild from './ExampleItemChild';
import UsageModal from './UsageModal';

// type RuleListProps = {
//   activeTabKey: string;
// };

export const defaultConfig = { open: false, data: {} };

const RuleList = () => {
  const { product } = useModel('useSystem');
  const { token } = theme.useToken();
  const { formatMessage } = useIntl();

  const [valModalConfig, setValConfig] = useState<ValConfig>(defaultConfig);

  const panelStyle: React.CSSProperties = {
    marginBottom: 12,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  // TODO 自定义模板
  // const { data: customTplData } = useRequest(
  //   () => getUserluaListByGroup({ uuid: DEFAULT_GROUP_KEY_LUA_TPL }),
  //   {
  //     ready: !!activeTabKey,
  //     refreshDeps: [activeTabKey],
  //     formatResult: ({ data }) => {
  //       return data?.length > 0
  //         ? [
  //             {
  //               name: getIntl(getLocale()).formatMessage({ id: 'component.title.defaultGroup' }),
  //               children: data,
  //               uuid: 'default_luaCustomTpl',
  //             },
  //           ]
  //         : [];
  //     },
  //   },
  // );

  const getItemsChildren = (type: ExampleType, data: TplItem[]) =>
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

  const getItems = (type: ExampleType, items: TplGroupItem[]) =>
    items.map((tpl: TplGroupItem) => ({
      key: tpl.uuid,
      label: tpl.name,
      style: panelStyle,
      children: (
        <Collapse
          accordion
          bordered={false}
          items={getItemsChildren(type, tpl.children)}
          key={`collapse-${tpl.uuid}`}
        />
      ),
    }));

  const data = [
    {
      title: formatMessage({ id: 'component.title.builtInTpl' }),
      type: ExampleType.BUILTIN,
      dataSource: builtInLuaTpl,
    },
    {
      title: formatMessage({ id: 'component.title.quickTpl' }),
      type: ExampleType.QUICK,
      dataSource: quickLuaTpl(product === Product.RHILEXG1),
    },
    // {
    //   title: formatMessage({ id: 'component.title.customTpl' })
    //   type: ExampleType.CUSTOM,
    //   dataSource: customTplData,
    // },
  ];

  return data.map(
    ({ title, type, dataSource }) =>
      dataSource &&
      dataSource?.length > 0 && (
        <div key={type}>
          {type === ExampleType.QUICK && <Divider />}
          <div className="mb-[16px] font-medium text-[16px]">{title}</div>
          <Collapse
            accordion
            bordered={false}
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            style={{ background: token.colorBgContainer }}
            items={getItems(type, dataSource)}
            expandIconPosition="end"
          />
          <UsageModal {...valModalConfig} changeConfig={setValConfig} />
        </div>
      ),
  );
};

export default RuleList;
