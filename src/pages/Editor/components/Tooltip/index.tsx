import type { TooltipProps } from 'antd';
import { Tooltip } from 'antd';

type EditorTooltipProps = Omit<TooltipProps, 'title'> & {
  title: string | React.ReactNode;
  fontSize?: number;
  disabled?: boolean;
};

const EditorTooltip = ({
  color = '#4281ff',
  fontSize = 12,
  disabled = false,
  title,
  children,
  ...props
}: EditorTooltipProps) => {
  const titleFormat = <span style={{ fontSize }}>{title}</span>;

  return !disabled ? (
    <Tooltip title={titleFormat} color={color} {...props}>
      {children}
    </Tooltip>
  ) : (
    <span className="cursor-not-allowed">{children}</span>
  );
};

export default EditorTooltip;
