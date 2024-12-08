declare namespace API {
  type deleteAlarmLogDelParams = {
    uuid: string;
  };

  type deleteAlarmRuleDelParams = {
    uuid: string;
  };

  type deleteAppDelParams = {
    uuid: string;
  };

  type deleteCecollasDelParams = {
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

  type getAlarmLogDetailParams = {
    uuid: string;
  };

  type getAlarmLogListParams = {
    current: number;
    size: number;
    ruleId: string;
  };

  type getAlarmRuleDetailParams = {
    uuid: string;
  };

  type getAlarmRuleListParams = {
    current: number;
    size: number;
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

  type getCecollasCecollaErrMsgParams = {
    uuid: string;
  };

  type getCecollasCecollaSchemaParams = {
    uuid: string;
  };

  type getCecollasDetailParams = {
    uuid: string;
  };

  type getCecollasListByGroupParams = {
    current?: number;
    size?: number;
    gid: string;
  };

  type getCjt1882004MasterSheetListParams = {
    device_uuid?: string;
    current?: number;
    size?: number;
  };

  type getCjt1882004MasterSheetSheetExportParams = {
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

  type getDlt6452007MasterSheetListParams = {
    device_uuid?: string;
    current?: number;
    size?: number;
  };

  type getDlt6452007MasterSheetSheetExportParams = {
    device_uuid: string;
  };

  type getGoodsDetailParams = {
    uuid: string;
  };

  type getGroupDetailParams = {
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

  type getInendsInendErrMsgParams = {
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

  type getMn4gInfoParams = {
    iface: string;
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

  type getOutendsOutendErrMsgParams = {
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

  type getSettingsEthParams = {
    iface: string;
  };

  type getSettingsEthsParams = {
    iface: string;
  };

  type getSettingsWifiParams = {
    iface: string;
  };

  type getSettingsWifiScanSignalParams = {
    iface: string;
  };

  type getSettingsWifisParams = {
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

  type getSzy2062016MasterSheetListParams = {
    device_uuid?: string;
    current?: number;
    size?: number;
  };

  type getSzy2062016MasterSheetSheetExportParams = {
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

  type getUserProtocolSheetListParams = {
    device_uuid?: string;
    current?: number;
    size?: number;
  };

  type getUserProtocolSheetSheetExportParams = {
    device_uuid: string;
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

  type putCecollasRestartParams = {
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

  type R = {
    code: number;
    data?: string;
    msg: string;
  };
}
