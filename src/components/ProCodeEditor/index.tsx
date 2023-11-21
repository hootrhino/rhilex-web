import LuaEditor from '@/components/LuaEditor';
import { FormatCode } from '@/utils/utils';
import { CodeOutlined } from '@ant-design/icons';
import type { ProFormItemProps } from '@ant-design/pro-components';
import { ProCard, ProForm } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import { forwardRef, useState } from 'react';
import LuaExample from '../LuaExample';

type ProCodeEditorProps = Omit<ProFormItemProps, 'children'> & {
  defaultCollapsed?: boolean;
};

const ProCodeEditor = forwardRef(
  ({ defaultCollapsed, label, name, ...props }: ProCodeEditorProps, ref: any) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleOnFormatCode = () => {
      const code = ref.current?.getFieldValue(name);

      ref.current?.setFieldsValue({ [name]: FormatCode(code) });
    };

    return (
      <>
        <ProCard
          title={
            <>
              {props?.required && <span className="text-[#ff4d4f] pr-[4px]">*</span>}
              <span>{label}</span>
            </>
          }
          collapsible
          defaultCollapsed={defaultCollapsed}
          extra={
            <Space>
              <Button
                type="primary"
                ghost
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(true);
                }}
              >
                Lua 示例
              </Button>
              <div
                className="flex items-center h-[24px] bg-[#18f] text-[#fff] px-[10px] rounded-[2px]"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOnFormatCode();
                }}
              >
                <CodeOutlined className="pr-[8px]" />
                <span>代码格式化</span>
              </div>
            </Space>
          }
          className="editor-card"
          headStyle={{ paddingLeft: 0, paddingTop: 0 }}
          bodyStyle={{ paddingLeft: 0, paddingBottom: 0 }}
        >
          <ProForm.Item
            {...props}
            name={name}
            label={false}
            rules={[{ required: true, message: `请输入${label}` }]}
          >
            <LuaEditor key={name} />
          </ProForm.Item>
        </ProCard>
        <LuaExample open={open} onClose={() => setOpen(false)} />
      </>
    );
  },
);

export default ProCodeEditor;
