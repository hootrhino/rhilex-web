import { IconFont } from '@/utils/utils';
import { Tooltip } from 'antd';

export type Data = {
  title: string;
  image: any;
  key: string;
  disabled?: boolean;
};

type ItemProps = React.LiHTMLAttributes<any> & {
  data: Data;
};

const Item = ({ data, ...props }: ItemProps) => {
  return (
    <li className="bg-[#242424] mb-[12px] rounded-[4px] cursor-pointer" key={data.key} {...props}>
      <div className="h-[24px] text-[12px] w-full px-[8px] overflow-hidden leading-[24px] text-[#7a7a7a]">
        {data.title}
      </div>
      <div className="pt-0 pb-[4px] px-[8px] w-full h-[94px] relative">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-cover cursor-pointer"
        />
        {data?.disabled && (
          <span className="bg-black bg-opacity-60 w-full h-full text-center cursor-not-allowed absolute top-0 left-0 flex items-center justify-center">
            <Tooltip
              title="需要升级才可以使用当前组件包"
              color="#4281ff"
              overlayInnerStyle={{ fontSize: 10, borderRadius: 4 }}
            >
              <IconFont type="icon-lock" className="text-[16px]" />
            </Tooltip>
          </span>
        )}
      </div>
    </li>
  );
};

export default Item;
