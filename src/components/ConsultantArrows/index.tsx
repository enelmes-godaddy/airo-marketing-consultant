import classnames from 'classnames';
import { Arrows } from '../../assets/arrows';
import './styles.css';

interface ConsultantArrowsProps {
  className?: string;
  isVisible: boolean;
}

export function ConsultantArrows({ isVisible, className }: ConsultantArrowsProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <div className={classnames("consultant-arrows", className)}>
      <Arrows 
        className="animated-arrows"
      />
    </div>
  );
}
