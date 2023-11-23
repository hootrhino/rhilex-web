import modbusIcon from '@/assets/fontIcons/modbus.svg';
import deviceIcon from '@/assets/fontIcons/modbus_device.svg';
import type { Graph, GraphData, NodeConfig } from '@antv/g6';
import G6 from '@antv/g6';
import { useModel } from '@umijs/max';
import { useEffect } from 'react';
import type { DeviceItem } from '..';

const Topo = () => {
  const { detail } = useModel('useDevice');
  const { registers } = detail?.config || { registers: [] };

  // 注册边
  G6.registerEdge(
    'line-dash',
    {
      afterDraw(cfg, group) {
        const shape = group?.get('children')[0];
        let index = 0;
        shape.animate(
          () => {
            index++;
            if (index > 9) {
              index = 0;
            }
            const res = {
              lineDash: [4, 2, 1, 2],
              lineDashOffset: -index,
            };
            return res;
          },
          {
            repeat: true,
            duration: 3000,
          },
        );
      },
    },
    'cubic',
  );

  // 节点动画
  const handleNodeAnimate = (graph: Graph, data: GraphData) => {
    const nodeAnimate = setInterval(() => {
      data?.nodes?.forEach((node) => {
        if (!node || !node.x || !node.y) return;

        node.x += Math.random() * 10;
        node.y += Math.random() * 10;
      });
      graph.changeData(data);
    }, 3000);

    return () => clearInterval(nodeAnimate);
  };

  useEffect(() => {
    const container = document.getElementById('modbusTopo');
    if (!container) return;

    const width = container?.scrollWidth;
    const height = container?.scrollHeight || 500;

    const graph = new G6.Graph({
      container: container,
      width,
      height,
      layout: {
        type: 'force',
        linkDistance: 100,
        center: [width / 2, height / 2],
      },
      animate: true,
      minZoom: 0.5,
      maxZoom: 2,
      fitCenter: true,
      defaultNode: {
        type: 'image',
        labelCfg: {
          position: 'bottom',
        },
        size: 15,
      },
      defaultEdge: {
        type: 'line-dash',
        style: {
          lineWidth: 2,
          stroke: '#bae7ff',
        },
      },
      modes: {
        default: ['drag-canvas', 'drag-node', 'zoom-canvas'],
      },
    });

    // 处理数据
    const nodeData = registers?.map((item: DeviceItem) => ({
      id: item?.tag,
      label: item?.tag,
      isLeaf: true,
      img: modbusIcon,
    }));

    const edgeData = nodeData?.map((item: NodeConfig, idx: number) => ({
      source: detail?.uuid,
      target: item.id,
      id: `edge${idx}`,
    }));

    const data = {
      nodes: [...nodeData, { id: detail?.uuid, size: 30, img: deviceIcon, label: detail?.name }],
      edges: edgeData,
    };

    graph.data(data);
    graph.render();

    handleNodeAnimate(graph, data);
  }, [detail]);

  return <div id="modbusTopo" />;
};

export default Topo;
