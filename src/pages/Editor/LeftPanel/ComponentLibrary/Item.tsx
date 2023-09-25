import { IconFont } from '@/utils/utils';
import { useModel } from '@umijs/max';
import { Tooltip } from 'antd';
import { useState } from 'react';
import { chartsList } from '../constant';
import './index.less';

export type Data = {
  title: string;
  image: any;
  key: string;
  disabled?: boolean;
  hasQuickStyle?: boolean;
};

type ItemProps = React.LiHTMLAttributes<any> & {
  data: Data;
};

const Item = ({ data, ...props }: ItemProps) => {
  const { setQuickStyleConfig, setQuickStyle } = useModel('useEditor');
  const [iconType, setIconType] = useState<string>('icon-quick-style');

  return (
    <li
      className="bg-[#242424] mb-[12px] rounded-[4px] cursor-pointer hover:bg-[#363636] relative"
      key={data.key}
      {...props}
    >
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
      {data?.hasQuickStyle && (
        <Tooltip title="快速样式" color="#4281ff">
          <div
            className="quick-style-wrapper"
            onMouseEnter={() => {
              chartsList?.forEach((chart) => {
                if (data.key.includes(chart.group)) {
                  chart.children?.forEach((child) => {
                    if (child.key === data.key) {
                      setQuickStyle(child.children);
                    }
                  });
                }
              });

              setIconType('icon-quick-style-active');
              setQuickStyleConfig!({ open: true, title: data.title });
            }}
            onMouseLeave={() => {
              setIconType('icon-quick-style');
            }}
          >
            <IconFont type={iconType} className="pl-[5px]" />
          </div>
        </Tooltip>
      )}
    </li>
  );
};

export default Item;
