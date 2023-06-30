declare namespace API {
  type deleteAppParams = {
    uuid: string;
  };

  type deleteDevicesParams = {
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

  type getAppDetailParams = {
    uuid: string;
  };

  type getDevicesDetailParams = {
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

  type getRulesDetailParams = {
    uuid?: string;
  };

  type getRulesParams = {
    uuid?: string;
  };

  type putAppStartParams = {
    uuid: string;
  };

  type putAppStopParams = {
    uuid: string;
  };

  type putLogsRemoteParams = {
    /** on:开启；off: 关闭 */
    action?: string;
  };

  type wangguanziyuan = {
    type: string;
    name: string;
    description: string;
    config: Record<string, any>;
  };
}
