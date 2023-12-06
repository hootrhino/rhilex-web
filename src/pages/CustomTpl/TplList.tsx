import { message } from '@/components/PopupHack';
import ProCodeEditor from '@/components/ProCodeEditor';
import { deleteUserluaDel } from '@/services/rulex/yonghuLUApianduan';
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProFormText, ProTable } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button } from 'antd';
import { useRef, useState } from 'react';

type CustomTplItem = {
  gid?: string;
  uuid?: string;
  label?: string;
  apply?: string;
  type?: string;
};

type FormParams = {
  label: string;
  apply: string;
  detail: string;
};

// type UpdateParams = FormParams & {
//   gid: string;
//   type: string;
// }

type TplListProps = {
  activeGroup: string;
  dataSource: any[];
  refresh: () => void;
};

const TplList = ({ activeGroup, dataSource, refresh }: TplListProps) => {
  const formRef = useRef<ProFormInstance>();
  const [open, setOpen] = useState<boolean>(false);

  // TODO 详情

  // TODO 新建表单
  const handleOnFinish = async (values: FormParams) => {
    try {
      const params = {
        ...values,
        gid: activeGroup,
        type: 'function',
      };
      console.log(values, params);
      refresh();
      return true;
    } catch (error) {
      return false;
    }
  };

  // 删除
  const { run: remove } = useRequest(
    (params: API.deleteUserluaDelParams) => deleteUserluaDel(params),
    {
      manual: true,
      onSuccess: () => {
        refresh();
        message.success('删除成功');
      },
    },
  );

  const columns: ProColumns<Partial<CustomTplItem>>[] = [
    {
      title: '模板名称',
      dataIndex: 'label',
    },
    {
      title: '代码',
      dataIndex: 'apply',
      valueType: 'code',
    },
    {
      title: '描述',
      dataIndex: 'detail',
      ellipsis: true,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 80,
      fixed: 'right',
      render: (_, { uuid }) => [
        <a
          key="edit"
          onClick={() => {
            setOpen(true);
          }}
        >
          编辑
        </a>,
        <a key="remove" onClick={() => uuid && remove({ uuid })}>
          删除
        </a>,
      ],
    },
  ];

  return (
    <>
      <ProTable
        rowKey="uuid"
        columns={columns}
        search={false}
        pagination={false}
        dataSource={dataSource}
        toolBarRender={() => [
          <Button type="primary" key="add" onClick={() => setOpen(true)} icon={<PlusOutlined />}>
            新建
          </Button>,
        ]}
      />
      <ModalForm
        title="新增自定义模板"
        open={open}
        onOpenChange={(visible) => setOpen(visible)}
        formRef={formRef}
        modalProps={{ destroyOnClose: true }}
        onFinish={handleOnFinish}
        width="50%"
      >
        <ProFormText
          name="label"
          label="模板名称"
          placeholder="请输入模板名称"
          rules={[{ required: true, message: '请输入模板名称' }]}
        />
        <ProCodeEditor
          name="apply"
          label="代码"
          ref={formRef}
          required
          showTpl={false}
          collapsible={false}
        />
        <ProFormText
          name="detail"
          label="备注"
          placeholder="请输入模板描述"
          rules={[{ required: true, message: '请输入模板描述' }]}
        />
      </ModalForm>
    </>
  );
};

export default TplList;
