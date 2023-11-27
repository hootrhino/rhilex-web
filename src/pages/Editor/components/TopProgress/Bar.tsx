type BarProps = {
  animationDuration: number;
  progress: number;
};

const Bar = ({ progress, animationDuration }: BarProps) => {
  return (
    <div
      className='fixed bg-[#1F6AFF] h-[2px] w-full left-0 top-0 z-[1031]'
      style={{
        marginLeft: `${(-1 + progress) * 100}%`,
        transition: `margin-left ${animationDuration}ms linear`,
      }}
    >
      <div
        className="h-full opacity-100 block absolute right-0 w-[100px] rotate-3 -translate-y-4 shadow-md shadow-blue-300/50"
      />
    </div>
  );
};

export default Bar;
