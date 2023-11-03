import CodeEditor from '@/components/CodeEditor';
import {
  baudRateEnum,
  dataBitsEnum,
  parityEnum,
  stopBitsEnum,
} from '@/pages/Devices/components/columns';
import { getOsUarts } from '@/services/rulex/xitongshuju';
import { ProForm, ProFormDigit, ProFormSelect } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { AutoComplete } from 'antd';

const Scanner = () => {
  // 获取串口配置
  const { data: uartOptions } = useRequest(() => getOsUarts(), {
    formatResult: (res) =>
      res?.data?.map((item) => ({
        value: item.port,
        label: item.alias,
      })),
  });

  return (
    <>
      <ProForm.Group>
        <ProFormDigit
          name="timeout"
          label="超时时间（毫秒）"
          width="sm"
          placeholder="请输入超时时间"
          rules={[{ required: true, message: '请输入超时时间' }]}
        />
        <ProFormSelect
          label="波特率"
          name="baudRate"
          width="sm"
          valueEnum={baudRateEnum}
          placeholder="请选择波特率"
          rules={[{ required: true, message: '请选择波特率' }]}
        />
        <ProFormSelect
          label="数据位"
          name="dataBits"
          width="sm"
          valueEnum={dataBitsEnum}
          placeholder="请选择数据位"
          rules={[{ required: true, message: '请选择数据位' }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          label="奇偶校验"
          name="parity"
          width="sm"
          valueEnum={parityEnum}
          placeholder="请选择奇偶校验"
          rules={[{ required: true, message: '请选择奇偶校验' }]}
        />
        <ProFormSelect
          label="停止位"
          name="stopBits"
          width="sm"
          valueEnum={stopBitsEnum}
          placeholder="请选择停止位"
          rules={[{ required: true, message: '请选择停止位' }]}
        />
        <ProForm.Item
          label="串口路径"
          name="uart"
          rules={[{ required: true, message: '请输入本地系统的串口路径' }]}
          className="w-[216px]"
        >
          <AutoComplete
            className="w-full"
            options={uartOptions}
            placeholder="请输入本地系统的串口路径"
          />
        </ProForm.Item>
      </ProForm.Group>
      <ProForm.Item name="output" label="扫描结果">
        <CodeEditor readOnly />
      </ProForm.Item>
    </>
  );
};

export default Scanner;
