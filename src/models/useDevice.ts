import { getDevicesGroup, getDevicesListByGroup } from '@/services/rulex/shebeiguanli';
import { useRequest } from 'umi';

const useDevice = () => {
  // 设备分组列表
  const { data: groupList, run: getGroupList } = useRequest(() => getDevicesGroup());

  // 设备列表
  const { data, run } = useRequest((params: API.getDevicesListByGroupParams) =>
    getDevicesListByGroup(params),
  );

  return { data, run, groupList, getGroupList };
};

export default useDevice;
