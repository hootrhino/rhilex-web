import HeadersDetail from '@/components/HttpHeaders/Detail';
import type { EnhancedProDescriptionsItemProps } from '@/components/ProDescriptions';
import ProDescriptions from '@/components/ProDescriptions';
import PageContainer from '@/components/ProPageContainer';
import { getOutendsDetail } from '@/services/rhilex/shuchuziyuanguanli';
import { OUTEND_LIST } from '@/utils/constant';
import { omit } from '@/utils/redash';
import { ProCard } from '@ant-design/pro-components';
import { useIntl, useParams, useRequest } from '@umijs/max';
import { Divider } from 'antd';
import { useEffect } from 'react';
import { baseColumns, configColumns } from '../Columns';
import { uartColumns } from '../Columns/uart';
import { OutendType } from '../enum';

const Detail = () => {
  const { formatMessage, locale } = useIntl();
  const { uuid } = useParams();
  const labelWidth = locale === 'en-US' ? 150 : 130;

  const { data, run, loading } = useRequest(
    (params: API.getOutendsDetailParams) => getOutendsDetail(params),
    {
      manual: true,
    },
  );

  useEffect(() => {
    if (uuid) {
      run({ uuid });
    }
  }, [uuid]);

  return (
    <PageContainer
      title={formatMessage({ id: 'common.title.detail' }, { name: data?.name })}
      backUrl={OUTEND_LIST}
    >
      <ProCard bodyStyle={{ paddingBlock: 24 }}>
        <ProDescriptions
          column={3}
          columns={baseColumns as EnhancedProDescriptionsItemProps[]}
          labelWidth={labelWidth}
          title={formatMessage({ id: 'common.title.base' })}
          dataSource={data && omit(data, ['config'])}
          loading={loading}
          rootClassName="mb-[24px]"
        />

        {data?.type && Object.keys(OutendType).includes(data?.type) && (
          <>
            <Divider />
            <ProDescriptions
              column={3}
              columns={configColumns[data?.type]}
              labelWidth={labelWidth}
              title={formatMessage({ id: 'outend.title.common' })}
              dataSource={data?.config?.commonConfig}
              loading={loading}
              rootClassName="mb-[24px]"
            />

            {data?.config?.uartConfig && (
              <>
                <Divider />
                <ProDescriptions
                  column={3}
                  columns={uartColumns as EnhancedProDescriptionsItemProps[]}
                  labelWidth={labelWidth}
                  title={formatMessage({ id: 'outend.title.uart' })}
                  dataSource={data?.config?.uartConfig}
                  loading={loading}
                  rootClassName="mb-[24px]"
                />
              </>
            )}
            {data?.type === OutendType.HTTP &&
              Object.keys(data?.config?.commonConfig?.headers)?.length > 0 && (
                <>
                  <Divider />
                  <HeadersDetail data={data?.config?.commonConfig?.headers} />
                </>
              )}
          </>
        )}
      </ProCard>
    </PageContainer>
  );
};

export default Detail;
