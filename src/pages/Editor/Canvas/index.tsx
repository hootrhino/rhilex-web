// import { Cell, Edge, Graph, Shape } from '@antv/x6';

// import { Clipboard } from '@antv/x6-plugin-clipboard';
// import { History } from '@antv/x6-plugin-history';
// import { Keyboard } from '@antv/x6-plugin-keyboard';
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
import './index.less';
import { DEFAULT_GUIDE_CONFIG } from '@/models/useGuide';
import { inRange } from 'lodash';

const Canvas = () => {
  const handle = useFullScreenHandle();

  const graphRef = useRef<any>(null);
  const viewerRef = useRef<InfiniteViewer>(null);
  const horizontalGuidesRef = useRef<Guides>(null);
  const verticalGuidesRef = useRef<Guides>(null);

  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const [canvasSize, setCanvasSize] = useState<number>(30);

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
  // let currentEdgeView: any = null;

  const {
    // canvasData: { background, width, height, scale },
    // edgeData,
    // nodeFormData,
    // edgeFormData,
    // setNodeForm,
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
          resizing: {
            enabled: true
          },
          rotating: {
            enabled: true
          },
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
    // .use(new Keyboard())
    // .use(new Clipboard())
    // .use(new History());
  };

  // // 添加快捷键
  // const handleAddKeyboard = (graph: Graph) => {
  //   // 复制
  //   graph?.bindKey(['meta+c', 'ctrl+c'], () => {
  //     const cells = graph.getSelectedCells();
  //     if (cells.length) {
  //       graph.copy(cells);
  //     }
  //     return false;
  //   });

  //   // 剪切
  //   graph?.bindKey(['meta+x', 'ctrl+x'], () => {
  //     const cells = graph.getSelectedCells();
  //     if (cells.length) {
  //       graph.cut(cells);
  //     }
  //     return false;
  //   });

  //   // 粘贴
  //   graph?.bindKey(['meta+v', 'ctrl+v'], () => {
  //     if (!graph.isClipboardEmpty()) {
  //       const cells = graph.paste({ offset: 32 });
  //       graph.cleanSelection();
  //       graph.select(cells);
  //     }
  //     return false;
  //   });

  //   // 撤销
  //   graph?.bindKey(['meta+z', 'ctrl+z'], () => {
  //     if (graph.canUndo()) {
  //       graph.undo();
  //     }
  //     return false;
  //   });

  //   // 重做
  //   graph?.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
  //     if (graph.canRedo()) {
  //       graph.redo();
  //     }
  //     return false;
  //   });

  //   // 全选
  //   graph?.bindKey(['meta+a', 'ctrl+a'], () => {
  //     const nodes = graph.getNodes();
  //     if (nodes) {
  //       graph.select(nodes);
  //     }
  //   });

  //   // 删除
  //   graph?.bindKey('backspace', () => {
  //     const cells = graph.getSelectedCells();
  //     if (cells.length) {
  //       graph.removeCells(cells);
  //     }
  //   });

  //   // 放大
  //   graph?.bindKey(['ctrl+shift+1', 'meta+shift+1'], () => {
  //     graph.zoom(0.1);
  //   });

  //   // 缩小
  //   graph?.bindKey(['ctrl+shift+2', 'meta+shift+2'], () => {
  //     graph.zoom(-0.1);
  //   });
  // };

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

    // graph.on('node:click', ({ node }) => {
    //   const nodeProps = node.getProp();

    //   if (currentEdgeView) {
    //     currentEdgeView.unhighlight();
    //     currentEdgeView = null;
    //   }
    //   setNodeForm({ ...nodeProps, rotate: false });
    // });

    // graph.on('edge:selected', ({ edge }: any) => {
    //   const view = graph.findViewByCell(edge);

    //   if (view && currentEdgeView !== view) {
    //     if (currentEdgeView) {
    //       currentEdgeView.unhighlight();
    //     }
    //     view.highlight();
    //     currentEdgeView = view;
    //   }
    // });

    // graph.on('edge:mouseenter', ({ edge }: any) => {
    //   const view = graph.findViewByCell(edge);
    //   if (view && currentEdgeView !== view) {
    //     view.highlight();
    //   }
    // });

    // graph.on('edge:mouseleave', ({ edge }: any) => {
    //   const view = graph.findViewByCell(edge);
    //   if (view && currentEdgeView !== view) {
    //     view.unhighlight();
    //   }
    // });

    // // 监听画布空白区域
    // graph.on('blank:click', () => {
    //   if (currentEdgeView) {
    //     currentEdgeView.unhighlight();
    //     currentEdgeView = null;
    //   }
    // });
  };

  // // 更新边配置
  // const handleUpdateEdge = () => {
  //   const selectCells = graphRef.current?.getSelectedCells();

  //   selectCells?.forEach((cell: Cell) => {
  //     if (cell.isEdge()) {
  //       const labels = cell.getLabels()?.map((item: Edge.Label) => {
  //         const pos = item?.position || {};
  //         if (item?.attrs?.label) {
  //           return {
  //             ...item,
  //             attrs: {
  //               ...item?.attrs,
  //               label: {
  //                 ...item?.attrs?.label,
  //                 ...edgeData?.labels[0]?.attrs.label,
  //               },
  //               body: {
  //                 ...item?.attrs?.body,
  //                 ...edgeData?.labels[0]?.attrs.body,
  //               },
  //             },
  //             position: {
  //               ...pos,
  //               ...edgeData?.labels[0]?.position,
  //             },
  //           };
  //         } else {
  //           return item;
  //         }
  //       });

  //       cell.prop({ ...edgeData, labels });

  //       if (edgeFormData.lineType !== 'pipeline') {
  //         cell.removeMarkup();
  //       }
  //     }
  //   });
  // };

  const handleInitGraph = () => {
    const container = document.getElementById('canvas-container')!;
    const graph = new Graph({
      container: container,
      background: {
        color: '#262626',
      },
      width: 1920,
      height: 1080,
      embedding: true,
    });

    handleOnPlugins(graph);
    //   handleAddKeyboard(graph);
    handleOnEvents(graph);

    //   // TODO 渲染元素 data
    //   // graph.fromJSON(fromJsonData);
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
    requestAnimationFrame(() => {
      viewerRef.current?.scrollCenter();
    });
  }, []);

  return (
    <FullScreen handle={handle}>
      <div className={cn('editor-wrapper')}>
        <ToolBar handleFullScreen={handle} ref={graphRef} />
        <LeftPanel ref={graphRef} />
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
            useMouseDrag={true}
            useWheelScroll={true}
            onScroll={(e) => {
              const viewZoom = viewerRef.current?.getZoom();

              horizontalGuidesRef.current?.scroll(e.scrollLeft, viewZoom);
              horizontalGuidesRef.current?.scrollGuides(e.scrollTop, viewZoom);

              verticalGuidesRef.current?.scroll(e.scrollTop, viewZoom);
              verticalGuidesRef.current?.scrollGuides(e.scrollLeft, viewZoom);
            }}
          >
            <div id="canvas-container" />
          </InfiniteViewer>
        </div>
        <RightPanel ref={graphRef} />
        <Footer value={canvasSize} onChange={(changeValue: number) => setCanvasSize(changeValue)} />
      </div>
    </FullScreen>
  );
};

export default Canvas;
