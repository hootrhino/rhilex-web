import ProLog from '@/components/ProLog';
import { getRulesDetail } from '@/services/rulex/guizeguanli';
import { getDevicesDetail } from '@/services/rulex/shebeiguanli';
import { getInendsList } from '@/services/rulex/shuruziyuanguanli';
import { DetailModalType } from '@/utils/enum';
import { getName, handleNewMessage } from '@/utils/utils';
import type { ProDescriptionsItemProps } from '@ant-design/pro-components';
import { ProDescriptions } from '@ant-design/pro-components';
import { history, useIntl, useParams, useRequest } from '@umijs/max';
import { useLocalStorageState } from 'ahooks';
import { Button, Drawer, DrawerProps, Modal } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';

export type DetailProps = DrawerProps & {
  uuid: string;
  type: DetailModalType;
};

export type DetailLogModalConfig = {
  open: boolean;
  type: DetailModalType;
  uuid: string;
};

const Detail = ({ uuid, type, ...props }: DetailProps) => {
  const { deviceId } = useParams();
  const { setConfig: setSourceDetail } = useModel('useSource');
  const { setDeviceConfig } = useModel('useDevice');
  const { latestMessage } = useModel('useWebsocket');
  const [ruleLog, setLog] = useLocalStorageState<string[]>('rule-logs', {
    defaultValue: [],
  });
  const { formatMessage } = useIntl();

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
      url = '/inend/list';
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
      title: formatMessage({ id: 'ruleConfig.form.title.name' }),
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'ruleConfig.form.title.sourceType' }),
      dataIndex: 'sourceType',
      valueEnum: {
        fromSource: formatMessage({ id: 'ruleConfig.form.title.fromSource' }),
        fromDevice: formatMessage({ id: 'ruleConfig.title.device' }),
      },
    },
    {
      title: formatMessage({ id: 'ruleConfig.form.title.fromSource' }),
      dataIndex: 'fromSource',
      render: (_, { fromSource, fromDevice }) => renderSourceName(fromSource, fromDevice),
    },
    {
      title: formatMessage({ id: 'ruleConfig.form.title.actions' }),
      dataIndex: 'actions',
      valueType: 'code',
    },
  ];

  useEffect(() => {
    const newData = handleNewMessage(ruleLog, latestMessage?.data, `rule/log/${uuid}`);
    setLog(newData);
  }, [latestMessage]);

  return type === DetailModalType.DETAIL ? (
    <Drawer
      title={formatMessage({ id: 'ruleConfig.title.detail' })}
      placement="right"
      width={type === DetailModalType.DETAIL ? '35%' : '40%'}
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
  ) : (
    <Modal
      title={formatMessage({ id: 'ruleConfig.title.log' })}
      width="65%"
      open={props.open}
      footer={
        <Button type="primary" onClick={props?.onClose}>
          {formatMessage({ id: 'button.close' })}
        </Button>
      }
      onCancel={props?.onClose}
    >
      <ProLog hidePadding topic={`rule/log/${uuid}`} dataSource={ruleLog} />
    </Modal>
  );
};

export default Detail;
