import { postPluginService } from '@/services/rulex/chajianguanli';
import { getUarts } from '@/services/rulex/xitongshuju';
import type { ModalFormProps, ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProForm, ProFormDigit, ProFormSelect } from '@ant-design/pro-components';
import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-sh';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/webpack-resolver';
import { AutoComplete, Button, Input, Space } from 'antd';
import { useRef, useState } from 'react';
import AceEditor from 'react-ace';
import { useModel, useRequest } from 'umi';

type DebugProps = ModalFormProps & {
  uuid: string;
  type: 'PING' | 'SCANNER';
  onClose?: () => void;
};

const ConfigModal = ({ uuid, type, onClose, ...props }: DebugProps) => {
  const formRef = useRef<ProFormInstance>();
  const { logs } = useModel('useWebsocket');
  const [loading, setLoading] = useState<boolean>(false);

  // 获取串口配置
  const { data: uartOptions } = useRequest(() => getUarts(), {
    formatResult: (res) => res?.data?.map((item: string) => ({ value: item })),
  });

  // 测速
  const { run } = useRequest((values) => postPluginService(values), {
    manual: true,
    onSuccess: () => {
      const filterLogs = logs
        ?.filter((log) => log?.topic === `plugin/ICMPSenderPing/${uuid}`)
        ?.map((item) => item?.msg);
      formRef.current?.setFieldsValue({
        output: filterLogs?.length > 0 ? filterLogs?.join('\n') : '',
      });
      setLoading(false);
    },
  });

  // 开始扫描
  const onStart = () => {};

  // 停止扫描
  const onStop = () => {
    console.log(formRef.current?.getFieldsValue());
  };

  const renderSubmitter = () => {
    if (type === 'PING') {
      return [
        <Button key="close" onClick={onClose} type="primary">
          关闭
        </Button>,
      ];
    } else {
      return (
        <Space>
          <Button key="start" onClick={onStart} type="primary">
            开始扫描
          </Button>
          <Button key="stop" onClick={onStop}>
            停止扫描
          </Button>
        </Space>
      );
    }
  };

  return (
    <ModalForm
      formRef={formRef}
      title={type === 'PING' ? '网络测速' : 'Modbus 扫描仪'}
      submitter={{
        render: renderSubmitter,
      }}
      initialValues={{
        timeout: 3000,
        baudRate: '9600',
        dataBits: '8',
        stopBits: '1',
        parity: 'N',
        uart: 'COM1',
      }}
      {...props}
    >
      {type === 'PING' ? (
        <ProForm.Item name="ip" label="地址">
          <Input.Search
            placeholder="请输入地址"
            allowClear
            enterButton="测试"
            size="large"
            onSearch={(value: string) => {
              setLoading(true);
              formRef.current?.setFieldsValue({ output: `PING ${value}...` });
              setTimeout(() => {
                run({ uuid, name: 'ping', args: [value] });
              }, 2000);
            }}
            loading={loading}
          />
        </ProForm.Item>
      ) : (
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
        </>
      )}
      <ProForm.Item name="output" label={type === 'PING' ? '输出' : '扫描结果'}>
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
    </ModalForm>
  );
};

export default ConfigModal;
