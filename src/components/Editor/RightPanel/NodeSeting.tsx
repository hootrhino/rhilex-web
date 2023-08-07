import type { NodeForm } from '@/models/useEditor';
import { detailFormItemLayout } from '@/utils/constant';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm, ProFormDigit, ProFormSwitch } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { ColorPicker, Divider, InputNumber, Space } from 'antd';
import { useEffect, useRef } from 'react';

const NodeSetting = () => {
  const formRef = useRef<ProFormInstance>();
  const { nodeFormData, setNodeForm } = useModel('useEditor');

  const handleOnValuesChange = (changeValues: NodeForm) => {
    setNodeForm({
      ...nodeFormData,
      visible: changeValues?.visible,
      angle: changeValues?.angle,
      rotate: changeValues?.rotate,
      position: { ...nodeFormData?.position, ...changeValues?.position } as {
        x: number;
        y: number;
      },
      size: { ...nodeFormData?.size, ...changeValues?.size } as { width: number; height: number },
      attrs: { ...nodeFormData?.attrs, ...changeValues?.attrs },
    });
  };

  useEffect(() => {
    formRef.current?.setFieldsValue({ ...nodeFormData });
  }, [nodeFormData]);

  return (
    <ProForm
      {...detailFormItemLayout}
      formRef={formRef}
      layout="horizontal"
      submitter={false}
      className="px-[10px] py-[20px]"
      onValuesChange={handleOnValuesChange}
    >
      <ProForm.Item label="节点位置" className="mb-0">
        <Space>
          <ProForm.Item name={['position', 'x']}>
            <InputNumber placeholder="请输入X坐标" addonAfter="X" />
          </ProForm.Item>
          <ProForm.Item name={['position', 'y']}>
            <InputNumber placeholder="请输入Y坐标" addonAfter="Y" />
          </ProForm.Item>
        </Space>
      </ProForm.Item>
      <ProForm.Item label="节点尺寸" className="mb-0">
        <Space>
          <ProForm.Item name={['size', 'width']}>
            <InputNumber placeholder="请输入宽度" addonAfter="W" />
          </ProForm.Item>
          <ProForm.Item name={['size', 'height']}>
            <InputNumber placeholder="请输入高度" addonAfter="H" />
          </ProForm.Item>
        </Space>
      </ProForm.Item>
      <ProForm.Item label="旋转角度" name="angle">
        <InputNumber placeholder="请输入旋转角度" addonAfter="度" />
      </ProForm.Item>
      <ProForm.Item
        label="填充颜色"
        name={['attrs', 'body', 'fill']}
        transform={(value) => ({
          attrs: { body: { fill: typeof value === 'string' ? value : value?.toHexString() } },
        })}
      >
        <ColorPicker className="w-full" format="hex" />
      </ProForm.Item>
      <ProForm.Item
        label="边框颜色"
        name={['attrs', 'body', 'stroke']}
        transform={(value) => ({
          attrs: { body: { stroke: typeof value === 'string' ? value : value?.toHexString() } },
        })}
      >
        <ColorPicker className="w-full" format="hex" />
      </ProForm.Item>
      <ProFormDigit label="边框宽度" name={['attrs', 'body', 'strokeWidth']} />
      <ProFormSwitch checkedChildren="是" unCheckedChildren="否" label="是否可见" name="visible" />
      <ProFormSwitch checkedChildren="是" unCheckedChildren="否" label="自动旋转" name="rotate" />
      <Divider />
      <ProForm.Item
        label="标签颜色"
        name={['attrs', 'text', 'fill']}
        transform={(value) => ({
          attrs: { label: { fill: typeof value === 'string' ? value : value?.toHexString() } },
        })}
      >
        <ColorPicker className="w-full" format="hex" />
      </ProForm.Item>
      <ProFormDigit label="标签字号" name={['attrs', 'text', 'fontSize']} />
    </ProForm>
  );
};

export default NodeSetting;
