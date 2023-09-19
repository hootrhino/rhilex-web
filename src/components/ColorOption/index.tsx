import { cn } from '@/utils/utils';
import React from 'react';
type ColorOptionProps = {
  colors: string[];
} & React.HTMLAttributes<HTMLDivElement>;

const ColorOption = ({ className, colors, ...props }: ColorOptionProps) => {
  return (
    <div className={cn('w-full h-[16px] flex flex-row items-center', className)} {...props}>
      {colors.map((color, index) => (
        <div className="flex-1 h-[10px]" style={{ background: color }} key={index} />
      ))}
    </div>
  );
};

export default ColorOption;
