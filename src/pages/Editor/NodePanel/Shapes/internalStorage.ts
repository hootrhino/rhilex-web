import { NumberExt } from '@antv/x6';
import { commonAttrs, ports } from '../constants';

export const internalStorageNode = {
  name: 'internal-storage-node',
  config: {
    inherit: 'path',
    overwrite: true,
    width: 80,
    height: 80,
    tools: ['node-editor'],
    markup: [
      {
        tagName: 'rect',
        selector: 'bg',
      },
      {
        tagName: 'path',
        groupSelector: 'line',
        selector: 'h',
      },
      {
        tagName: 'path',
        groupSelector: 'line',
        selector: 'v',
      },
      {
        tagName: 'text',
        selector: 'label',
      },
    ],
    attrs: {
      bg: {
        ...commonAttrs.body,
        refWidth: '100%',
        refHeight: '100%',
        round: 8,
      },
      line: {
        stroke: '#A2B1C3',
        strokeWidth: 1,
      },
      h: {
        hPos: 24,
      },
      v: {
        vPos: 24,
      },
    },
    ports: { ...ports },
    attrHooks: {
      round: {
        set(v: number, { refBBox }: any) {
          if (typeof v === 'number') {
            const { width, height } = refBBox;
            const r = Math.min(width / 2, height / 2, v);
            return {
              rx: r,
              ry: r,
            };
          }
        },
      },
      hPos: {
        set(v: any, { cell, refBBox }: any) {
          if (typeof v === 'number') {
            const { width, height } = refBBox;
            const round = cell.attr('bg/round');
            const offset = NumberExt.clamp(v, round, height - round);
            return { d: `M 0 ${offset}  L ${width} ${offset}` };
          }
        },
      },
      vPos: {
        set(v: any, { cell, refBBox }: any) {
          if (typeof v === 'number') {
            const { width, height } = refBBox;
            const round = cell.attr('bg/round');
            const offset = NumberExt.clamp(v, round, width - round);
            return { d: `M ${offset} 0 L ${offset} ${height}` };
          }
        },
      },
    },
    knob: [
      {
        position({ node }: any) {
          const bbox = node.getBBox();
          const round = node.attr('bg/round');
          return { x: bbox.width - round, y: round };
        },
        onMouseMove({ node, data, deltaX }: any) {
          if (deltaX !== 0) {
            const bbox = node.getBBox();
            const key = 'bg/round';
            const previous = node.attr(key);
            if (data.round === null) {
              data.round = previous;
            }
            const min = 0;
            const max = Math.min(bbox.width, bbox.height) / 2;
            const current = NumberExt.clamp(data.round - deltaX, min, max);
            if (current !== previous) {
              node.attr(key, current);
            }
          }
        },
      },
      {
        position({ node }: any) {
          const hPos = node.attr('h/hPos');
          const vPos = node.attr('v/vPos');
          return { x: vPos, y: hPos };
        },
        onMouseMove({ node, data, deltaX, deltaY }: any) {
          if (deltaX !== 0 || deltaY !== 0) {
            const bbox = node.getBBox();
            const { width, height } = bbox;
            const hPos = node.attr('h/hPos');
            const vPos = node.attr('v/vPos');
            const round = node.attr('bg/round');

            if (data.hPos === null || data.vPos === null) {
              data.hPos = hPos;
              data.vPos = vPos;
            }

            const x = NumberExt.clamp(data.vPos + deltaX, round, width - round);
            const y = NumberExt.clamp(data.hPos + deltaY, round, height - round);

            if (x !== vPos || y !== hPos) {
              node.attr({
                v: { vPos: x },
                h: { hPos: y },
              });
            }
          }
        },
      },
    ],
  },
};
