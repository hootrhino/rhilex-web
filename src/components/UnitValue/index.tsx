type UnitValueProps = React.HTMLAttributes<HTMLDivElement> & {
  value: string | number | undefined;
  unit?: string;
};

const UnitValue = ({ value, unit = 'ms', ...props }: UnitValueProps) => {
  const formattedValue = value && typeof value === 'number' ? value.toLocaleString('en-US') : value;

  return (
    <div className="flex items-center" {...props}>
      <span>{formattedValue}</span>
      {unit && <span className="text-[12px] opacity-[.8] pl-[4px] font-normal">{unit}</span>}
    </div>
  );
};

export default UnitValue;
