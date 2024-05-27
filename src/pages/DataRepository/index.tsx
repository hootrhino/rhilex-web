import PageContainer from '@/components/PageContainer';
import { message, modal } from '@/components/PopupHack';
import UnitValue from '@/components/UnitValue';
import {
  deleteDatacenterClearSchemaData,
  getDatacenterListSchemaDdl,
  getDatacenterQueryDataList,
  getDatacenterSchemaDdlDefine,
  getDatacenterSchemaDdlDetail,
} from '@/services/rulex/shujuzhongxin';
import { defaultPagination } from '@/utils/constant';
import { IconFont, toPascalCase } from '@/utils/utils';
import { DeleteOutlined, DownloadOutlined, TableOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-components';
import { ProCard, ProTable } from '@ant-design/pro-components';
import { useIntl, useModel, useRequest } from '@umijs/max';
import type { TreeDataNode } from 'antd';
import { Button, Empty, Space, Tooltip, Tree, Typography } from 'antd';
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

const DataRepository = () => {
  const { formatMessage } = useIntl();
  const actionRef = useRef<ActionType>();
  const { key: activeKey, DataCenterSecret } = useModel('useDataCenter');

  const [selectedKey, setSelectedKey] = useState<string>();
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);

  const secret = DataCenterSecret?.secret || '';

  // 获取数据表列表
  useRequest(() => getDatacenterListSchemaDdl({ secret }), {
    ready: !!DataCenterSecret?.secret,
    refreshDeps: [DataCenterSecret?.secret],
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
        isLeaf: item.published ? false : true,
        icon: <TableOutlined />,
      }));

      const publishedData = data?.filter((item) => item.published)?.map((d) => d.uuid);
      const defaultKey = activeKey ? activeKey : publishedData?.[0];

      setTreeData(formatData);
      setSelectedKey(defaultKey);
      setExpandedKeys(defaultKey ? [defaultKey] : []);
    },
  });

  const updateTreeData = (list: any[], key: React.Key, children: any[]): any[] => {
    return list.map((node) => {
      if (node.key === key) {
        return {
          ...node,
          children: children?.map((d) => ({
            title: getChildName(d),
            key: `${d.name}-${Math.random()}`,
            isLeaf: true,
            selectable: false,
            className: 'data-center-tree-unselectable',
          })),
        };
      }

      return node;
    });
  };

  const handleOnLoadData = async ({ key }: any) => {
    const { data } = await getDatacenterSchemaDdlDefine({ uuid: key, secret });

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setTreeData((origin) => updateTreeData(origin, key, data));
        resolve();
      }, 500);
    });
  };

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
              return <UnitValue value={record[item.name]} unit={item.unit} />;
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
      onOk: () => selectedKey && clear({ uuid: selectedKey, secret }),
    });
  };

  const requestTable = async ({
    current = defaultPagination.defaultCurrent,
    pageSize = defaultPagination.defaultPageSize,
    ...keyword
  }) => {
    if (keyword?.uuid) {
      const { data } = await getDatacenterQueryDataList({
        current,
        size: pageSize,
        order: 'DESC',
        uuid: keyword.uuid,
        secret,
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
  };

  // 生成代码
  const handleOnCode = () => {
    const { current, pageSize } = actionRef.current?.pageInfo || {
      current: defaultPagination.defaultCurrent,
      pageSize: defaultPagination.defaultPageSize,
    };

    modal.info({
      title: formatMessage({ id: 'dataCenter.modal.title.code' }),
      content: (
        <Typography.Paragraph
          copyable={{
            tooltips: [
              formatMessage({ id: 'dataCenter.tooltip.copy' }),
              formatMessage({ id: 'dataCenter.tooltip.copied' }),
            ],
          }}
        >
          {`curl --location --request GET 'http://Ip:2580/api/v1/datacenter/queryDataList?secrets=
          ${secret}&uuid=${selectedKey}&current=${current}&size=${pageSize}&order=DESC' --header
          'User-Agent: RHILEX'`}
        </Typography.Paragraph>
      ),
      okText: formatMessage({ id: 'button.cancel' }),
    });
  };

  const toolBarRender = () => [
    <Button key="code" onClick={handleOnCode} icon={<IconFont type="icon-code" />}>
      {formatMessage({ id: 'dataCenter.button.code' })}
    </Button>,
    <Button danger key="clear" onClick={handleOnClear} icon={<DeleteOutlined />}>
      {formatMessage({ id: 'dataCenter.button.clear' })}
    </Button>,
    <Button key="download" type="primary" onClick={handleOnDownload} icon={<DownloadOutlined />}>
      {formatMessage({ id: 'dataCenter.button.download' })}
    </Button>,
  ];

  useEffect(() => {
    if (selectedKey) {
      getColumns({ uuid: selectedKey, secret });
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
            loadData={handleOnLoadData}
          />
        </ProCard>
        <ProCard title={formatMessage({ id: 'dataCenter.title.table' })}>
          {columns && columns?.length > 0 ? (
            <ProTable
              rowKey="id"
              polling={5000}
              actionRef={actionRef}
              params={{ uuid: selectedKey }}
              request={requestTable}
              pagination={defaultPagination}
              columns={columns}
              search={false}
              rootClassName="stripe-table"
              toolBarRender={toolBarRender}
            />
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default DataRepository;
