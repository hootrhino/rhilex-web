import { message } from '@/components/PopupHack';
import {
  getCecollasDetail,
  postCecollasCreate,
  putCecollasUpdate,
} from '@/services/rhilex/yunbianxietong';
import { DEFAULT_GROUP_KEY_CECOLLAS } from '@/utils/constant';
import type { ProFormInstance } from '@ant-design/pro-components';
import { BetaSchemaForm } from '@ant-design/pro-components';
import { useIntl, useRequest } from '@umijs/max';
import { useEffect, useRef } from 'react';
import { CecollasFormItem, columns } from '../columns';
import { CecollasType, Mode } from '../enum';

const initialValues = {
  type: CecollasType.TENCENT_IOTHUB_CEC,
  gid: DEFAULT_GROUP_KEY_CECOLLAS,
  config: {
    mode: Mode.GATEWAY,
  },
};

type UpdateProps = {
  uuid?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reload: () => void;
};

const Update = ({ uuid, open, reload, ...props }: UpdateProps) => {
  const formRef = useRef<ProFormInstance>();
  const { formatMessage } = useIntl();

  // 获取详情
  const { data: detail, run: getDetail } = useRequest(
    (params: API.getCecollasDetailParams) => getCecollasDetail(params),
    {
      manual: true,
    },
  );

  useEffect(() => {
    if (uuid && open) {
      getDetail({ uuid });
    }
  }, [uuid, open]);

  useEffect(() => {
    if (detail) {
      formRef.current?.setFieldsValue(detail);
    }
  }, [detail]);

  return (
    <BetaSchemaForm<CecollasFormItem>
      formRef={formRef}
      title={formatMessage({ id: `cecollas.title.${uuid ? 'update' : 'new'}` })}
      layoutType="ModalForm"
      open={open}
      autoFocusFirstInput
      initialValues={initialValues}
      modalProps={{ destroyOnClose: true, maskClosable: false }}
      onFinish={async (values) => {
        try {
          if (uuid) {
            await putCecollasUpdate({ ...values, uuid });
          } else {
            await postCecollasCreate(values);
          }
          reload();
          message.success(formatMessage({ id: `message.success.${uuid ? 'update' : 'new'}` }));
          return true;
        } catch (error) {
          return false;
        }
      }}
      columns={columns}
      {...props}
    ></BetaSchemaForm>
  );
};

export default Update;
