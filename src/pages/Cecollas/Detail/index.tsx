import JsonCode from '@/components/JsonCode';
import type { EnhancedProDescriptionsItemProps } from '@/components/ProDescriptions';
import ProDescriptions from '@/components/ProDescriptions';
import PageContainer from '@/components/ProPageContainer';
import ProTag, { StatusType } from '@/components/ProTag';
import { getCecollasCecollaSchema, getCecollasDetail } from '@/services/rhilex/yunbianxietong';
import { CECOLLAS_LIST } from '@/utils/constant';
import { omit } from '@/utils/redash';
import { BlockOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { history, useIntl, useParams, useRequest } from '@umijs/max';
import { Button, message, Space, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { baseColumns, typeColumns } from '../columns';
import { CecollasType, Schema } from '../enum';
import Action from './Action';
import Property from './Property';

const Detail = () => {
  const { formatMessage, locale } = useIntl();
  const { uuid } = useParams();
  const [activeSchema, setModel] = useState<Schema>(Schema.GATEWAY);
  const [readOnly, setMode] = useState<boolean>(false);

  const labelWidth = locale === 'en-US' ? 150 : 100;

  // 获取详情
  const { data: detail, run: getDetail } = useRequest(
    (params: API.getCecollasDetailParams) => getCecollasDetail(params),
    {
      manual: true,
    },
  );

  // 获取物模型
  const { data: schema, run: getSchema } = useRequest(
    (params: API.getCecollasCecollaSchemaParams) => getCecollasCecollaSchema(params),
    {
      manual: true,
    },
  );

  // 刷新物模型
  const handleOnRefresh = () => {
    if (uuid) {
      getSchema({ uuid });
    }
    message.success(formatMessage({ id: 'message.success.refresh' }));
  };

  useEffect(() => {
    if (uuid) {
      getDetail({ uuid });
      getSchema({ uuid });
    }
  }, [uuid]);

  return (
    <PageContainer
      onBack={() => history.push(CECOLLAS_LIST)}
      title={
        <Space>
          <span>{formatMessage({ id: 'cecollas.title.detail' }, { name: detail?.name })}</span>
          <ProTag type={StatusType.DEVICE}>{detail?.state || 0}</ProTag>
        </Space>
      }
      content={
        <>
          <ProDescriptions
            dataSource={detail && omit(detail, ['config'])}
            columns={baseColumns as EnhancedProDescriptionsItemProps[]}
            column={3}
            labelWidth={labelWidth}
            rootClassName="mb-[24px]"
            className="mt-6 mb-4"
          />
          {detail && detail.type && Object.keys(CecollasType).includes(detail.type) && (
            <ProDescriptions
              dataSource={detail.config}
              columns={typeColumns(detail.type) as EnhancedProDescriptionsItemProps[]}
              column={3}
              labelWidth={labelWidth}
              rootClassName="mb-[24px]"
            />
          )}
        </>
      }
      extra={
        <Button type="primary" key="reload" onClick={handleOnRefresh}>
          {formatMessage({ id: 'button.refresh' })}
        </Button>
      }
      tabList={[
        {
          tab: formatMessage({ id: 'cecollas.tab.gateway' }),
          key: Schema.GATEWAY,
        },
        {
          tab: formatMessage({ id: 'cecollas.tab.subDevice' }),
          key: Schema.SUB_DEVICE,
        },
      ]}
      tabActiveKey={activeSchema}
      onTabChange={(tab) => setModel(tab as Schema)}
      tabBarExtraContent={
        <Tooltip
          title={formatMessage({ id: `cecollas.tooltip.${readOnly ? 'readOnly' : 'readWrite'}` })}
        >
          <Button icon={<BlockOutlined />} size="small" onClick={() => setMode(!readOnly)} />
        </Tooltip>
      }
    >
      {readOnly ? (
        <ProCard title={formatMessage({ id: 'cecollas.title.schemaJson' })}>
          <JsonCode
            code={
              activeSchema === Schema.GATEWAY
                ? JSON.stringify(schema?.gatewaySchema)
                : JSON.stringify(schema?.subDeviceSchema)
            }
          />
        </ProCard>
      ) : (
        <ProCard
          tabs={{
            items: [
              {
                label: formatMessage({ id: 'cecollas.tab.properties' }),
                key: 'properties',
                children: <Property data={schema?.[activeSchema]?.properties || []} />,
              },
              {
                label: formatMessage({ id: 'cecollas.tab.actions' }),
                key: 'actions',
                children: <Action data={schema?.[activeSchema]?.actions || []} />,
              },
              {
                label: formatMessage({ id: 'cecollas.tab.events' }),
                key: 'events',
                disabled: true,
              },
            ],
          }}
        ></ProCard>
      )}
    </PageContainer>
  );
};

export default Detail;
