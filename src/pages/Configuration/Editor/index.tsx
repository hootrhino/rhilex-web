import { Graph } from '@antv/x6';
import { Stencil } from '@antv/x6-plugin-stencil';
import { Col, Row } from 'antd';
import { useEffect, useRef } from 'react';

const Editor = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<Graph>();
  const stencilRef = useRef<Stencil>();

  useEffect(() => {
    if (containerRef.current) {
      const graph = new Graph({
        container: containerRef.current,
        // width: '100vw',
        // height: '100vh',
        background: {
          color: '#F2F7FA',
        },
        grid: {
          visible: true,
          type: 'doubleMesh',
          args: [
            {
              color: '#eee', // 主网格线颜色
              thickness: 1, // 主网格线宽度
            },
            {
              color: '#ddd', // 次网格线颜色
              thickness: 1, // 次网格线宽度
              factor: 4, // 主次网格线间隔
            },
          ],
        },
      });

      // #region 初始化 stencil
      const stencil = new Stencil({
        title: '流程图',
        target: graph,
        stencilGraphWidth: 200,
        stencilGraphHeight: 180,
        collapsable: true,
        groups: [
          {
            title: '基础流程图',
            name: 'group1',
          },
          {
            title: '系统设计图',
            name: 'group2',
            graphHeight: 250,
            layoutOptions: {
              rowHeight: 70,
            },
          },
        ],
        layoutOptions: {
          columns: 2,
          columnWidth: 80,
          rowHeight: 55,
        },
      });

      // #region 初始化图形
      const ports = {
        groups: {
          top: {
            position: 'top',
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: {
                  visibility: 'hidden',
                },
              },
            },
          },
          right: {
            position: 'right',
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: {
                  visibility: 'hidden',
                },
              },
            },
          },
          bottom: {
            position: 'bottom',
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: {
                  visibility: 'hidden',
                },
              },
            },
          },
          left: {
            position: 'left',
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: {
                  visibility: 'hidden',
                },
              },
            },
          },
        },
        items: [
          {
            group: 'top',
          },
          {
            group: 'right',
          },
          {
            group: 'bottom',
          },
          {
            group: 'left',
          },
        ],
      };

      Graph.registerNode(
        'custom-polygon',
        {
          inherit: 'polygon',
          width: 66,
          height: 36,
          attrs: {
            body: {
              strokeWidth: 1,
              stroke: '#5F95FF',
              fill: '#EFF4FF',
            },
            text: {
              fontSize: 12,
              fill: '#262626',
            },
          },
          ports: {
            ...ports,
            items: [
              {
                group: 'top',
              },
              {
                group: 'bottom',
              },
            ],
          },
        },
        true,
      );

      Graph.registerNode(
        'custom-rect',
        {
          inherit: 'rect',
          width: 66,
          height: 36,
          attrs: {
            body: {
              strokeWidth: 1,
              stroke: '#5F95FF',
              fill: '#EFF4FF',
            },
            text: {
              fontSize: 12,
              fill: '#262626',
            },
          },
          ports: { ...ports },
        },
        true,
      );
      Graph.registerNode(
        'custom-circle',
        {
          inherit: 'circle',
          width: 45,
          height: 45,
          attrs: {
            body: {
              strokeWidth: 1,
              stroke: '#5F95FF',
              fill: '#EFF4FF',
            },
            text: {
              fontSize: 12,
              fill: '#262626',
            },
          },
          ports: { ...ports },
        },
        true,
      );

      const r1 = graph.createNode({
        shape: 'custom-rect',
        label: '开始',
        attrs: {
          body: {
            rx: 20,
            ry: 26,
          },
        },
      });
      const r2 = graph.createNode({
        shape: 'custom-rect',
        label: '过程',
      });
      const r3 = graph.createNode({
        shape: 'custom-rect',
        attrs: {
          body: {
            rx: 6,
            ry: 6,
          },
        },
        label: '可选过程',
      });
      const r4 = graph.createNode({
        shape: 'custom-polygon',
        attrs: {
          body: {
            refPoints: '0,10 10,0 20,10 10,20',
          },
        },
        label: '决策',
      });
      const r5 = graph.createNode({
        shape: 'custom-polygon',
        attrs: {
          body: {
            refPoints: '10,0 40,0 30,20 0,20',
          },
        },
        label: '数据',
      });
      const r6 = graph.createNode({
        shape: 'custom-circle',
        label: '连接',
      });
      stencil.load([r1, r2, r3, r4, r5, r6], 'group1');

      stencilRef.current = stencil;
      graphRef.current = graph;
    }
  }, []);

  return (
    <Row>
      <Col span={3}>
        <div
          id="stencil"
          ref={(el) => {
            if (el && stencilRef.current) {
              el.appendChild(stencilRef.current.container);
            }
          }}
        />
      </Col>
      <Col span={18}>
        <div ref={containerRef} style={{ width: 'calc(100vw - 400px)', height: '100vh' }} />
      </Col>
      <Col span={3}>
        <div
          id="stencil"
          ref={(el) => {
            if (el && stencilRef.current) {
              el.appendChild(stencilRef.current.container);
            }
          }}
        />
      </Col>
    </Row>
  );
};

export default Editor;
