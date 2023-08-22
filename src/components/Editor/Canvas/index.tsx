// import { Cell, Edge, Graph, Shape } from '@antv/x6';

// import { Clipboard } from '@antv/x6-plugin-clipboard';
// import { History } from '@antv/x6-plugin-history';
// import { Keyboard } from '@antv/x6-plugin-keyboard';
// import { Selection } from '@antv/x6-plugin-selection';
import { Snapline } from '@antv/x6-plugin-snapline';
// import { Transform } from '@antv/x6-plugin-transform';
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

const Canvas = () => {
  const handle = useFullScreenHandle();

  const graphRef = useRef<any>(null);
  const viewerRef = useRef<InfiniteViewer>(null);
  const horizontalGuidesRef = useRef<Guides>(null);
  const verticalGuidesRef = useRef<Guides>(null);

  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const [canvasSize, setCanvasSize] = useState<number>(36);

  const {
    verticalZoom,
    horizontalZoom,
    verticalUnit,
    horizontalUnit,
    horizontalGuidelines,
    verticalGuidelines,
    setVerticalGuidelines,
    setHorizontalGuidelines,
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
      .use(new Snapline())
      // .use(
      //   new Transform({
      //     resizing: true,
      //     rotating: true,
      //   }),
      // );
    // .use(
    //   new Selection({
    //     enabled: true,
    //     multiple: true,
    //     rubberband: true,
    //     movable: true,
    //     showNodeSelectionBox: true,
    //     pointerEvents: 'none',
    //   }),
    // )
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

  // // 控制连接桩显示/隐藏
  // const handlePortsHideAndShow = (show: boolean) => {
  //   const container = document.getElementById('canvas-container')!;
  //   const ports = container.querySelectorAll('.x6-port-body') as NodeListOf<SVGElement>;

  //   for (let i = 0, len = ports.length; i < len; i += 1) {
  //     ports[i].style.visibility = show ? 'visible' : 'hidden';
  //   }
  // };

  // // 监听画布事件
  // const handleOnEvents = (graph: Graph) => {
  //   graph.on('node:mouseenter', () => {
  //     handlePortsHideAndShow(true);
  //   });

  //   graph.on('node:mouseleave', () => {
  //     handlePortsHideAndShow(false);
  //   });

  //   graph.on('node:click', ({ node }) => {
  //     const nodeProps = node.getProp();

  //     if (currentEdgeView) {
  //       currentEdgeView.unhighlight();
  //       currentEdgeView = null;
  //     }
  //     setNodeForm({ ...nodeProps, rotate: false });
  //   });

  //   graph.on('edge:selected', ({ edge }: any) => {
  //     const view = graph.findViewByCell(edge);

  //     if (view && currentEdgeView !== view) {
  //       if (currentEdgeView) {
  //         currentEdgeView.unhighlight();
  //       }
  //       view.highlight();
  //       currentEdgeView = view;
  //     }
  //   });

  //   graph.on('edge:mouseenter', ({ edge }: any) => {
  //     const view = graph.findViewByCell(edge);
  //     if (view && currentEdgeView !== view) {
  //       view.highlight();
  //     }
  //   });

  //   graph.on('edge:mouseleave', ({ edge }: any) => {
  //     const view = graph.findViewByCell(edge);
  //     if (view && currentEdgeView !== view) {
  //       view.unhighlight();
  //     }
  //   });

  //   // 监听画布空白区域
  //   graph.on('blank:click', () => {
  //     if (currentEdgeView) {
  //       currentEdgeView.unhighlight();
  //       currentEdgeView = null;
  //     }
  //   });
  // };

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
      // 设置边连线规则
      // connecting: {
      //   // 智能正交路由，由水平或垂直的正交线段组成，并自动避开路径上的其他节点（障碍）。
      //   router: 'manhattan',
      //   anchor: 'center',
      //   connectionPoint: 'anchor',
      //   allowBlank: false,
      //   highlight: true,
      //   snap: {
      //     radius: 20,
      //   },
      //   connector: {
      //     name: 'rounded',
      //     args: {},
      //   },
      //   createEdge() {
      //     return new Shape.Edge({
      //       attrs: {
      //         line: {
      //           stroke: '#8f8f8f',
      //           strokeWidth: 1,
      //         },
      //       },
      //       tools: ['edge-editor'],
      //       zIndex: 0,
      //     });
      //   },
      //   validateConnection({ targetMagnet }) {
      //     return !!targetMagnet;
      //   },
      // },
      // highlighting: {
      //   // 连线过程中，自动吸附到连接桩时被使用
      //   magnetAdsorbed: {
      //     name: 'stroke',
      //     args: {
      //       attrs: {
      //         fill: '#5F95FF',
      //         stroke: '#5F95FF',
      //       },
      //     },
      //   },
      //   // 拖动节点进行嵌入操作过程中，节点可以被嵌入时被使用
      //   embedding: {
      //     name: 'stroke',
      //     args: {
      //       padding: -1,
      //       attrs: {
      //         stroke: '#5F95FF',
      //       },
      //     },
      //   },
      // },
    });

    handleOnPlugins(graph);
    //   handleAddKeyboard(graph);
    //   handleOnEvents(graph);

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

  useEffect(() => {
    // 更新画布缩放
    const w = 1920 * (canvasSize / 100);
    const h = 1080 * (canvasSize / 100);

    graphRef.current?.resize(w, h);
  }, [canvasSize]);

  // useEffect(() => {
  //   // 更新画布背景
  //   graphRef.current?.drawBackground(background);
  // }, [background]);

  // useEffect(() => {
  //   handleUpdateEdge();
  // }, [edgeData]);

  // useEffect(() => {
  //   const graph = graphRef.current;

  //   const selectedCells = graph?.getSelectedCells();

  //   selectedCells?.forEach((cell: Cell) => {
  //     if (cell.isNode()) {
  //       if (cell?.id === nodeFormData?.id) {
  //         if (nodeFormData?.rotate) {
  //           const view = graph.findViewByCell(cell);
  //           if (view) {
  //             // TODO 添加自动旋转动画
  //             cell.transition('angle', 360, {
  //               duration: 1000,
  //               timing: 'linear',
  //             });
  //           }
  //           console.log(view);
  //         }
  //         cell.prop({ ...omit(nodeFormData, 'rotate') });
  //       }
  //     }
  //   });
  // }, [nodeFormData]);

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
              collapseLeftPanel ? 'left-[64px]' : 'left-[306px]',
            )}
          >
            <EyeInvisibleOutlined style={{ color: '#adadad' }} />
          </div>
          <div
            className={cn(
              'horizonal',
              'absolute w-[calc(100%-84px)] h-[20px] top-[60px] left-[84px] z-10 -translate-z-1',
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
              collapseLeftPanel ? 'left-[64px]' : 'left-[306px]',
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
            className={cn('viewer', 'relative w-full h-[100vh]')}
            useAutoZoom={true}
            useMouseDrag={true}
            useWheelScroll={true}
            onScroll={(e) => {
              horizontalGuidesRef.current?.scroll(e.scrollLeft, horizontalZoom);
              horizontalGuidesRef.current?.scrollGuides(e.scrollTop, horizontalZoom);

              verticalGuidesRef.current?.scroll(e.scrollTop, verticalZoom);
              verticalGuidesRef.current?.scrollGuides(e.scrollLeft, verticalZoom);
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
