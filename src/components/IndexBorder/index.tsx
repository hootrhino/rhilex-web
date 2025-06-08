import { cn } from '@/utils/utils';

type IndexBorderProps = React.HTMLAttributes<HTMLDivElement> & {
  serial: number;
};

const IndexBorder = ({ serial, className, ...props }: IndexBorderProps) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center text-[12px] text-[#fff] rounded-full w-[18px] h-[18px] bg-[#979797]',
        className,
      )}
      {...props}
    >
      {serial + 1}
    </div>
  );
};

export default IndexBorder;
