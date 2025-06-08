import type { BaseDataSheetProps } from '@/components/DataSheet/typings';
import NoFoundPage from '@/pages/404';
import React from 'react';
import { DeviceType } from '../enum';

// Import DataSheet components
const DataSheetComponents = {
  [DeviceType.GENERIC_SNMP]: React.lazy(() => import('./Snmp')),
  [DeviceType.SIEMENS_PLC]: React.lazy(() => import('./Plc')),
  [DeviceType.GENERIC_MODBUS_MASTER]: React.lazy(() => import('./ModbusMaster')),
  [DeviceType.GENERIC_MBUS_EN13433_MASTER]: React.lazy(() => import('./MbusMaster')),
  [DeviceType.GENERIC_BACNET_IP]: React.lazy(() => import('./BacnetIP')),
  [DeviceType.BACNET_ROUTER_GW]: React.lazy(() => import('./BacnetRouter')),
  [DeviceType.DLT6452007_MASTER]: React.lazy(() => import('./DLT6452007Master')),
  [DeviceType.CJT1882004_MASTER]: React.lazy(() => import('./CJT1882004Master')),
  [DeviceType.SZY2062016_MASTER]: React.lazy(() => import('./SZY2062016Master')),
  [DeviceType.GENERIC_USER_PROTOCOL]: React.lazy(() => import('./UserProtocol')),
};

const DataPoints = ({ isDetail }: BaseDataSheetProps) => {
  const type = localStorage.getItem('deviceType');

  if (!type) {
    return <NoFoundPage />;
  }

  const DataSheetComponent = DataSheetComponents[type];

  if (!DataSheetComponent) {
    return <NoFoundPage />;
  }

  return <DataSheetComponent isDetail={isDetail} />;
};

export default React.memo(DataPoints);
