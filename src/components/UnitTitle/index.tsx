type UnitTitleProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  unit?: string;
};

const UnitTitle = ({ title, unit = '毫秒', ...props }: UnitTitleProps) => {
  return (
    <div {...props}>
      <span>{title}</span>
      <span className="text-[12px] opacity-[.8] pl-[5px] font-normal">({unit})</span>
    </div>
  );
};

export default UnitTitle;
