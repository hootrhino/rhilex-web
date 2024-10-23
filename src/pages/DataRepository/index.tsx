import { message, modal } from '@/components/PopupHack';
import PageContainer from '@/components/ProPageContainer';
import CopyButton from '@/components/RuleExample/RuleList/CopyButton';
import UnitValue from '@/components/UnitValue';
import { postRulesFormatLua } from '@/services/rhilex/guizeguanli';
import {
  deleteDatacenterClearSchemaData,
  getDatacenterListSchemaDdl,
  getDatacenterQueryDataList,
  getDatacenterSchemaDdlDefine,
  getDatacenterSchemaDdlDetail,
  getDatacenterSecret,
} from '@/services/rhilex/shujuzhongxin';
import { defaultPagination } from '@/utils/constant';
import { IconFont, toPascalCase } from '@/utils/utils';
import { DeleteOutlined, DownloadOutlined, EyeOutlined, TableOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-components';
import { ProCard, ProTable } from '@ant-design/pro-components';
import { useIntl, useModel, useRequest } from '@umijs/max';
import type { TreeDataNode } from 'antd';
import { Button, Empty, Modal, Space, Tooltip, Tree } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Type } from '../DataSchema/Property/enum';

type SchemaDDLDefineItem = {
  name: string;
  type: string;
  [key: string]: any;
};

enum ModalType {
  SCRIPT = 'script-preview',
  REQUEST = 'quick-request',
}

