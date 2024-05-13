import { message } from '@/components/PopupHack';
import UnitTitle from '@/components/UnitTitle';
import { postHwifaceUpdate } from '@/services/rulex/jiekouguanli';
import type { ModalFormProps, ProFormInstance } from '@ant-design/pro-components';
import {
  ModalForm,
  ProForm,
  ProFormDigit,
  ProFormList,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useIntl, useModel } from '@umijs/max';
import { Card } from 'antd';
import { useEffect, useRef } from 'react';
import type { InterfaceItem } from '..';
import { baudRateEnum, dataBitsEnum, parityEnum, stopBitsEnum, typeOption } from '../enum';

type UpdateProps = ModalFormProps<any> & {
  uuid: string;
  reload: () => void;
};

type InterfaceFormParams = InterfaceItem & {
  config: {
    timeout: number;
    baudRate: number;
    dataBits: number;
    parity: string;
    stopBits: number;
    uart: string;
  };
};

type UpdateParams = {
  uuid: string;
  config: Record<string, any>;
};

const Update = ({ reload, uuid, ...props }: UpdateProps) => {
  const formRef = useRef<ProFormInstance>();
  const { detail, getDetail } = useModel('usePort');
  const { formatMessage } = useIntl();

  // 更新接口配置
  const handleOnFinish = async ({ config }: InterfaceFormParams) => {
    try {
      const params: UpdateParams = {
        uuid: detail?.uuid || '',
        config: config?.[0],
      };

      await postHwifaceUpdate(params);
      message.success(formatMessage({ id: 'message.success.update' }));
      reload();
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    if (uuid) {
      getDetail({ uuid }).then((data) =>
        formRef.current?.setFieldsValue({ ...data, config: [data?.config] }),
      );
    }
  }, [uuid]);

  return (
    <ModalForm
      formRef={formRef}
      title={formatMessage({ id: 'portMgt.modal.title.update' })}
      modalProps={{ destroyOnClose: true, maskClosable: false }}
      onFinish={handleOnFinish}
      {...props}
    >
      <ProForm.Group>
        <ProFormText
          name="name"
          label={formatMessage({ id: 'portMgt.form.title.name' })}
          placeholder={formatMessage({ id: 'portMgt.form.placeholder.name' })}
          width="sm"
          disabled
          required
        />
        <ProFormSelect
          name="type"
          label={formatMessage({ id: 'portMgt.form.title.type' })}
          placeholder={formatMessage({ id: 'portMgt.form.placeholder.type' })}
          width="sm"
          disabled
          required
          options={typeOption}
        />
        <ProFormText
          name="alias"
          label={formatMessage({ id: 'portMgt.form.title.alias' })}
          placeholder={formatMessage({ id: 'portMgt.form.placeholder.alias' })}
          width="sm"
          rules={[
            { required: true, message: formatMessage({ id: 'portMgt.form.placeholder.alias' }) },
          ]}
        />
      </ProForm.Group>
      <ProFormList
        name="config"
        label={formatMessage({ id: 'portMgt.form.title.config' })}
        creatorButtonProps={false}
        copyIconProps={false}
        deleteIconProps={false}
        itemContainerRender={(doms) => (
          <Card type="inner" styles={{ body: { padding: '16px 18px' } }}>
            {doms}
          </Card>
        )}
      >
        <ProForm.Group>
          <ProFormDigit
            name="timeout"
            label={<UnitTitle title={formatMessage({ id: 'portMgt.form.title.timeout' })} />}
            width="sm"
            placeholder={formatMessage({ id: 'portMgt.form.placeholder.timeout' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'portMgt.form.placeholder.timeout' }),
              },
            ]}
          />
          <ProFormSelect
            label={formatMessage({ id: 'portMgt.form.title.baudRate' })}
            name="baudRate"
            width="sm"
            valueEnum={baudRateEnum}
            placeholder={formatMessage({ id: 'portMgt.form.placeholder.baudRate' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'portMgt.form.placeholder.baudRate' }),
              },
            ]}
          />
          <ProFormSelect
            label={formatMessage({ id: 'portMgt.form.title.dataBits' })}
            name="dataBits"
            width="sm"
            valueEnum={dataBitsEnum}
            placeholder={formatMessage({ id: 'portMgt.form.placeholder.dataBits' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'portMgt.form.placeholder.dataBits' }),
              },
            ]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            label={formatMessage({ id: 'portMgt.form.title.parity' })}
            name="parity"
            width="sm"
            valueEnum={parityEnum}
            placeholder={formatMessage({ id: 'portMgt.form.placeholder.parity' })}
            rules={[
              { required: true, message: formatMessage({ id: 'portMgt.form.placeholder.parity' }) },
            ]}
          />
          <ProFormSelect
            label={formatMessage({ id: 'portMgt.form.title.stopBits' })}
            name="stopBits"
            width="sm"
            valueEnum={stopBitsEnum}
            placeholder={formatMessage({ id: 'portMgt.form.placeholder.stopBits' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'portMgt.form.placeholder.stopBits' }),
              },
            ]}
          />
          <ProFormText
            label={formatMessage({ id: 'portMgt.form.title.uart' })}
            name="uart"
            width="sm"
            placeholder={formatMessage({ id: 'portMgt.form.placeholder.uart' })}
            disabled
            required
          />
        </ProForm.Group>
      </ProFormList>
      <ProFormText
        name="description"
        label={formatMessage({ id: 'table.desc' })}
        placeholder={formatMessage({ id: 'placeholder.desc' })}
      />
    </ModalForm>
  );
};

export default Update;
