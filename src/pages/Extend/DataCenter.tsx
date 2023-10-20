import { getDataCenterSchemaDefine, postDataCenterDataQuery } from '@/services/rulex/shujuzhongxin';
import { PlayCircleOutlined, TableOutlined } from '@ant-design/icons';
import { useParams, useRequest } from '@umijs/max';
import { Button } from 'antd';
import type { DataNode } from 'antd/es/tree';
import { Resizable } from 're-resizable';
import { useEffect, useState } from 'react';
import SQLEditor from './components/SQLEditor';

import { cn } from '@/utils/utils';
import Logs from './components/Logs';
import Sheets from './components/Sheets';
import TreeTable from './components/TreeTable';
import './index.less';

export type Key = string | number;

const DataCenter = () => {
  const { id: uuid } = useParams();

  const [height, setHeight] = useState<number>(600);
  const [width, setWidth] = useState<number>(300);
  const [treeData, setData] = useState<DataNode[]>([]);
  const [code, setCode] = useState<string>('');
  const [tableHeader, setHeader] = useState<any>([]);
  const [logCollapse, setCollapse] = useState<boolean>(true);
  const [logHeight, setLogHeight] = useState<number>(100);
  const [scrollY, setScrollY] = useState<number>(330);

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
      setHeader(columns);
    },
  });

  useEffect(() => {
    if (uuid) {
      getTreeData();
    }
  }, [uuid]);

  useEffect(() => {
    if (logCollapse) {
      setScrollY(height - 270);

      if (height < 100) {
        setLogHeight(height);
      } else {
        setLogHeight(100);
      }
    } else {
      if (height < 350) {
        setLogHeight(height);
      } else if (height < 500) {
        setScrollY(height - 100);
      } else {
        setLogHeight(350);
        setScrollY(height - 350 - 180);
      }
    }
  }, [height, logCollapse]);

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
          <div
            className={cn(
              'header-outline',
              'text-[#F8F8F2] bg-[#21222C] w-full h-[40px] leading-[40px]',
            )}
          >
            <span className="px-[12px]">Table</span>
          </div>
          <div
            className={cn('w-full h-[calc(100%-40px)] overflow-y-auto', 'data-center-scrollbar')}
          >
            <TreeTable treeData={treeData} expandedKeys={[uuid as Key, 'columns']} />
          </div>
        </Resizable>
        <div className="bg-[#282A36] w-full h-full min-w-[1px]">
          <div
            className={cn(
              'header-outline',
              'text-[#F8F8F2] bg-[#21222C] w-full h-[40px] flex justify-start items-center',
            )}
          >
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
        minHeight={10}
        maxHeight="100%"
        className="flex flex-col bg-[#282A36] relative"
      >
        <div
          className={cn(
            'header-outline',
            'text-[#F8F8F2] bg-[#21222C] w-full h-[40px] leading-[40px]',
          )}
        >
          <span className="px-[12px]">Sheet</span>
        </div>
        <Sheets columns={tableHeader} dataSource={tableBody} reload={refresh} scrollY={scrollY} />
        <Logs
          collapse={logCollapse}
          onChange={() => setCollapse(!logCollapse)}
          logHeight={logHeight}
        />
      </Resizable>
    </div>
  );
};

export default DataCenter;
