import HeadersDetail from '@/components/HttpHeaders/Detail';
import type { EnhancedProDescriptionsItemProps } from '@/components/ProDescriptions';
import ProDescriptions from '@/components/ProDescriptions';
import { getOutendsDetail } from '@/services/rhilex/shuchuziyuanguanli';
import { omit } from '@/utils/redash';
import { useIntl, useRequest } from '@umijs/max';
import { Drawer, DrawerProps } from 'antd';
import { useEffect } from 'react';
import { baseColumns, configColumns } from '../Columns';
import { uartColumns } from '../Columns/uart';
import { OutendType } from '../enum';

type DetailProps = DrawerProps & {
  uuid: string;
};

const Detail = ({ uuid, ...props }: DetailProps) => {
  const { formatMessage, locale } = useIntl();
  const labelWidth = locale === 'en-US' ? 150 : 130;

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
      width="35%"
      {...props}
    >
      <ProDescriptions
        columns={baseColumns as EnhancedProDescriptionsItemProps[]}
        labelWidth={labelWidth}
        title={formatMessage({ id: 'outend.title.base' })}
        dataSource={data && omit(data, ['config'])}
        loading={loading}
        rootClassName="detail-descriptions"
      />
      {data?.type && Object.keys(OutendType).includes(data?.type) && (
        <>
          <ProDescriptions
            columns={configColumns[data?.type]}
            labelWidth={labelWidth}
            title={formatMessage({ id: 'outend.title.source' })}
            dataSource={data}
            loading={loading}
            rootClassName="detail-descriptions"
          />
          {data?.config?.uartConfig && (
            <ProDescriptions
              columns={uartColumns as EnhancedProDescriptionsItemProps[]}
              labelWidth={labelWidth}
              title="串口配置"
              dataSource={data?.config?.uartConfig}
              loading={loading}
              rootClassName="detail-descriptions"
            />
          )}
          {data?.type === OutendType.HTTP && Object.keys(data?.config?.headers)?.length > 0 && (
            <HeadersDetail data={data?.config?.headers} />
          )}
        </>
      )}
    </Drawer>
  );
};

export default Detail;
