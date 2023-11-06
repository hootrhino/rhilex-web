import { getHwifaceList } from "@/services/rulex/jiekouguanli";
import { useRequest } from "@umijs/max";

const usePort = () => {
  const { run, data } = useRequest(() => getHwifaceList(), {
    manual: true,
  });
  return { run, data };
}

export default usePort;
