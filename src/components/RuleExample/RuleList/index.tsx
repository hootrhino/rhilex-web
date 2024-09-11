import { builtInChildren, builtInLuaTpl, quickChildren, quickLuaTpl } from '@/templates';
import { useIntl, useModel } from '@umijs/max';
import { Collapse, Divider, Space } from 'antd';
import { useState } from 'react';
import { ExampleType } from '../enum';
import type { TplGroupItem, TplItem, ValConfig } from '../typings';
import ExampleItemChild from './ExampleItemChild';
import UsageModal from './UsageModal';

export const defaultConfig = { open: false, data: {} };

const panelStyle: React.CSSProperties = {
  marginBottom: 12,
  background: 'rgba(0,0,0,0.02)',
  borderRadius: 2,
};

const RuleList = () => {
  const { product } = useModel('useSystem');
  const { formatMessage } = useIntl();

  const [valModalConfig, setValConfig] = useState<ValConfig>(defaultConfig);
  const [builtInActivekey, setBuiltInKey] = useState<string[]>(['data']);
  const [quickActivekey, setQuickKey] = useState<string[]>([]);

  const getItemsChildren = (type: ExampleType, data: TplItem[]) =>
    data?.map((item) => ({
      key: item.key,
      label: (
        <Space>
          <span>{item.detail}</span>
          <span className="text-[12px] text-[#000000A6]">{item.label}</span>
        </Space>
      ),
      style: panelStyle,
      children: (
        <ExampleItemChild
          className="pb-[20px]"
          type={type}
          data={item}
          handleOnCopy={() => setValConfig({ open: true, data: item })}
        />
      ),
    }));

  const getItems = (type: ExampleType, items: TplGroupItem[], children: TplItem[]) => {
    return items.map((tpl: TplGroupItem) => ({
      key: tpl.uuid,
      label: tpl.name,
      style: panelStyle,
      children: (
        <Collapse
          accordion
          ghost
          items={getItemsChildren(type, children)}
          key={`collapse-${tpl.uuid}`}
          expandIconPosition="end"
        />
      ),
    }));
  };

  return (
    <>
      <div key="builtIn">
        <div className="mb-[16px] font-medium text-[16px]">
          {formatMessage({ id: 'component.title.builtInTpl' })}
        </div>
        <Collapse
          accordion
          ghost
          activeKey={builtInActivekey}
          items={getItems(
            ExampleType.BUILTIN,
            builtInLuaTpl,
            builtInChildren.get(builtInActivekey[0]) || [],
          )}
          onChange={(key) => {
            setBuiltInKey(key as string[]);
            setQuickKey([]);
          }}
          expandIconPosition="end"
        />
      </div>
      <Divider />
      <div key="quick">
        <div className="mb-[16px] font-medium text-[16px]">
          {formatMessage({ id: 'component.title.quickTpl' })}
        </div>
        <Collapse
          ghost
          activeKey={quickActivekey}
          items={getItems(
            ExampleType.QUICK,
            quickLuaTpl,
            quickChildren(product).get(quickActivekey[0]) || [],
          )}
          onChange={(key) => {
            setQuickKey(key as string[]);
            setBuiltInKey([]);
          }}
          expandIconPosition="end"
        />
      </div>
      <UsageModal {...valModalConfig} changeConfig={setValConfig} />
    </>
  );
};

export default RuleList;
