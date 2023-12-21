import CodeEditor from '@/components/CodeEditor';
import { postRulesTestDevice } from '@/services/rulex/guizeguanli';
import { filterLogByTopic } from '@/utils/utils';
import type { ModalFormProps, ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProForm, ProList } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import { Button, Tag } from 'antd';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import { useModel } from 'umi';

type DebugProps = ModalFormProps & {
  uuid: string;
};

const Debug = ({ uuid, ...props }: DebugProps) => {
  const { deviceId } = useParams();
  const formRef = useRef<ProFormInstance>();
  const {
    topicData: { ruleTest },
  } = useModel('useWebsocket');
  const [showOutput, setShowOutput] = useState<boolean>(false);

  return (
    <ModalForm
      formRef={formRef}
      title="测试脚本"
      style={{ height: 500 }}
      modalProps={{
        maskClosable: false,
        onCancel: () => {
          setShowOutput(false);
          formRef.current?.resetFields();
        },
      }}
      submitter={{
        render: ({ reset, submit }) => {
          return [
            <Button
              key="reset"
              onClick={() => {
                reset();
                setShowOutput(false);
              }}
            >
              重置
            </Button>,
            <Button key="debug" type="primary" onClick={submit}>
              测试
            </Button>,
          ];
        },
      }}
      onFinish={async ({ testData }) => {
        try {
          if (deviceId) {
            await postRulesTestDevice({ testData, uuid: deviceId }).then(() => setShowOutput(true));
          }
          return false;
        } catch (error) {
          return false;
        }
      }}
      {...props}
    >
      <ProForm.Item
        name="testData"
        label="输入数据"
        rules={[{ required: true, message: '请输入数据' }]}
      >
        <CodeEditor autoFocus />
      </ProForm.Item>

      <ProForm.Item name="output" label="输出结果" className="h-[300px]">
        <ProList
          className="h-[250px] overflow-y-auto"
          rowKey={(record) => `testLog-${record.ts}-${Math.random()}`}
          dataSource={showOutput ? filterLogByTopic(ruleTest, `rule/log/${uuid}`) : []}
          metas={{
            title: {
              dataIndex: 'time',
              render: (_, row) => dayjs(row.time).format('YYYY-MM-DD hh:mm:ss'),
            },
            description: { dataIndex: 'msg' },
            subTitle: {
              dataIndex: 'level',
              render: (_, row) => <Tag color="blue">{row.level}</Tag>,
            },
          }}
        />
      </ProForm.Item>
    </ModalForm>
  );
};

export default Debug;
