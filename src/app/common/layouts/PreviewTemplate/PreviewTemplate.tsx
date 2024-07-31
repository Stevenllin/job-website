import React, { useRef, useEffect } from 'react'
import storageService from '../../../core/services/storageService';
import { StorageKeysEnum } from '../../../core/enums/storage';
import { PreviewTemplateProps } from './types';

const PreviewTemplate: React.FC<PreviewTemplateProps> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  /** 取得緩存資料 */
  const cache = storageService.getItem(StorageKeysEnum.Template) ?? '{}';
  

  /** 
   * @description 繪製 Preview 圖 #383d47 #272931
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        // 設定畫布的寬度和高度
        canvas.width = 400;
        canvas.height = 500;

        // 繪製矩形
        context.fillStyle = '#383d47';
        context.fillRect(0, 0, 400, 500);

        // 繪製文字
        context.fillStyle = '#FF0000';
        context.font = '30px Arial';

        context.fillText('Hello, Canvas!', 100, 200);
      }
    }
  }, [cache])
 
  return (
    <div id="preview" className={'preview' + (props.className ? ` ${props.className}` : '')}>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}

export default PreviewTemplate
