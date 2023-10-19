import { getDataCenterSchemaDefine, postDataCenterDataQuery } from '@/services/rulex/shujuzhongxin';
import { PlayCircleOutlined, TableOutlined } from '@ant-design/icons';
import { useParams, useRequest } from '@umijs/max';
import { Button, ConfigProvider, Table, Tree } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { DataNode } from 'antd/es/tree';
import { Resizable } from 're-resizable';
import { useEffect, useState } from 'react';
import SQLEditor from './Editor';

import './index.less';

export type Key = string | number;

const DataCenter = () => {
  const { id: uuid } = useParams();

  const [height, setHeight] = useState<number>(500);
  const [width, setWidth] = useState<number>(300);
  const [treeData, setData] = useState<DataNode[]>([]);
  const [code, setCode] = useState<string>('');
  const [tableHeader, setHeader] = useState<ColumnsType<Record<string, any>>>([]);

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
                    <span>{col.name}</span>
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
  const { run: getSheets, data: tableBody } = useRequest(
    () => postDataCenterDataQuery({ uuid: uuid || '', query: code }),
    {
      manual: true,
      onSuccess: (res) => {
        const header = Object.keys(res?.[0]);

        const columns = header?.map((item) => ({
          title: item,
          dataIndex: item,
          render: (record: any) => (typeof record === 'boolean' ? record.toString() : record),
        }));
        setHeader(columns);
      },
    },
  );

  useEffect(() => {
    if (uuid) {
      getTreeData();
    }
  }, [uuid]);

  return (
    <div className="w-full h-[840px] flex flex-col overflow-hidden">
      <div className="flex justify-between w-full h-full min-h-[1px] bg-[#21222C]">
        <Resizable
          size={{ height: '100%', width }}
          minWidth={1}
          maxWidth="100%"
          onResizeStop={(e, direction, ref, d) => {
            setWidth(width + d.width);
          }}
          className="bg-[#282A36] mr-[10px]"
        >
          <div className="text-[#F8F8F2] bg-[#21222C] w-full h-[40px] leading-[40px]">
            <span className="px-[12px]">Table</span>
          </div>
          <div className="w-full h-[calc(100%-40px)]">
            <ConfigProvider
              theme={{
                components: {
                  Tree: {
                    nodeHoverBg: '#44475A',
                    nodeSelectedBg: '#282A36',
                  },
                },
              }}
            >
              <Tree
                showLine
                showIcon
                blockNode
                expandedKeys={[uuid as Key, 'columns']}
                switcherIcon={null}
                treeData={treeData}
                className="bg-[#282A36] text-[#F8F8F2]"
              />
            </ConfigProvider>
          </div>
        </Resizable>
        <div className="bg-[#282A36] w-full h-full min-w-[1px]">
          <div className="text-[#F8F8F2] bg-[#21222C] w-full h-[40px] flex justify-start items-center">
            <span className="px-[12px]">SQL</span>
            <Button
              size="small"
              type="primary"
              icon={<PlayCircleOutlined />}
              onClick={() => getSheets()}
            >
              Run
            </Button>
          </div>
          <SQLEditor value={code} onChange={(value) => setCode(value)} />
        </div>
      </div>

      <Resizable
        size={{ height, width: '100%' }}
        onResizeStop={(e, direction, ref, d) => {
          setHeight(height + d.height);
        }}
        minHeight={1}
        maxHeight="100%"
        className="flex flex-col bg-[#282A36]"
      >
        <div
          className="text-[#F8F8F2] bg-[#21222C] w-full h-[40px] leading-[40px]"
          style={{
            boxShadow: 'rgb(25, 26, 33) 0px 6px 6px -6px',
            borderBottom: '1px solid rgb(25, 26, 33)',
            zIndex: 5,
          }}
        >
          <span className="px-[12px]">Sheet</span>
        </div>
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: '#21222c',
                headerColor: '#f1fa8c',
                headerSplitColor: '#cac30f',
                borderColor: '#44475a',
              },
            },
          }}
        >
          {tableBody && tableBody?.length > 0 && (
            <Table
              size="small"
              columns={tableHeader}
              dataSource={tableBody as any}
              pagination={false}
              rootClassName="data-center-table"
            />
          )}
        </ConfigProvider>
      </Resizable>
    </div>
  );
};

export default DataCenter;
