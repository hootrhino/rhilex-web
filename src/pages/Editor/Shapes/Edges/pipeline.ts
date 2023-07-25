export const pipeline = {
  inherit: 'edge',
  markup: [
    {
      tagName: 'path',
      selector: 'wrap',
      groupSelector: 'lines',
    },
    {
      tagName: 'path',
      selector: 'line',
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
    line: {
      strokeWidth: 8,
      strokeDashoffset: 20,
      stroke: '#73d13d',
      strokeDasharray: '10,20',
    },
  },
};
