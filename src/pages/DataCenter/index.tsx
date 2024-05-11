import PageContainer from '@/components/PageContainer';
import { message, modal } from '@/components/PopupHack';
import {
  deleteDatacenterClearSchemaData,
  getDatacenterListSchemaDdl,
  getDatacenterQueryDataList,
  getDatacenterSchemaDdlDefine,
  getDatacenterSchemaDdlDetail,
} from '@/services/rulex/shujuzhongxin';
import { toPascalCase } from '@/utils/utils';
import { DeleteOutlined, DownloadOutlined, TableOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-components';
import { ProCard, ProTable } from '@ant-design/pro-components';
import { useIntl, useRequest } from '@umijs/max';
import type { TreeDataNode } from 'antd';
import { Button, Empty, Space, Tooltip, Tree } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';

type SchemaDDLDefineItem = {
  name: string;
  type: string;
  [key: string]: any;
};

const getChildName = ({ name, type }: SchemaDDLDefineItem) => {
  return (
    <Space>
      <span>{name}</span>
      <span className="text-[10px] text-[#51A14F] italic">{type}</span>
    </Space>
  );
};

const DataCenter = () => {
  const { formatMessage } = useIntl();
  const actionRef = useRef<ActionType>();
  const [selectedKey, setSelectedKey] = useState<string>();
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);

  // 获取数据表列表
  useRequest(() => getDatacenterListSchemaDdl(), {
    onSuccess: (data) => {
      const formatData = data?.map((item) => ({
        title: item.published ? (
          item.name
        ) : (
          <Tooltip title={formatMessage({ id: 'dataCenter.tooltip.unpublish' })}>
            {item.name}
          </Tooltip>
        ),
        key: item.uuid || '',
        disabled: !item.published,
        icon: <TableOutlined />,
        children: [],
      }));
      const publishedData = data?.filter((item) => item.published);
      setTreeData(formatData);
      setSelectedKey(publishedData?.[0]?.uuid);
      setExpandedKeys(publishedData?.[0]?.uuid ? [publishedData?.[0]?.uuid] : []);
    },
  });

  // 获取数据字段定义
  const { run: getSchemaDdlDefine } = useRequest(
    (params: API.getDatacenterSchemaDDLDefineParams) => getDatacenterSchemaDdlDefine(params),
    {
      manual: true,
      onSuccess: (data) => {
        const newTreeData = treeData?.map((tree) => {
          if (tree?.key === selectedKey) {
            return {
              ...tree,
              children: data?.map((d) => ({
                title: getChildName(d),
                key: d.name,
                isLeaf: true,
                selectable: false,
              })),
            };
          }
          return tree;
        });
        setTreeData(newTreeData);
      },
    },
  );

  // 获取表头
  const { run: getColumns, data: columns } = useRequest(
    (params: API.getDatacenterSchemaDDLDetailParams) => getDatacenterSchemaDdlDetail(params),
    {
      manual: true,
      formatResult: (res) =>
        res?.data?.map((item) => ({
          title: toPascalCase(item?.name),
          dataIndex: item?.name,
          render: (_dom: React.ReactNode, record: Record<string, any>) => {
            if (item?.unit) {
              return (
                <div className="flex items-center">
                  <span>{record[item.name]}</span>
                  <span className="text-[12px] opacity-[.8] pl-[4px] font-normal">{item.unit}</span>
                </div>
              );
            } else {
              return item.name === 'create_at'
                ? dayjs(record['create_at']).format('YYYY-MM-DD HH:mm:ss')
                : record[item.name];
            }
          },
        })),
    },
  );

  // 导出数据
  const handleOnDownload = () => {
    window.location.href = `/api/v1/datacenter/exportData?uuid=${selectedKey}`;
  };

  // 清空历史数据
  const { run: clear } = useRequest(
    (params: API.deleteDatacenterClearSchemaDataParams) => deleteDatacenterClearSchemaData(params),
    {
      manual: true,
      onSuccess: () => {
        actionRef.current?.reload();
        message.success(formatMessage({ id: 'dataCenter.message.success.clear' }));
      },
    },
  );

  const handleOnClear = () => {
    modal.confirm({
      title: formatMessage({ id: 'dataCenter.modal.title.clear' }),
      content: formatMessage({ id: 'dataCenter.modal.content.clear' }),
      okText: formatMessage({ id: 'button.ok' }),
      cancelText: formatMessage({ id: 'button.cancel' }),
      onOk: () => selectedKey && clear({ uuid: selectedKey }),
    });
  };

  useEffect(() => {
    if (selectedKey) {
      getSchemaDdlDefine({ uuid: selectedKey });
      getColumns({ uuid: selectedKey });
    }
  }, [selectedKey]);

  return (
    <PageContainer>
      <ProCard split="vertical">
        <ProCard
          colSpan="300px"
          title={formatMessage({ id: 'dataCenter.title.tree' })}
          headStyle={{ paddingInline: 16 }}
          bodyStyle={{ paddingInline: 16 }}
        >
          <Tree.DirectoryTree
            showLine
            blockNode
            selectedKeys={selectedKey ? [selectedKey] : []}
            expandedKeys={expandedKeys}
            onSelect={(keys) => setSelectedKey(keys?.[0] as string)}
            onExpand={setExpandedKeys}
            treeData={treeData}
          />
        </ProCard>
        <ProCard title={formatMessage({ id: 'dataCenter.title.table' })}>
          {columns && columns?.length > 0 ? (
            <ProTable
              rowKey="uuid"
              polling={5000}
              actionRef={actionRef}
              params={{ uuid: selectedKey }}
              request={async ({ current = 1, pageSize = 10, ...keyword }) => {
                if (keyword?.uuid) {
                  const { data } = await getDatacenterQueryDataList({
                    current,
                    size: pageSize,
                    order: 'DESC',
                    uuid: keyword.uuid,
                  });

                  return Promise.resolve({
                    data: data?.records,
                    total: data?.total || 0,
                    success: true,
                  });
                } else {
                  return Promise.resolve({
                    data: [],
                    total: 0,
                    success: true,
                  });
                }
              }}
              pagination={{
                hideOnSinglePage: true,
                defaultCurrent: 1,
                defaultPageSize: 10,
              }}
              columns={columns}
              search={false}
              rootClassName="stripe-table"
              toolBarRender={() => [
                <Button danger key="clear" onClick={handleOnClear} icon={<DeleteOutlined />}>
                  {formatMessage({ id: 'dataCenter.button.clear' })}
                </Button>,
                <Button
                  key="download"
                  type="primary"
                  onClick={handleOnDownload}
                  icon={<DownloadOutlined />}
                >
                  {formatMessage({ id: 'dataCenter.button.download' })}
                </Button>,
              ]}
            />
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default DataCenter;
