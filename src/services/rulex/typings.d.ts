declare namespace API {
  type CronTaskCreateDTO = {
    /** "param1 param2 param3" */
    args?: string;
    cronExpr: string;
    /** ["A=e1", "B=e2", "C=e3"] */
    env?: string[];
    /** 0-false 1-true */
    isRoot?: string;
    name: string;
    script?: string;
    /** 1-shell 2-cmd */
    taskType: number;
  };

  type CronTaskUpdateDTO = {
    /** "param1 param2 param3" */
    args?: string;
    cronExpr?: string;
    /** ["A=e1", "B=e2", "C=e3"] */
    env?: string[];
    /** 0-false 1-true */
    isRoot?: string;
    name?: string;
    script?: string;
    /** 1-shell 2-cmd */
    taskType?: number;
    uuid: string;
  };

  type deleteAppDelParams = {
    uuid: string;
  };

  type deleteCrontaskDelParams = {
    /** uuid */
    uuid: string;
  };

  type deleteDevicesDelParams = {
    uuid: string;
  };

  type deleteGoodsParams = {
    uuid: string;
  };

  type deleteGroupDelParams = {
    uuid: string;
  };

  type deleteInendsDelParams = {
    uuid?: string;
  };

  type deleteOutendsDelParams = {
    uuid?: string;
  };

  type deleteRulesDelParams = {
    uuid: string;
  };

  type deleteUserluaDelParams = {
    uuid: string;
  };

  type deleteVisualParams = {
    uuid: string;
  };

  type getAppDetailParams = {
    uuid: string;
  };

  type getCrontaskResultsPageParams = {
    /** current */
    current?: string;
    /** size */
    size?: string;
    /** uuid */
    uuid?: string;
  };

  type getCrontaskStartParams = {
    /** uuid */
    uuid: string;
  };

  type getCrontaskStopParams = {
    /** uuid */
    uuid: string;
  };

  type getDataCenterSchemaDefineParams = {
    uuid: string;
  };

  type getDataCenterSchemaDetailParams = {
    uuid: string;
  };

  type getDevicesDetailParams = {
    uuid: string;
  };

  type getDevicesListByGroupParams = {
    uuid: string;
  };

  type getGoodsDetailParams = {
    uuid: string;
  };

  type getGroupDetailParams = {
    uuid: string;
  };

  type getHwifaceDetailParams = {
    uuid: string;
  };

  type getInendsDetailParams = {
    uuid: string;
  };

  type getOutendsDetailParams = {
    uuid: string;
  };

  type getPluginsDetailParams = {
    uuid: string;
  };

  type getRulesByDeviceParams = {
    deviceId: string;
  };

  type getRulesByInendParams = {
    inendId: string;
  };

  type getRulesDetailParams = {
    uuid?: string;
  };

  type getRulesListParams = {
    uuid?: string;
  };

  type getUserluaDetailParams = {
    uuid: string;
  };

  type getUserluaListByGroupParams = {
    /** 分组ID */
    uuid: string;
  };

  type getVisualDetailParams = {
    uuid: string;
  };

  type getVisualListByGroupParams = {
    uuid: string;
  };

  type putAppStartParams = {
    uuid: string;
  };

  type putAppStopParams = {
    uuid: string;
  };

  type putGoodsStartParams = {
    uuid: string;
  };

  type putGoodsStopParams = {
    uuid: string;
  };

  type putLogsRemoteParams = {
    /** on:开启；off: 关闭 */
    action?: string;
  };

  type putNotifyReadParams = {
    uuid: string;
  };

  type putVisualPublishParams = {
    uuid: string;
  };

  type R = {
    code: number;
    data?: string;
    msg: string;
  };
}
