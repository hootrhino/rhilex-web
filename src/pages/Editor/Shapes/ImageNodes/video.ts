import videoImg from '@/assets/images/video.png';

export const video = {
  name: 'video-image',
  config: {
    inherit: 'image',
    width: 80,
    height: 60,
    imageUrl: videoImg,
    label: '视频播放器',
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
