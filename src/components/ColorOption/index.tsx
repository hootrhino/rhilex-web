import { cn } from '@/utils/utils';
import React from 'react';
type ColorOptionProps = {
  colors: string[];
} & React.HTMLAttributes<HTMLDivElement>;

const ColorOption = ({ className, colors, ...props }: ColorOptionProps) => {
  console.log(colors, colors?.map(color => `bg-[${color}]`));
  return (
    <div className={cn(className, 'w-full h-[16px] flex flex-row')} {...props}>
      {colors.map((color, index) => (
        <div className={cn('flex-1 h-full', `bg-[${color}]`)} key={index} />
      ))}
    </div>
  );
};

export default ColorOption;
