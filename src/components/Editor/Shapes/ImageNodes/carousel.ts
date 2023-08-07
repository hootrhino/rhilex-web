import carouselImg from '@/assets/images/carousel.png';

export const carousel = {
  name: 'carousel-image',
  config: {
    inherit: 'image',
    width: 80,
    height: 60,
    imageUrl: carouselImg,
    label: '轮播图',
    attrs: {
      label: {
        refX: 0.5,
        refY: '100%',
        refY2: 4,
        fontSize: 12,
        fill: '#1f1f1f',
        textAnchor: 'middle',
        textVerticalAnchor: 'top',
      },
    },
  },
};
