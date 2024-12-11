import PageContainer from '@/components/ProPageContainer';
import type { OutendItem } from '@/pages/Outend';
import { getOutendsList } from '@/services/rhilex/shuchuziyuanguanli';
import {
  getAlarmRuleDetail,
  postAlarmRuleCreate,
  putAlarmRuleUpdate,
} from '@/services/rhilex/yujingzhongxin';
import { ALARM_LIST } from '@/utils/constant';
import { generateRandomId } from '@/utils/utils';
import { CloseOutlined } from '@ant-design/icons';
import {
  FooterToolbar,
  ProCard,
  ProForm,
  ProFormDigit,
  ProFormGroup,
  ProFormInstance,
  ProFormList,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { history, useIntl, useParams, useRequest } from '@umijs/max';
import { AutoComplete, Button, message, Popconfirm } from 'antd';
import { nanoid } from 'nanoid';
import { useEffect, useRef } from 'react';

const UpdateRule = () => {
  const { formatMessage } = useIntl();
  const formRef = useRef<ProFormInstance>();
  const { uuid } = useParams();
  const buildInEventType = [];

  for (let i = 1; i <= 30; i++) {
    buildInEventType.push(`alarm.eventType.opt${i}`);
  }

  // 告警详情
  const { run: getDetail } = useRequest(
    (params: API.getAlarmRuleDetailParams) => getAlarmRuleDetail(params),
    {
      manual: true,
      onSuccess: (res) => formRef.current?.setFieldsValue({ ...res }),
    },
  );

  useEffect(() => {
    if (uuid) {
      getDetail({ uuid });
    }
  }, [uuid]);

  return (
    <PageContainer
      onBack={() => history.push(ALARM_LIST)}
      title={formatMessage({
        id: uuid ? 'alarm.rule.title.update' : 'alarm.rule.title.new',
      })}
    >
      <ProCard>
        <ProForm
          formRef={formRef}
          initialValues={{
            name: `RULE_${generateRandomId()}`,
            interval: 1,
            threshold: 1,
            exprDefine: [{ eventType: '', expr: '' }],
          }}
          submitter={{
            render: ({ reset, submit }) => (
              <FooterToolbar>
                <Popconfirm
                  key="reset"
                  title={formatMessage({ id: 'component.popconfirm.title.reset' })}
                  onConfirm={() => {
                    reset();
                    formRef.current?.resetFields();
                  }}
                >
                  <Button>{formatMessage({ id: 'button.reset' })}</Button>
                </Popconfirm>

                <Button key="submit" type="primary" onClick={submit}>
                  {formatMessage({ id: 'button.submit' })}
                </Button>
              </FooterToolbar>
            ),
          }}
          onFinish={async (values) => {
            try {
              const params = { ...values };
              if (uuid) {
                await putAlarmRuleUpdate({ ...params, uuid } as any);
                message.success(formatMessage({ id: 'message.success.update' }));
              } else {
                await postAlarmRuleCreate(params as any);
                message.success(formatMessage({ id: 'message.success.new' }));
              }
              history.push(ALARM_LIST);
              return true;
            } catch (error) {
              return false;
            }
          }}
        >
          <ProFormGroup>
            <ProFormText
              name="name"
              width="lg"
              label={formatMessage({ id: 'table.title.name' })}
              placeholder={formatMessage({ id: 'alarm.form.placeholder.name' })}
              rules={[
                { required: true, message: formatMessage({ id: 'alarm.form.placeholder.name' }) },
              ]}
            />
            <ProFormDigit
              name="interval"
              width="lg"
              label={formatMessage({ id: 'alarm.table.title.interval' })}
              placeholder={formatMessage({ id: 'alarm.form.placeholder.interval' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'alarm.form.placeholder.interval' }),
                },
              ]}
              fieldProps={{ addonAfter: formatMessage({ id: 'alarm.unit.sec' }) }}
            />
            <ProFormDigit
              name="threshold"
              width="lg"
              label={formatMessage({ id: 'alarm.table.title.threshold' })}
              placeholder={formatMessage({ id: 'alarm.form.placeholder.threshold' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'alarm.form.placeholder.threshold' }),
                },
              ]}
            />
          </ProFormGroup>
          <ProFormGroup>
            <ProFormSelect
              name="handleId"
              width="lg"
              label={formatMessage({ id: 'alarm.table.title.handleId' })}
              placeholder={formatMessage({ id: 'alarm.form.placeholder.handleId' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'alarm.form.placeholder.handleId' }),
                },
              ]}
              request={async () => {
                const res = await getOutendsList();

                return (res as any).data?.map((item: OutendItem) => ({
                  label: item.name,
                  value: item.uuid,
                }));
              }}
            />
            <ProFormText
              name="description"
              width="lg"
              label={formatMessage({ id: 'table.title.desc' })}
              placeholder={formatMessage({ id: 'form.placeholder.desc' })}
            />
          </ProFormGroup>

          <ProFormList
            required
            name="exprDefine"
            label={formatMessage({ id: 'alarm.table.title.exprDefine' })}
            min={1}
            creatorButtonProps={{
              position: 'top',
              creatorButtonText: formatMessage({ id: 'alarm.rule.button.new' }),
            }}
            actionRender={(field, action, count) => {
              return count.length > 1
                ? [<CloseOutlined onClick={() => action.remove(field.name)} key="remove" />]
                : [];
            }}
            itemRender={({ listDom, action }, { index }) => {
              return (
                <ProCard
                  bordered
                  extra={action}
                  title={formatMessage({ id: 'alarm.rule.title.expr' }, { key: index + 1 })}
                  className="mb-2"
                  key={`rule-card-${nanoid()}`}
                >
                  {listDom}
                </ProCard>
              );
            }}
            tooltip={
              <div>
                {formatMessage({ id: 'alarm.tooltip.expr' })}
                <a href="https://expr-lang.org/" target="_blank" rel="noreferrer">
                  https://expr-lang.org/
                </a>
              </div>
            }
          >
            <ProForm.Item
              name="eventType"
              label={formatMessage({ id: 'alarm.table.title.eventType' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'alarm.form.placeholder.eventType' }),
                },
                {
                  type: 'string',
                  max: 100,
                  message: formatMessage({ id: 'alarm.form.rule.eventType' }),
                },
              ]}
            >
              <AutoComplete
                options={buildInEventType.map((item) => ({
                  label: formatMessage({ id: item }),
                  value: formatMessage({ id: item }),
                }))}
                placeholder={formatMessage({ id: 'alarm.form.placeholder.eventType' })}
              />
            </ProForm.Item>
            <ProFormTextArea
              name="expr"
              label={formatMessage({ id: 'alarm.table.title.exprDefine.expr' })}
              placeholder={formatMessage({ id: 'alarm.form.placeholder.expr' })}
              fieldProps={{ autoSize: { minRows: 4 } }}
              rules={[
                { required: true, message: formatMessage({ id: 'alarm.form.placeholder.expr' }) },
              ]}
            />
          </ProFormList>
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default UpdateRule;
