import { IconFont } from '@/utils/utils';
import { useIntl, useModel } from '@umijs/max';

const SourceCountCard = () => {
  const { dataSource } = useModel('useSystem');
  const { inends, outends, rules, plugins, apps, devices } = dataSource?.sourceCount || {};
  const { formatMessage } = useIntl();

  const sourceCountData = [
    {
      title: formatMessage({ id: 'dashboard.count.inend' }),
      value: inends,
      key: 'dashboard-inend',
    },
    {
      title: formatMessage({ id: 'dashboard.count.outend' }),
      value: outends,
      key: 'dashboard-outend',
    },
    {
      title: formatMessage({ id: 'dashboard.count.rule' }),
      value: rules,
      key: 'dashboard-rule',
    },
    {
      title: formatMessage({ id: 'dashboard.count.plugin' }),
      value: plugins,
      key: 'dashboard-plugin',
    },
    {
      title: formatMessage({ id: 'dashboard.count.app' }),
      value: apps,
      key: 'dashboard-app',
    },
    {
      title: formatMessage({ id: 'dashboard.count.device' }),
      value: devices,
      key: 'dashboard-device',
    },
    // {
    //   title: formatMessage({ id: 'dashboard.count.extend' }),
    //   value: 0,
    //   key: 'extend',
    // },
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
