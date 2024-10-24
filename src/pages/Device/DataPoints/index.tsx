import type { BaseDataSheetProps } from '@/components/DataSheet/typings';
import NoFoundPage from '@/pages/404';
import { DeviceType } from '../enum';
import BacnetDataSheet from './BacnetIP';
import BacnetRouterDataSheet from './BacnetRouter';
import CJTDataSheet from './CJT1882004Master';
import DLTDataSheet from './DLT6452007Master';
import MbusMasterDataSheet from './MbusMaster';
import ModbusMasterDataSheet from './ModbusMaster';
import PlcDataSheet from './Plc';
import SnmpOidsSheet from './Snmp';
import SZYDataSheet from './SZY2062016Master';
import UserProtocolDataSheet from './UserProtocol';

const DataPoints = ({ uuid }: BaseDataSheetProps) => {
  const type = localStorage.getItem('deviceType');

  if (!type) {
    return <NoFoundPage />;
  }

  const dataSheetConfig = {
    [DeviceType.GENERIC_SNMP]: <SnmpOidsSheet uuid={uuid} />,
    [DeviceType.SIEMENS_PLC]: <PlcDataSheet uuid={uuid} />,
    [DeviceType.GENERIC_MODBUS_MASTER]: <ModbusMasterDataSheet uuid={uuid} />,
    [DeviceType.GENERIC_MBUS_EN13433_MASTER]: <MbusMasterDataSheet uuid={uuid} />,
    [DeviceType.GENERIC_BACNET_IP]: <BacnetDataSheet uuid={uuid} />,
    [DeviceType.BACNET_ROUTER_GW]: <BacnetRouterDataSheet uuid={uuid} />,
    [DeviceType.DLT6452007_MASTER]: <DLTDataSheet uuid={uuid} />,
    [DeviceType.CJT1882004_MASTER]: <CJTDataSheet uuid={uuid} />,
    [DeviceType.SZY2062016_MASTER]: <SZYDataSheet uuid={uuid} />,
    [DeviceType.GENERIC_USER_PROTOCOL]: <UserProtocolDataSheet uuid={uuid} />,
  };

  return dataSheetConfig[type];
};

export default DataPoints;
