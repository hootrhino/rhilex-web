import { message } from '@/components/PopupHack';
import {
  deleteGroupDel,
  getGroupDetail,
  postGroupCreate,
  putGroupUpdate,
} from '@/services/rulex/fenzuguanli';
import { useRequest } from '@umijs/max';

type createGroupParams = {
  name: string;
  type: string;
};

type updateGroupParams = createGroupParams & {
  uuid: string;
};

const useGroup = () => {
  // 分组详情
  const { run: getDetail, data: detail } = useRequest(
    (params: API.getGroupDetailParams) => getGroupDetail(params),
    {
      manual: true,
    },
  );

  // 新增分组
  const { run: create } = useRequest((params: createGroupParams) => postGroupCreate(params), {
    manual: true,
    onSuccess: () => message.success('新建成功'),
  });

  // 更新分组
  const { run: update } = useRequest((params: updateGroupParams) => putGroupUpdate(params), {
    manual: true,
    onSuccess: () => message.success('更新成功'),
  });

  // 删除分组
  const { run: remove } = useRequest((params: API.deleteGroupDelParams) => deleteGroupDel(params), {
    manual: true,
    onSuccess: () => message.success('删除成功'),
  });

  return {
    getDetail,
    detail,
    remove,
    create,
    update,
  };
};

export default useGroup;
