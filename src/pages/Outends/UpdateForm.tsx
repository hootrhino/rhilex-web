import { message } from '@/components/PopupHack';
import SchemaForm from '@/components/SchemaForm';

import { getOutends, postOutends, putOutends } from '@/services/rulex/shuchuziyuanguanli';

import { useEffect } from 'react';
import { history, useParams, useRequest } from 'umi';
import { columns } from './columns';

const UpdateForm = () => {
  const { id } = useParams();

  // 新建&编辑
  const onFinish = async (values: any) => {
    try {
      if (id) {
        await putOutends({ ...values, uuid: id });
      } else {
        await postOutends(values);
      }
      message.success(id ? '更新成功' : '新建成功');
      history.push('/outends/list');
      return true;
    } catch (error) {
      return false;
    }
  };

  // 获取详情
  const { run: getDetail, data: detail } = useRequest(() => getOutends({ params: { uuid: id } }), {
    manual: true,
  });

  useEffect(() => {
    if (id) {
      getDetail();
    }
  }, [id]);

  return (
    <SchemaForm
      title={id ? '编辑目标' : '新建目标'}
      goBack="/outends/list"
      columns={columns}
      initialValue={
        id
          ? detail
          : {
              type: 'MONGO_SINGLE',
              config: [
                { mongoUrl: 'mongodb://127.0.0.1:27017', database: 'test', collection: 'test' },
              ],
            }
      }
      onFinish={onFinish}
    />
  );
};

export default UpdateForm;
