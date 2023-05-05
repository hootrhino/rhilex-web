import {
  ProCard,
  ProForm,
  ProFormDigit,
  ProFormList,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { DEFAULT_REGISTER_CONFIG } from './BaseForm';

const RegisterConfigForm = () => {
  return (
    <ProForm.Group title="寄存器配置">
      <ProFormList
        name={['config', 'registers']}
        creatorRecord={DEFAULT_REGISTER_CONFIG}
        creatorButtonProps={{ position: 'top' }}
        min={1}
        itemRender={({ listDom, action }, { record }) => {
          return (
            <ProCard
              bordered
              extra={action}
              title={record?.name}
              style={{
                marginBlockEnd: 8,
              }}
            >
              {listDom}
            </ProCard>
          );
        }}
      >
        <ProForm.Group>
          <ProFormText
            width="lg"
            label="数据标签"
            name="tag"
            placeholder="请输入数据标签"
            rules={[
              {
                required: true,
                message: '请输入数据标签',
              },
            ]}
          />
          <ProFormDigit
            width="lg"
            label="权重系数"
            name="weight"
            rules={[
              {
                required: true,
                message: '请输入权重系数',
              },
            ]}
          />
          <ProFormDigit
            width="lg"
            label="初始值"
            name="initValue"
            rules={[
              {
                required: true,
                message: '请输入初始值',
              },
            ]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            width="lg"
            label="Modbus 功能"
            name="function"
            placeholder="请选择 Modbus 功能"
            rules={[{ required: true, message: '请选择 Modbus 功能' }]}
            options={[
              { label: '01 读线圈状态', value: 1 },
              { label: '02 读离散输入状态', value: 2 },
              { label: '03 读保持寄存器', value: 3 },
              { label: '04 读输入寄存器', value: 4 },
              { label: '05 写单个线圈', value: 5 },
              { label: '06 写单个保持寄存器', value: 6 },
              { label: '15 写多个线圈', value: 15 },
              { label: '16 写多个保持寄存器', value: 16 },
            ]}
          />
          <ProFormDigit
            width="lg"
            label="从设备 ID"
            name="slaverId"
            placeholder="请输入从机 ID"
            rules={[
              {
                required: true,
                message: '请输入从设备 ID',
              },
              {
                max: 255,
                type: 'integer',
                message: '从设备 ID 在 1-255 之间',
              },
              {
                min: 1,
                type: 'integer',
                message: '从设备 ID 在 1-255 之间',
              },
            ]}
          />
          <ProFormDigit
            width="lg"
            label="起始地址"
            name="address"
            placeholder="请输入起始地址"
            rules={[
              {
                required: true,
                message: '请输入起始地址',
              },
              {
                max: 65535,
                type: 'integer',
                message: '起始地址在 0-65535 之间',
              },
            ]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormDigit
            width="lg"
            label="读取数量"
            name="quantity"
            placeholder="请输入读取数量"
            rules={[
              {
                required: true,
                message: '请输入读取数量',
              },
              {
                min: 1,
                type: 'integer',
                message: '读取数量在 1-255 之间',
              },
              {
                max: 255,
                type: 'integer',
                message: '读取数量在 1-255 之间',
              },
            ]}
          />
        </ProForm.Group>
      </ProFormList>
    </ProForm.Group>
  );
};

export default RegisterConfigForm;
