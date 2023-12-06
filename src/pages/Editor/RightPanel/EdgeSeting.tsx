import type { EdgeForm } from '@/models/useEditor';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ProForm,
  ProFormDependency,
  ProFormDigit,
  ProFormSelect,
} from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { ColorPicker, Divider } from 'antd';
import { omit } from 'lodash';
import { useEffect, useRef } from 'react';

// 右侧表单 Layout 配置
export const detailFormItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const EdgeSetting = () => {
  const { edgeFormData, setEdgeForm, setEdgeData } = useModel('useEditor');
  const formRef = useRef<ProFormInstance>();

  const handleOnValuesChange = (changeValues: EdgeForm) => {
    let newData = {
      ...edgeFormData,
    };

    if (changeValues?.lineType) {
      newData = {
        ...newData,
        lineType: changeValues?.lineType,
      };
    }
    if (changeValues?.arrowType) {
      newData = {
        ...newData,
        arrowType: changeValues?.arrowType,
      };
    }

    if (changeValues?.line) {
      newData = {
        ...newData,
        line: {
          ...newData.line,
          ...changeValues?.line,
        },
      };
    }

    if (changeValues?.pipeline) {
      newData = {
        ...newData,
        pipeline: {
          ...newData.pipeline,
          ...changeValues?.pipeline,
        },
      };
    }

    if (changeValues?.label) {
      newData = {
        ...newData,
        label: {
          ...newData.label,
          ...changeValues?.label,
        },
      };
    }

    setEdgeForm(newData);
  };

  const handleOnUpdate = () => {
    let config = {
      markup: [{}],
      attrs: {
        line: {
          ...omit(edgeFormData.line, 'move'),
          strokeDasharray: 0,
          targetMarker: 'classic',
          sourceMarker: '',
          style: {
            animation: '',
          },
        },
        lines: {
          connection: true,
          fill: 'none',
          style: {
            animation: '',
          },
          stroke: 'transparent',
        },
      },
      labels: [
        {
          attrs: {
            label: {
              fill: edgeFormData?.label.fill,
              fontSize: edgeFormData?.label.fontSize,
            },
            body: {
              fill: edgeFormData?.label.bodyFill,
            },
          },
          position: {
            offset: edgeFormData?.label.offset,
          },
        },
      ],
    };

    if (edgeFormData.lineType === 'pipeline') {
      config = {
        ...config,
        markup: [
          {
            tagName: 'path',
            selector: 'wrap',
            groupSelector: 'lines',
          },
          {
            tagName: 'path',
            selector: 'line',
            groupSelector: 'lines',
          },
        ],
        attrs: {
          lines: {
            ...config.attrs.lines,
            connection: true,
            fill: 'none',
            style: {
              animation: '',
            },
            stroke: edgeFormData.pipeline.bg,
          },
          line: {
            ...config.attrs.line,
            strokeWidth: 8,
            strokeDashoffset: 20,
            stroke: edgeFormData.pipeline.fill,
            strokeDasharray: '10,20',
            style: {
              animation: `${edgeFormData.pipeline.type}-line 15s linear infinite`,
            },
          } as any,
        },
      };
    }

    if (edgeFormData?.lineType === 'dotted') {
      config = {
        ...config,
        attrs: {
          ...config?.attrs,
          line: {
            ...config?.attrs?.line,
            strokeDasharray: 5,
            style: {
              ...config?.attrs?.line?.style,
              animation:
                edgeFormData?.line?.move === 'true' ? 'dotted-line 30s infinite linear' : '',
            },
          },
        },
      };
    }

    if (edgeFormData.arrowType === 'reverse') {
      config = {
        ...config,
        attrs: {
          ...config.attrs,
          line: {
            ...config.attrs.line,
            targetMarker: '',
            sourceMarker: 'classic',
          },
        },
      };
    }
    if (edgeFormData.arrowType === 'both') {
      config = {
        ...config,
        attrs: {
          ...config.attrs,
          line: {
            ...config.attrs.line,
            targetMarker: 'classic',
            sourceMarker: 'classic',
          },
        },
      };
    }
    if (edgeFormData.arrowType === 'none') {
      config = {
        ...config,
        attrs: {
          ...config.attrs,
          line: {
            ...config.attrs.line,
            targetMarker: '',
            sourceMarker: '',
          },
        },
      };
    }

    setEdgeData({ ...config });
  };

  useEffect(() => {
    handleOnUpdate();
    formRef.current?.setFieldsValue({ ...edgeFormData });
  }, [edgeFormData]);

  return (
    <ProForm
      {...detailFormItemLayout}
      formRef={formRef}
      layout="horizontal"
      submitter={false}
      className="px-[10px] py-[20px]"
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
                name={['line', 'move']}
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
          { label: '双向', value: 'both' },
          { label: '无', value: 'none' },
        ]}
      />
      <ProFormDependency name={['lineType']}>
        {({ lineType }) => {
          if (lineType === 'pipeline') {
            return (
              <>
                <ProForm.Item
                  label="管道背景"
                  name={['pipeline', 'bg']}
                  transform={(value) => ({
                    pipeline: { bg: typeof value === 'string' ? value : value?.toHexString() },
                  })}
                >
                  <ColorPicker className="w-full" format="hex" />
                </ProForm.Item>
                <ProForm.Item
                  label="流动颜色"
                  name={['pipeline', 'fill']}
                  transform={(value) => ({
                    pipeline: { fill: typeof value === 'string' ? value : value?.toHexString() },
                  })}
                >
                  <ColorPicker className="w-full" format="hex" />
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
              <ProForm.Item
                label="线条颜色"
                name={['line', 'stroke']}
                transform={(value) => ({
                  line: { stroke: typeof value === 'string' ? value : value?.toHexString() },
                })}
              >
                <ColorPicker className="w-full" format="hex" />
              </ProForm.Item>
              <ProFormDigit label="线条宽度" name={['line', 'strokeWidth']} />
            </>
          );
        }}
      </ProFormDependency>

      <Divider />
      <ProForm.Item
        label="标签颜色"
        name={['label', 'fill']}
        transform={(value) => ({
          label: { fill: typeof value === 'string' ? value : value?.toHexString() },
        })}
      >
        <ColorPicker className="w-full" format="hex" />
      </ProForm.Item>
      <ProForm.Item
        label="标签背景"
        name={['label', 'bodyFill']}
        transform={(value) => ({
          label: { bodyFill: typeof value === 'string' ? value : value?.toHexString() },
        })}
      >
        <ColorPicker className="w-full" format="hex" />
      </ProForm.Item>
      <ProFormDigit label="标签字号" name={['label', 'fontSize']} />
      <ProFormDigit label="标签偏移" name={['label', 'offset']} />
    </ProForm>
  );
};

export default EdgeSetting;
