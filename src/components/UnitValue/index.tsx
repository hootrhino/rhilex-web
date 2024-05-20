type UnitTitleProps = React.HTMLAttributes<HTMLDivElement> & {
  value: string | number | undefined;
  unit?: string;
};

const UnitValue = ({ value, unit = 'ms', ...props }: UnitTitleProps) => {
  return (
    <div className="flex items-center" {...props}>
      <span>{value}</span>
      <span className="text-[12px] opacity-[.8] pl-[4px] font-normal">{unit}</span>
    </div>
  );
};

export default UnitValue;
