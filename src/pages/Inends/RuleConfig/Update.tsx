import RuleForm from '@/pages/RuleConfig/Update';
import { useParams } from '@umijs/max';

const RuleConfigUpdate = () => {
  const { inendId } = useParams();

  return <RuleForm type="inends" typeId={inendId || ''} />;
};

export default RuleConfigUpdate;
