import type { EdgeConfig } from '@/models/useEditor';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ProForm,
  ProFormDependency,
  ProFormDigit,
  ProFormSelect,
} from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { ColorPicker, Divider } from 'antd';
import { useRef } from 'react';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const EdgeSetting = () => {
  const { edgeConfig, setEdgeConfig } = useModel('useEditor');
  const formRef = useRef<ProFormInstance>();

  const handleOnValuesChange = (changeValues: EdgeConfig) => {
    const line = { ...edgeConfig?.line };
    let arrowType = edgeConfig.arrowType;
    let move = edgeConfig.move;
    let fontSize = edgeConfig.text.fontSize;
    let strokeWidth = edgeConfig.line.strokeWidth;

    switch (changeValues?.lineType) {
      case 'dotted':
        line.strokeDasharray = 5;
        break;
      case 'solid':
        line.strokeDasharray = null;
        break;
    }

    switch (changeValues?.move) {
      case 'true':
        move = 'true';
        line.style = {
          animation: 'dotted-line 30s infinite linear',
        };
        break;
      case 'false':
        move = 'false';
        line.style = {
          animation: false,
        };
        break;
    }

    switch (changeValues?.arrowType) {
      case 'forward':
        arrowType = 'forward';
        line.targetMarker = 'classic';
        line.sourceMarker = '';
        break;
      case 'reverse':
        arrowType = 'reverse';
        line.targetMarker = '';
        line.sourceMarker = 'classic';
        break;
      case 'two-way':
        arrowType = 'forward';
        line.targetMarker = 'classic';
        line.sourceMarker = 'classic';
        break;
      case 'none':
        arrowType = 'none';
        line.targetMarker = '';
        line.sourceMarker = '';
        break;
    }

    if (changeValues?.text?.fontSize) {
      fontSize = changeValues?.text?.fontSize;
    }

    if (changeValues?.line?.strokeWidth) {
      strokeWidth = changeValues?.line?.strokeWidth;
    }

    setEdgeConfig({
      ...edgeConfig,
      line: {
        ...line,
        strokeWidth
      },
      text: {
        ...edgeConfig.text,
        fontSize,
      },
      arrowType,
      move,
    });
  };

  return (
    <ProForm
      {...formItemLayout}
      formRef={formRef}
      layout="horizontal"
      submitter={false}
      className="px-[10px] py-[20px]"
      initialValues={edgeConfig}
      onValuesChange={handleOnValuesChange}
    >
      <ProFormSelect
        label="线条类型"
        name="lineType"
        options={[
          { label: '实线', value: 'solid' },
          { label: '虚线', value: 'dotted' },
          { label: '管道', value: 'pipeline' },
        ]}
      />
      <ProFormDependency name={['lineType']}>
        {({ lineType }) => {
          if (lineType === 'dotted') {
            return (
              <ProFormSelect
                options={[
                  {
                    value: 'true',
                    label: '是',
                  },
                  {
                    value: 'false',
                    label: '否',
                  },
                ]}
                width="md"
                name="move"
                label="线条流动"
              />
            );
          }
          return null;
        }}
      </ProFormDependency>
      <ProFormSelect
        label="箭头类型"
        name="arrowType"
        options={[
          { label: '正向', value: 'forward' },
          { label: '逆向', value: 'reverse' },
          { label: '双向', value: 'two-way' },
          { label: '无', value: 'none' },
        ]}
      />
      <ProForm.Item label="线条颜色" name={['line', 'stroke']}>
        <ColorPicker
          className="w-full"
          format="hex"
          onChange={(value) => {
            setEdgeConfig({
              ...edgeConfig,
              line: {
                ...edgeConfig.line,
                stroke: value.toHexString(),
              },
            });
          }}
        />
      </ProForm.Item>
      <ProFormDigit label="线条宽度" name={['line', 'strokeWidth']} />
      <Divider />
      <ProForm.Item label="标签颜色" name={['text', 'fill']}>
        <ColorPicker
          className="w-full"
          format="hex"
          onChange={(value) => {
            setEdgeConfig({
              ...edgeConfig,
              text: {
                ...edgeConfig.text,
                fill: value.toHexString(),
              },
            });
          }}
        />
      </ProForm.Item>
      <ProFormDigit label="标签字号" name={['text', 'fontSize']} />
    </ProForm>
  );
};

export default EdgeSetting;
