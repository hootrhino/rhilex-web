import LogTable from '@/components/LogTable';
import { getAppDetail } from '@/services/rulex/qingliangyingyong';
import { filterLogByTopic } from '@/utils/utils';
import type { ProDescriptionsItemProps } from '@ant-design/pro-components';
import { ProDescriptions } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import type { DrawerProps } from 'antd';
import { Drawer } from 'antd';
import type { AppStackItem } from '..';
import { baseColumns } from '../columns';

type DetailProps = DrawerProps & {
  uuid: string;
  type: 'detail' | 'log';
};

const Detail = ({ uuid, type, ...props }: DetailProps) => {
  const {
    topicData: { appConsole },
  } = useModel('useWebsocket');

  return (
    <Drawer
      title={type === 'detail' ? '轻量应用详情' : '轻量应用日志'}
      placement="right"
      width={type === 'detail' ? '35%' : '40%'}
      {...props}
    >
      {type === 'detail' ? (
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
      ) : (
        <LogTable options={false} logData={filterLogByTopic(appConsole, `app/console/${uuid}`)} />
      )}
    </Drawer>
  );
};

export default Detail;
