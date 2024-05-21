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
  [ObjectType.AI]: '模拟输入',
  [ObjectType.AO]: '模拟输出',
  [ObjectType.AV]: '模拟值',
  [ObjectType.BI]: '二进制输入',
  [ObjectType.BO]: '二进制输出',
  [ObjectType.BV]: '二进制值',
  [ObjectType.MI]: '多状态输入',
  [ObjectType.MO]: '多状态输出',
  [ObjectType.MV]: '多状态值',
};
