import timeImg from '@/assets/images/time.png';

export const time = {
  name: 'time-image',
  config: {
    inherit: 'image',
    width: 80,
    height: 60,
    imageUrl: timeImg,
    label: '时间',
    attrs: {
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
