import { cn } from '@/utils/utils';
import { useModel } from '@umijs/max';

import './index.less';

const MiniMap = (props: React.HTMLProps<HTMLDivElement>) => {
  const { collapseLeftPanel } = useModel('useEditor');

  return (
    <div
      className={cn('fixed bottom-[60px]', collapseLeftPanel ? 'left-[100px]' : 'left-[342px]')}
      {...props}
    />
  );
};

export default MiniMap;
