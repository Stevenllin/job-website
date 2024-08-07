import { ProcessStepTextEnum } from '../../features/CreateYourCV/types';
import { TemplateNameEnum, TemplateSideEnum } from '../enums/template';

interface Stlye {
  color: string;
  fontSize: string;
  fontStyle: string;
  lineSpacing: number;
  paragraphSpacing: number;
} 

interface CanvasDistance {
  leftX: number;
  rightX: number;
  leftY: number;
  rightY: number;
  setDistances: (leftX: number, rightX: number, leftY: number, rightY: number) => void;
  resetDistances: () => void;
}

interface Point {
  x: number;
  y: number;
}

/** 預設 Style */
const defaultStyle = {
  color: '#383d47',
  fontSize: 'Normal',
  fontStyle: 'Arial',
  lineSpacing: 2,
  paragraphSpacing: 2,
}

/** 
 * @description 單例模式：紀錄 Canvas 的 X Y 距離
 */
const CanvasDistance = (() => {
  let instance: CanvasDistance;
  
  function createInstance() {
    /** 左側距左邊緣 */
    let leftX = 6;
    /** 右側距左邊緣 */
    let rightX = 138;
    /** 左側距上邊緣 */
    let leftY = 18;
    /** 右側距離上邊緣 */
    let rightY = 18;
    
    return {
      leftX,
      rightX,
      leftY,
      rightY,
      setDistances(leftX: number, rightX: number, leftY: number, rightY: number) {
        this.leftX = leftX;
        this.rightX = rightX;
        this.leftY = leftY;
        this.rightY = rightY;
      },
      resetDistances() {
        /** this 是指物件實例的屬性 */
        this.leftX = 6;
        this.rightX = 138;
        this.leftY = 18;
        this.rightY = 18;
      },
    }
  }

  return {
    getInstance() {
      if (!instance) {
        instance = createInstance()
      }
      return instance;
    }
  }
})()

// Utility function to draw text and update positions
function drawTextAndUpdatePosition(context: CanvasRenderingContext2D, str: string, startIdx: number, endIdx: number, x: number, y: number, updateDistances: () => void) {
  context.fillText(str.substring(startIdx, endIdx), x, y);
  updateDistances();
  return endIdx;
}

// Main drawing function
function drawText(context: CanvasRenderingContext2D, str: string, side: TemplateSideEnum, canvasWidth: number, style: Stlye, canvasDistance: CanvasDistance) {
  let { leftX, leftY, rightX, rightY } = canvasDistance;
  let lineWidth = 0;
  let lastSubStrIndex = 0;
  
  function updateLeftDistances() {
    canvasDistance.setDistances(leftX, rightX, leftY += style.lineSpacing, rightY);
  }
  
  function updateRightDistances() {
    canvasDistance.setDistances(leftX, rightX, leftY, rightY += style.lineSpacing);
  }

  for (let i = 0; i < str.length; i++) {
    lineWidth += context.measureText(str[i]).width;

    if (side === TemplateSideEnum.Left && lineWidth > canvasWidth - leftX) {
      lastSubStrIndex = drawTextAndUpdatePosition(context, str, lastSubStrIndex, i, leftX, leftY, updateLeftDistances);
      lineWidth = 0;
    } else if (side === TemplateSideEnum.Right && lineWidth > canvasWidth - rightX) {
      lastSubStrIndex = drawTextAndUpdatePosition(context, str, lastSubStrIndex, i, rightX, rightY, updateRightDistances);
      lineWidth = 0;
    }

    // Draw the final part of the text
    if (i === str.length - 1) drawTextAndUpdatePosition(context, str, lastSubStrIndex, i + 1, side === TemplateSideEnum.Left ? leftX : rightX, side === TemplateSideEnum.Left ? leftY : rightY, side === TemplateSideEnum.Left ? updateLeftDistances : updateRightDistances);
  }
  /** 建立 Paragraph Spacing 以及 Line Spacing */
  // side === TemplateSideEnum.Left ? canvasDistance.setDistances(leftX, rightX, leftY += style.paragraphSpacing + style.lineSpacing, rightY) : canvasDistance.setDistances(leftX, rightX, leftY, rightY += style.paragraphSpacing + style.lineSpacing);
}

