import { DEFAULT_GUIDE_CONFIG } from '@/models/useGuide';
import { cn } from '@/utils/utils';
import { Graph } from '@antv/x6';
import type { Cell } from '@antv/x6';
import { Clipboard } from '@antv/x6-plugin-clipboard';
import { Dnd } from '@antv/x6-plugin-dnd';
import { History } from '@antv/x6-plugin-history';
import { Keyboard } from '@antv/x6-plugin-keyboard';
import { Selection } from '@antv/x6-plugin-selection';
import { Snapline } from '@antv/x6-plugin-snapline';
import { Transform } from '@antv/x6-plugin-transform';
import { register } from '@antv/x6-react-shape';
import Guides from '@scena/react-guides';
import inRange from 'lodash/inRange';
import round from 'lodash/round';
import { useEffect, useRef, useState } from 'react';
import type { OnScroll } from 'react-infinite-viewer';
import InfiniteViewer from 'react-infinite-viewer';
import { useModel } from 'umi';
import ConfirmModal from '../components/ConfirmModal';
import Icon from '../components/Icon';
import { nodeTitle } from '../constants';
import Footer from '../Footer';
import LeftPanel from '../LeftPanel';
import { chartsList } from '../LeftPanel/constant';
import RightPanel from '../RightPanel';
import shapes from '../Shapes/ReactNodes';
import ToolBar from '../ToolBar';

import './index.less';

