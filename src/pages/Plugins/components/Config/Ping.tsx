import { validateIPv4 } from '@/utils/utils';
import { ProForm } from '@ant-design/pro-components';
import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-sh';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/webpack-resolver';
import { Button, Input } from 'antd';
import { useState } from 'react';
import AceEditor from 'react-ace';

type PingProps = {
  loading: boolean;
  onLoading: (value: boolean) => void;
  onSearch: (value: string) => void;
};

const Ping = ({ loading, onLoading, onSearch }: PingProps) => {
  const [disabled, setDisabled] = useState<boolean>(true);

  return (
    <>
      <ProForm.Item
        name="ip"
        label="地址"
        rules={[
          () => ({
            validator(_, value) {
              if (!value) {
                setDisabled(true);
                return Promise.resolve();
              } else {
                try {
                  if (!validateIPv4(value)) {
                    return Promise.reject(new Error('IP格式不正确，请检查'));
                  } else {
                    setDisabled(false);
                    return Promise.resolve();
                  }
                } catch (error) {
                  return Promise.reject(new Error('IP格式不正确，请检查'));
                }
              }
            },
          }),
        ]}
      >
        <Input.Search
          placeholder="请输入地址"
          enterButton={
            <Button type="primary" disabled={disabled} loading={loading}>
              测试
            </Button>
          }
          size="large"
          onSearch={(value: string) => {
            onLoading(true);
            onSearch(value);
          }}
          onChange={(e) => {
            if (!e.target.value) {
              console.log(e.target.value);
            }
          }}
        />
      </ProForm.Item>
      <ProForm.Item name="output" label="输出">
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

export default Ping;
