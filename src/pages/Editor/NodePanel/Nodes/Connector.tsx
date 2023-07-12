// import { NODE_HEIGHT, NODE_WIDTH, NODE_PADDING, DefaultNodeConfig } from '../../constants'

const DefaultNodeConfig = {
  stroke: '#A2B1C3',
  fill: '#FFFFFF',
  fontFill: '#000',
  fontSize: 12,
  label: '',
};

const NODE_PADDING = 1;

const ConnectorNode = (props) => {
  const { size = { width: 60, height: 40 }, data = {} } = props;
  const {
    stroke = DefaultNodeConfig.stroke,
    label = DefaultNodeConfig.label,
    fill = DefaultNodeConfig.fill,
    fontFill = DefaultNodeConfig.fontFill,
    fontSize = DefaultNodeConfig.fontSize,
  } = data;
  const { width, height } = size;
  const availableR = height - 2 * NODE_PADDING;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <path
        d={`M ${NODE_PADDING},${height / 2} a ${availableR / 2} ${availableR / 2} 0 1 1 0 1 z`}
        fill={fill}
        stroke={stroke}
      />
      <text
        x={height / 2}
        y={height / 2}
        fill={fontFill}
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize={fontSize}
      >
        {label}
      </text>
      Sorry, your browser does not support inline SVG.
    </svg>
  );
};

export default ConnectorNode;
