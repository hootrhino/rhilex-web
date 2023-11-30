import { useModel } from '@umijs/max';
import { useHover, useLongPress } from 'ahooks';
import { useRef } from 'react';
import QuickStyleIcon from './QuickStyleIcon';
import DisabledIcon from '../../components/DisabledIcon';

export type Data = {
  title: string;
  image: any;
  key: string;
  disabled?: boolean;
  hasQuickStyle?: boolean;
};

type ItemProps = React.LiHTMLAttributes<any> & {
  data: Data;
  addNode: (e: React.MouseEvent<HTMLLIElement, MouseEvent>, isDrag: boolean) => void;
};

const Item = ({ data, addNode, ...props }: ItemProps) => {
  const ref = useRef<HTMLLIElement>(null);
  const { setQuickStyleConfig } = useModel('useEditor');

  useLongPress(
    (e) => {
      addNode(e as any, true);
    },
    ref,
    {
      onClick: (e) => {
        addNode(e as any, false);
      },
    },
  );

  useHover(ref, {
    onEnter() {
      setQuickStyleConfig({ open: false, title: '' });
    },
  });

  return (
    <li
      ref={ref}
      className="bg-[#242424] mb-[12px] rounded-[4px] cursor-pointer hover:bg-[#363636] relative"
      key={data.key}
      {...props}
    >
      <div className="h-[24px] text-base w-full px-[8px] overflow-hidden leading-[24px] text-[#7a7a7a]">
        {data.title}
      </div>
      <div className="pt-0 pb-[4px] px-[8px] w-full h-[94px] relative">
        <img
          src={data.image}
          alt={data.key}
          id={data.key}
          className="w-full h-full object-cover cursor-pointer"
        />
        <DisabledIcon show={data?.disabled} />
      </div>
      <QuickStyleIcon data={data} />
    </li>
  );
};

export default Item;
