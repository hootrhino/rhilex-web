import { Graph, Shape } from '@antv/x6';

import { Clipboard } from '@antv/x6-plugin-clipboard';
import { History } from '@antv/x6-plugin-history';
import { Keyboard } from '@antv/x6-plugin-keyboard';
import { Selection } from '@antv/x6-plugin-selection';
import { Snapline } from '@antv/x6-plugin-snapline';
import { Transform } from '@antv/x6-plugin-transform';
import { forwardRef, useEffect } from 'react';
import { useModel } from 'umi';

import '../index.less';

const Canvas = forwardRef((props, ref) => {
  const {
    config: { background, width, height, scale },
    setSelectedNode,
  } = useModel('useEditor');

  // 添加快捷键
  const handleAddKeyboard = () => {
    const graph = (ref as any).current;

    // 复制
    graph.bindKey(['meta+c', 'ctrl+c'], () => {
      const cells = graph.getSelectedCells();
      if (cells.length) {
        graph.copy(cells);
      }
      return false;
    });

    // 剪切
    graph.bindKey(['meta+x', 'ctrl+x'], () => {
      const cells = graph.getSelectedCells();
      if (cells.length) {
        graph.cut(cells);
      }
      return false;
    });

    // 粘贴
    graph.bindKey(['meta+v', 'ctrl+v'], () => {
      if (!graph.isClipboardEmpty()) {
        const cells = graph.paste({ offset: 32 });
        graph.cleanSelection();
        graph.select(cells);
      }
      return false;
    });

    // 撤销
    graph.bindKey(['meta+z', 'ctrl+z'], () => {
      if (graph.canUndo()) {
        graph.undo();
      }
      return false;
    });

    // 重做
    graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
      if (graph.canRedo()) {
        graph.redo();
      }
      return false;
    });

    // 全选
    graph.bindKey(['meta+a', 'ctrl+a'], () => {
      const nodes = graph.getNodes();
      if (nodes) {
        graph.select(nodes);
      }
    });

    // 删除
    graph.bindKey('backspace', () => {
      const cells = graph.getSelectedCells();
      if (cells.length) {
        graph.removeCells(cells);
      }
    });

    // 放大
    graph.bindKey(['ctrl+shift+1', 'meta+shift+1'], () => {
      graph.zoom(0.1);
    });

    // 缩小
    graph.bindKey(['ctrl+shift+2', 'meta+shift+2'], () => {
      graph.zoom(-0.1);
    });
  };

  // 控制连接桩显示/隐藏
  const handlePortsHideAndShow = (ports: NodeListOf<SVGElement>, show: boolean) => {
    for (let i = 0, len = ports.length; i < len; i += 1) {
      ports[i].style.visibility = show ? 'visible' : 'hidden';
    }
  };

  useEffect(() => {
    const container = document.getElementById('canvas-container')!;

    const graph = new Graph({
      container: container,
      background: background,
      panning: true,
      width,
      height,
      mousewheel: {
        enabled: true,
        zoomAtMousePosition: true,
        modifiers: ['ctrl', 'meta'],
        minScale: 0.5,
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
            tools: ['edge-editor'],
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

    // TODO 渲染元素 data
    // graph.fromJSON(fromJsonData);

    // 内容居中显示
    graph.centerContent();

    graph.on('selection:changed', ({ selected }) => {
      if (selected.length > 0 && selected[0].isNode()) {
        const n = selected?.filter((item) => item.isNode());
        setSelectedNode(n);
      } else {
        setSelectedNode(undefined);
      }
    });

    // 将画布存到ref
    if (ref) {
      (ref as any).current = graph;
    }

    graph.on('node:mouseenter', () => {
      const ports = container.querySelectorAll('.x6-port-body') as NodeListOf<SVGElement>;
      handlePortsHideAndShow(ports, true);
    });

    graph.on('node:mouseleave', () => {
      const ports = container.querySelectorAll('.x6-port-body') as NodeListOf<SVGElement>;
      handlePortsHideAndShow(ports, false);
    });

    handleAddKeyboard();

    // 组件卸载时清理 Graph 实例
    return () => {
      graph.dispose();
    };
  }, []);

  useEffect(() => {
    // 更新画布尺寸
    const w = (width || 0) * ((scale || 30) / 100);
    const h = (height || 0) * ((scale || 30) / 100);

    (ref as any).current?.resize(w, h);
  }, [width, height, scale]);

  useEffect(() => {
    // 更新画布背景
    (ref as any).current?.drawBackground(background);
  }, [background]);

  return (
    <div
      className="relative flex justify-center items-center overflow-auto w-full h-[100vh]"
      id="canvas-bg"
    >
      <div id="canvas-container" ref={ref as any} />
    </div>
  );
});

export default Canvas;
