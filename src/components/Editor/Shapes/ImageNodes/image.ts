import customImg from '@/assets/images/image.png';

export const image = {
  name: 'custom-image',
  config: {
    inherit: 'image',
    width: 80,
    height: 60,
    imageUrl: customImg,
    label: '图片',
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
