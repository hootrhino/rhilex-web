import { Graph, Shape } from '@antv/x6';

import { Clipboard } from '@antv/x6-plugin-clipboard';
import { History } from '@antv/x6-plugin-history';
import { Keyboard } from '@antv/x6-plugin-keyboard';
import { Selection } from '@antv/x6-plugin-selection';
import { Snapline } from '@antv/x6-plugin-snapline';
import { Transform } from '@antv/x6-plugin-transform';
import { forwardRef, useEffect } from 'react';
import { useModel } from 'umi';

import './index.less';

const Canvas = forwardRef((props, ref) => {
  const {
    config: { background, width, height, scale },
    setSelectedNode,
  } = useModel('useEditor');

  // 快捷键
  const handleAddKeyboard = () => {
    const graph = ref.current;
    graph.bindKey(['meta+c', 'ctrl+c'], () => {
      const cells = graph.getSelectedCells();
      if (cells.length) {
        graph.copy(cells);
      }
      return false;
    });
    graph.bindKey(['meta+x', 'ctrl+x'], () => {
      const cells = graph.getSelectedCells();
      if (cells.length) {
        graph.cut(cells);
      }
      return false;
    });
    graph.bindKey(['meta+v', 'ctrl+v'], () => {
      if (!graph.isClipboardEmpty()) {
        const cells = graph.paste({ offset: 32 });
        graph.cleanSelection();
        graph.select(cells);
      }
      return false;
    });

    // undo redo
    graph.bindKey(['meta+z', 'ctrl+z'], () => {
      if (graph.canUndo()) {
        graph.undo();
      }
      return false;
    });
    graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
      if (graph.canRedo()) {
        graph.redo();
      }
      return false;
    });

    // select all
    graph.bindKey(['meta+a', 'ctrl+a'], () => {
      const nodes = graph.getNodes();
      if (nodes) {
        graph.select(nodes);
      }
    });

    // delete
    graph.bindKey('backspace', () => {
      const cells = graph.getSelectedCells();
      if (cells.length) {
        graph.removeCells(cells);
      }
    });

    // zoom
    graph.bindKey(['ctrl+1', 'meta+1'], () => {
      const zoom = graph.zoom();
      if (zoom < 1.5) {
        graph.zoom(0.1);
      }
    });
    graph.bindKey(['ctrl+2', 'meta+2'], () => {
      const zoom = graph.zoom();
      if (zoom > 0.5) {
        graph.zoom(-0.1);
      }
    });
  };

  // 事件-控制连接桩显示/隐藏
  const handleAddEvent = () => {
    const graph = ref.current;
    const showPorts = (ports: NodeListOf<SVGElement>, show: boolean) => {
      for (let i = 0, len = ports.length; i < len; i += 1) {
        ports[i].style.visibility = show ? 'visible' : 'hidden';
      }
    };
    graph.on('node:mouseenter', () => {
      const container = document.getElementById('canvas-container')!;
      const ports = container.querySelectorAll('.x6-port-body') as NodeListOf<SVGElement>;
      showPorts(ports, true);
    });
    graph.on('node:mouseleave', () => {
      const container = document.getElementById('canvas-container')!;
      const ports = container.querySelectorAll('.x6-port-body') as NodeListOf<SVGElement>;
      showPorts(ports, false);
    });
  };

  useEffect(() => {
    const graph = new Graph({
      container: document.getElementById('canvas-container') || undefined,
      background: background,
      panning: true,
      width,
      height,
      mousewheel: {
        enabled: true,
        zoomAtMousePosition: true,
        modifiers: ['ctrl', 'meta'],
        minScale: 0.5,
        // maxScale: 4,
      },
      embedding: true,
      connecting: {
        router: 'manhattan',
        connector: {
          name: 'rounded',
          args: {
            radius: 8,
          },
        },
        anchor: 'center',
        connectionPoint: 'anchor',
        allowBlank: false,
        snap: true,
        createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: '#A2B1C3',
                strokeWidth: 2,
                targetMarker: {
                  name: 'block',
                  width: 12,
                  height: 8,
                },
              },
            },
            zIndex: 0,
          });
        },
        validateConnection({ targetMagnet }) {
          return !!targetMagnet;
        },
      },
      highlighting: {
        // 连线过程中，自动吸附到连接桩时被使用
        magnetAdsorbed: {
          name: 'stroke',
          args: {
            attrs: {
              fill: '#5F95FF',
              stroke: '#5F95FF',
            },
          },
        },
        // 拖动节点进行嵌入操作过程中，节点可以被嵌入时被使用
        embedding: {
          name: 'stroke',
          args: {
            padding: -1,
            attrs: {
              stroke: '#73d13d',
            },
          },
        },
      },
    });

    graph
      .use(new Snapline())
      .use(
        new Transform({
          resizing: true,
          rotating: true,
        }),
      )
      .use(
        new Selection({
          enabled: true,
          multiple: true,
          rubberband: true,
          movable: true,
          showNodeSelectionBox: true,
          pointerEvents: 'none',
        }),
      )
      .use(new Keyboard())
      .use(new Clipboard())
      .use(new History());

    graph.on('selection:changed', ({ selected }) => {
      if (selected.length > 0 && selected[0].isNode()) {
        const n = selected?.filter((item) => item.isNode());
        setSelectedNode(n);
      } else {
        setSelectedNode(undefined);
      }
    });

    // TODO 渲染元素 data
    // graph.fromJSON(fromJsonData);

    // 内容居中显示
    graph.centerContent();

    ref.current = graph;

    handleAddKeyboard();
    handleAddEvent();

    // 组件卸载时清理 Graph 实例
    return () => {
      graph.dispose();
    };
  }, []);

  useEffect(() => {
    const w = (width || 0) * ((scale || 30) / 100);
    const h = (height || 0) * ((scale || 30) / 100);

    ref.current?.resize(w, h);
  }, [width, height, scale]);

  useEffect(() => {
    ref.current?.drawBackground(background);
  }, [background]);

  return (
    <div
      className="relative flex justify-center items-center overflow-auto w-full h-[100vh]"
      id="canvas-bg"
    >
      <div id="canvas-container" ref={ref} />
    </div>
  );
});

export default Canvas;
