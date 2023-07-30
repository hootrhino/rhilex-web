import tableImg from '@/assets/images/table.png';

export const table = {
  name: 'table-image',
  config: {
    inherit: 'image',
    width: 80,
    height: 60,
    imageUrl: tableImg,
    label: '告警表格',
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
