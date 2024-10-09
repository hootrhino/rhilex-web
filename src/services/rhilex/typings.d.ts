declare namespace API {
  type CronTaskCreateDTO = {
    /** "param1 param2 param3" */
    args?: string;
    /** cron表达式，6个域，使用quartz标准 */
    cronExpr: string;
    /** ["A=e1", "B=e2", "C=e3"] */
    env?: string[];
    /** 定时任务名称 */
    name: string;
    /** base64编码的shell脚本，脚本不要加#!/bin/bash */
    script?: string;
    /** 目前仅支持LINUX_SHELL */
    taskType: string;
  };

  type CronTaskUpdateDTO = {
    /** "param1 param2 param3" */
    args?: string;
    /** cron表达式，6个域不支持年份，使用quartz标准 */
    cronExpr?: string;
    /** ["A=e1", "B=e2", "C=e3"] */
    env?: string[];
    name?: string;
    /** 脚本内容，base64编码 */
    script?: string;
    /** 1-shell 2-cmd */
    taskType?: string;
    uuid: string;
  };

  type deleteAppDelParams = {
    uuid: string;
  };

  type deleteCrontaskDelParams = {
    /** uuid */
    uuid: string;
  };

  type deleteDatacenterClearSchemaDataParams = {
    secret: string;
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

  type deleteInendsMqttClientsKickOutParams = {
    uuid?: string;
    clientId?: string;
  };

  type deleteOutendsDelParams = {
    uuid?: string;
  };

  type deleteRulesDelParams = {
    uuid: string;
  };

  type deleteSchemaDelParams = {
    uuid: string;
  };

  type deleteSchemaPropertiesDelParams = {
    uuid: string;
    schemaId: string;
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

  type getBacnetipDataSheetListParams = {
    device_uuid: string;
    current: number;
    size: number;
  };

  type getBacnetipDataSheetSheetExportParams = {
    device_uuid: string;
  };

  type getBacnetRouterSheetListParams = {
    device_uuid: string;
    current: number;
    size: number;
  };

  type getBacnetRouterSheetSheetExportParams = {
    device_uuid: string;
  };

  type getCrontaskResultsPageParams = {
    /** 当前页 */
    current?: string;
    /** 每页数量 */
    size?: string;
    /** 定时任务uuid，可选 */
    uuid?: string;
  };

  type getCrontaskStartParams = {
    /** 定时任务uuid */
    uuid: string;
  };

  type getCrontaskStopParams = {
    /** 定时任务uuid */
    uuid: string;
  };

  type getDatacenterExportDataParams = {
    secret: string;
    uuid: string;
  };

  type getDatacenterListSchemaDDLParams = {
    secret: string;
  };

  type getDatacenterQueryDataListParams = {
    secret: string;
    uuid: string;
    current: number;
    size: number;
    order: string;
    /** 用来筛选字段，web界面上全选，用户可以自己选择需要的字段 */
    select?: string;
  };

  type getDatacenterQueryLastDataParams = {
    secret: string;
    uuid: string;
    select?: string;
  };

  type getDatacenterSchemaDDLDefineParams = {
    uuid: string;
    secret: string;
  };

  type getDatacenterSchemaDDLDetailParams = {
    secret: string;
    uuid: string;
  };

  type getDatapointListParams = {
    device_uuid: string;
    /** 当前页 */
    current?: number;
    /** 每页数量 */
    size?: number;
  };

  type getDatapointSheetExportParams = {
    device_uuid: string;
  };

  type getDevicesDetailParams = {
    uuid: string;
  };

  type getDevicesDeviceErrMsgParams = {
    uuid: string;
  };

  type getDevicesListByGroupParams = {
    uuid: string;
    current?: number;
    size?: number;
  };

  type getDevicesListParams = {
    current?: number;
    size?: number;
  };

  type getDevicesPointErrMsgParams = {
    uuid: string;
  };

  type getDevicesPropertiesParams = {
    uuid: string;
    current?: number;
    size?: number;
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

  type getInendsClientsParams = {
    uuid: string;
    current?: number;
    size?: number;
  };

  type getInendsDetailParams = {
    uuid: string;
  };

  type getInendsMqttClientsParams = {
    uuid?: string;
    current?: number;
    size?: number;
  };

  type getJpegStreamDetailParams = {
    liveId: string;
  };

  type getMbusMasterSheetListParams = {
    device_uuid?: string;
    current?: number;
    size?: number;
  };

  type getMbusMasterSheetSheetExportParams = {
    device_uuid: string;
  };

  type getModbusMasterSheetListParams = {
    device_uuid?: string;
    current?: number;
    size?: number;
  };

  type getModbusMasterSheetSheetExportParams = {
    device_uuid: string;
  };

  type getModbusSlaverSheetListParams = {
    device_uuid?: string;
    current?: number;
    size?: number;
  };

  type getNotifyPageListParams = {
    current?: number;
    size?: number;
  };

  type getOutendsDetailParams = {
    uuid: string;
  };

  type getPlugwareDetailParams = {
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

  type getS1200DataSheetListParams = {
    device_uuid?: string;
    current?: number;
    size?: number;
    dataType?: string;
    dataOrder?: string;
  };

  type getS1200DataSheetSheetExportParams = {
    device_uuid: string;
  };

  type getSchemaDetailParams = {
    uuid: string;
  };

  type getSchemaPropertiesDetailParams = {
    uuid: string;
  };

  type getSchemaPropertiesListParams = {
    current?: number;
    size?: number;
    schema_uuid: string;
  };

  type getSettingsWifiParams = {
    iface: string;
  };

  type getSettingsWifiScanSignalParams = {
    iface: string;
  };

  type getSnmpOidsSheetListParams = {
    device_uuid?: string;
    current?: number;
    size?: number;
  };

  type getSnmpOidsSheetSheetExportParams = {
    device_uuid: string;
  };

  type getTransceiverDetailParams = {
    name: string;
  };

  type getUserluaDetailParams = {
    uuid: string;
  };

  type getUserluaListByGroupParams = {
    /** 分组ID */
    uuid: string;
  };

  type getUserluaSearchParams = {
    keyword: string;
  };

  type getVisualDetailParams = {
    uuid: string;
  };

  type getVisualListByGroupParams = {
    uuid: string;
  };

  type postSchemaFixParams = {
    uuid: string;
  };

  type postSchemaGenTemplateParams = {
    schemaId: string;
    templateId: string;
  };

  type postSchemaPublishParams = {
    uuid: string;
  };

  type putAppStartParams = {
    uuid: string;
  };

  type putAppStopParams = {
    uuid: string;
  };

  type putDevicesRestartParams = {
    uuid: string;
  };

  type putGoodsStartParams = {
    uuid: string;
  };

  type putGoodsStopParams = {
    uuid: string;
  };

  type putInendsRestartParams = {
    uuid: string;
  };

  type putLogsRemoteParams = {
    /** on:开启；off: 关闭 */
    action?: string;
  };

  type putNotifyReadParams = {
    uuid: string;
  };

  type putOutendsRestartParams = {
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
