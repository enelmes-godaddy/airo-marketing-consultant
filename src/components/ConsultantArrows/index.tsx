import { Arrows } from '../../assets/arrows';
import './styles.css';

interface ConsultantArrowsProps {
  isVisible: boolean;
}

export function ConsultantArrows({ isVisible }: ConsultantArrowsProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="consultant-arrows">
      <Arrows 
        className="animated-arrows"
      />
    </div>
  );
}
