import { ProForm,ProFormDigit,ProFormList,ProFormText } from '@ant-design/pro-components';

const TcpConfigForm = () => {
  return (
    <ProForm.Group title="TCP 配置">
      <ProFormList
        name={['config', 'tcpConfig']}
        creatorButtonProps={false}
        copyIconProps={false}
        deleteIconProps={false}
      >
        <ProForm.Group>
          <ProFormText
            width="lg"
            label="服务地址"
            name="host"
            rules={[{ required: true, message: '请输入服务地址' }]}
          />
          <ProFormDigit
            width="lg"
            label="服务端口"
            name="port"
            rules={[{ required: true, message: '请输入服务端口' }]}
          />
        </ProForm.Group>
      </ProFormList>
    </ProForm.Group>
  );
};

export default TcpConfigForm;
