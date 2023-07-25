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
    let line = { ...edgeConfig?.line };
    let arrowType = edgeConfig.arrowType;
    let lineType = edgeConfig.lineType;
    let move = edgeConfig.move;
    let fontSize = edgeConfig.text.fontSize;

    switch (changeValues?.lineType) {
      case 'dotted':
        line = {
          ...line,
          strokeDasharray: 5,
        };

        lineType = 'dotted';
        break;
      case 'solid':
        line = {
          ...line,
          strokeDasharray: null,
        };

        lineType = 'solid';
        break;
      case 'pipeline':
        lineType = 'pipeline';
      default:
        break;
    }

    switch (changeValues?.move) {
      case 'true':
        move = 'true';
        line = {
          ...line,
          style: {
            ...line.style,
            animation: 'dotted-line 30s infinite linear',
          },
        };
        break;
      case 'false':
        move = 'false';
        line = {
          ...line,
          style: {
            ...line.style,
            animation: false,
          },
        };
        break;
      default:
        break;
    }

    switch (changeValues?.arrowType) {
      case 'forward':
        arrowType = 'forward';
        line = {
          ...line,
          targetMarker: 'classic',
          sourceMarker: '',
        };
        break;
      case 'reverse':
        arrowType = 'reverse';
        line = {
          ...line,
          targetMarker: '',
          sourceMarker: 'classic',
        };
        break;
      case 'two-way':
        arrowType = 'forward';
        line = {
          ...line,
          targetMarker: 'classic',
          sourceMarker: 'classic',
        };
        break;
      case 'none':
        arrowType = 'none';
        line = {
          ...line,
          targetMarker: '',
          sourceMarker: '',
        };
        break;
      default:
        break;
    }

    if (changeValues?.text?.fontSize) {
      fontSize = changeValues?.text?.fontSize;
    }

    if (changeValues?.line?.strokeWidth) {
      line = {
        ...line,
        strokeWidth: changeValues?.line?.strokeWidth,
      };
    }

    setEdgeConfig({
      ...edgeConfig,
      line,
      text: {
        ...edgeConfig.text,
        fontSize,
      },
      pipeline: changeValues?.pipeline || edgeConfig.pipeline,
      arrowType,
      lineType,
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
      <ProFormDependency name={['lineType']}>
        {({ lineType }) => {
          if (lineType === 'pipeline') {
            return (
              <>
                <ProForm.Item label="管道背景" name={['pipeline', 'strokeBg']}>
                  <ColorPicker
                    className="w-full"
                    format="hex"
                    onChange={(value) => {
                      setEdgeConfig({
                        ...edgeConfig,
                        pipeline: {
                          ...edgeConfig.pipeline,
                          strokeBg: value.toHexString(),
                        },
                      });
                    }}
                  />
                </ProForm.Item>
                <ProForm.Item label="流动颜色" name={['pipeline', 'blockBg']}>
                  <ColorPicker
                    className="w-full"
                    format="hex"
                    onChange={(value) => {
                      setEdgeConfig({
                        ...edgeConfig,
                        pipeline: {
                          ...edgeConfig.pipeline,
                          blockBg: value.toHexString(),
                        },
                      });
                    }}
                  />
                </ProForm.Item>
                <ProFormSelect
                  label="流动方向"
                  name={['pipeline', 'type']}
                  options={[
                    { label: '正向', value: 'forward' },
                    { label: '逆向', value: 'reverse' },
                  ]}
                />
              </>
            );
          }
          return (
            <>
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
            </>
          );
        }}
      </ProFormDependency>

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
