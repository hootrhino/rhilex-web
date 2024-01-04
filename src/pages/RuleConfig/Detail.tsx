import LogTable from '@/components/LogTable';
import { getRulesDetail } from '@/services/rulex/guizeguanli';
import { getDevicesDetail } from '@/services/rulex/shebeiguanli';
import { getInendsList } from '@/services/rulex/shuruziyuanguanli';
import { filterLogByTopic, getName } from '@/utils/utils';
import type { ProDescriptionsItemProps } from '@ant-design/pro-components';
import { ProDescriptions } from '@ant-design/pro-components';
import { history, useParams, useRequest } from '@umijs/max';
import { Drawer, DrawerProps } from 'antd';
import { useModel } from 'umi';

type DetailProps = DrawerProps & {
  uuid: string;
  type: 'detail' | 'log';
};

const Detail = ({ uuid, type, ...props }: DetailProps) => {
  const { deviceId } = useParams();
  const { setConfig: setSourceDetail } = useModel('useSource');
  const { setDeviceConfig } = useModel('useDevice');
  const {
    topicData: { ruleLog },
  } = useModel('useWebsocket');

  // 获取资源
  const { data: sources } = useRequest(() => getInendsList());

  // 获取设备详情
  const { data: deviceDetail } = useRequest(() => getDevicesDetail({ uuid: deviceId || '' }), {
    ready: !!deviceId,
    refreshDeps: [deviceId],
  });

  const renderSourceName = (fromSource: string[], fromDevice: string[]) => {
    let name: string;
    let url: string;
    const isSource = fromSource?.length > 0;

    if (isSource) {
      name = getName(sources as any, fromSource?.[0]);
      url = '/inends/list';
    } else {
      name = deviceDetail?.name || '';
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
        <LogTable options={false} logData={filterLogByTopic(ruleLog, `rule/log/${uuid}`)} />
      )}
    </Drawer>
  );
};

export default Detail;
