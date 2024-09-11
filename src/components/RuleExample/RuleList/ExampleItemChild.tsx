import CodeEditor, { Lang } from '@/components/CodeEditor';
import { pick } from '@/utils/redash';
import { FormOutlined } from '@ant-design/icons';
import { useIntl } from '@umijs/max';
import { Button } from 'antd';
import { ExampleType } from '../enum';
import CopyButton from './CopyButton';

type ExampleItemChildProps = {
  type: ExampleType;
  [key: string]: any;
};

const ExampleItemChild = ({ type, data, handleOnCopy, ...props }: ExampleItemChildProps) => {
  const { formatMessage } = useIntl();
  const isBuiltIn = type === ExampleType.BUILTIN;
  const hideUsageButton = isBuiltIn && !(data && data?.hasVariables);

  return (
    <div {...props}>
      <div className="flex justify-between w-full mb-[6px]">
        <span className="invisible">{formatMessage({ id: 'component.title.exampleChild' })}</span>
        {hideUsageButton ? (
          <CopyButton ghost {...pick(data, ['apply'])} size="small" />
        ) : (
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
            {formatMessage({ id: 'component.button.use' })}
          </Button>
        )}
      </div>
      <CodeEditor readOnly value={data.apply} lang={Lang.LUA} />
    </div>
  );
};

export default ExampleItemChild;
