import areas from "./Area";


const areaShapes = areas?.map(item => ({
  shape: 'area-react-node',
  width: 200,
  height: 100,
  component: item,
}));

const shapes = [...areaShapes]

export default shapes;
