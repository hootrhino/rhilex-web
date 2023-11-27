import { cn } from '@/utils/utils';

type ContainerProps = {
  animationDuration: number;
  isFinished: boolean;
  children?: React.ReactNode;
};

const Container = ({ animationDuration, isFinished, ...props }: ContainerProps) => {

  return (
    <div
      className={cn(
        `pointer-events-none transition ease-linear opacity duration-${animationDuration}`,
        isFinished ? 'opacity-0' : 'opacity-100',
      )}
    >
      {props?.children}
    </div>
  );
};

export default Container;
