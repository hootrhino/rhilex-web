import HeadersDetail from '@/components/HttpHeaders/Detail';
import { getOutendsDetail } from '@/services/rulex/shuchuziyuanguanli';
import { omit } from '@/utils/redash';
import { ProDescriptions } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Drawer, DrawerProps } from 'antd';
import { useEffect } from 'react';
import { useRequest } from 'umi';
import { baseColumns, configColumns } from '../columns';
import { OutendType } from '../enum';

type DetailProps = DrawerProps & {
  uuid: string;
};

const Detail = ({ uuid, ...props }: DetailProps) => {
  const { formatMessage } = useIntl();
  const { data, run, loading } = useRequest(() => getOutendsDetail({ uuid }), {
    manual: true,
  });

  useEffect(() => {
    if (uuid) {
      run();
    }
  }, [uuid]);

  return (
    <Drawer
      title={formatMessage({ id: 'outend.title.detail' })}
      placement="right"
      width="30%"
      {...props}
    >
      <ProDescriptions
        column={1}
        columns={baseColumns}
        labelStyle={{ justifyContent: 'flex-end', minWidth: 130 }}
        title={formatMessage({ id: 'outend.title.base' })}
        dataSource={data && omit(data, ['config'])}
        loading={loading}
      />
      {data?.type && Object.keys(OutendType).includes(data?.type) && (
        <>
          <ProDescriptions
            column={1}
            columns={configColumns[data?.type]}
            labelStyle={{ justifyContent: 'flex-end', minWidth: 130 }}
            title={formatMessage({ id: 'outend.title.source' })}
            dataSource={data}
            loading={loading}
          />
          {data?.type === OutendType.HTTP && <HeadersDetail data={data?.config?.headers} />}
        </>
      )}
    </Drawer>
  );
};

export default Detail;
