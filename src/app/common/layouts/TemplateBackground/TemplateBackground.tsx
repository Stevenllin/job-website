import Background from '../../../../assets/image/background.png';
import { TemplateBackgroundProps } from './types';

const TemplateBackground: React.FC<TemplateBackgroundProps> = ({ title, subtitle }) => {
  return (
    <div id="template-background" className="banner">
      {/** Background Image */}
      <img src={Background} width={200} style={{ left: '5%', zIndex: 1 }}></img>
      <img src={Background} width={200} style={{ right: '5%', transform: 'rotate(180deg)', zIndex: 1 }}></img>
      {/** Title and Subtitle */}
      <h1 className="text-center">{title}</h1>
      <div className="subtitle">
        <p>{subtitle}</p>
      </div>
    </div>
  )
}

export default TemplateBackground;