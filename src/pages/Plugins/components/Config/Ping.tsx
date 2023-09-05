import { ProForm } from '@ant-design/pro-components';
import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-sh';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/webpack-resolver';
import { Input } from 'antd';
import AceEditor from 'react-ace';

type PingProps = {
  loading: boolean;
  onLoading: (value: boolean) => void;
  onSearch: (value: string) => void;
};

const Ping = ({ loading, onLoading, onSearch }: PingProps) => {
  return (
    <>
      <ProForm.Item name="ip" label="地址">
        <Input.Search
          placeholder="请输入地址"
          allowClear
          enterButton="测试"
          size="large"
          onSearch={(value: string) => {
            onLoading(true);
            onSearch(value);
          }}
          loading={loading}
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
