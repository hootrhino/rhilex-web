import LogTable from '@/components/LogTable';
import { getRulesDetail } from '@/services/rulex/guizeguanli';
import type { ProDescriptionsItemProps } from '@ant-design/pro-components';
import { ProDescriptions } from '@ant-design/pro-components';
import { history, useParams } from '@umijs/max';
import { Drawer, DrawerProps } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';

type DetailProps = DrawerProps & {
  uuid: string;
  type: 'detail' | 'log';
};

type Option = {
  label: string;
  value: string;
};

const Detail = ({ uuid, type, ...props }: DetailProps) => {
  const { groupId } = useParams();
  const { data: sources, setConfig: setSourceDetail } = useModel('useSource');
  const { data: devices, run: getDeviceList, setDeviceConfig } = useModel('useDevice');

  const getFromSourceName = (fromSource: string[], fromDevice: string[]) => {
    let name: string = '';
    let url: string = '';
    const isSource = fromSource?.length > 0;

    if (isSource) {
      const current = sources?.find((item: Option) => item?.value === fromSource?.[0]);
      name = current?.label || '';
      url = '/inends/list';
    } else {
      const current = devices?.find((item) => item?.uuid === fromDevice?.[0]);
      name = current?.name || '';
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
      render: (_, { fromSource, fromDevice }) => getFromSourceName(fromSource, fromDevice),
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
      width="50%"
      destroyOnClose
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
