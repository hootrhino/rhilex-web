import type { LogItem } from '@/models/useWebsocket';
import { cn } from '@/utils/utils';
import { CodeOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { useModel, useParams } from '@umijs/max';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

type LogsProps = React.HTMLAttributes<HTMLDivElement> & {
  collapse: boolean;
  logHeight: number;
  onChange: () => void;
};

const Logs = ({ className, collapse, logHeight, onChange, ...props }: LogsProps) => {
  const { id: uuid } = useParams();
  const { logs } = useModel('useWebsocket');
  const [dataSource, setData] = useState<LogItem[]>([]);

  useEffect(() => {
    const formatData = logs?.filter((log) => log.topic === `goods/console/${uuid}`);
    setData(formatData);
  }, [logs]);

  return (
    <div
      className={cn('w-full absolute bottom-0', className)}
      style={{ height: logHeight }}
      {...props}
    >
      <div
        className={cn(
          'header-outline',
          'text-[#F8F8F2] bg-[#21222C] w-full h-[40px] flex justify-between items-center',
        )}
      >
        <span className="h-full leading-[39px]">
          <CodeOutlined className="px-[10px]" />
          Log
        </span>
        <div
          className="w-[40px] h-[30px] flex justify-center items-center bg-[#282a36] mr-[10px] border border-solid rounded-[4px] border-[#282a36] hover:border-[#fff]"
          onClick={onChange}
        >
          {collapse ? <UpOutlined /> : <DownOutlined />}
        </div>
      </div>
      <div className="h-full px-[12px]">
        {dataSource?.map((item) => (
          <div
            key={item.ts}
            className="flex justify-start items-center text-[#bbb] h-[40px]"
            style={{ borderBottom: '1px solid #21222c' }}
          >
            <span className="pr-[10px]">[{dayjs(item?.time).format('YYYY-MM-DD HH:mm:ss')}]</span>
            <span className="truncate">{item?.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Logs;
