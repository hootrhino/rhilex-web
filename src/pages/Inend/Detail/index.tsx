import type { EnhancedProDescriptionsItemProps } from '@/components/ProDescriptions';
import ProDescriptions from '@/components/ProDescriptions';
import PageContainer from '@/components/ProPageContainer';
import { getInendsDetail } from '@/services/rhilex/shuruziyuanguanli';
import { INEND_LIST } from '@/utils/constant';
import { omit } from '@/utils/redash';
import { ProCard } from '@ant-design/pro-components';
import { useIntl, useParams, useRequest } from '@umijs/max';
import { Divider } from 'antd';
import { useEffect } from 'react';
import { baseColumns, typeConfigColumns } from '../Columns';
import { InendType } from '../enum';

const Detail = () => {
  const { formatMessage, locale } = useIntl();
  const { uuid } = useParams();
  const labelWidth = locale === 'en-US' ? 220 : 120;

  const { run, data, loading } = useRequest(
    (params: API.getInendsDetailParams) => getInendsDetail(params),
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
      backUrl={INEND_LIST}
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
        {data?.type && Object.values(InendType).includes(data?.type as InendType) && (
          <>
            <Divider />
            <ProDescriptions
              column={3}
              columns={typeConfigColumns[data?.type]}
              labelWidth={labelWidth}
              title={formatMessage({ id: 'inend.title.group' })}
              dataSource={data}
              loading={loading}
            />
          </>
        )}
      </ProCard>
    </PageContainer>
  );
};

export default Detail;
