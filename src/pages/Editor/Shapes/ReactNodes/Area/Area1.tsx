import { Area } from '@ant-design/plots';

const data = [
  { country: '北美', date: 1965, value: 1390.5 },
  { country: '北美', date: 1966, value: 1469.5 },
  { country: '北美', date: 1967, value: 1521.7 },
  { country: '北美', date: 1968, value: 1615.9 },
  { country: '北美', date: 1969, value: 1703.7 },
  { country: '北美', date: 1970, value: 1767.8 },
  { country: '北美', date: 1971, value: 1806.2 },
  { country: '北美', date: 1972, value: 1903.5 },
  { country: '北美', date: 1973, value: 1986.6 },
  { country: '北美', date: 1974, value: 1952 },
  { country: '北美', date: 1975, value: 1910.4 },
  { country: '北美', date: 1976, value: 2015.8 },
  { country: '北美', date: 1977, value: 2074.7 },
  { country: '北美', date: 1978, value: 2092.7 },
  { country: '北美', date: 1979, value: 2123.8 },
  { country: '北美', date: 1980, value: 2068.3 },
  { country: '北美', date: 1981, value: 2018 },
  { country: '北美', date: 1982, value: 1951.5 },
  { country: '北美', date: 1983, value: 1941.1 },
  { country: '北美', date: 1984, value: 2046.2 },
  { country: '北美', date: 1985, value: 2053.1 },
  { country: '北美', date: 1986, value: 2060.7 },
  { country: '北美', date: 1987, value: 2130.8 },
  { country: '北美', date: 1988, value: 2223.5 },
  { country: '北美', date: 1989, value: 2275.9 },
  { country: '北美', date: 1990, value: 2280.7 },
];

// 区域图
const Area1 = () => {
  const config = {
    data,
    xField: 'date',
    yField: 'value',
    seriesField: 'country',
  };

  return <Area {...config} />;
};

export default Area1;
