import { cn } from '@/utils/utils';

export type StyleItem = {
  key: string;
  value: string;
};

type QuickStyleBoxProps = {
  options?: StyleItem[];
} & React.HTMLAttributes<HTMLDivElement>;

const QuickStyleBox = ({ className, options, ...props }: QuickStyleBoxProps) => {
  return (
    <div className={cn('flex flex-wrap', className)} {...props}>
      {options?.map((item) => (
        <div
          key={item.key}
          className="w-[86px] h-[47px] bg-[#242424] mr-[9px] mb-[8px] hover:bg-[#363636]"
        >
          <img src={item.value} className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
};

export default QuickStyleBox;
