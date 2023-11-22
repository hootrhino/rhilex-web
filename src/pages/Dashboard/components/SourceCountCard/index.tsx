import { ExperimentOutlined } from '@ant-design/icons';
import { StatisticCard } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';

import AppIcon from '@/assets/fontIcons/app.svg';
import DeviceIcon from '@/assets/fontIcons/device.svg';
import ExportIcon from '@/assets/fontIcons/export.svg';
import ImportIcon from '@/assets/fontIcons/import.svg';
import PluginIcon from '@/assets/fontIcons/plugin.svg';
import RuleIcon from '@/assets/fontIcons/rule.svg';

type SourceCountCardProps = {
  responsive: boolean;
};

const SourceCountCard = ({ responsive }: SourceCountCardProps) => {
  const { dataSource } = useModel('useSystem');

  const sourceCountData = [
    {
      title: '入口总数',
      value: dataSource?.sourceCount?.inends,
      icon: ImportIcon,
      key: 'inends',
    },
    {
      title: '出口总数',
      value: dataSource?.sourceCount?.outends,
      icon: ExportIcon,
      key: 'outends',
    },
    {
      title: '规则总数',
      value: dataSource?.sourceCount?.rules,
      icon: RuleIcon,
      key: 'rules',
    },
    {
      title: '插件总数',
      value: dataSource?.sourceCount?.plugins,
      icon: PluginIcon,
      key: 'plugins',
    },
    {
      title: '应用总数',
      value: dataSource?.sourceCount?.apps,
      icon: AppIcon,
      key: 'apps',
    },
    {
      title: '设备总数',
      value: dataSource?.sourceCount?.devices,
      icon: DeviceIcon,
      key: 'devices',
    },
    {
      title: '扩展协议总数',
      value: 0,
      icon: <ExperimentOutlined style={{ fontSize: 42, color: '#1875F0' }} />,
      key: 'extends',
    },
  ];

  return (
    <StatisticCard.Group direction={responsive ? 'column' : 'row'} className="mt-6">
      {sourceCountData.map((item) => (
        <StatisticCard
          key={item.key}
          layout="center"
          statistic={{
            title: <div className="text-[#585858]">{item.title}</div>,
            value: item.value,
            icon:
              typeof item.icon === 'string' ? (
                <img src={item.icon} alt={item.title} className="w-[42px] h-[42px]" />
              ) : (
                item.icon
              ),
          }}
        />
      ))}
    </StatisticCard.Group>
  );
};

export default SourceCountCard;
