import { message } from '@/components/PopupHack';
import ProBetaSchemaForm from '@/components/ProBetaSchemaForm';
import PageContainer from '@/components/ProPageContainer';
import useBeforeUnloadConfirm from '@/hooks/useBeforeUnload';
import {
  getInendsDetail,
  postInendsCreate,
  putInendsUpdate,
} from '@/services/rhilex/shuruziyuanguanli';
import { generateRandomId } from '@/utils/utils';
import type { ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components';
import { history, useIntl, useParams, useRequest } from '@umijs/max';
import { useEffect, useRef, useState } from 'react';
import { columns } from '../Columns';
import { InendType } from '../enum';
import { defaultConfig } from './initialValues';

const DefaultListUrl = '/inend/list';

const UpdateForm = () => {
  const formRef = useRef<ProFormInstance>();
  const { uuid } = useParams();
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState<boolean>(false);
  const defaultValue = {
    name: `INEND_${generateRandomId()}`,
    type: InendType.COAP_SERVER,
    config: defaultConfig[InendType.COAP_SERVER],
  };

  // 获取详情
  const { data: detail } = useRequest(() => getInendsDetail({ uuid: uuid || '' }), {
    ready: !!uuid,
    refreshDeps: [uuid],
  });

  // 新建&编辑
  const handleOnFinish = async (values: any) => {
    setLoading(true);
    try {
      let params = {
        ...values,
      };

      if (uuid) {
        await putInendsUpdate({ ...params, uuid });
        message.success(formatMessage({ id: 'message.success.update' }));
      } else {
        const { msg } = await postInendsCreate(params);
        if (msg === 'Success') {
          message.success(formatMessage({ id: 'message.success.new' }));
        } else {
          message.warning(formatMessage({ id: 'inend.message.warning.new' }, { msg: msg }));
        }
      }
      setLoading(false);
      history.push(DefaultListUrl);
      return true;
    } catch (error) {
      setLoading(false);
      history.push(DefaultListUrl);
      return false;
    }
  };

  const handleOnValuesChange = (changedValue: any) => {
    if (!changedValue?.type) return;

    const config = defaultConfig[changedValue?.type];

    formRef.current?.setFieldsValue({
      config: changedValue?.type === detail?.type ? detail?.config : config,
    });
  };

  useEffect(() => {
    formRef.current?.setFieldsValue(detail || defaultValue);
  }, [detail]);

  useBeforeUnloadConfirm();

  return (
    <PageContainer
      showExtra
      title={
        uuid
          ? formatMessage({ id: 'inend.title.update' })
          : formatMessage({ id: 'inend.title.new' })
      }
      backUrl={DefaultListUrl}
    >
      <ProBetaSchemaForm
        formRef={formRef}
        onFinish={handleOnFinish}
        onValuesChange={handleOnValuesChange}
        columns={columns as ProFormColumnsType<Record<string, any>>[]}
        loading={loading}
        handleOnReset={() => formRef.current?.setFieldsValue(uuid ? detail : defaultValue)}
        rootClassName="inend-form"
      />
    </PageContainer>
  );
};

export default UpdateForm;
