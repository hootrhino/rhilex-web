export enum ObjectType {
  AI = 'AI',
  AO = 'AO',
  AV = 'AV',
  BI = 'BI',
  BO = 'BO',
  BV = 'BV',
  MI = 'MI',
  MO = 'MO',
  MV = 'MV',
}

export const ObjectTypeOption = {
  [ObjectType.AI]: 'AI 模拟输入',
  [ObjectType.AO]: 'AO 模拟输出',
  [ObjectType.AV]: 'AV 模拟值',
  [ObjectType.BI]: 'BI 二进制输入',
  [ObjectType.BO]: 'BO 二进制输出',
  [ObjectType.BV]: 'BV 二进制值',
  [ObjectType.MI]: 'MI 多状态输入',
  [ObjectType.MO]: 'MO 多状态输出',
  [ObjectType.MV]: 'MV 多状态值',
};
