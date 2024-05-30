import ProTag, { StatusType } from '@/components/ProTag';
import { getRulesDetail } from '@/services/rulex/guizeguanli';
import { getDevicesDetail } from '@/services/rulex/shebeiguanli';
import { getInendsDetail } from '@/services/rulex/shuruziyuanguanli';
import type { ProDescriptionsItemProps } from '@ant-design/pro-components';
import { ProDescriptions } from '@ant-design/pro-components';
import { history, useIntl, useModel, useParams, useRequest } from '@umijs/max';
import type { DrawerProps } from 'antd';
import { Drawer } from 'antd';

type DetailProps = DrawerProps & {
  uuid: string;
};

const Detail = ({ uuid, ...props }: DetailProps) => {
  const { deviceId, inendId } = useParams();
  const { formatMessage } = useIntl();
  const { setConfig: setSourceDetail } = useModel('useSource');
  const { setDeviceConfig } = useModel('useDevice');

  // 获取资源详情
  const { data: inendDetail } = useRequest(() => getInendsDetail({ uuid: inendId || '' }), {
    ready: !!inendId,
    refreshDeps: [inendId],
  });

  // 获取设备详情
  const { data: deviceDetail } = useRequest(() => getDevicesDetail({ uuid: deviceId || '' }), {
    ready: !!deviceId,
    refreshDeps: [deviceId],
  });

  const columns: ProDescriptionsItemProps<Record<string, any>>[] = [
    {
      title: 'UUID',
      dataIndex: 'uuid',
      ellipsis: true,
      copyable: true,
    },
    {
      title: formatMessage({ id: 'ruleConfig.form.title.name' }),
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'ruleConfig.table.title.status' }),
      dataIndex: 'status',
      renderText: (status) => <ProTag type={StatusType.RULE}>{status}</ProTag>,
    },
    {
      title: formatMessage({ id: 'ruleConfig.form.title.sourceType' }),
      dataIndex: 'sourceType',
      render: (_, { fromSource, fromDevice }) => {
        const isSource = fromSource?.filter((item: string) => item)?.length > 0;

        return (
          <a
            onClick={() => {
              history.push(`/${isSource ? 'inend' : 'device'}/list`);
              if (isSource) {
                setSourceDetail({ open: true, uuid: fromSource?.[0] });
              } else {
                setDeviceConfig({ open: true, uuid: fromDevice?.[0] });
              }
            }}
          >
            {isSource ? inendDetail?.name : deviceDetail?.name}
          </a>
        );
      },
    },
    {
      title: formatMessage({ id: 'ruleConfig.form.title.actions' }),
      dataIndex: 'actions',
      valueType: 'code',
    },
    {
      title: formatMessage({ id: 'table.desc' }),
      dataIndex: 'description',
      render: (_, { description }) => description || '-',
    },
  ];

  return (
    <Drawer
      title={formatMessage({ id: 'ruleConfig.title.detail' })}
      placement="right"
      width="35%"
      destroyOnClose
      maskClosable={false}
      {...props}
    >
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
    </Drawer>
  );
};

export default Detail;
