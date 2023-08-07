import CarouselNode from './Carousel';
import ImageNode from './Image';
import TableNode from './Table';
import TextNode from './Text';
import VideoNode from './Video';

export const reactNodes = [
  {
    shape: 'carousel-react-node',
    width: 200,
    height: 100,
    component: CarouselNode,
  },
  {
    shape: 'image-react-node',
    width: 100,
    height: 100,
    component: ImageNode,
  },
  {
    shape: 'text-react-node',
    width: 50,
    height: 20,
    component: TextNode,
  },
  {
    shape: 'video-react-node',
    width: 320,
    height: 180,
    component: VideoNode,
  },
  {
    shape: 'table-react-node',
    width: 320,
    height: 180,
    component: TableNode,
  },
];
