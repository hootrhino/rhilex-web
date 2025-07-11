import { builtInChildren, builtInLuaTpl, quickChildren, quickLuaTpl } from '@/templates';
import { useIntl } from '@umijs/max';
import { Collapse, Divider, Space } from 'antd';
import { useState } from 'react';
import type { TplGroupItem, TplItem, ValConfig } from './typings';
import UsageModal from './UsageModal';
import ProLuaEditor from '..';

enum ExampleType {
  QUICK = 'quick',
  BUILTIN = 'built-in',
}

export const defaultConfig = { open: false, data: {} };

const panelStyle: React.CSSProperties = {
  marginBottom: 12,
  background: 'rgba(0,0,0,0.02)',
  borderRadius: 2,
};

const RuleList = () => {
  const { formatMessage } = useIntl();

  const [valModalConfig, setValConfig] = useState<ValConfig>(defaultConfig);
  const [builtInActivekey, setBuiltInKey] = useState<string[]>(['data']);
  const [quickActivekey, setQuickKey] = useState<string[]>([]);

  const getItemsChildren = (data: TplItem[]) =>
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
        <ProLuaEditor
          readOnly
          value={item.apply}
          hasVariables={item && item?.hasVariables}
          onCopy={() => setValConfig({ open: true, data: item })}
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
          items={getItemsChildren(children)}
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
            quickChildren.get(quickActivekey[0]) || [],
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
