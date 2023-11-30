import { cn } from '@/utils/utils';
import Icon from '../../components/Icon';
import Tooltip from '../../components/Tooltip';

type ToolbarItemProps = {
  title: string;
  disabled: boolean;
  icon: string;
};

const ToolbarItem = ({ icon, disabled, ...props }: ToolbarItemProps) => {
  return (
    <Tooltip disabled={disabled} {...props}>
      <div
        className={cn(
          'flex items-center justify-center w-[24px] h-[24px] rounded-[4px] bg-transparent',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-[#FFFFFF14]',
        )}
      >
        <Icon type={icon} disabled={disabled} />
      </div>
    </Tooltip>
  );
};

export default ToolbarItem;
