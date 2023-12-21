import LogTable from '@/components/LogTable';
import { getRulesDetail } from '@/services/rulex/guizeguanli';
import { getInendsList } from '@/services/rulex/shuruziyuanguanli';
import { filterLogByTopic } from '@/utils/utils';
import type { ProDescriptionsItemProps } from '@ant-design/pro-components';
import { ProDescriptions } from '@ant-design/pro-components';
import { history, useParams, useRequest } from '@umijs/max';
import { Drawer, DrawerProps } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';

type DetailProps = DrawerProps & {
  uuid: string;
  type: 'detail' | 'log';
};

const Detail = ({ uuid, type, ...props }: DetailProps) => {
  const { groupId } = useParams();
  const { setConfig: setSourceDetail } = useModel('useSource');
  const { data: devices, run: getDeviceList, setDeviceConfig } = useModel('useDevice');
  const { ruleLogData } = useModel('useWebsocket');

  // 获取资源
  const { data: sources } = useRequest(() => getInendsList());

  const getSourceName = (data: any[], key: string) => {
    const current = (data || [])?.find((item) => item?.uuid === key);

    return current?.name || '';
  };

  const renderSourceName = (fromSource: string[], fromDevice: string[]) => {
    let name: string = '';
    let url: string = '';
    const isSource = fromSource?.length > 0;

    if (isSource) {
      name = getSourceName(sources as any, fromSource?.[0]);
      url = '/inends/list';
    } else {
      name = getSourceName(devices || [], fromDevice?.[0]);
      url = '/device/list';
    }

    return (
      <a
        onClick={() => {
          history.push(url);
          if (isSource) {
            setSourceDetail({ open: true, uuid: fromSource?.[0] });
          } else {
            setDeviceConfig({ open: true, uuid: fromDevice?.[0] });
          }
        }}
      >
        {name}
      </a>
    );
  };

  const columns: ProDescriptionsItemProps<Record<string, any>>[] = [
    {
      title: '规则名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '数据来源',
      dataIndex: 'sourceType',
      valueEnum: {
        fromSource: '输入资源',
        fromDevice: '设备',
      },
    },
    {
      title: '输入资源',
      dataIndex: 'fromSource',
      render: (_, { fromSource, fromDevice }) => renderSourceName(fromSource, fromDevice),
    },
    {
      title: '规则回调',
      dataIndex: 'actions',
      valueType: 'code',
    },
    {
      title: '成功回调',
      dataIndex: 'success',
      valueType: 'code',
    },
    {
      title: '失败回调',
      dataIndex: 'failed',
      valueType: 'code',
    },
  ];

  useEffect(() => {
    if (!groupId) return;
    getDeviceList({ uuid: groupId });
  }, [groupId]);

  return (
    <Drawer
      title={type === 'detail' ? '规则详情' : '规则日志'}
      placement="right"
      width={type === 'detail' ? '35%' : '40%'}
      destroyOnClose
      maskClosable={false}
      {...props}
    >
      {type === 'detail' ? (
        <ProDescriptions
          column={1}
          columns={columns}
          labelStyle={{ justifyContent: 'flex-end', minWidth: 80 }}
          request={async () => {
            const res = await getRulesDetail({ uuid });

            return Promise.resolve({
              success: true,
              data: {
                ...res?.data,
                sourceType:
                  res?.data?.fromDevice && res?.data?.fromDevice?.length > 0
                    ? 'fromDevice'
                    : 'fromSource',
              },
            });
          }}
        />
      ) : (
        <LogTable options={false} logData={filterLogByTopic(ruleLogData, `rule/log/${uuid}`)} />
      )}
    </Drawer>
  );
};

export default Detail;