const Canvas = () => {
  const graphRef = useRef<any>(null);
  const dndRef = useRef<any>(null);
  const viewerRef = useRef<InfiniteViewer>(null);
  const horizontalGuidesRef = useRef<Guides>(null);
  const verticalGuidesRef = useRef<Guides>(null);

  const [canvasSize, setCanvasSize] = useState<number>(30);
  const [canMouseDrag, setMouseDrag] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);

  const [modalConfig, setModalConfig] = useState<{ open: boolean; content: string }>({
    open: false,
    content: '',
  });

  const {
    verticalZoom,
    horizontalZoom,
    verticalUnit,
    horizontalUnit,
    horizontalGuidelines,
    verticalGuidelines,
    setVerticalGuidelines,
    setHorizontalGuidelines,
    setHorizontalZoom,
    setHorizontalUnit,
    setVerticalZoom,
    setVerticalUnit,
  } = useModel('useGuide');

  const {
    collapseLeftPanel,
    layers,
    canvasConfig,
    setDetailFormType,
    setActiveNodeShape,
    setQuickStyle,
    setLayers,
    setAnimating,
  } = useModel('useEditor');

  // 使用插件
  const handleOnPlugins = (graph: Graph) => {
    graph
      .use(
        new Snapline({
          enabled: true,
        }),
      )
      .use(
        new Transform({
          resizing: true,
          rotating: true,
        }),
      )
      .use(
        new Selection({
          enabled: true,
          rubberband: true,
          showNodeSelectionBox: true,
          pointerEvents: 'none',
          // modifiers: ['alt']
        }),
      )
      .use(
        new Keyboard({
          enabled: true,
        }),
      )
      .use(
        new Clipboard({
          enabled: true,
        }),
      )
      .use(
        new History({
          enabled: true,
        }),
      );
  };

  // 使用快捷键
  const handleOnBindKey = (graph: Graph) => {
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
    graph.bindKey(['meta+shift+a', 'ctrl+shift+a'], () => {
      const nodes = graph.getNodes();
      if (nodes) {
        graph.select(nodes);
      }
    });

    // 删除
    graph.bindKey('backspace', () => {
      const cells = graph.getSelectedCells();

      if (cells.length) {
        const selectedShape = cells?.map(cell => nodeTitle[cell?.shape]);

        setModalConfig({ open: true, content: selectedShape.join('、') });
      }
    });
  };

  // 使用事件
  const handleOnEvent = (graph: Graph) => {
    graph.on('graph:mouseenter', () => {
      setMouseDrag(false);
    });

    graph.on('graph:mouseleave', () => {
      setMouseDrag(true);
    });

    graph.on('node:click', ({ node }) => {
      chartsList?.forEach((chart) => {
        if (node.shape.includes(chart.group)) {
          chart.children?.forEach((child) => {
            if (child.key === node.shape) {
              setQuickStyle(child.children);
            }
          });
        }
      });

      setActiveNodeShape(node.shape);
      setDetailFormType('node');
    });

    graph.on('blank:click', () => {
      setDetailFormType('canvas');
    });

    graph.on('node:added', () => {
      const allCells = graphRef.current?.getCells()?.map((cell: Cell) => ({id: cell.id, icon: 'icon-charts', title: nodeTitle[cell?.shape || '']}));
      // 更新图层
    setLayers(allCells.reverse());
    })

    graph.on('view:unmounted', () => {
      setAnimating(true);
    });

    graph.on('view:mounted', () => {
      setAnimating(false);
    });
  };

  // 使用DND拖拽
  const handleOnDnd = (graph: Graph) => {
    const dndContainer = document.getElementById('dnd-container')!;

    // 注册拖拽
    const dnd = new Dnd({
      target: graph,
      dndContainer,
      scaled: false,
      getDropNode(node) {
        const { width, height } = node.size();
        setAnimating(true);

        return node.clone().size(width * 3, height * 3);
      },
    });

    dndRef.current = dnd;
  };

  // 往画布添加组件
  const handleAddNode = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, isDrag: boolean) => {
    const graph = graphRef.current;
    const dnd = dndRef.current;
    const shape = e.target?.id;

    const node = graph.createNode({shape});

    if (isDrag) {
      // 拖拽添加
      dnd.start(node, e);
    } else {
      // 点击添加
      const { width, height } = node.size();
      graph.addNode(node).resize(width * 3, height * 3);
    }
  };

  // 删除组件
  const handleOnRemove = () => {
    const graph = graphRef.current;
    const cells = graph?.getSelectedCells();
    graph.removeCells(cells);
    const removeIds = cells.map((cell: Cell) => cell.id);
    const newLayers = layers.filter(layer => {
      return !removeIds.includes(layer.id)
    })

    setLayers(newLayers);
    setModalConfig({ open: false, content: '' });
  }

  // 刷新画布
  const handleOnRefresh = () => {
    const allCells = graphRef.current?.getCells();
    graphRef.current?.resetCells(allCells);
  };

  // 初始化画布
  const handleInitGraph = () => {
    const graphContainer = document.getElementById('canvas-container')!;
    const { r, g, b } = canvasConfig.color;
    const a = canvasConfig.opacity;

    const graph = new Graph({
      container: graphContainer,
      background: {
        color: `rgba(${r},${g},${b},${a})`,
      },
      width: canvasConfig.width,
      height: canvasConfig.height,
    });

    handleOnEvent(graph);
    handleOnPlugins(graph);
    handleOnBindKey(graph);
    handleOnDnd(graph);
    graphRef.current = graph;

    return graph;
  };

  const handleClearGuideLine = () => {
    setHorizontalGuidelines([]);
    setVerticalGuidelines([]);
    horizontalGuidesRef.current?.loadGuides([]);
    verticalGuidesRef.current?.loadGuides([]);
  };

  const handleOnScroll = (e: OnScroll) => {
    const viewZoom = viewerRef.current?.getZoom();
    const verticalScrollLeft = collapseLeftPanel ? e.scrollLeft - offset : e.scrollLeft;

    horizontalGuidesRef.current?.scroll(e.scrollLeft, viewZoom);
    horizontalGuidesRef.current?.scrollGuides(e.scrollTop, viewZoom);

    verticalGuidesRef.current?.scroll(e.scrollTop, viewZoom);
    verticalGuidesRef.current?.scrollGuides(verticalScrollLeft, viewZoom);
  };

  const getGuideConfig = () => {
    let unit = horizontalUnit;
    let guideZoom = horizontalZoom;

    if (inRange(canvasSize, 0, 35)) {
      unit = 300;
      guideZoom = 0.3;
    } else if (inRange(canvasSize, 35, 55)) {
      unit = 200;
      guideZoom = 0.35;
    } else if (inRange(canvasSize, 55, 100)) {
      unit = 100;
      guideZoom = 0.55;
    } else if (inRange(canvasSize, 100, 125)) {
      unit = 80;
      guideZoom = 1;
    } else if (inRange(canvasSize, 125, 170)) {
      unit = 60;
      guideZoom = 1.25;
    } else {
      unit = 40;
      guideZoom = 1.5;
    }

    setHorizontalUnit(unit);
    setVerticalUnit(unit);
    setHorizontalZoom(guideZoom);
    setVerticalZoom(guideZoom);
  };

  useEffect(() => {
    const zoom = canvasSize / 100;
    getGuideConfig();
    handleClearGuideLine();

    viewerRef.current?.setZoom(zoom);
  }, [canvasSize]);

  useEffect(() => {
    setOffset(round(300 / horizontalZoom, 2));
  }, [horizontalZoom]);

  useEffect(() => {
    const viewZoom = viewerRef.current?.getZoom();
    const pos = verticalGuidesRef.current?.getGuideScrollPos();

    if (collapseLeftPanel) {
      verticalGuidesRef.current?.scrollGuides(Number(pos) - offset, viewZoom);
    } else {
      verticalGuidesRef.current?.scrollGuides(Number(pos) + offset, viewZoom);
    }
  }, [collapseLeftPanel]);

  useEffect(() => {
    if (graphRef.current === null) return;
    const { r, g, b } = canvasConfig.color;
    const a = canvasConfig.opacity;

    graphRef.current?.drawBackground({ color: `rgba(${r},${g},${b},${a})` });
  }, [canvasConfig.color, canvasConfig.opacity]);

  useEffect(() => {
    graphRef.current?.resize(canvasConfig.width, canvasConfig.height);
  }, [canvasConfig.width, canvasConfig.height]);

  useEffect(() => {
    const initGraph = handleInitGraph();

    requestAnimationFrame(() => {
      viewerRef.current?.scrollCenter();
    });

    // 注册 React 节点
    shapes?.forEach((item) => register(item));

    // 组件卸载时清理 Graph 实例
    return () => {
      initGraph.dispose();
    };
  }, []);

  return (
    <div className="editor-wrapper">
      <ToolBar refresh={handleOnRefresh} />
      <LeftPanel ref={dndRef} id="dnd-container" addNode={handleAddNode} />
      <div className={cn('editor-content', 'relative w-full h-full transform-gpu')}>
        <div
          className={cn(
            'absolute flex justify-center items-center top-[60px] w-[20px] h-[20px] bg-[#292929] z-[100]',
            collapseLeftPanel ? 'left-[64px]' : 'left-[364px]',
          )}
        >
          <Icon type="eye" />
        </div>
        <div
          className={cn(
            'horizonal',
            'absolute w-[calc(100%-84px)] h-[20px] top-[60px] left-[84px] z-10 -translate-z-1',
          )}
        >
          <Guides
            {...DEFAULT_GUIDE_CONFIG}
            ref={horizontalGuidesRef}
            type="horizontal"
            textOffset={[0, 10]}
            zoom={horizontalZoom}
            guidesZoom={verticalZoom}
            unit={horizontalUnit}
            marks={verticalGuidelines}
            onChangeGuides={({ guides }) => {
              setHorizontalGuidelines(guides);
            }}
          />
        </div>
        <div
          className={cn(
            'vertical',
            'absolute h-[calc(100vh-80px)] top-[80px] w-[20px] left-[64px] -translate-z-1 z-10',
            collapseLeftPanel ? 'left-[64px]' : 'left-[364px]',
          )}
        >
          <Guides
            {...DEFAULT_GUIDE_CONFIG}
            ref={verticalGuidesRef}
            type="vertical"
            textOffset={[-10, 0]}
            textAlign="right"
            direction="start"
            zoom={verticalZoom}
            guidesZoom={horizontalZoom}
            unit={verticalUnit}
            marks={horizontalGuidelines}
            onChangeGuides={({ guides }) => {
              let newGuides = [...guides];
              if (!collapseLeftPanel) {
                newGuides = guides?.map((item) => Number(item) + offset);
              }
              setVerticalGuidelines(newGuides);
            }}
          />
        </div>
        <InfiniteViewer
          ref={viewerRef}
          className="relative w-full h-[100vh]"
          useAutoZoom={true}
          useMouseDrag={canMouseDrag}
          useWheelScroll={true}
          onScroll={handleOnScroll}
        >
          <div id="canvas-container" />
        </InfiniteViewer>
      </div>
      <RightPanel ref={graphRef} />
      <Footer value={canvasSize} onChange={(changeValue: number) => setCanvasSize(changeValue)} />
      <ConfirmModal
        title="删除组件"
        open={modalConfig.open}
        onCancel={() => setModalConfig({ open: false, content: '' })}
        onOk={handleOnRemove}
      >
        <div className="text-[#ADADAD]">是否删除组件: {modalConfig.content}</div>
      </ConfirmModal>
    </div>
  );
};

export default Canvas;
