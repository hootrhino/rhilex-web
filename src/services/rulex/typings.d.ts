declare namespace API {
  type deleteAppParams = {
    uuid: string;
  };

  type deleteDevicesParams = {
    uuid: string;
  };

  type deleteGoodsParams = {
    uuid: string;
  };

  type deleteGroupParams = {
    uuid: string;
  };

  type deleteInendsParams = {
    uuid?: string;
  };

  type deleteOutendsParams = {
    uuid?: string;
  };

  type deleteRulesParams = {
    uuid?: string;
  };

  type deleteVisualParams = {
    uuid: string;
  };

  type getAppDetailParams = {
    uuid: string;
  };

  type getCrontaskPageParams = {
    /** 当前页，从1开始 */
    current: number;
    /** 每页个数 */
    size?: number;
  };

  type getCrontaskResultsPageParams = {
    /** 当前页，从1开始 */
    current: number;
    /** 每页个数 */
    size: number;
    /** 任务id */
    taskId?: number;
  };

  type getCrontaskStartParams = {
    /** 任务id */
    id: number;
  };

  type getCrontaskStopParams = {
    /** 任务id */
    id?: number;
  };

  type getCrontaskTerminateRunningTaskParams = {
    /** 当前页，从1开始 */
    current: number;
    /** 每页个数 */
    size: number;
    /** 任务id */
    taskId?: number;
  };

  type getDataCenterSchemaDefineParams = {
    uuid: string;
  };

  type getDataCenterSchemaDetailParams = {
    uuid: string;
  };

  type getDevicesByDeviceParams = {
    deviceId: string;
  };

  type getDevicesDetailParams = {
    uuid: string;
  };

  type getGoodsDetailParams = {
    uuid: string;
  };

  type getGroupDetailParams = {
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

  type getRulesByInendParams = {
    inendId: string;
  };

  type getRulesDetailParams = {
    uuid?: string;
  };

  type getRulesParams = {
    uuid?: string;
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

  type putVisualPublishParams = {
    uuid: string;
  };
}
