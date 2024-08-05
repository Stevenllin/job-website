// line space paragraph space
const style = {
  space: 18,
}

/**
 * 
 * @param context The CanvasRenderingContext2D interface
 * @param str 目標文字
 * @param canvasWidth 目標區塊的寬度
 * @param initX 初始 X 位置
 * @param initY 初始 Y 位置
 * @param lineHeight 文字間距
 */
const drawTextWithWrapping = (context: CanvasRenderingContext2D, str: string, canvasWidth: number, initX: number, initY: number, lineHeight: number) => {
  let lineWidth = 0;
  let lastSubStrIndex = 0;

  for (let i = 0; i < str.length; i++) {
    lineWidth += context.measureText(str[i]).width;
    if (lineWidth > canvasWidth - initX) {
      //減去initX,防止邊界出現的問題
      context.fillText(str.substring(lastSubStrIndex, i), initX, initY);
      initY += lineHeight;
      lineWidth = 0;
      lastSubStrIndex = i;
    }
    if (i === str.length - 1) {
      context.fillText(str.substring(lastSubStrIndex, i + 1), initX, initY);
    }
    // console.log('initY', initY);
  }
}

const previewTemplate = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, template: any) => {
  /** 清除畫布 */
  context.clearRect(0, 0, 450, 550);
  /** Heading */
  const { Heading } = template;
  
  /** 設定畫布的寬度和高度 */
  canvas.width = 400;
  canvas.height = 565;

  /** 繪製背景 */
  context.fillStyle = '#383d47';
  context.fillRect(0, 0, 120, 565);

  /** 繪製名稱 */
  context.fillStyle = '#FFFFFF';
  context.font = 'bold 16px Arial';
  
  /** 繪製職稱 */
  context.font = '14px Arial';
  drawTextWithWrapping(context, `${Heading?.profession ?? 'Your Profession'}`, 120, 4, style.space, 16)

}

export default {
  previewTemplate,
}