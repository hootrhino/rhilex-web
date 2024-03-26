import ProLog from '@/components/ProLog';
import { getAppDetail } from '@/services/rulex/qingliangyingyong';
import { handleNewMessage } from '@/utils/utils';
import type { ProDescriptionsItemProps } from '@ant-design/pro-components';
import { ProDescriptions } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { useLocalStorageState } from 'ahooks';
import type { DrawerProps } from 'antd';
import { Button, Drawer, Modal } from 'antd';
import { useEffect } from 'react';
import type { AppStackItem } from '..';
import { baseColumns } from '../columns';

type DetailProps = DrawerProps & {
  uuid: string;
  type: 'detail' | 'log';
};

const Detail = ({ uuid, type, ...props }: DetailProps) => {
  const { latestMessage } = useModel('useWebsocket');
  const [appConsole, setConsole] = useLocalStorageState<string[]>('app-console', {
    defaultValue: [],
  });

  useEffect(() => {
    const newData = handleNewMessage(appConsole, latestMessage?.data, `app/console/${uuid}`);
    setConsole(newData);
  }, [latestMessage]);

  return type === 'detail' ? (
    <Drawer
      title="轻量应用详情"
      placement="right"
      width={type === 'detail' ? '35%' : '40%'}
      {...props}
    >
      <ProDescriptions
        column={1}
        columns={baseColumns as ProDescriptionsItemProps<AppStackItem>[]}
        labelStyle={{ justifyContent: 'flex-end', minWidth: 80 }}
        params={{ uuid }}
        request={async (params) => {
          const res = await getAppDetail(params as API.getAppDetailParams);

          return Promise.resolve({
            success: true,
            data: {
              ...res?.data,
            },
          });
        }}
      />
    </Drawer>
  ) : (
    <Modal
      title="轻量应用日志"
      width="50%"
      open={props.open}
      footer={
        <Button type="primary" onClick={props?.onClose}>
          关闭
        </Button>
      }
      onCancel={props?.onClose}
    >
      <ProLog hidePadding topic={`app/console/${uuid}`} dataSource={appConsole} />
    </Modal>
  );
};

export default Detail;
