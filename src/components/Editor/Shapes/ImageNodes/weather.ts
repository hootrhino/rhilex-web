import weatherImg from '@/assets/images/weather.png';

export const weather = {
  name: 'weather-image',
  config: {
    inherit: 'image',
    width: 80,
    height: 60,
    imageUrl: weatherImg,
    label: '天气',
    attrs: {
      body: {
        stroke: '#A2B1C3',
      },
      label: {
        refX: 0.5,
        refY: '100%',
        refY2: 4,
        fontSize: 12,
        textAnchor: 'middle',
        textVerticalAnchor: 'top',
      },
    },
  },
};
