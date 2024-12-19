import type { InendItem } from '@/pages/Inend';
import type { OutendItem } from '@/pages/Outend';
import { getDevicesList } from '@/services/rhilex/shebeiguanli';
import { getOutendsList } from '@/services/rhilex/shuchuziyuanguanli';
import { getInendsList } from '@/services/rhilex/shuruziyuanguanli';
import { cn } from '@/utils/utils';
import { CodeOutlined, FileTextOutlined, FormOutlined } from '@ant-design/icons';
import { autocompletion, Completion } from '@codemirror/autocomplete';
import { lintKeymap } from '@codemirror/lint';
import { langs } from '@uiw/codemirror-extensions-langs';
import { darculaInit } from '@uiw/codemirror-theme-darcula';
import CodeMirror, { basicSetup, keymap, ReactCodeMirrorProps } from '@uiw/react-codemirror';
import { useIntl, useRequest } from '@umijs/max';
import { Button, Drawer, Space } from 'antd';
import { useEffect, useState } from 'react';
import CopyButton from '../CopyButton';
import { funcIcon, keywordIcon, snippetIcon, variableIcon } from './images/autocomplete';
import RuleList from './RuleList';
import {
  autoCompletions,
  createDetailEl,
  createIconEl,
  foldingOnIndent,
  formatLuaCode,
  luaLinter,
} from './utils/utils';

const iconMap = {
  function: funcIcon,
  method: funcIcon,
  keyword: keywordIcon,
  snippet: snippetIcon,
  variable: variableIcon,
};

const themeSetting = {
  lineHighlight: 'transparent',
  fontFamily: 'Consolas, monospace',
  selection: 'rgba(227, 23, 13, 0.2)',
};

const basicSetupSetting = {
  autocompletion: true,
  foldGutter: false,
  dropCursor: false,
  allowMultipleSelections: false,
  indentOnInput: false,
  defaultKeymap: true,
  lintKeymap: true,
  completionKeymap: true,
  syntaxHighlighting: true,
};

type ProLuaEditorProps = ReactCodeMirrorProps & {
  hasVariables?: boolean | null;
  required?: boolean;
  label?: string;
  onChange?: (value: string) => void;
  onCopy?: () => void;
};

const ProLuaEditor = ({
  label,
  required = true,
  readOnly = false,
  hasVariables,
  value,
  onChange,
  onCopy,
  ...props
}: ProLuaEditorProps) => {
  const { formatMessage } = useIntl();
  const [open, setOpen] = useState<boolean>(false);
  const [newValue, setValue] = useState<string>();

  // 获取设备资源
  const { data: deviceVariables } = useRequest(() => getDevicesList({ current: 1, size: 999 }), {
    formatResult: ({ data }: any) =>
      data?.records?.map((item: any) => ({
        label: `${item?.name} - ${item.uuid}`,
        type: 'variable',
        detail: formatMessage({ id: 'component.tpl.device' }),
        apply: item.uuid,
      })),
  });

  // 获取南向资源
  const { data: inendVariables } = useRequest(() => getInendsList(), {
    formatResult: ({ data }: any) =>
      data?.map((item: InendItem) => ({
        label: `${item?.name} - ${item.uuid}`,
        type: 'variable',
        detail: formatMessage({ id: 'component.tpl.inend' }),
        apply: item.uuid,
      })),
  });

  // 获取北向资源
  const { data: outendVariables } = useRequest(() => getOutendsList(), {
    formatResult: (res) =>
      (res as any)?.data?.map((item: OutendItem) => ({
        label: `${item?.name} - ${item.uuid}`,
        type: 'variable',
        detail: formatMessage({ id: 'component.tpl.outend' }),
        apply: item.uuid,
      })),
  });

  const editorConfig = [
    autocompletion({
      override: [
        (context) => autoCompletions(context, inendVariables, outendVariables, deviceVariables),
      ],
      addToOptions: [
        {
          render: (completion: Completion) => {
            if (!completion.type) return null;
            const icon = iconMap[completion.type] || '';

            return createIconEl(icon);
          },
          position: 20,
        },
        {
          render: (completion: Completion) => {
            if (!completion.detail) return null;

            return createDetailEl(completion.detail);
          },
          position: 90,
        },
      ],
      tooltipClass: () => 'customize-autocomplete-tooltip',
    }),
    // lintGutter(),
    keymap.of(lintKeymap),
    luaLinter,
    foldingOnIndent,
  ];

  const handleOnChange = (code: string) => {
    if (onChange) {
      onChange(code);
    }

    setValue(code);
  };

  useEffect(() => {
    setValue(value);
  }, [value]);

  return (
    <>
      {readOnly ? (
        <div className={cn('flex justify-end w-full pb-2', hasVariables === null && 'hidden')}>
          {!hasVariables ? (
            <CopyButton ghost text={value} size="small" />
          ) : (
            <Button
              type="primary"
              size="small"
              ghost
              onClick={(e) => {
                e.stopPropagation();
                onCopy!();
              }}
              icon={<FormOutlined />}
            >
              {formatMessage({ id: 'component.button.use' })}
            </Button>
          )}
        </div>
      ) : (
        <Space className="w-full justify-between pb-2">
          <label
            className={required ? `before:text-[#ff4d4f] before:content-['*'] before:mr-1` : ''}
          >
            {label}
          </label>
          <Space>
            <Button
              key="rule"
              type="primary"
              ghost
              size="small"
              icon={<FileTextOutlined />}
              onClick={() => setOpen(true)}
            >
              {formatMessage({ id: 'component.button.rule' })}
            </Button>
            <Button
              type="primary"
              key="code-format"
              size="small"
              icon={<CodeOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                const code = formatLuaCode(value!);
                handleOnChange(code);
              }}
            >
              {formatMessage({ id: 'component.button.format' })}
            </Button>
          </Space>
        </Space>
      )}

      <CodeMirror
        autoFocus
        readOnly={readOnly}
        value={newValue}
        style={{ width: '100%' }}
        theme={darculaInit({
          settings: themeSetting,
        })}
        extensions={[langs.lua(), basicSetup(basicSetupSetting), ...editorConfig]}
        onChange={(value) => handleOnChange(value)}
        {...props}
      />

      <Drawer
        destroyOnClose
        open={open}
        maskClosable={false}
        placement="right"
        size="large"
        title={formatMessage({ id: 'component.tab.example' })}
        onClose={() => setOpen(false)}
      >
        <RuleList />
      </Drawer>
    </>
  );
};

export default ProLuaEditor;
