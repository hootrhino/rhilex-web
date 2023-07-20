export const pipeline = {
  source: { x: 320, y: 100 },
  target: { x: 380, y: 260 },
  vertices: [{ x: 320, y: 200 }],
  connector: { name: 'rounded' },
  markup: [
    {
      tagName: 'path',
      selector: 'wrap',
      groupSelector: 'lines',
    },
    {
      tagName: 'path',
      selector: 'line1',
      groupSelector: 'lines',
    },
  ],
  attrs: {
    lines: {
      connection: true,
      strokeLinejoin: 'round',
      fill: 'none',
      style: {
        animation: 'ant-line 15s linear infinite',
      },
      stroke: '#999',
    },
    line1: {
      strokeWidth: 8,
      strokeDashoffset: 20,
      stroke: '#73d13d',
      strokeDasharray: '10,20',
    },
  },
};
