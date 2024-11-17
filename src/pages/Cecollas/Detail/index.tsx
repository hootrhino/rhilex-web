import type { EnhancedProDescriptionsItemProps } from '@/components/ProDescriptions';
import ProDescriptions from '@/components/ProDescriptions';
import PageContainer from '@/components/ProPageContainer';
import ProTag, { StatusType } from '@/components/ProTag';
import { getCecollasCecollaSchema, getCecollasDetail } from '@/services/rhilex/yunbianxietong';
import { CECOLLAS_LIST } from '@/utils/constant';
import { omit } from '@/utils/redash';
import { BlockOutlined } from '@ant-design/icons';
import { ProCard, ProField } from '@ant-design/pro-components';
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
            rootClassName="detail-descriptions"
            className="mt-6 mb-4"
          />
          {detail && detail.type && Object.keys(CecollasType).includes(detail.type) && (
            <ProDescriptions
              dataSource={detail.config}
              columns={typeColumns(detail.type) as EnhancedProDescriptionsItemProps[]}
              column={3}
              labelWidth={labelWidth}
              rootClassName="detail-descriptions"
            />
          )}
        </>
      }
      extra={
        <Button type="primary" key="reload" onClick={handleOnRefresh}>
          刷新
        </Button>
      }
      tabList={[
        {
          tab: '网关物模型',
          key: Schema.GATEWAY,
        },
        {
          tab: '子设备物模型',
          key: Schema.SUB_DEVICE,
        },
      ]}
      tabActiveKey={activeSchema}
      onTabChange={(tab) => setModel(tab as Schema)}
      tabBarExtraContent={
        <Tooltip title={readOnly ? '只读模式' : '读写模式'}>
          <Button icon={<BlockOutlined />} size="small" onClick={() => setMode(!readOnly)} />
        </Tooltip>
      }
    >
      {readOnly ? (
        <ProCard title="物模型 JSON" className="network-card">
          <ProField
            text={
              activeSchema === Schema.GATEWAY
                ? JSON.stringify(schema?.gatewaySchema)
                : JSON.stringify(schema?.subDeviceSchema)
            }
            valueType="jsonCode"
            mode="read"
          />
        </ProCard>
      ) : (
        <ProCard
          tabs={{
            items: [
              {
                label: '属性',
                key: 'properties',
                children: <Property data={schema?.[activeSchema].properties || []} />,
              },
              {
                label: '行为',
                key: 'actions',
                children: (
                  <Action
                    schema={activeSchema}
                    data={schema?.[activeSchema].actions}
                    refresh={() => uuid && getSchema({ uuid })}
                  />
                ),
              },
              {
                label: '事件',
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
