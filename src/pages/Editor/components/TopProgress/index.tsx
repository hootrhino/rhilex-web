import { NProgress } from '@tanem/react-nprogress';
import Bar from './Bar';
import Container from './Container';

type TopProgressProps = {
  isAnimating: boolean;
};

const TopProgress = ({ isAnimating }: TopProgressProps) => {
  return (
    <NProgress isAnimating={isAnimating}>
      {({ animationDuration, isFinished, progress }) => (
        <Container animationDuration={animationDuration} isFinished={isFinished}>
          <Bar animationDuration={animationDuration} progress={progress} />
        </Container>
      )}
    </NProgress>
  );
};

export default TopProgress;
