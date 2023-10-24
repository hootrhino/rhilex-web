import { getDataCenterSchemaDefine, postDataCenterDataQuery } from '@/services/rulex/shujuzhongxin';
import { CodeOutlined, PlayCircleOutlined, TableOutlined } from '@ant-design/icons';
import { useModel, useParams, useRequest } from '@umijs/max';
import { Button, Card, List, Space, Tree, Typography } from 'antd';
import type { DataNode } from 'antd/es/tree';
import { Resizable } from 're-resizable';
import { useEffect, useState } from 'react';

import { cn } from '@/utils/utils';
import dayjs from 'dayjs';
import './index.less';

import type { LogItem } from '@/models/useWebsocket';
import { ProTable } from '@ant-design/pro-components';

import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-mysql';
import 'ace-builds/src-noconflict/theme-xcode';
import 'ace-builds/webpack-resolver';

import AceEditor from 'react-ace';

export type Key = string | number;

const DataCenter = () => {
  const { uuid } = useParams();
  const { logs } = useModel('useWebsocket');

  const [height, setHeight] = useState<number>(500);
  const [logHeight, setLogHeight] = useState<number>(100);
  const [width, setWidth] = useState<number>(300);
  const [treeData, setData] = useState<DataNode[]>([]);
  const [code, setCode] = useState<string>('');
  const [columns, setColumns] = useState<any>([]);
  const [logData, setLogData] = useState<LogItem[]>([]);

  useEffect(() => {
    const formatData = logs?.filter((log) => log.topic === `datacenter/console/${uuid}`);
    setLogData(formatData);
  }, [logs]);

  // 获取结构
  const { run: getTreeData } = useRequest(() => getDataCenterSchemaDefine({ uuid: uuid || '' }), {
    onSuccess: (res) => {
      const formatData = [
        {
          title: res.uuid,
          key: res.uuid,
          icon: <TableOutlined />,
          children: [
            {
              title: 'Columns',
              key: 'columns',
              icon: <PlayCircleOutlined />,
              children: res?.columns?.map((col) => ({
                key: col.name,
                title: (
                  <div className="flex justify-between">
                    <div>
                      <span>{col.name}</span>
                      {col?.description && <span className="pl-[5px]">({col?.description})</span>}
                    </div>
                    <span className="text-[#ff79c6] italic text-[12px] pr-[10px]">{col.type}</span>
                  </div>
                ),
                selectable: false,
              })),
            },
          ],
        },
      ];
      setData(formatData as DataNode[]);
      setCode(`SELECT * FROM ${res?.uuid}`);
    },
  });

  // run
  const {
    run: getSheets,
    data: tableBody,
    refresh,
  } = useRequest(() => postDataCenterDataQuery({ uuid: uuid || '', query: code }), {
    manual: true,
    onSuccess: (res) => {
      const header = Object.keys(res?.[0]);

      const columns = header?.map((item) => ({
        title: item,
        dataIndex: item,
        render: (record: any) => (typeof record === 'boolean' ? record.toString() : record),
      }));
      setColumns(columns);
    },
  });

  useEffect(() => {
    if (uuid) {
      getTreeData();
    }
  }, [uuid]);

  return (
    <div className="w-full h-[840px] flex flex-col overflow-hidden">
      <div className="text-[20px] text-[#000000e0] font-semibold mb-[12px]">数据中心详情</div>
      <div className="flex justify-between w-full h-full min-h-[56px]">
        <Resizable
          size={{ height: '100%', width }}
          minWidth={1}
          maxWidth="100%"
          onResizeStop={(e, direction, ref, d) => {
            setWidth(width + d.width);
          }}
          enable={{
            right: true,
          }}
          className="flex justify-between"
        >
          <Card
            title="Table"
            className={cn('w-full h-full overflow-y-auto', 'data-center-scrollbar')}
            bodyStyle={{ height: 'calc(100% - 56px)', padding: '6px 0 0 0', overflowY: 'auto' }}
          >
            <Tree
              showLine
              showIcon
              blockNode
              expandedKeys={[uuid as Key, 'columns']}
              switcherIcon={null}
              treeData={treeData}
              className="h-full"
            />
          </Card>
        </Resizable>
        <Card
          extra={
            <Button type="primary" icon={<PlayCircleOutlined />} onClick={() => getSheets()}>
              Run
            </Button>
          }
          title="查询编辑器"
          className="w-full h-full min-w-[1px] ml-[12px]"
          bodyStyle={{ height: 'calc(100% - 56px)', padding: '6px 0 0 0', overflowY: 'auto' }}
        >
          <AceEditor
            value={code}
            onChange={(value) => setCode(value)}
            mode="mysql"
            theme="xcode"
            editorProps={{ $blockScrolling: true }}
            width="100%"
            height="100%"
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
        </Card>
      </div>

      <Resizable
        size={{ height, width: '100%' }}
        onResizeStop={(e, direction, ref, d) => {
          setHeight(height + d.height);
        }}
        minHeight={56}
        maxHeight="100%"
        enable={{
          top: true,
          bottom: true,
        }}
        className="mt-[12px]"
      >
        <Card title="Sheet" className="h-full">
          {tableBody && tableBody?.length > 0 && (
            <ProTable
              search={false}
              dataSource={tableBody as any}
              columns={columns}
              className="data-center-sheets"
              tableClassName={cn('data-center-scrollbar')}
              // scroll={{ y: scrollY }}
              pagination={false}
              options={{ density: true, setting: true, reload: () => refresh() }}
            />
          )}
        </Card>
      </Resizable>
      <Resizable
        size={{ height: logHeight, width: '100%' }}
        onResizeStop={(e, direction, ref, d) => {
          setLogHeight(logHeight + d.height);
        }}
        minHeight={56}
        maxHeight="100%"
        enable={{
          top: true,
        }}
        className="mt-[12px]"
      >
        <Card
          title={
            <Space>
              <CodeOutlined />
              <span>日志</span>
            </Space>
          }
          className="h-full"
        >
          <List
            header={false}
            footer={false}
            dataSource={logData}
            renderItem={(item) => (
              <List.Item>
                <Typography.Text mark>
                  [{dayjs(item?.time).format('YYYY-MM-DD HH:mm:ss')}]
                </Typography.Text>
                <span className="truncate">{item?.msg}</span>
              </List.Item>
            )}
          />
          {/* {logData?.map((item) => (
            <div
              key={item.ts}
              className="flex justify-start items-center text-[#bbb] h-[40px]"
              style={{ borderBottom: '1px solid #21222c' }}
            >
              <span className="pr-[10px]">[{dayjs(item?.time).format('YYYY-MM-DD HH:mm:ss')}]</span>
              <span className="truncate">{item?.msg}</span>
            </div>
          ))} */}
        </Card>
      </Resizable>
    </div>
  );
};

export default DataCenter;
