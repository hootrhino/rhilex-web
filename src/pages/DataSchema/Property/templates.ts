/**
 * 属性模板 ID
 */
export enum Template {
  TEMP_HUMIDITY = 'tempHumidity',
  SWITCH_STATUS = 'switchStatus',
  WATER_QUALITY = 'waterQuality',
  AIR_QUALITY = 'airQuality',
  MOTION_SENSOR = 'motionSensor',
  SMART_METER = 'smartMeter',
  SOIL_MOISTURE = 'soilMoisture',
  GPS_TRACKER = 'gpsTracker',
  SMOKE_DETECTOR = 'smokeDetector',
  SMART_LOCK = 'smartLock',
  SIX_AXIS_ACCELEROMETER = 'sixAxisAccelerometer',
}

/**
 * 属性模板参数
 */
export const templates = {
  [Template.TEMP_HUMIDITY]: [
    { name: 'device_id', type: 'VARCHAR(50)', comment: '设备唯一标识符' },
    { name: 'temperature', type: 'DECIMAL(5,2)', comment: '温度值，精确到小数点后两位' },
    { name: 'humidity', type: 'DECIMAL(5,2)', comment: '湿度值，精确到小数点后两位' },
    { name: 'battery_level', type: 'INT', comment: '电池电量百分比' },
  ],
  [Template.SWITCH_STATUS]: [
    { name: 'device_id', type: 'VARCHAR(50)', comment: '设备唯一标识符' },
    { name: 'status', type: 'BOOLEAN', comment: '开关状态：true 为开，false 为关' },
    { name: 'last_changed', type: 'TIMESTAMP', comment: '最后一次状态改变的时间' },
    { name: 'changed_by', type: 'VARCHAR(50)', comment: '触发状态改变的用户或系统标识' },
  ],
  [Template.WATER_QUALITY]: [
    { name: 'device_id', type: 'VARCHAR(50)', comment: '设备唯一标识符' },
    { name: 'ph_level', type: 'DECIMAL(4,2)', comment: 'pH 值，范围通常在 0-14 之间' },
    { name: 'turbidity', type: 'DECIMAL(7,2)', comment: '浊度，单位可能是 NTU' },
    { name: 'dissolved_oxygen', type: 'DECIMAL(5,2)', comment: '溶解氧含量，单位 mg/L' },
    { name: 'conductivity', type: 'DECIMAL(7,2)', comment: '电导率，单位可能是 μS/cm' },
    { name: 'temperature', type: 'DECIMAL(5,2)', comment: '水温，单位摄氏度' },
  ],
  [Template.AIR_QUALITY]: [
    { name: 'device_id', type: 'VARCHAR(50)', comment: '设备唯一标识符' },
    { name: 'pm25', type: 'DECIMAL(5,2)', comment: 'PM2.5 浓度，单位 μg/m³' },
    { name: 'pm10', type: 'DECIMAL(5,2)', comment: 'PM10 浓度，单位 μg/m³' },
    { name: 'co2', type: 'INT', comment: 'CO2 浓度，单位 ppm' },
    { name: 'tvoc', type: 'DECIMAL(5,2)', comment: '总挥发性有机化合物，单位 ppb' },
    { name: 'temperature', type: 'DECIMAL(5,2)', comment: '温度，单位摄氏度' },
    { name: 'humidity', type: 'DECIMAL(5,2)', comment: '湿度，百分比' },
  ],
  [Template.MOTION_SENSOR]: [
    { name: 'device_id', type: 'VARCHAR(50)', comment: '设备唯一标识符' },
    { name: 'motion_detected', type: 'BOOLEAN', comment: '是否检测到运动' },
    { name: 'intensity', type: 'INT', comment: '运动强度，可选' },
    { name: 'battery_level', type: 'INT', comment: '电池电量百分比' },
  ],
  [Template.SMART_METER]: [
    { name: 'device_id', type: 'VARCHAR(50)', comment: '设备唯一标识符' },
    { name: 'energy_consumption', type: 'DECIMAL(10,3)', comment: '能源消耗，单位 kWh' },
    { name: 'current', type: 'DECIMAL(7,2)', comment: '电流，单位 A' },
    { name: 'voltage', type: 'DECIMAL(7,2)', comment: '电压，单位 V' },
    { name: 'power_factor', type: 'DECIMAL(4,3)', comment: '功率因数' },
  ],
  [Template.SOIL_MOISTURE]: [
    { name: 'device_id', type: 'VARCHAR(50)', comment: '设备唯一标识符' },
    { name: 'moisture_level', type: 'DECIMAL(5,2)', comment: '土壤湿度水平，百分比' },
    { name: 'temperature', type: 'DECIMAL(5,2)', comment: '土壤温度，单位摄氏度' },
    { name: 'ec', type: 'DECIMAL(7,2)', comment: '土壤电导率，单位 mS/cm' },
    { name: 'ph', type: 'DECIMAL(4,2)', comment: '土壤 pH 值' },
    { name: 'battery_level', type: 'INT', comment: '电池电量百分比' },
  ],
  [Template.GPS_TRACKER]: [
    { name: 'device_id', type: 'VARCHAR(50)', comment: '设备唯一标识符' },
    { name: 'latitude', type: 'DECIMAL(10,8)', comment: '纬度' },
    { name: 'longitude', type: 'DECIMAL(11,8)', comment: '经度' },
    { name: 'altitude', type: 'DECIMAL(7,2)', comment: '海拔，单位米' },
    { name: 'speed', type: 'DECIMAL(5,2)', comment: '速度，单位 km/h' },
    { name: 'battery_level', type: 'INT', comment: '电池电量百分比' },
  ],
  [Template.SMOKE_DETECTOR]: [
    { name: 'device_id', type: 'VARCHAR(50)', comment: '设备唯一标识符' },
    { name: 'smoke_detected', type: 'BOOLEAN', comment: '是否检测到烟雾' },
    { name: 'co_level', type: 'DECIMAL(5,2)', comment: '一氧化碳水平，单位 ppm' },
    { name: 'battery_level', type: 'INT', comment: '电池电量百分比' },
    { name: 'last_tested', type: 'TIMESTAMP', comment: '上次测试时间' },
  ],
  [Template.SMART_LOCK]: [
    { name: 'device_id', type: 'VARCHAR(50)', comment: '设备唯一标识符' },
    { name: 'lock_status', type: 'BOOLEAN', comment: '锁状态：true 为锁定，false 为解锁' },
    { name: 'access_method', type: 'VARCHAR(20)', comment: '访问方法：PIN、指纹、NFC 等' },
    { name: 'user_id', type: 'VARCHAR(50)', comment: '操作用户 ID' },
    { name: 'battery_level', type: 'INT', comment: '电池电量百分比' },
  ],
  [Template.SIX_AXIS_ACCELEROMETER]: [
    { name: 'device_id', type: 'VARCHAR(50)', comment: '设备唯一标识符' },
    { name: 'accel_x', type: 'DECIMAL(8,6)', comment: 'X 轴加速度，单位 g' },
    { name: 'accel_y', type: 'DECIMAL(8,6)', comment: 'Y 轴加速度，单位 g' },
    { name: 'accel_z', type: 'DECIMAL(8,6)', comment: 'Z 轴加速度，单位 g' },
    { name: 'gyro_x', type: 'DECIMAL(8,6)', comment: 'X 轴角速度，单位 deg/s' },
    { name: 'gyro_y', type: 'DECIMAL(8,6)', comment: 'Y 轴角速度，单位 deg/s' },
    { name: 'gyro_z', type: 'DECIMAL(8,6)', comment: 'Z 轴角速度，单位 deg/s' },
    { name: 'temperature', type: 'DECIMAL(5,2)', comment: '传感器温度，单位摄氏度' },
    { name: 'battery_level', type: 'INT', comment: '电池电量百分比' },
  ],
};