const defaultModalConfig = {
  open: false,
  type: ModalType.REQUEST,
  code: '',
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
  const { activeDataCenterkey: activeKey } = useModel('useSchema');

  const [selectedKey, setSelectedKey] = useState<string>('');
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);
  const [modalConfig, setModalConfig] = useState<{ open: boolean; type: ModalType; code: string }>(
    defaultModalConfig,
  );
  const [selectedItemTree, setItemTree] = useState<Record<string, any>[]>([]);

  // 获取密钥
  const { data: secret } = useRequest(() => getDatacenterSecret(), {
    formatResult: (res) => res.data.secret,
  });

  // 获取数据表列表
  const { data, run } = useRequest(
    (params: API.getDatacenterListSchemaDDLParams) => getDatacenterListSchemaDdl(params),
    {
      manual: true,
    },
  );

  // 获取表头
  const { run: getColumns, data: columns } = useRequest(
    (params: API.getDatacenterSchemaDDLDetailParams) => getDatacenterSchemaDdlDetail(params),
    {
      manual: true,
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
        message.success(formatMessage({ id: 'message.success.clear' }));
      },
    },
  );

  const updateTreeData = (list: any[], key: React.Key, children: any[]): any[] =>
    list.map((node) => {
      if (node.key === key) {
        return {
          ...node,
          children: children?.map((d) => ({
            title: getChildName(d),
            key: `${d.name}-${Math.random()}`,
            isLeaf: true,
            selectable: false,
            className: 'data-repo-tree-unselectable',
          })),
        };
      }

      return node;
    });

  const handleOnLoadData = async ({ key }: any) => {
    if (!secret) return [];
    const { data } = await getDatacenterSchemaDdlDefine({ uuid: key, secret });
    setItemTree(data);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setTreeData((origin) => updateTreeData(origin, key, data));
        resolve();
      }, 500);
    });
  };

  const handleOnClear = () => {
    modal.confirm({
      title: formatMessage({ id: 'dataRepo.modal.title.clear' }),
      content: formatMessage({ id: 'dataRepo.modal.content.clear' }),
      okText: formatMessage({ id: 'button.ok' }),
      cancelText: formatMessage({ id: 'button.cancel' }),
      onOk: () => selectedKey && secret && clear({ uuid: selectedKey, secret }),
    });
  };

  // 生成代码
  const getRequestCode = () => {
    const { current, pageSize } = actionRef.current?.pageInfo || {
      current: defaultPagination.defaultCurrent,
      pageSize: defaultPagination.defaultPageSize,
    };

    const code = `curl --location --request GET 'http://${window.location.host}/api/v1/datacenter/queryDataList?secret=
    ${secret}&uuid=${selectedKey}&current=${current}&size=${pageSize}&order=DESC' --header
    'User-Agent: RHILEX'`;

    setModalConfig({ open: true, type: ModalType.REQUEST, code });
  };

  const getScriptCode = async () => {
    const formatParams = selectedItemTree
      .filter((tree) => !['create_at', 'id'].includes(tree.name))
      .map((item) => {
        if ([Type.INTEGER, Type.FLOAT].includes(item.type)) {
          return `${item.name} = 0`;
        }
        if (item.type === Type.BOOL) {
          return `${item.name} = false`;
        }
        if (item.type === Type.GEO) {
          return `${item.name} = "0,0"`;
        }
        return `${item.name} = ""`;
      })
      .join(',');

    const code = `local err = rds:Save('${selectedKey}', ${`{${formatParams}}`})
    if err ~= nil then
        Throw(err)
        return 0
    end`;
    const { data: formatCode } = await postRulesFormatLua({ source: code });
    setModalConfig({ open: true, type: ModalType.SCRIPT, code: formatCode.source });
  };

  const toolBarRender = [
    <Button key="script-preview" onClick={getScriptCode} icon={<EyeOutlined />}>
      {formatMessage({ id: 'dataRepo.button.script' })}
    </Button>,
    <Button key="quick-request" onClick={getRequestCode} icon={<IconFont type="icon-code" />}>
      {formatMessage({ id: 'dataRepo.button.code' })}
    </Button>,
    <Button danger key="clear" onClick={handleOnClear} icon={<DeleteOutlined />}>
      {formatMessage({ id: 'button.clear' })}
    </Button>,
    <Button key="download" type="primary" onClick={handleOnDownload} icon={<DownloadOutlined />}>
      {formatMessage({ id: 'dataRepo.button.export' })}
    </Button>,
  ];

  const formatColumns = useMemo(
    () =>
      columns?.map((item) => ({
        title: toPascalCase(item?.name),
        dataIndex: item?.name,
        render: (_dom: React.ReactNode, record: Record<string, any>) => {
          if (item?.unit) {
            return <UnitValue value={record[item.name]} unit={item.unit} />;
          } else {
            if (typeof record[item.name] === 'boolean') {
              return record[item.name] === true ? item.rule.trueLabel : item.rule.falseLabel;
            }
            return item.name === 'create_at'
              ? dayjs(record['create_at']).format('YYYY-MM-DD HH:mm:ss')
              : record[item.name];
          }
        },
      })),
    [columns],
  );

  useMemo(() => {
    const formatData = data?.map((item) => ({
      title: (
        <Tooltip title={item.published ? '' : formatMessage({ id: 'dataRepo.tooltip.unpublish' })}>
          {item.name}
        </Tooltip>
      ),
      key: item.uuid,
      disabled: !item.published,
      isLeaf: item.published ? false : true,
      icon: <TableOutlined />,
    }));

    const publishedData = data?.filter((item) => item.published)?.map((d) => d.uuid);
    const defaultKey = activeKey ? activeKey : publishedData?.[0];

    setTreeData(formatData as TreeDataNode[]);
    setSelectedKey(defaultKey as string);
    setExpandedKeys(defaultKey ? [defaultKey] : []);
  }, [data]);

  useEffect(() => {
    if (selectedKey && secret) {
      getColumns({ uuid: selectedKey, secret });
    }
  }, [selectedKey, secret]);

  useEffect(() => {
    if (secret) {
      run({ secret });
    }
  }, [secret]);

  return (
    <PageContainer>
      <ProCard split="vertical">
        <ProCard
          colSpan="300px"
          title={formatMessage({ id: 'dataRepo.title.tree' })}
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
        <ProCard title={formatMessage({ id: 'dataRepo.title.table' })}>
          {formatColumns && formatColumns?.length > 0 ? (
            <ProTable
              rowKey="id"
              polling={5000}
              actionRef={actionRef}
              params={{ uuid: selectedKey, secret }}
              request={async ({
                current = defaultPagination.defaultCurrent,
                pageSize = defaultPagination.defaultPageSize,
                uuid,
                secret,
              }) => {
                const { data } = await getDatacenterQueryDataList({
                  current,
                  size: pageSize,
                  order: 'DESC',
                  uuid,
                  secret: secret || '',
                });

                return Promise.resolve({
                  data: data?.records,
                  total: data?.total || 0,
                  success: true,
                });
              }}
              pagination={defaultPagination}
              columns={formatColumns}
              search={false}
              rootClassName="stripe-table"
              toolBarRender={() => toolBarRender}
            />
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </ProCard>
      </ProCard>
      <Modal
        destroyOnClose
        width="35%"
        title={`${selectedKey} - ${formatMessage({
          id:
            modalConfig.type === ModalType.REQUEST
              ? 'dataRepo.modal.title.code'
              : 'dataRepo.button.script',
        })}`}
        maskClosable={false}
        open={modalConfig.open}
        onCancel={() => setModalConfig(defaultModalConfig)}
        footer={
          <Space>
            <Button onClick={() => setModalConfig(defaultModalConfig)}>
              {formatMessage({ id: 'button.close' })}
            </Button>
            <CopyButton apply={modalConfig.code} key="copy-code" />
          </Space>
        }
      >
        <pre className="json-code">
          <code>{modalConfig.code}</code>
        </pre>
      </Modal>
    </PageContainer>
  );
};

export default DataRepository;
