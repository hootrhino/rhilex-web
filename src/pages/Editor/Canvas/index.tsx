import { Selection } from '@antv/x6-plugin-selection';
import { Snapline } from '@antv/x6-plugin-snapline';
import { Transform } from '@antv/x6-plugin-transform';
import { useEffect, useRef, useState } from 'react';
import { useModel } from 'umi';
import RightPanel from '../RightPanel';

import LeftPanel from '../LeftPanel';
import ToolBar from '../ToolBar';

import { cn } from '@/utils/utils';
import { EyeInvisibleOutlined } from '@ant-design/icons';
import Guides from '@scena/react-guides';
import { Graph } from '@antv/x6';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import InfiniteViewer from 'react-infinite-viewer';
import Footer from '../Footer';
import { DEFAULT_GUIDE_CONFIG } from '@/models/useGuide';
import { inRange } from 'lodash';

import './index.less';
import { Dnd } from '@antv/x6-plugin-dnd';

const Canvas = () => {
  const handle = useFullScreenHandle();

  const graphRef = useRef<any>(null);
  const dndRef = useRef<any>(null);
  const viewerRef = useRef<InfiniteViewer>(null);
  const horizontalGuidesRef = useRef<Guides>(null);
  const verticalGuidesRef = useRef<Guides>(null);

  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const [canvasSize, setCanvasSize] = useState<number>(30);
  const [canMouseDrag, setMouseDrag] = useState<boolean>(true);

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
    setVerticalUnit
  } = useModel('useGuide');

  const {
    collapseLeftPanel,
  } = useModel('useEditor');

  // 使用插件
  const handleOnPlugins = (graph: Graph) => {
    graph
      .use(new Snapline({
        enabled: true
      }))
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
      }),
    )
  };

  const handleInitGraph = () => {
    const graphContainer = document.getElementById('canvas-container')!;
    const dndContainer = document.getElementById('dnd-container')!;

    const graph = new Graph({
      container: graphContainer,
      background: {
        color: '#262626',
      },
      width: 1920,
      height: 1080,
      // embedding: true,
    });

    const dnd = new Dnd({
      target: graph,
      dndContainer,
      scaled: false,
      getDropNode(node) {
        const { width, height } = node.size();

        return node.clone().size(width * 3, height * 3);
      },
    });

    handleOnPlugins(graph);
    graphRef.current = graph;
    dndRef.current = dnd;

    return graph;
  };

  const handleClearGuideLine = () => {
    setHorizontalGuidelines([]);
    setVerticalGuidelines([]);
    horizontalGuidesRef.current?.loadGuides([]);
    verticalGuidesRef.current?.loadGuides([]);
  }

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
  }

  const handleAddNode = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const graph = graphRef.current;
    const dnd = dndRef.current;

    const node = graph.createNode({
      shape: 'rect',
      width: 100,
      height: 40,
    })

    dnd.start(node, e.nativeEvent)
  }

  useEffect(() => {
    const zoom = canvasSize / 100;
    getGuideConfig();
    handleClearGuideLine();

    viewerRef.current?.setZoom(zoom);
  }, [canvasSize]);

  useEffect(() => {
    if (graphRef.current) {
      setShouldRender(true);
    }
  }, [graphRef]);

  useEffect(() => {
    const initGraph = handleInitGraph();

    requestAnimationFrame(() => {
      viewerRef.current?.scrollCenter();
    });

    // 组件卸载时清理 Graph 实例
    return () => {
      initGraph.dispose();
    };
  }, []);

  return (
    <FullScreen handle={handle}>
      <div className={cn('editor-wrapper')}>
        <ToolBar handleFullScreen={handle} ref={graphRef} />
        <LeftPanel ref={dndRef} id="dnd-container" addNode={handleAddNode} />
        <div className={cn('editor-content', 'relative w-full h-full transform-gpu')}>
          <div
            className={cn(
              'absolute flex justify-center items-center top-[60px] w-[20px] h-[20px] bg-[#292929] z-[100]',
              collapseLeftPanel ? 'left-[64px]' : 'left-[364px]',
            )}
          >
            <EyeInvisibleOutlined style={{ color: '#adadad' }} />
          </div>
          <div
            className={cn(
              'horizonal',
              'absolute w-[calc(100%-84px)] h-[20px] top-[60px] left-[84px] z-10 -translate-z-1',
              collapseLeftPanel ? 'left-[84px]' : 'left-[384px]',
            )}
          >
            {shouldRender && (
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
            )}
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
                setVerticalGuidelines(guides);
              }}
            />
          </div>
          <InfiniteViewer
            ref={viewerRef}
            className='relative w-full h-[100vh]'
            useAutoZoom={true}
            useMouseDrag={canMouseDrag}
            useWheelScroll={true}
            onScroll={(e) => {
              const viewZoom = viewerRef.current?.getZoom();

              horizontalGuidesRef.current?.scroll(e.scrollLeft, viewZoom);
              horizontalGuidesRef.current?.scrollGuides(e.scrollTop, viewZoom);

              verticalGuidesRef.current?.scroll(e.scrollTop, viewZoom);
              verticalGuidesRef.current?.scrollGuides(e.scrollLeft, viewZoom);
            }}
          >
            <div id="canvas-container" onMouseEnter={() => setMouseDrag(false)} onMouseLeave={() => setMouseDrag(true)}/>
          </InfiniteViewer>
        </div>
        <RightPanel ref={graphRef} />
        <Footer value={canvasSize} onChange={(changeValue: number) => setCanvasSize(changeValue)} />
      </div>
    </FullScreen>
  );
};

export default Canvas;
