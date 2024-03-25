import { message } from '@/components/PopupHack';
import { getGoodsDetail, postGoodsCreate, putGoodsUpdate } from '@/services/rulex/kuozhanxieyi';
import { omit } from '@/utils/redash';
import type { ModalFormProps, ProFormInstance } from '@ant-design/pro-components';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormUploadDragger,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import type { UploadFile } from 'antd/es/upload/interface';
import { useEffect, useRef, useState } from 'react';

type FormParams = {
  net_addr: string;
  args: string[];
  description?: string;
  upload: UploadFile;
};

export type DetailItem = {
  uuid?: string;
  pid?: number;
  running?: boolean;
  autoStart?: boolean;
  goodsType?: string;
  executeType?: string;
  local_path?: string;
  net_addr?: string;
  description?: string;
  args?: string[];
  processDetail?: {
    ImageName?: string;
    PID?: string;
    SessionName?: string;
    SessionNum?: string;
  };
};

type UpdateFormProps = ModalFormProps<any> & {
  uuid: string;
  reload: () => void;
};

export const defaultValue = {
  net_addr: '127.0.0.1:8080',
  description: '',
  args: ['-arg1=hello -arg2=rulex'],
  local_path: '',
  running: false,
  upload: undefined,
  uuid: '',
};

const UpdateForm = ({ uuid, reload, onOpenChange, ...props }: UpdateFormProps) => {
  const formRef = useRef<ProFormInstance>();
  const [formData, setFormData] = useState<DetailItem>(defaultValue);

  // 详情
  const { run: getDetail } = useRequest(
    (params: API.getGoodsDetailParams) => getGoodsDetail(params),
    {
      manual: true,
      onSuccess: (data) => setFormData(data),
    },
  );

  // 新建&编辑
  const handleOnFinish = async (params: FormParams) => {
    try {
      const uploadFile = params?.upload?.[0]?.originFileObj;

      if (formData?.uuid) {
        await putGoodsUpdate(
          { ...omit(params, ['upload']), uuid: formData?.uuid } as any,
          uploadFile as File,
        );
        message.success('更新成功');
      } else {
        await postGoodsCreate(omit(params, ['upload']) as any, uploadFile as File);
        message.success('新建成功');
      }

      reload();
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    formRef.current?.setFieldsValue({ ...formData });
  }, [formData]);

  useEffect(() => {
    if (uuid) {
      getDetail({ uuid });
    } else {
      setFormData(defaultValue);
    }
  }, [uuid]);

  return (
    <ModalForm
      title={formData?.uuid ? '更新协议' : '新建协议'}
      formRef={formRef}
      width="40%"
      layout="horizontal"
      labelCol={{ span: 4 }}
      onOpenChange={(visible) => {
        onOpenChange!(visible);
        setFormData(defaultValue);
      }}
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
      }}
      initialValues={defaultValue}
      onFinish={handleOnFinish}
      {...props}
    >
      <ProFormText
        name="net_addr"
        label="接口地址"
        placeholder="请输入接口地址"
        rules={[{ required: true, message: '请输入接口地址' }]}
      />
      <ProFormTextArea
        name="args"
        label="协议参数"
        placeholder="请输入协议参数"
        rules={[{ required: true, message: '请输入协议参数' }]}
      />
      <ProFormUploadDragger
        label="可执行包"
        name="upload"
        max={1}
        description=""
        rules={[{ required: true, message: '请上传可执行包' }]}
        width="xl"
      />
      <ProFormText name="description" label="备注" placeholder="请输入备注" />
    </ModalForm>
  );
};

export default UpdateForm;
