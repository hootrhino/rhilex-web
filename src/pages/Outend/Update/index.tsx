import { message } from '@/components/PopupHack';
import ProBetaSchemaForm from '@/components/ProBetaSchemaForm';
import PageContainer from '@/components/ProPageContainer';
import useBeforeUnloadConfirm from '@/hooks/useBeforeUnload';
import {
  getOutendsDetail,
  postOutendsCreate,
  putOutendsUpdate,
} from '@/services/rhilex/shuchuziyuanguanli';
import { OUTEND_LIST } from '@/utils/constant';
import { convertConfig, filterUndefined, formatHeaders, generateRandomId } from '@/utils/utils';
import type { ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components';
import { history, useIntl, useParams, useRequest } from '@umijs/max';
import { useEffect, useRef, useState } from 'react';
import { columns } from '../Columns';
import { OutendType } from '../enum';
import { defaultConfig } from './initialValues';

export type UpdateFormItem = {
  name: string;
  type: string;
  config: Record<string, any>[];
};

const formatCommonConfig = ({ headers, ...formatConfig }: Record<string, any>) => {
  return filterUndefined({
    ...convertConfig(formatConfig),
    headers: formatHeaders(headers),
  });
};

const UpdateForm = () => {
  const formRef = useRef<ProFormInstance>();
  const { uuid } = useParams();
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState<boolean>(false);

  // 获取详情
  const { data: detail } = useRequest(() => getOutendsDetail({ uuid: uuid || '' }), {
    ready: !!uuid,
  });

  const handleOnFinish = async (values: any) => {
    setLoading(true);

    try {
      const params = {
        ...values,
        config: {
          ...values.config,
          commonConfig: formatCommonConfig(values.config?.commonConfig),
        },
      };

      if (uuid) {
        await putOutendsUpdate({ ...params, uuid });
        message.success(formatMessage({ id: 'message.success.update' }));
      } else {
        const { msg } = await postOutendsCreate(params);
        if (msg === 'Success') {
          message.success(formatMessage({ id: 'message.success.new' }));
        } else {
          message.warning(formatMessage({ id: 'outend.message.warning.new' }, { msg: msg }));
        }
      }

      setLoading(false);
      history.push(OUTEND_LIST);
      return true;
    } catch (error) {
      setLoading(false);
      history.push(OUTEND_LIST);
      return false;
    }
  };

  const handleOnReset = () => {
    if (detail) {
      formRef.current?.setFieldsValue({
        ...detail,
        config: {
          ...detail.config,
          commonConfig: formatCommonConfig(detail.config?.commonConfig),
        },
      });
    } else {
      formRef.current?.setFieldsValue({
        name: `OUTEND_${generateRandomId()}`,
        type: OutendType.MQTT,
        config: defaultConfig[OutendType.MQTT],
      });
    }
  };

  const handleOnValuesChange = (changedValue: UpdateFormItem) => {
    if (!changedValue?.type) return;
    const config = defaultConfig[changedValue?.type];

    formRef.current?.setFieldsValue({
      config: changedValue?.type === detail?.type ? detail?.config : config,
    });
  };

  useEffect(() => {
    handleOnReset();
  }, [detail]);

  useBeforeUnloadConfirm();

  return (
    <PageContainer
      showExtra
      title={formatMessage({ id: `outend.title.${uuid ? 'edit' : 'new'}` })}
      backUrl={OUTEND_LIST}
    >
      <ProBetaSchemaForm
        formRef={formRef}
        onFinish={handleOnFinish}
        onValuesChange={handleOnValuesChange}
        columns={columns as ProFormColumnsType<Record<string, any>>[]}
        loading={loading}
        handleOnReset={handleOnReset}
        rootClassName="outend-form"
      />
    </PageContainer>
  );
};

export default UpdateForm;
