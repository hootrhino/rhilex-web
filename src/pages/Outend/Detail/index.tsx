import HeadersDetail from '@/components/HttpHeaders/Detail';
import HeadersTitle from '@/components/HttpHeaders/Title';
import type { EnhancedProDescriptionsItemProps } from '@/components/ProDescriptions';
import ProDescriptions from '@/components/ProDescriptions';
import { getOutendsDetail } from '@/services/rulex/shuchuziyuanguanli';
import { omit } from '@/utils/redash';
import { getLocale, useIntl, useRequest } from '@umijs/max';
import { Drawer, DrawerProps } from 'antd';
import { useEffect } from 'react';
import { baseColumns, configColumns } from '../columns';
import { OutendType } from '../enum';

type DetailProps = DrawerProps & {
  uuid: string;
};

const Detail = ({ uuid, ...props }: DetailProps) => {
  const { formatMessage } = useIntl();
  const labelWidth = getLocale() === 'en-US' ? 150 : 130;

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
      width="40%"
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
          />
          {data?.type === OutendType.HTTP && Object.keys(data?.config?.headers)?.length > 0 && (
            <div className="mt-[24px]">
              <HeadersTitle />
              <HeadersDetail data={data?.config?.headers} className="mt-[12px]" />
            </div>
          )}
        </>
      )}
    </Drawer>
  );
};

export default Detail;
