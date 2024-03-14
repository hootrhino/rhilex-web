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
import { useModel } from '@umijs/max';
import { Card } from 'antd';
import { useEffect, useRef } from 'react';
import type { InterfaceItem } from '.';
import { baudRateEnum, dataBitsEnum, parityEnum, stopBitsEnum, typeOptions } from './enum';

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

  // 更新接口配置
  const handleOnFinish = async ({ config }: InterfaceFormParams) => {
    try {
      const params: UpdateParams = {
        uuid: detail?.uuid || '',
        config: config?.[0],
      };

      await postHwifaceUpdate(params);
      message.success('更新成功');
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
      title="更新接口"
      modalProps={{ destroyOnClose: true, maskClosable: false }}
      onFinish={handleOnFinish}
      {...props}
    >
      <ProForm.Group>
        <ProFormText
          name="name"
          label="接口名称"
          placeholder="请输入接口名称"
          width="sm"
          disabled
          required
        />
        <ProFormSelect
          name="type"
          label="接口类型"
          placeholder="请选择接口类型"
          width="sm"
          disabled
          required
          options={typeOptions}
        />
        <ProFormText
          name="alias"
          label="别名"
          placeholder="请输入别名"
          width="sm"
          rules={[{ required: true, message: '请输入别名' }]}
        />
      </ProForm.Group>
      <ProFormList
        name="config"
        label="接口配置"
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
            label={<UnitTitle title="超时时间" />}
            width="sm"
            placeholder="请输入超时时间"
            rules={[{ required: true, message: '请输入超时时间' }]}
          />
          <ProFormSelect
            label="波特率"
            name="baudRate"
            width="sm"
            valueEnum={baudRateEnum}
            placeholder="请选择波特率"
            rules={[{ required: true, message: '请选择波特率' }]}
          />
          <ProFormSelect
            label="数据位"
            name="dataBits"
            width="sm"
            valueEnum={dataBitsEnum}
            placeholder="请选择数据位"
            rules={[{ required: true, message: '请选择数据位' }]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            label="奇偶校验"
            name="parity"
            width="sm"
            valueEnum={parityEnum}
            placeholder="请选择奇偶校验"
            rules={[{ required: true, message: '请选择奇偶校验' }]}
          />
          <ProFormSelect
            label="停止位"
            name="stopBits"
            width="sm"
            valueEnum={stopBitsEnum}
            placeholder="请选择停止位"
            rules={[{ required: true, message: '请选择停止位' }]}
          />
          <ProFormText
            label="串口路径"
            name="uart"
            width="sm"
            placeholder="请输入本地系统的串口路径"
            disabled
            required
          />
        </ProForm.Group>
      </ProFormList>
      <ProFormText name="description" label="备注" placeholder="请输入备注" />
    </ModalForm>
  );
};

export default Update;
