import LuaEditor from '@/components/LuaEditor';
import { FormatCode } from '@/utils/utils';
import { CodeOutlined } from '@ant-design/icons';
import type { ProFormItemProps } from '@ant-design/pro-components';
import { ProCard, ProForm } from '@ant-design/pro-components';
import { forwardRef } from 'react';

type ProCodeEditorProps = Omit<ProFormItemProps, 'children'> & {
  defaultCollapsed?: boolean;
};

const ProCodeEditor = forwardRef(
  ({ defaultCollapsed, label, name, ...props }: ProCodeEditorProps, ref: any) => {
    const handleOnFormatCode = () => {
      const code = ref.current?.getFieldValue(name);

      ref.current?.setFieldsValue({ [name]: FormatCode(code) });
    };

    return (
      <ProCard
        title={<>{props?.required && <span className='text-[#ff4d4f] pr-[4px]'>*</span>}<span>{label}</span></>}
        collapsible
        defaultCollapsed={defaultCollapsed}
        extra={
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
        }
        className='editor-card'
        headStyle={{ paddingLeft: 0, paddingTop: 0 }}
        bodyStyle={{ paddingLeft: 0, paddingBottom: 0 }}
      >
        <ProForm.Item {...props} name={name} label={false} rules={[{ required: true, message: `请输入${label}` }]}>
          <LuaEditor key={name} />
        </ProForm.Item>
      </ProCard>
    );
  },
);

export default ProCodeEditor;
