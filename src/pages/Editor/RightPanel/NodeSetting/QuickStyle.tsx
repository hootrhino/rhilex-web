import { cn } from '@/utils/utils';
import { useModel } from '@umijs/max';
import { Space } from 'antd';
import { useState } from 'react';
import { getNodeTitle } from '../../utils';

const QuickStyle = () => {
  const { activeNodeShape, rightQuickStyle } = useModel('useEditor');
  const [activeStyle, setStyle] = useState<string>('');

  return (
    <div className="relative">
      <div className="flex flex-wrap pl-[32px]">
        {rightQuickStyle?.map((item) => (
          <>
            <div
              key={item.key}
              className="w-[86px] h-[47px] bg-[#242424] mr-[9px] mb-[8px] hover:bg-[#363636]"
              onClick={() => setStyle(item.key)}
            >
              <img src={item.value} className="w-full h-full object-cover" />
            </div>
            {activeStyle === item.key && (
              <div
                className={cn(
                  'box-border-thin',
                  'editor-box-shadow-4',
                  'absolute right-[350px] top-[-130px] w-[322px] bg-inputBg rounded-[4px]',
                )}
              >
                <div className="py-[16px] px-[20px]">
                  <div className="text-[#F7F7F7] text-[16px] mb-[12px]">
                    {getNodeTitle(activeNodeShape)}快速样式
                  </div>
                  <div className="text-baseColor text-base my-[6px]">
                    使用默认数据绘制的组件样式如下
                  </div>
                  <img src={item.value} className="w-full h-[158px] object-cover" />
                  <div className="text-baseColor text-base my-[6px]">
                    是否新增一个以默认数据渲染的组件？
                  </div>
                  <Space align="center" className="flex justify-end mt-[24px]">
                    <div
                      className="flex items-center h-[28px] leading-[28px] px-[12px] bg-[#474747] text-[#dbdbdb] text-base rounded-[4px] cursor-pointer hover:bg-[#565656]"
                      onClick={() => setStyle('')}
                    >
                      取消
                    </div>
                    <div
                      className="flex items-center h-[28px] leading-[28px] px-[12px] bg-primary text-[#fff] text-base rounded-[4px] cursor-pointer hover:bg-[#4281ff]"
                      onClick={() => {
                        // TODO
                      }}
                    >
                      试一试
                    </div>
                  </Space>
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default QuickStyle;
