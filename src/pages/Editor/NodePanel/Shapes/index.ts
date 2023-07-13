/** 更多图形 https://github.com/antvis/X6/blob/master/examples/x6-example-features/src/pages/shape/flowchart/shapes/index.ts */

import { collateNode } from './collate';
import { databaseNode } from './database';
import { decisionNode } from './decision';
import { documentNode } from './document';
// 倒三角形
import { extractNode } from './extract';
// 正三角形
import { internalStorageNode } from './internalStorage';
import { mergeNode } from './merge';

import { multDocumentNode } from './multDocument';
import { orNode } from './or';
import { processNode } from './process';
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
  databaseNode,
  documentNode,
  internalStorageNode,
];
