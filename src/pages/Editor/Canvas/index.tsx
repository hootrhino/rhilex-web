import { Cell, Edge, Graph, Shape } from '@antv/x6';

import { Clipboard } from '@antv/x6-plugin-clipboard';
import { History } from '@antv/x6-plugin-history';
import { Keyboard } from '@antv/x6-plugin-keyboard';
import { Selection } from '@antv/x6-plugin-selection';
import { Snapline } from '@antv/x6-plugin-snapline';
import { Transform } from '@antv/x6-plugin-transform';
import { useEffect, useRef, useState } from 'react';
import type { FullScreenHandle } from 'react-full-screen';
import { useModel } from 'umi';
import DetailPanel from '../DetailPanel';

import NodePanel from '../NodePanel';
import ToolBar from '../ToolBar';

import '../index.less';

type CanvasProps = {
  handleFullScreen: FullScreenHandle;
};

const Canvas = ({ handleFullScreen }: CanvasProps) => {
  const graphRef = useRef<any>(null);
  let currentEdgeView: any = null;
  const [shouldRenderNodePanel, setShouldRenderNodePanel] = useState(false);

  const {
    canvasData: { background, width, height, scale },
    edgeData,
    nodeFormData,
    edgeFormData,
    setNodeForm,
  } = useModel('useEditor');

  // 使用插件
  const handleOnPlugins = (graph: Graph) => {
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
  };

  // 添加快捷键
  const handleAddKeyboard = (graph: Graph) => {
    // 复制
    graph?.bindKey(['meta+c', 'ctrl+c'], () => {
      const cells = graph.getSelectedCells();
      if (cells.length) {
        graph.copy(cells);
      }
      return false;
    });

    // 剪切
    graph?.bindKey(['meta+x', 'ctrl+x'], () => {
      const cells = graph.getSelectedCells();
      if (cells.length) {
        graph.cut(cells);
      }
      return false;
    });

    // 粘贴
    graph?.bindKey(['meta+v', 'ctrl+v'], () => {
      if (!graph.isClipboardEmpty()) {
        const cells = graph.paste({ offset: 32 });
        graph.cleanSelection();
        graph.select(cells);
      }
      return false;
    });

    // 撤销
    graph?.bindKey(['meta+z', 'ctrl+z'], () => {
      if (graph.canUndo()) {
        graph.undo();
      }
      return false;
    });

    // 重做
    graph?.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
      if (graph.canRedo()) {
        graph.redo();
      }
      return false;
    });

    // 全选
    graph?.bindKey(['meta+a', 'ctrl+a'], () => {
      const nodes = graph.getNodes();
      if (nodes) {
        graph.select(nodes);
      }
    });

    // 删除
    graph?.bindKey('backspace', () => {
      const cells = graph.getSelectedCells();
      if (cells.length) {
        graph.removeCells(cells);
      }
    });

    // 放大
    graph?.bindKey(['ctrl+shift+1', 'meta+shift+1'], () => {
      graph.zoom(0.1);
    });

    // 缩小
    graph?.bindKey(['ctrl+shift+2', 'meta+shift+2'], () => {
      graph.zoom(-0.1);
    });
  };

  // 控制连接桩显示/隐藏
  const handlePortsHideAndShow = (show: boolean) => {
    const container = document.getElementById('canvas-container')!;
    const ports = container.querySelectorAll('.x6-port-body') as NodeListOf<SVGElement>;

    for (let i = 0, len = ports.length; i < len; i += 1) {
      ports[i].style.visibility = show ? 'visible' : 'hidden';
    }
  };

  // 监听画布事件
  const handleOnEvents = (graph: Graph) => {
    graph.on('node:mouseenter', () => {
      handlePortsHideAndShow(true);
    });

    graph.on('node:mouseleave', () => {
      handlePortsHideAndShow(false);
    });

    graph.on('node:click', ({ node }) => {
      const nodeProps = node.getProp();

      if (currentEdgeView) {
        currentEdgeView.unhighlight();
        currentEdgeView = null;
      }
      setNodeForm({ ...nodeProps });
    });

    graph.on('edge:selected', ({ edge }: any) => {
      const view = graph.findViewByCell(edge);

      if (view && currentEdgeView !== view) {
        if (currentEdgeView) {
          currentEdgeView.unhighlight();
        }
        view.highlight();
        currentEdgeView = view;
      }
    });

    graph.on('edge:mouseenter', ({ edge }: any) => {
      const view = graph.findViewByCell(edge);
      if (view && currentEdgeView !== view) {
        view.highlight();
      }
    });

    graph.on('edge:mouseleave', ({ edge }: any) => {
      const view = graph.findViewByCell(edge);
      if (view && currentEdgeView !== view) {
        view.unhighlight();
      }
    });

    // 监听画布空白区域
    graph.on('blank:click', () => {
      if (currentEdgeView) {
        currentEdgeView.unhighlight();
        currentEdgeView = null;
      }
    });
  };

  // 更新边配置
  const handleUpdateEdge = () => {
    const selectCells = graphRef.current?.getSelectedCells();

    selectCells?.forEach((cell: Cell) => {
      if (cell.isEdge()) {
        const labels = cell.getLabels()?.map((item: Edge.Label) => {
          const pos = item?.position || {};
          if (item?.attrs?.label) {
            return {
              ...item,
              attrs: {
                ...item?.attrs,
                label: {
                  ...item?.attrs?.label,
                  ...edgeData?.labels[0]?.attrs.label,
                },
                body: {
                  ...item?.attrs?.body,
                  ...edgeData?.labels[0]?.attrs.body,
                },
              },
              position: {
                ...pos,
                ...edgeData?.labels[0]?.position,
              },
            };
          } else {
            return item;
          }
        });

        cell.prop({ ...edgeData, labels });

        if (edgeFormData.lineType !== 'pipeline') {
          cell.removeMarkup();
        }
      }
    });
  };

  const handleInitGraph = () => {
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
      // 设置边连线规则
      connecting: {
        // 智能正交路由，由水平或垂直的正交线段组成，并自动避开路径上的其他节点（障碍）。
        router: 'manhattan',
        anchor: 'center',
        connectionPoint: 'anchor',
        allowBlank: false,
        highlight: true,
        snap: {
          radius: 20,
        },
        connector: {
          name: 'rounded',
          args: {},
        },
        createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: '#8f8f8f',
                strokeWidth: 1,
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
              stroke: '#5F95FF',
            },
          },
        },
      },
    });

    handleOnPlugins(graph);
    handleAddKeyboard(graph);
    handleOnEvents(graph);

    // 内容居中显示
    graph.centerContent();
    // TODO 渲染元素 data
    // graph.fromJSON(fromJsonData);
    graphRef.current = graph;

    return graph;
  };

  useEffect(() => {
    const initGraph = handleInitGraph();

    // 组件卸载时清理 Graph 实例
    return () => {
      initGraph.dispose();
    };
  }, []);

  useEffect(() => {
    // 更新画布尺寸
    const w = (width || 0) * ((scale || 30) / 100);
    const h = (height || 0) * ((scale || 30) / 100);

    graphRef.current?.resize(w, h);
  }, [width, height, scale]);

  useEffect(() => {
    // 更新画布背景
    graphRef.current?.drawBackground(background);
  }, [background]);

  useEffect(() => {
    handleUpdateEdge();
  }, [edgeData]);

  useEffect(() => {
    const selectedCells = graphRef.current?.getSelectedCells();

    selectedCells?.forEach((cell: Cell) => {
      if (cell.isNode()) {
        if (cell?.id === nodeFormData?.id) {
          cell.prop(nodeFormData);
        }
      }
    });
  }, [nodeFormData]);

  useEffect(() => {
    if (graphRef.current) {
      setShouldRenderNodePanel(true);
    }
  }, [graphRef]);

  return (
    <div
      className="relative flex justify-center items-center overflow-auto w-full h-[100vh]"
      id="canvas-bg"
    >
      <div id="canvas-container" />
      <ToolBar handleFullScreen={handleFullScreen} ref={graphRef} />
      {shouldRenderNodePanel && <NodePanel ref={graphRef} />}
      <DetailPanel ref={graphRef} />
    </div>
  );
};

export default Canvas;
