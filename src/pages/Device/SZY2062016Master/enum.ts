import { getIntl, getLocale } from '@umijs/max';

const { formatMessage } = getIntl(getLocale());

export enum MeterType {
  FCCommand = '0',
  FCRainfall = '1',
  FCWaterLevel = '2',
  FCFlowRate = '3',
  FCFlowSpeed = '4',
  FCGatePosition = '5',
  FCPower = '6',
  FCAirPressure = '7',
  FCWindSpeed = '8',
  FCWaterTemperature = '9',
  FCWaterQuality = '10',
  FCSoilMoisture = '11',
  FCEvaporation = '12',
  FCAlarmStatus = '13',
  FCComprehensive = '14',
  FCWaterPressure = '15',
}

export const meterTypeOptions = {
  [MeterType.FCCommand]: formatMessage({ id: 'device.meterType.command' }),
  [MeterType.FCRainfall]: formatMessage({ id: 'device.meterType.rainfall' }),
  [MeterType.FCWaterLevel]: formatMessage({ id: 'device.meterType.waterLevel' }),
  [MeterType.FCFlowRate]: formatMessage({ id: 'device.meterType.flowRate' }),
  [MeterType.FCFlowSpeed]: formatMessage({ id: 'device.meterType.flowSpeed' }),
  [MeterType.FCGatePosition]: formatMessage({ id: 'device.meterType.gatePosition' }),
  [MeterType.FCPower]: formatMessage({ id: 'device.meterType.power' }),
  [MeterType.FCAirPressure]: formatMessage({ id: 'device.meterType.airPressure' }),
  [MeterType.FCWindSpeed]: formatMessage({ id: 'device.meterType.windSpeed' }),
  [MeterType.FCWaterTemperature]: formatMessage({ id: 'device.meterType.waterTemp' }),
  [MeterType.FCWaterQuality]: formatMessage({ id: 'device.meterType.waterQuality' }),
  [MeterType.FCSoilMoisture]: formatMessage({ id: 'device.meterType.soilMoisture' }),
  [MeterType.FCEvaporation]: formatMessage({ id: 'device.meterType.evaporation' }),
  [MeterType.FCAlarmStatus]: formatMessage({ id: 'device.meterType.alarmStatus' }),
  [MeterType.FCComprehensive]: formatMessage({ id: 'device.meterType.comprehensive' }),
  [MeterType.FCWaterPressure]: formatMessage({ id: 'device.meterType.waterPressure' }),
};
