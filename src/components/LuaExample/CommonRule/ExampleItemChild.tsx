import CodeEditor, { Lang } from '@/components/CodeEditor';
import { FormOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import CopyButton from './CopyButton';

const ExampleItemChild = ({ type, data, handleOnCopy, isUsage = false, ...props }) => {
  return (
    <div {...props}>
      <div className="flex justify-between w-full mb-[6px]">
        <span className={type === 'quick' ? 'invisible' : ''}>
          {isUsage ? data?.label : '函数基本形式'}
        </span>
        {data?.variables && data?.variables?.length > 0 ? (
          <Button
            type="primary"
            size="small"
            ghost
            onClick={(e) => {
              e.stopPropagation();
              handleOnCopy();
            }}
            icon={<FormOutlined />}
          >
            立即使用
          </Button>
        ) : (
          <CopyButton data={data} size="small" ghost />
        )}
      </div>
      <CodeEditor readOnly value={data.apply} lang={Lang.Lua} />
    </div>
  );
};

export default ExampleItemChild;
