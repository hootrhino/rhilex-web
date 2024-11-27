import CodeEditor, { Lang } from '@/components/CodeEditor';
import PageContainer from '@/components/ProPageContainer';
import RuleExample from '@/components/RuleExample';
import { getCecollasDetail, putCecollasUpdateAction } from '@/services/rhilex/yunbianxietong';
import { CECOLLAS_LIST } from '@/utils/constant';
import {
  FooterToolbar,
  ProCard,
  ProForm,
  ProFormInstance,
  ProFormProps,
} from '@ant-design/pro-components';
import { history, useIntl, useParams, useRequest } from '@umijs/max';
import { Button, message, Popconfirm } from 'antd';
import { useEffect, useRef } from 'react';
import { CecollasItem } from '..';
import { formatLuaCode } from '@/components/CodeEditor/utils';

export type ActionModalParams = {
  uuid?: string;
  initialValue?: string;
};

type ActionModalProps = ProFormProps;

const ActionModal = ({ ...props }: ActionModalProps) => {
  const { formatMessage } = useIntl();
  const formRef = useRef<ProFormInstance>();
  const { uuid } = useParams();

  // 格式化代码
  const handleOnFormatCode = async () => {
    const code = formRef.current?.getFieldValue('action');
    const formatCode = formatLuaCode(code);

    formRef.current?.setFieldsValue({ action: formatCode });
  };

  // 获取详情
  const { data: detail, run: getDetail } = useRequest(
    (params: API.getCecollasDetailParams) => getCecollasDetail(params),
    {
      manual: true,
    },
  );

  // 重置
  const handleOnReset = (data?: CecollasItem) => {
    formRef.current?.setFieldsValue({ action: data?.action || '' });
  };

  useEffect(() => {
    if (uuid) {
      getDetail({ uuid });
    }
  }, [uuid]);

  useEffect(() => {
    handleOnReset(detail);
  }, [detail]);

  return (
    <PageContainer
      onBack={() => history.push(CECOLLAS_LIST)}
      title={formatMessage({ id: 'cecollas.title.action' }, { name: detail?.name })}
    >
      <ProCard>
        <ProForm
          formRef={formRef}
          onFinish={async ({ action }) => {
            if (!uuid) return;
            const params = {
              uuid,
              action,
            };

            await putCecollasUpdateAction(params);
            message.success(formatMessage({ id: 'message.success.update' }));
          }}
          submitter={{
            render: ({ reset, submit }) => (
              <FooterToolbar>
                <Popconfirm
                  key="reset"
                  title={formatMessage({ id: 'component.popconfirm.title.reset' })}
                  onConfirm={() => {
                    reset();
                    handleOnReset(detail);
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
          {...props}
        >
          <ProForm.Item
            rootClassName="rule-label"
            label={<RuleExample name="" handleOnFormatCode={handleOnFormatCode} />}
            name="action"
          >
            <CodeEditor key="action" minHeight="400px" lang={Lang.LUA} />
          </ProForm.Item>
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default ActionModal;
