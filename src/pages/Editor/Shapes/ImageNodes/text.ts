import textImg from '@/assets/images/text.png';

export const text = {
  name: 'text-image',
  config: {
    inherit: 'image',
    width: 80,
    height: 60,
    imageUrl: textImg,
    label: '文本',
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
