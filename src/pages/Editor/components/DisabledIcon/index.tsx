import { IconFont } from '@/utils/utils';
import Tooltip from '../../components/Tooltip';

type DisabledIconProps = {
  show?: boolean;
};

const DisabledIcon = ({ show }: DisabledIconProps) => {
  return (
    show && (
      <span className="bg-black bg-opacity-60 w-full h-full text-center cursor-not-allowed absolute top-0 left-0 flex items-center justify-center">
        <Tooltip
          title="需要升级才可以使用当前组件包"
          overlayInnerStyle={{ fontSize: 10, borderRadius: 4 }}
        >
          <IconFont type="icon-lock" className="text-[16px]" />
        </Tooltip>
      </span>
    )
  );
};

export default DisabledIcon;
