import Select from '@/pages/Editor/components/Select';
import { cn, IconFont } from '@/utils/utils';
import { langs } from '@uiw/codemirror-extensions-langs';
import CodeMirror from '@uiw/react-codemirror';
import { useModel } from '@umijs/max';
import { ConfigProvider, Form, Space } from 'antd';
import Icon from '../../components/Icon';
import Tooltip from '../../components/Tooltip';
import { getNodeTitle } from '../../utils';

const DEFAULT_OPTION = [{ label: '静态数据', value: 'static' }];
const DataSource = () => {
  const { activeNodeShape } = useModel('useEditor');

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            labelColor: '#ADADAD',
            labelFontSize: 12,
          },
        },
      }}
    >
      <div className="pt-[10px] pb-[12px] pl-[32px] text-[14px] text-[#F7F7F7]">
        <span>{getNodeTitle(activeNodeShape)}</span>
        <Tooltip title="查看组件文档">
          <Icon type="doc" className="pl-[5px] text-[14px]" />
        </Tooltip>
      </div>
      <div
        className={cn(
          'editor-divider-t',
          'editor-divider-b',
          'text-[#F7F7F7] bg-[#242424] h-[32px] leading-[32px] mb-[20px]',
        )}
      >
        <Space align="center" className="px-[12px]">
          <IconFont type="icon-number1" />
          <span className="pr-[5px]">设置数据源</span>
          <IconFont type="icon-check-circle-fill" />
        </Space>
      </div>
      <div className="bg-[#0f0f0f] m-[12px]">
        <Form layout="vertical" initialValues={{ type: 'static', code: '' }} className="p-[12px]">
          <Form.Item label="数据源类型" name="type" className="mb-[12px]">
            <Select options={DEFAULT_OPTION} />
          </Form.Item>
          <Form.Item label="可视化编辑" name="code">
            <CodeMirror height="400px" theme="dark" extensions={[langs.json()]} />
          </Form.Item>
        </Form>
      </div>
    </ConfigProvider>
  );
};

export default DataSource;
