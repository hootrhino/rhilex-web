import LogTable from '@/components/LogTable';
import { getRulesDetail } from '@/services/rulex/guizeguanli';
import type { ProDescriptionsItemProps } from '@ant-design/pro-components';
import { ProDescriptions } from '@ant-design/pro-components';
import { Drawer, DrawerProps } from 'antd';
import { history, useModel } from 'umi';

type DetailProps = DrawerProps & {
  uuid: string;
  type: 'detail' | 'log';
};

type Option = {
  label: string;
  value: string;
};

const Detail = ({ uuid, type, ...props }: DetailProps) => {
  const { data: sources, setConfig: setSourceDetail } = useModel('useSource');
  const { data: devices, setConfig: setDeviceDetail } = useModel('useDevice');

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
      render: (_, { fromSource, fromDevice }) => {
        let url = '';
        let name: string = '';

        if (fromSource?.length > 0) {
          const current = sources?.find((item: Option) => item?.value === fromSource?.[0]);
          name = current?.label || '';
          setSourceDetail({ open: true, uuid: current?.value });
          url = '/inends';
        } else {
          const current = devices?.find((item: Option) => item?.value === fromDevice?.[0]);
          name = current?.label || '';
          setDeviceDetail({ open: true, uuid: current?.value });
          url = '/device';
        }

        return <a onClick={() => history.push(url)}>{name}</a>;
      },
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
      width="50%"
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
        <LogTable topic={`rule/log/${uuid}`} options={false} />
      )}
    </Drawer>
  );
};

export default Detail;
