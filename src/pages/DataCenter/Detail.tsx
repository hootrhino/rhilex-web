import { getDataCenterSchemaDefine, postDataCenterDataQuery } from '@/services/rulex/shujuzhongxin';
import { CodeOutlined, PlayCircleOutlined, TableOutlined } from '@ant-design/icons';
import { useModel, useParams, useRequest } from '@umijs/max';
import { Button, Card, List, Space, Tree, Typography } from 'antd';
import type { DataNode } from 'antd/es/tree';
import { Resizable } from 're-resizable';
import { useEffect, useState } from 'react';

import { cn } from '@/utils/utils';
import dayjs from 'dayjs';

import type { LogItem } from '@/models/useWebsocket';
import { ProTable } from '@ant-design/pro-components';
import CodeEditor from '@/components/CodeEditor';

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
    data: sheetData,
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
              expandedKeys={[uuid as React.Key, 'columns']}
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
          <CodeEditor mode='sql' theme='light'  value={code} onChange={(value) => setCode(value)} height="100%"/>
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
          {sheetData && sheetData?.length > 0 && (
            <ProTable
              search={false}
              dataSource={sheetData as any}
              columns={columns}
              className="data-center-sheets"
              tableClassName={cn('data-center-scrollbar')}
              scroll={{ y: height - 220, x: columns?.length > 10 ? 2000 : false }}
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
          bodyStyle={{ padding: '0 24px 24px 24px' }}
        >
          <List
            header={false}
            footer={false}
            dataSource={logData}
            size="small"
            style={{ maxHeight: logHeight - 56, overflowY: 'auto' }}
            renderItem={(item) => (
              <List.Item>
                <Typography.Text mark>
                  [{dayjs(item?.time).format('YYYY-MM-DD HH:mm:ss')}]
                </Typography.Text>
                <span className="truncate">{item?.msg}</span>
              </List.Item>
            )}
          />
        </Card>
      </Resizable>
    </div>
  );
};

export default DataCenter;
