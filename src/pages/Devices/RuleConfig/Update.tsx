import RuleForm from '@/pages/RuleConfig/Update';
import { useParams } from '@umijs/max';

const RuleConfigUpdate = () => {
  const { deviceId } = useParams();

  return <RuleForm type="device" typeId={deviceId || ''} />;
};

export default RuleConfigUpdate;