function drawLine(context: CanvasRenderingContext2D, lineWidth: number, init: Point, end: Point) {
  /** 線條顏色 */
  context.strokeStyle = 'black';
  /** 線條寬度 */
  context.lineWidth = lineWidth;
    
  /** 開始畫線 */
  context.beginPath();
  /** 移動起點 */
  context.moveTo(init.x, init.y);
  /** 移動終點 */
  context.lineTo(end.x, end.y);
  /** 渲染路徑 */
  context.stroke();
}

/**
 * @description 建立畫布長寬
 */
const previewTemplate = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
  return (handleTemplate: (context: CanvasRenderingContext2D, template: any) => void, templateData: any) => {
    /** 清除畫布 */
    context.clearRect(0, 0, 450, 550);
    /** 設定畫布的寬度和高度 */
    canvas.width = 400;
    canvas.height = 565;
    /** 根據 Cascade 或 Cubic Template */
    handleTemplate(context, templateData);
  }
}

/**
 * @description 繪畫 Cascade Template
 */
function handleCascadeTemplate (context: CanvasRenderingContext2D, template: any) {
  /** 若沒有設置 Finalize 的 Style 則用默認 */
  let style: Stlye = template ? template[ProcessStepTextEnum.Finalize] : defaultStyle;
  /** 取得 Canvas 的各距離 */
  const canvasDistance = CanvasDistance.getInstance();
  canvasDistance.resetDistances();

  /** 左側背景顏色 */
  context.fillStyle = style.color;
  context.fillRect(0, 0, 130, 565);

  /** 繪製名字 */
  context.fillStyle = 'white';
  context.font = `bold 18px ${style.fontStyle}`;

  /** Left Side: Heading */
  const Heading = template[ProcessStepTextEnum.GeneralInfo];
  const { first_name, last_name, profession, email } = Heading;
  /** First Name / LastName */
  drawText(context, `${first_name} ${last_name}`, TemplateSideEnum.Left, 130, style, canvasDistance);
  /** Profession */
  context.font = `12px ${style.fontStyle}`;
  drawText(context, profession, TemplateSideEnum.Left, 130, style, canvasDistance);
  /** Personal Info */
  /** 繪製背影顏色，設置 Title */
  drawLine(context, 20, { x: 0, y: canvasDistance.leftY }, { x: 130, y: canvasDistance.leftY })
  canvasDistance.setDistances(canvasDistance.leftX, canvasDistance.rightX, canvasDistance.leftY + 2, canvasDistance.rightY);
  drawText(context, 'Personal Info', TemplateSideEnum.Left, 130, style, canvasDistance);
  
  context.font = `10px ${style.fontStyle}`;
  drawText(context, email, TemplateSideEnum.Left, 130, style, canvasDistance);

  /** Right Side: Summary */
  console.log('template', template)

  /** Right Side: Experience */
  drawLine(context, 0.5, { x: canvasDistance.rightX, y: canvasDistance.rightY }, { x: 390, y: canvasDistance.rightY })
  /** 設定右側的高度 */
  canvasDistance.setDistances(canvasDistance.leftX, canvasDistance.rightX, canvasDistance.leftY, canvasDistance.rightY + style.paragraphSpacing);
  drawText(context, 'Education', TemplateSideEnum.Right, 435, style, canvasDistance);
  drawLine(context, 0.5, { x: canvasDistance.rightX, y: canvasDistance.rightY }, { x: 390, y: canvasDistance.rightY })

}

/** 
 * @description 繪畫 Cubic Template
 */
const handleCubicTemplate = (context: CanvasRenderingContext2D, template: any) => {
}

export default {
  previewTemplate,
  handleCascadeTemplate,
  handleCubicTemplate,
}