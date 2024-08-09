import ProDescriptions from '@/components/ProDescriptions';
import type { LogRef } from '@/components/ProLog';
import ProLog from '@/components/ProLog';
import { getAppDetail } from '@/services/rulex/qingliangyingyong';
import { DetailModalType } from '@/utils/enum';
import { handleNewMessage } from '@/utils/utils';
import type { ProDescriptionsItemProps } from '@ant-design/pro-components';
import { getLocale, useIntl, useModel } from '@umijs/max';
import type { DrawerProps } from 'antd';
import { Button, Drawer, Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';
import type { AppStackItem } from '..';
import { baseColumns } from '../columns';

type DetailProps = DrawerProps & {
  uuid: string;
  type: DetailModalType;
};

const Detail = ({ uuid, type, ...props }: DetailProps) => {
  const { latestMessage } = useModel('useWebsocket');
  const [appConsole, setConsole] = useState<string[]>([]);
  const { formatMessage } = useIntl();
  const logRef = useRef<LogRef>(null);

  const handleOnClearLog = () => {
    setConsole([]);
    logRef.current?.clearLog();
  };

  const handleOnClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (props && props.onClose) {
      props?.onClose(e);
    }
    handleOnClearLog();
  };

  useEffect(() => {
    if (props?.open) {
      const newData = handleNewMessage(appConsole, latestMessage?.data, `app/console/${uuid}`);
      setConsole(newData);
    } else {
      handleOnClearLog();
    }
  }, [latestMessage]);

  return type === DetailModalType.DETAIL ? (
    <Drawer
      title={formatMessage({ id: 'appStack.title.detail' })}
      placement="right"
      width={type === DetailModalType.DETAIL ? '35%' : '40%'}
      {...props}
    >
      <ProDescriptions
        columns={baseColumns as ProDescriptionsItemProps<AppStackItem>[]}
        labelWidth={getLocale() === 'en-US' ? 130 : 80}
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
      title={formatMessage({ id: 'appStack.title.log' })}
      width="50%"
      open={props.open}
      footer={
        <Button type="primary" onClick={handleOnClose}>
          {formatMessage({ id: 'button.close' })}
        </Button>
      }
      onCancel={handleOnClose}
    >
      <ProLog
        hidePadding
        topic={`app/console/${uuid}`}
        dataSource={appConsole}
        className="h-[400px] w-full"
        ref={logRef}
      />
    </Modal>
  );
};

export default Detail;
