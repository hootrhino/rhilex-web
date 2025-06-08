import JsonCode from '@/components/JsonCode';
import PageContainer from '@/components/ProPageContainer';
import UnitValue from '@/components/UnitValue';
import { getOutendsDetail } from '@/services/rhilex/shuchuziyuanguanli';
import { getAlarmRuleDetail } from '@/services/rhilex/yujingzhongxin';
import { ALARM_LIST } from '@/utils/constant';
import { ProCard, ProDescriptions } from '@ant-design/pro-components';
import { getLocale, history, Link, useIntl, useParams, useRequest } from '@umijs/max';
import { Divider, Space, Tag } from 'antd';
import { nanoid } from 'nanoid';
import { useEffect } from 'react';
import type { ExprDefine } from '..';

const RuleDetail = () => {
  const { formatMessage } = useIntl();
  const { uuid } = useParams();

  // 告警详情
  const { data: detail } = useRequest(() => getAlarmRuleDetail({ uuid: uuid || '' }));

  // 北向详情
  const { data: outend, run: getOutend } = useRequest(
    (params: API.getOutendsDetailParams) => getOutendsDetail(params),
    {
      manual: true,
    },
  );

  const getHandleId = (handleId?: string) => {
    if (!handleId) return '-';

    return outend ? <Link to={`/outend/detail/${outend.uuid}`}>{outend.name}</Link> : handleId;
  };

  const getRule = (rules: ExprDefine[]) => {
    if (rules && rules.length > 0) {
      return (
        <div className="flex flex-col w-full gap-3">
          {[...rules, ...rules].map((rule, index) => (
            <ProCard
              bordered
              className="border-dashed"
              key={`rule-${nanoid()}`}
              title={
                <Space>
                  <span>{formatMessage({ id: 'alarm.rule.title.expr' }, { key: index + 1 })}</span>
                  <Tag color="blue">{rule.eventType}</Tag>
                </Space>
              }
            >
              <JsonCode code={rule.expr} />
            </ProCard>
          ))}
        </div>
      );
    } else {
      return '-';
    }
  };

  useEffect(() => {
    if (detail?.handleId) {
      getOutend({ uuid: detail?.handleId });
    }
  }, [detail?.handleId]);

  return (
    <PageContainer
      onBack={() => history.push(ALARM_LIST)}
      title={formatMessage({ id: 'alarm.rule.title.detail' })}
    >
      <ProCard>
        <ProDescriptions
          title={formatMessage({ id: 'common.title.base' })}
          column={3}
          labelStyle={{ width: getLocale() === 'en-US' ? 180 : 120, justifyContent: 'end' }}
        >
          <ProDescriptions.Item label="UUID">{detail?.uuid}</ProDescriptions.Item>
          <ProDescriptions.Item label={formatMessage({ id: 'table.title.name' })}>
            {detail?.name}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={formatMessage({ id: 'alarm.table.title.interval' })}
            tooltip={formatMessage({ id: 'alarm.tooltip.interval' })}
          >
            <UnitValue value={detail?.interval || 0} unit="s" />
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label={formatMessage({ id: 'alarm.table.title.threshold' })}
            tooltip={formatMessage({ id: 'alarm.tooltip.threshold' })}
          >
            {detail?.threshold}
          </ProDescriptions.Item>
          <ProDescriptions.Item label={formatMessage({ id: 'alarm.table.title.handleId' })}>
            {getHandleId(detail?.handleId)}
          </ProDescriptions.Item>
          <ProDescriptions.Item label={formatMessage({ id: 'table.title.desc' })}>
            {detail?.description || '-'}
          </ProDescriptions.Item>
        </ProDescriptions>
        <Divider />
        <ProDescriptions
          title={formatMessage({ id: 'alarm.rule.title.rule' })}
          tooltip={
            <div>
              {formatMessage({ id: 'alarm.tooltip.expr' })}
              <a href="https://expr-lang.org/" target="_blank" rel="noreferrer">
                https://expr-lang.org/
              </a>
            </div>
          }
        >
          {getRule(detail?.exprDefine as ExprDefine[])}
        </ProDescriptions>
      </ProCard>
    </PageContainer>
  );
};

export default RuleDetail;
