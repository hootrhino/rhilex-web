import { IconFont } from '@/utils/utils';
import { useModel } from '@umijs/max';

const SourceCountCard = () => {
  const { dataSource } = useModel('useSystem');
  const { inends, outends, rules, plugins, apps, devices } = dataSource?.sourceCount || {};

  const sourceCountData = [
    {
      title: '南向总数',
      value: inends,
      key: 'device-inends',
    },
    {
      title: '北向总数',
      value: outends,
      key: 'device-outends',
    },
    {
      title: '规则总数',
      value: rules,
      key: 'rule',
    },
    {
      title: '插件总数',
      value: plugins,
      key: 'plugin',
    },
    {
      title: '应用总数',
      value: apps,
      key: 'app',
    },
    {
      title: '设备总数',
      value: devices,
      key: 'device',
    },
    {
      title: '扩展协议总数',
      value: 0,
      key: 'extend',
    },
  ];

  return (
    <div className="mb-6 flex justify-between">
      {sourceCountData.map(({ key, title, value }) => (
        <div
          key={key}
          className="flex-1 h-[80px] rounded-[10px] odd:bg-[rgba(230,240,255,0.6)] even:bg-[rgba(42,46,54,0.03)] mr-[16px] last-of-type:mr-0"
        >
          <div className="p-[10px]">
            <div className="flex justify-between items-center">
              <span className="text-[14px] text-[#585858]">{title}</span>
              <IconFont type={`icon-${key}`} />
            </div>
            <div className="text-[20px] font-bold mt-[6px]">{value}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SourceCountCard;
