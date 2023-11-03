import { cn } from '@/utils/utils';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Tag } from 'antd';

type TitleProps = React.HTMLAttributes<HTMLDivElement> & {
  name: string;
  tips?: string;
  headerClassName?: string;
  extraClassName?: string;
};
const Title = ({
  name,
  tips,
  className,
  extraClassName,
  headerClassName,
  ...props
}: TitleProps) => {
  return (
    <div className={cn(className, 'flex justify-start items-center mb-[24px]')} {...props}>
      <div className={cn(headerClassName, 'text-[20px] font-medium')}>{name}</div>
      {tips && (
        <Tag
          icon={<ExclamationCircleOutlined />}
          color="warning"
          className={cn(extraClassName, 'ml-[10px]')}
        >
          {tips}
        </Tag>
      )}
    </div>
  );
};

export default Title;
