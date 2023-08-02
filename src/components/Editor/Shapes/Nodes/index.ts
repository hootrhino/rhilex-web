/** 更多图形 https://github.com/antvis/X6/blob/master/examples/x6-example-features/src/pages/shape/flowchart/shapes/index.ts */

import { collateNode } from './collate';
import { databaseNode } from './database';
import { decisionNode } from './decision';
import { delayNode } from './delay';
import { directDataNode } from './directData';
import { displayNode } from './display';
import { documentNode } from './document';
import { manualInputNode } from './manualInput';
// 倒三角形
import extractNode from './extract';
// 正三角形
import { internalStorageNode } from './internalStorage';
import { mergeNode } from './merge';

import { multDocumentNode } from './multDocument';
import { offPageNode } from './offPage';
import { onPageNode } from './onPage';
import { orNode } from './or';

import { loopLimitNode } from './loopLimit';
import { manualOperationNode } from './manualOperation';
import { processNode } from './process';
import { sortNode } from './sort';
import { terminatorNode } from './terminator';

export const baseNodes = [
  terminatorNode,
  processNode,
  decisionNode,
  multDocumentNode,
  collateNode,
  orNode,
  mergeNode,
  extractNode,
  delayNode,
  displayNode,
  offPageNode,
  onPageNode,
  directDataNode,
  manualInputNode,
  manualOperationNode,
  databaseNode,
  documentNode,
  loopLimitNode,
  sortNode,
  internalStorageNode,
];
