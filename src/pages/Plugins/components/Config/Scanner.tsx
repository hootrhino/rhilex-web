import { getOsUarts } from '@/services/rulex/xitongshuju';
import { ProForm, ProFormDigit, ProFormSelect } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-sh';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/webpack-resolver';
import { AutoComplete } from 'antd';
import AceEditor from 'react-ace';

const Scanner = () => {
  // 获取串口配置
  const { data: uartOptions } = useRequest(() => getOsUarts(), {
    formatResult: (res) => res?.data?.map((item: string) => ({ value: item })),
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
          options={['4800', '9600', '115200']}
          placeholder="请选择波特率"
          rules={[{ required: true, message: '请选择波特率' }]}
        />
        <ProFormSelect
          label="数据位"
          name="dataBits"
          width="sm"
          options={['1', '2', '3', '4', '5', '6', '7', '8']}
          placeholder="请选择数据位"
          rules={[{ required: true, message: '请选择数据位' }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          label="奇偶校验"
          name="parity"
          width="sm"
          options={[
            { label: '奇校验', value: 'E' },
            { label: '偶校验', value: 'O' },
            { label: '不校验', value: 'N' },
          ]}
          placeholder="请选择奇偶校验"
          rules={[{ required: true, message: '请选择奇偶校验' }]}
        />
        <ProFormSelect
          label="停止位"
          name="stopBits"
          width="sm"
          options={['1', '1.5', '2']}
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
        <AceEditor
          mode="sh"
          theme="monokai"
          readOnly={true}
          editorProps={{ $blockScrolling: true }}
          width="100%"
          style={{ height: 200, fontFamily: 'monospace' }}
          fontSize={16}
          showPrintMargin={false}
          highlightActiveLine={true}
          enableSnippets={true}
          setOptions={{
            enableLiveAutocompletion: true,
            enableBasicAutocompletion: true,
            enableSnippets: true,
            tabSize: 2,
          }}
        />
      </ProForm.Item>
    </>
  );
};

export default Scanner;
