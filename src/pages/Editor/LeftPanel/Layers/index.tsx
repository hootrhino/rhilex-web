import { cn, IconFont } from '@/utils/utils';
import type { Cell } from '@antv/x6';
import { useModel } from '@umijs/max';
import { Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import { useEffect, useState } from 'react';
import Icon from '../../components/Icon';
import Tooltip from '../../components/Tooltip';

type LayersProps = {
  cells: Cell[];
};

const toolbars = [
  {
    key: 'move-prev',
    icon: 'icon-move-prev',
    name: '上移一层',
  },
  {
    key: 'move-next',
    icon: 'icon-move-next',
    name: '下移一层',
  },
  {
    key: 'move-top',
    icon: 'icon-move-top',
    name: '置顶',
  },
  {
    key: 'move-bottom',
    icon: 'icon-move-bottom',
    name: '置底',
  },
];

const Layers = ({ cells }: LayersProps) => {
  const { layers, activeNode, setActiveNode } = useModel('useEditor');
  const [isGroup, setGroup] = useState<boolean>(false);
  const [treeData, setData] = useState<DataNode[]>([]);

  useEffect(() => {
    const newData = layers?.map((item) => ({
      title: (
        <div className="flex items-center w-full">
          <span className="pr-[70px] text-base">{item.title}</span>
          <div
            className={cn(
              'absolute right-0 flex justify-end items-center w-[40px] h-[24px] opacity-0',
              'show-actions',
            )}
          >
            <Tooltip title="隐藏">
              <Icon type="show" className="px-[5px]" />
            </Tooltip>

            <Tooltip title="锁定">
              <Icon type="unlock" className="px-[5px]" />
            </Tooltip>
          </div>
        </div>
      ),
      key: item.id,
      icon: <IconFont type={item.icon} />,
    }));

    setData(newData);
  }, [layers]);

  return (
    <div className="w-full h-full">
      <div
        className={cn(
          'editor-divider-b',
          'h-[40px] w-full flex items-center justify-between px-[16px]',
        )}
      >
        {toolbars.map((toolbar) => (
          <Tooltip key={toolbar.key} title={toolbar.name}>
            <div className="flex items-center justify-center w-[24px] h-[24px] cursor-pointer rounded-[4px] g-transparent hover:bg-[#FFFFFF14]">
              <IconFont type={toolbar.icon} />
            </div>
          </Tooltip>
        ))}
        <div className="w-[1px] h-[12px] bg-[#333]" />
        <Tooltip title="成组">
          <div className="flex items-center justify-center w-[24px] h-[24px] cursor-pointer rounded-[4px] g-transparent hover:bg-[#FFFFFF14]">
            <IconFont type="icon-group" />
          </div>
        </Tooltip>
        <Tooltip title="解组" disabled={!isGroup}>
          <div
            className={cn(
              'flex items-center justify-center w-[24px] h-[24px] rounded-[4px] bg-transparent',
              isGroup ? 'cursor-pointer hover:bg-[#FFFFFF14]' : 'cursor-not-allowed',
            )}
          >
            <IconFont type={isGroup ? 'icon-ungroup' : 'icon-ungroup-disabled'} />
          </div>
        </Tooltip>
      </div>
      <div className=" w-full p-[8px]">
        <Tree
          showIcon
          blockNode
          defaultExpandAll
          treeData={treeData}
          selectedKeys={[activeNode?.id || '']}
          onSelect={(_, { node }) => {
            const activeItem = cells?.find((cell) => cell?.id === node?.key);
            setActiveNode(activeItem);
          }}
          rootClassName="editor-tree"
        />
      </div>
    </div>
  );
};

export default Layers;

// const [canUndo, setCanUndo] = useState<boolean>(true);
// const [canRedo, setCanRedo] = useState<boolean>(true);

// // 已选择节点
// const [selectedNode, setSelectedNode] = useState<Cell[] | undefined>(undefined);

// // 是否全屏
// const [isFullScreen, setFullScreen] = useState<boolean>(false);
// // 是否禁止操作群组
// const [disableGroup, setDisableGroup] = useState<boolean>(true);
// // 是否禁止操作解组
// const [disableUnGroup, setDisableUnGroup] = useState<boolean>(true);
// // 禁止置前或置后操作
// const disableFrontorBack =
//   selectedNode === undefined || (selectedNode && selectedNode?.length > 1);

// // 群组&解组
// const handleGroup = () => {
//   const graph = (ref as any).current;

//   let ctrlPressed = false;
//   const embedPadding = 20;

//   const pos = selectedNode && selectedNode?.length > 0 && graph?.getCellsBBox(selectedNode);

//   const parent = graph.addNode({
//     shape: 'rect',
//     x: pos?.x - pos?.width / 2,
//     y: pos?.y - pos?.height / 2,
//     width: pos?.width * 2,
//     height: pos?.height * 2,
//     zIndex: 1,
//     attrs: {
//       body: {
//         fill: '#fffbe6',
//         stroke: '#ffe7ba',
//       },
//       label: {
//         fontSize: 12,
//       },
//     },
//   });

//   if (!disableGroup) {
//     selectedNode?.forEach((item) => {
//       parent.addChild(item);
//       item?.setZIndex(10);
//     });

//     graph.on('node:embedding', ({ e }: { e: Dom.MouseMoveEvent }) => {
//       ctrlPressed = e.metaKey || e.ctrlKey;
//     });

//     graph.on('node:embedded', () => {
//       ctrlPressed = false;
//     });

//     graph.on('node:change:size', ({ node, options }: any) => {
//       if (options.skipParentHandler) {
//         return;
//       }

//       const children = node.getChildren();
//       if (children && children?.length) {
//         node.prop('originSize', node.getSize());
//       }
//     });

//     graph.on('node:change:position', ({ node, options }: any) => {
//       if (options.skipParentHandler || ctrlPressed) {
//         return;
//       }

//       const children = node.getChildren();
//       if (children && children?.length) {
//         node.prop('originPosition', node.getPosition());
//       }

//       if (parent && parent.isNode()) {
//         let originSize = parent.prop('originSize');
//         if (isNil(originSize)) {
//           originSize = parent.getSize();
//           parent.prop('originSize', originSize);
//         }

//         let originPosition = parent.prop('originPosition');

//         if (isNil(originPosition)) {
//           originPosition = parent.getPosition();
//           parent.prop('originPosition', originPosition);
//         }

//         let x = originPosition.x;
//         let y = originPosition.y;
//         let cornerX = originPosition.x + originSize.width;
//         let cornerY = originPosition.y + originSize.height;
//         let hasChange = false;

//         const children = parent.getChildren();

//         if (children) {
//           children?.forEach((child: any) => {
//             const bbox = child.getBBox().inflate(embedPadding);
//             const corner = bbox.getCorner();

//             if (bbox.x < x) {
//               x = bbox.x;
//               hasChange = true;
//             }

//             if (bbox.y < y) {
//               y = bbox.y;
//               hasChange = true;
//             }

//             if (corner.x > cornerX) {
//               cornerX = corner.x;
//               hasChange = true;
//             }

//             if (corner.y > cornerY) {
//               cornerY = corner.y;
//               hasChange = true;
//             }
//           });
//         }

//         if (hasChange) {
//           parent.prop(
//             {
//               position: { x, y },
//               size: { width: cornerX - x, height: cornerY - y },
//             },
//             { skipParentHandler: true },
//           );
//         }
//       }
//     });
//   } else {
//     // 解组
//     const children = selectedNode?.[0].getChildren();

//     if (!disableUnGroup) {
//       graph?.removeCells(selectedNode);
//       graph?.resetCells(children);
//     }
//   }
// };

// const handleToolbarClick = (name: string) => {
//   const graph = (ref as any).current;

//   setCanRedo(!graph.canRedo());
//   setCanUndo(!graph.canUndo());
//   switch (name) {
//     case 'undo':
//       graph.undo();
//       break;
//     case 'redo':
//       graph.redo();
//       break;
//     case 'zoomIn':
//       graph.zoom(0.1);
//       break;
//     case 'zoomOut':
//       graph.zoom(-0.1);
//       break;
//     case 'scaleToOne':
//       graph.zoomTo(1);
//       break;
//     case 'scaleToFit':
//       graph.zoomToFit();
//       break;
//     case 'fullScreen':
//       handleFullScreen.enter();
//       setFullScreen(true);
//       break;
//     case 'exitFullScreen':
//       handleFullScreen.exit();
//       setFullScreen(false);
//       break;
//     case 'frontNode':
//       if (selectedNode !== undefined) {
//         selectedNode?.[0].toFront();
//       }
//       break;
//     case 'backNode':
//       if (selectedNode !== undefined) {
//         selectedNode?.[0].toBack();
//       }
//       break;
//     case 'group':
//       handleGroup();
//       setDisableGroup(true);
//       break;
//     case 'unGroup':
//       handleGroup();
//       setDisableGroup(true);
//       break;
//     default:
//       break;
//   }
// };

// useEffect(() => {
//   if (selectedNode && selectedNode?.length > 0) {
//     const group = selectedNode?.filter((item) => item.hasParent() || item.getChildCount() > 0);
//     const children = selectedNode?.filter((item) => item.getChildCount() > 0);

//     setDisableGroup(group?.length > 0 ? true : false);
//     setDisableUnGroup(children?.length > 0 ? false : true);
//   } else {
//     setDisableGroup(true);
//     setDisableUnGroup(true);
//   }
// }, [selectedNode]);

// useEffect(() => {
//   const graph = (ref as any).current;

//   if (!isNil(graph)) {
//     graph.on('selection:changed', ({ selected }: any) => {
//       if (selected.length > 0 && selected[0].isNode()) {
//         const n = selected?.filter((item: any) => item.isNode());
//         setSelectedNode(n);
//       } else {
//         setSelectedNode(undefined);
//       }
//     });
//     setCanRedo(!graph.canRedo());
//     setCanUndo(!graph.canUndo());
//   }
// }, [(ref as any).current]);
