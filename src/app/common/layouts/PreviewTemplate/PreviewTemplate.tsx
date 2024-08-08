import React, { useRef, useEffect } from 'react'
import storageService from '../../../core/services/storageService';
import { StorageKeysEnum } from '../../../core/enums/storage';
import { PreviewTemplateProps } from './types';
import previewTemplateService from '../../../core/services/previewTemplateService'; 
import { ProcessStepTextEnum } from '../../../features/CreateYourCV/types';
import { TemplateNameEnum } from '../../../core/enums/template';

const PreviewTemplate: React.FC<PreviewTemplateProps> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  /** 取得緩存資料 */
  const cache = storageService.getItem(StorageKeysEnum.Template) ?? '{}';
  const { template, className } = props;

  /** 
   * @description 繪製 Preview 圖 #383d47 #272931
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        let target = template ? template : JSON.parse(cache);

        const cvTemplate: TemplateNameEnum = target[ProcessStepTextEnum.ChooseTemplate];
        const canvasDistance = previewTemplateService.CanvasDistance.getInstance();
        const canvasService = previewTemplateService.createCanvasService(canvas, context, target, canvasDistance);
        const drawCascadeTemplate = canvasService.previewTemplate();
        switch (cvTemplate) {
          case TemplateNameEnum.Cascade: {
            drawCascadeTemplate(() => canvasService.handleCascadeTemplate());
            break;
          }
          case TemplateNameEnum.Cubic: {
            drawCascadeTemplate(() => canvasService.handleCubicTemplate());
            break;
          }
        }
      }
    }
  }, [cache])
 
  return (
    <div id="preview" className={'preview' + (className ? ` ${className}` : '')}>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}

export default PreviewTemplate
