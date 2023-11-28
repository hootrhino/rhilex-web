import Tooltip from '@/pages/Editor/components/Tooltip';
import { useEffect, useState } from 'react';
import Icon from '../../components/Icon';
import { panelItems } from '../constant';

type DetailTitleProps = {
  activeItem: string;
};

const DetailTitle = ({ activeItem }: DetailTitleProps) => {
  const [activeName, setName] = useState<string>('');

  useEffect(() => {
    const currentPanelItem = panelItems?.find((item) => item?.key === activeItem);
    setName(currentPanelItem?.name || '');
  }, [activeItem]);

  return (
    <>
      {activeItem === 'layers' ? (
        <Tooltip title="查看帮助文档" placement="right">
          {activeName}
          <Icon type="doc-fill" className="ml-[4px]" />
        </Tooltip>
      ) : (
        <span>{activeName}</span>
      )}
    </>
  );
};

export default DetailTitle;
