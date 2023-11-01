import { cn } from '@/utils/utils';

type TitleProps = React.HTMLAttributes<HTMLDivElement> & {
  name: string;
};
const Title = ({ name, className, ...props }: TitleProps) => {
  return (
    <div className={cn(className, 'text-[20px] mb-[24px] font-medium')} {...props}>
      {name}
    </div>
  );
};

export default Title;
