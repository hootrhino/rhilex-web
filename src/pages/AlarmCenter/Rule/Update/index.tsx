import type { OutendItem } from '@/pages/Outend';
import { getOutendsList } from '@/services/rhilex/shuchuziyuanguanli';
import {
  getAlarmRuleDetail,
  postAlarmRuleCreate,
  putAlarmRuleUpdate,
} from '@/services/rhilex/yujingzhongxin';
import { generateRandomId } from '@/utils/utils';
import { CloseOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ModalFormProps,
  ProCard,
  ProFormDigit,
  ProFormGroup,
  ProFormInstance,
  ProFormList,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useIntl, useRequest } from '@umijs/max';
import { message } from 'antd';
import { nanoid } from 'nanoid';
import { useEffect, useRef } from 'react';

type UpdateRuleProps = ModalFormProps & {
  uuid: string;
  reload: () => void;
};

const UpdateRule = ({ uuid, reload, ...props }: UpdateRuleProps) => {
  const { formatMessage } = useIntl();
  const formRef = useRef<ProFormInstance>();

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
    <ModalForm
      grid
      width="40%"
      className="max-h-[500px] overflow-y-scroll overflow-x-hidden"
      formRef={formRef}
      modalProps={{
        maskClosable: false,
        destroyOnClose: true,
        styles: {
          content: { overflowY: 'scroll' },
        },
      }}
      title={formatMessage({
        id: uuid ? 'alarm.rule.title.update' : 'alarm.rule.title.new',
      })}
      initialValues={{
        name: `RULE_${generateRandomId()}`,
        exprDefine: [{ eventType: '', expr: '' }],
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
          reload();
          return true;
        } catch (error) {
          return false;
        }
      }}
      {...props}
    >
      <ProFormGroup>
        <ProFormText
          name="name"
          colProps={{
            span: 12,
          }}
          label={formatMessage({ id: 'table.title.name' })}
          placeholder={formatMessage({ id: 'alarm.form.placeholder.name' })}
          rules={[
            { required: true, message: formatMessage({ id: 'alarm.form.placeholder.name' }) },
          ]}
        />
        <ProFormDigit
          name="interval"
          colProps={{
            span: 12,
          }}
          label={formatMessage({ id: 'alarm.table.title.interval' })}
          placeholder={formatMessage({ id: 'alarm.form.placeholder.interval' })}
          rules={[
            { required: true, message: formatMessage({ id: 'alarm.form.placeholder.interval' }) },
          ]}
          fieldProps={{ addonAfter: formatMessage({ id: 'alarm.unit.sec' }) }}
        />
      </ProFormGroup>
      <ProFormGroup>
        <ProFormDigit
          name="threshold"
          colProps={{
            span: 12,
          }}
          label={formatMessage({ id: 'alarm.table.title.threshold' })}
          placeholder={formatMessage({ id: 'alarm.form.placeholder.threshold' })}
          rules={[
            { required: true, message: formatMessage({ id: 'alarm.form.placeholder.threshold' }) },
          ]}
        />
        <ProFormSelect
          name="handleId"
          colProps={{
            span: 12,
          }}
          label={formatMessage({ id: 'alarm.table.title.handleId' })}
          placeholder={formatMessage({ id: 'alarm.form.placeholder.handleId' })}
          rules={[
            { required: true, message: formatMessage({ id: 'alarm.form.placeholder.handleId' }) },
          ]}
          request={async () => {
            const res = await getOutendsList();

            return (res as any).data?.map((item: OutendItem) => ({
              label: item.name,
              value: item.uuid,
            }));
          }}
        />
      </ProFormGroup>
      <ProFormList
        required
        name="exprDefine"
        label={formatMessage({ id: 'alarm.table.title.exprDefine' })}
        className="mx-1"
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
        <ProFormText
          name="eventType"
          label={formatMessage({ id: 'table.title.type' })}
          placeholder={formatMessage({ id: 'alarm.form.placeholder.eventType' })}
          rules={[
            { required: true, message: formatMessage({ id: 'alarm.form.placeholder.eventType' }) },
          ]}
        />
        <ProFormTextArea
          name="expr"
          label={formatMessage({ id: 'alarm.table.title.exprDefine.expr' })}
          placeholder={formatMessage({ id: 'alarm.form.placeholder.expr' })}
          rules={[
            { required: true, message: formatMessage({ id: 'alarm.form.placeholder.expr' }) },
          ]}
        />
      </ProFormList>
      <ProFormText
        name="description"
        label={formatMessage({ id: 'table.title.desc' })}
        placeholder={formatMessage({ id: 'form.placeholder.desc' })}
      />
    </ModalForm>
  );
};

export default UpdateRule;
