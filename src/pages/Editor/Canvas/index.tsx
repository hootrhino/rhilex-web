import { DEFAULT_GUIDE_CONFIG } from '@/models/useGuide';
import { cn } from '@/utils/utils';
import type { Cell } from '@antv/x6';
import { Graph } from '@antv/x6';
import { Dnd } from '@antv/x6-plugin-dnd';
import { register } from '@antv/x6-react-shape';
import Guides from '@scena/react-guides';
import round from 'lodash/round';
import { useEffect, useRef, useState } from 'react';
import type { OnScroll } from 'react-infinite-viewer';
import InfiniteViewer from 'react-infinite-viewer';
import { useModel } from 'umi';
import ConfirmModal from '../components/ConfirmModal';
import Icon from '../components/Icon';
import Footer from '../Footer';
import LeftPanel from '../LeftPanel';
import RightPanel from '../RightPanel';
import shapes from '../Shapes/ReactNodes';
import ToolBar from '../ToolBar';

import type { RemoveModalConfigType } from '../utils';
import { getGuideConfig, getNodeTitle, getQuickStyle, handleOnBindKey, handleOnPlugins } from '../utils';
import './index.less';
import { useClickAway } from 'ahooks';

const Canvas = () => {
  const graphRef = useRef<any>(null);
  const dndRef = useRef<any>(null);
  const viewerRef = useRef<InfiniteViewer>(null);
  const horizontalGuidesRef = useRef<Guides>(null);
  const verticalGuidesRef = useRef<Guides>(null);

  const [canvasSize, setCanvasSize] = useState<number>(30);
  const [canMouseDrag, setMouseDrag] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);

  const [modalConfig, setModalConfig] = useState<RemoveModalConfigType>({
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
    setRightQuickStyle,
    setLayers,
    setAnimating,
  } = useModel('useEditor');

  // 使用事件
  const handleOnEvent = (graph: Graph) => {
    graph.on('node:click', ({ node }) => {
      setRightQuickStyle(getQuickStyle(node.shape) as any);
      setActiveNodeShape(node.shape);
      setDetailFormType('node');
    });

    graph.on('blank:click', () => {
      setDetailFormType('canvas');
    });

    graph.on('node:added', () => {
      const allCells = graphRef.current?.getCells()?.map((cell: Cell) => ({
        id: cell.id,
        icon: 'icon-charts',
        title: getNodeTitle(cell?.shape || ''),
      }));
      // 更新图层
      setLayers(allCells.reverse());
    });

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

    if (!shape) return;

    const node = graph.createNode({ shape });

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
    const newLayers = layers.filter((layer) => {
      return !removeIds.includes(layer.id);
    });

    setLayers(newLayers);
    setModalConfig({ open: false, content: '' });
  };

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
    handleOnBindKey(graph, setModalConfig);
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

  useClickAway(() => {
   // 禁止画布移动
   setMouseDrag(false);
  }, () => document.getElementById('canvas-container'));

  useEffect(() => {
    const zoom = canvasSize / 100;
    // 更新标尺
    const { unit, guideZoom } = getGuideConfig({ horizontalUnit, horizontalZoom, canvasSize });
    setHorizontalUnit(unit);
    setVerticalUnit(unit);
    setHorizontalZoom(guideZoom);
    setVerticalZoom(guideZoom);
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
