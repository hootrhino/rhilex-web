import iframeImg from '@/assets/images/iframe.png';

export const iframe = {
  name: 'iframe-image',
  config: {
    inherit: 'image',
    width: 80,
    height: 60,
    imageUrl: iframeImg,
    label: 'iframe',
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
