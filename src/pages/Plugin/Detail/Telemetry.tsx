import { useIntl } from '@umijs/max';

const TelemetryProtocol = () => {
  const { formatMessage, locale } = useIntl();

  const dataSource = [
    {
      title: '',
      desc: 'plugin.tel.intro',
      items: [],
    },
    {
      title: 'plugin.tel.passage1.title',
      desc: 'plugin.tel.passage1.desc',
      items: [],
    },
    {
      title: 'plugin.tel.passage2.title',
      desc: '',
      items: [
        'plugin.tel.passage2.desc.item1',
        'plugin.tel.passage2.desc.item2',
        'plugin.tel.passage2.desc.item3',
      ],
    },
    {
      title: 'plugin.tel.passage3.title',
      desc: '',
      items: ['plugin.tel.passage3.desc.item1', 'plugin.tel.passage3.desc.item2'],
    },
    {
      title: 'plugin.tel.passage4.title',
      desc: '',
      items: ['plugin.tel.passage4.desc.item1', 'plugin.tel.passage4.desc.item2'],
    },
    {
      title: 'plugin.tel.passage5.title',
      desc: '',
      items: ['plugin.tel.passage5.desc.item1', 'plugin.tel.passage5.desc.item2'],
    },
    {
      title: 'plugin.tel.passage6.title',
      desc: '',
      items: ['plugin.tel.passage6.desc.item1', 'plugin.tel.passage6.desc.item2'],
    },
    {
      title: 'plugin.tel.passage7.title',
      desc: '',
      items: ['plugin.tel.passage7.desc.item1', 'plugin.tel.passage7.desc.item2'],
    },
    {
      title: 'plugin.tel.passage8.title',
      desc: 'plugin.tel.passage8.desc',
      items: [],
    },
    {
      title: 'plugin.tel.passage9.title',
      desc: 'plugin.tel.passage9.desc',
      items: [],
    },
  ];

  return (
    <>
      {dataSource.map((item) => (
        <div key={`tel-${Math.random()}`}>
          {item?.title && (
            <h2 className="text-[18px] mt-[24px]">{formatMessage({ id: item?.title })}</h2>
          )}
          <p>
            {item?.items && item?.items?.length > 0 ? (
              <ol>
                {item?.items.map((i) => (
                  <li key={`tel-item-${Math.random()}`}>{formatMessage({ id: i })}</li>
                ))}
              </ol>
            ) : (
              formatMessage({ id: item?.desc })
            )}
          </p>
        </div>
      ))}
      <p className="mt-[48px] font-bold">{formatMessage({ id: 'plugin.tel.extra1' })}</p>
      <p className="font-bold">
        {formatMessage({ id: 'plugin.tel.extra2' })}
        <a
          href="https://www.hootrhino.com/"
          className={locale === 'en-US' ? 'pl-[5px]' : 'p-[5px]'}
        >
          https://www.hootrhino.com/
        </a>
        {formatMessage({ id: 'plugin.tel.extra3' })}
      </p>
    </>
  );
};

export default TelemetryProtocol;
