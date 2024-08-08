import { ProcessStepTextEnum } from '../../features/CreateYourCV/types';
import { TemplateNameEnum, TemplateSideEnum } from '../enums/template';
import { InputType } from '../../features/CreateYourCV/Skills/types';
import commonService from './commonService';

interface Style {
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

const createCanvasService = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, template: any, canvasDistance: CanvasDistance) => {
  /**
   * @description 建立畫布長寬
   */
  const previewTemplate = () => {
    return (handleTemplate: () => void) => {
      canvasDistance.resetDistances();
      /** 清除畫布 */
      context.clearRect(0, 0, 450, 550);
      /** 設定畫布的寬度和高度 */
      canvas.width = 400;
      canvas.height = 565;
      /** 根據 Cascade 或 Cubic Template */
      handleTemplate();
    }
  }

  /**
   * @description 繪畫 Cascade Template
   */
  function handleCascadeTemplate () {
    /** 若沒有設置 Finalize 的 Style 則用默認 */
    let style: Style = template ? template[ProcessStepTextEnum.Finalize] : defaultStyle;

    /** 左側背景顏色 */
    context.fillStyle = style?.color ?? 'black';
    context.fillRect(0, 0, 130, 565);

    /** 繪製名字 */
    context.fillStyle = 'white' ?? 'white';
    context.font = `bold 18px ${style?.fontStyle}`;

    /** Left Side: Heading */
    const Heading = template[ProcessStepTextEnum.GeneralInfo];
    if (Heading) {
      const { first_name, last_name, profession, email, phone, country, city } = Heading;
      /** First Name / LastName */
      const name = first_name || last_name ? `${first_name || ''} ${last_name || ''}`.trim() : '';

      drawText(name, TemplateSideEnum.Left, 130, style);
      canvasDistance.setDistances(canvasDistance.leftX, canvasDistance.rightX, canvasDistance.leftY + style?.paragraphSpacing, canvasDistance.rightY);
      /** Profession */
      context.font = `12px ${style.fontStyle}`;
      if (profession) drawText(profession, TemplateSideEnum.Left, 130, style);
      
      /** Personal Info */
      drawTitle('Personal Info', 1, style);
      if (email) {
        context.font = `bold 12px ${style.fontStyle}`;
        drawText('Email', TemplateSideEnum.Left, 130, style);
        context.font = `10px ${style.fontStyle}`;
        drawText(email, TemplateSideEnum.Left, 130, style);
        /** 增加 Paragraph Spacing */
        canvasDistance.setDistances(canvasDistance.leftX, canvasDistance.rightX, canvasDistance.leftY + style?.paragraphSpacing, canvasDistance.rightY);
      }
      if (phone) {
        context.font = `bold 12px ${style.fontStyle}`;
        drawText('Phone', TemplateSideEnum.Left, 130, style);
        context.font = `10px ${style.fontStyle}`
        drawText(phone, TemplateSideEnum.Left, 130, style);
        /** 增加 Paragraph Spacing */
        canvasDistance.setDistances(canvasDistance.leftX, canvasDistance.rightX, canvasDistance.leftY + style?.paragraphSpacing, canvasDistance.rightY);
      }
      if (country || city) {
        context.font = `bold 12px ${style.fontStyle}`;
        drawText('Location', TemplateSideEnum.Left, 130, style);
        context.font = `10px ${style.fontStyle}`;
        /** 增加 Paragraph Spacing */
        drawText(`${city} ${country}`, TemplateSideEnum.Left, 130, style);
      }
    }

    /** Skills */
    const Skills = template[ProcessStepTextEnum.Skills];
    if (Skills.formValue) {
      drawTitle('Skills', 1, style);
      const inputs: InputType[] = commonService.handleAddressSkillsData(Skills.formValue);
      inputs.forEach(input => drawSkills(input, style))
    }

    /** Right Side: Summary */
    // console.log('template', template)

    /** Right Side: Experience */
    drawLine('black', 0.5, { x: canvasDistance.rightX, y: canvasDistance.rightY }, { x: 390, y: canvasDistance.rightY })
    /** 設定右側的高度 */
    canvasDistance.setDistances(canvasDistance.leftX, canvasDistance.rightX, canvasDistance.leftY, canvasDistance.rightY + style?.paragraphSpacing);
    drawText('Education', TemplateSideEnum.Right, 435, style);
    drawLine('black', 0.5, { x: canvasDistance.rightX, y: canvasDistance.rightY }, { x: 390, y: canvasDistance.rightY })

  }

  function drawTextAndUpdatePosition(str: string, startIdx: number, endIdx: number, x: number, y: number, updateDistances: () => void) {
    let currentX = x;
    for (let i = startIdx; i < endIdx; i++) {
      const char = str[i];
      context.fillText(char, currentX, y);
      currentX += context.measureText(char).width - 1.2;
    }
    updateDistances();
    return endIdx;
  }
  
  function drawText(str: string, side: TemplateSideEnum, canvasWidth: number, style: Style) {
    let { leftX, leftY, rightX, rightY } = canvasDistance;
    let lineWidth = 0;
    let lastSubStrIndex = 0;
    
    function updateLeftDistances() {
      canvasDistance.setDistances(leftX, rightX, leftY += style?.lineSpacing, rightY);
    }
    
    function updateRightDistances() {
      canvasDistance.setDistances(leftX, rightX, leftY, rightY += style?.lineSpacing);
    }
  
    for (let i = 0; i < str.length; i++) {
      lineWidth += context.measureText(str[i]).width;
  
      if (side === TemplateSideEnum.Left && lineWidth > canvasWidth - leftX) {
        lastSubStrIndex = drawTextAndUpdatePosition(str, lastSubStrIndex, i, leftX, leftY, updateLeftDistances);
        lineWidth = 0;
      } else if (side === TemplateSideEnum.Right && lineWidth > canvasWidth - rightX) {
        lastSubStrIndex = drawTextAndUpdatePosition(str, lastSubStrIndex, i, rightX, rightY, updateRightDistances);
        lineWidth = 0;
      }
  
      // Draw the final part of the text
      if (i === str.length - 1) drawTextAndUpdatePosition(str, lastSubStrIndex, i + 1, side === TemplateSideEnum.Left ? leftX : rightX, side === TemplateSideEnum.Left ? leftY : rightY, side === TemplateSideEnum.Left ? updateLeftDistances : updateRightDistances);
    }
    /** 建立 Paragraph Spacing 以及 Line Spacing */
    // side === TemplateSideEnum.Left ? canvasDistance.setDistances(leftX, rightX, leftY += style.paragraphSpacing + style.lineSpacing, rightY) : canvasDistance.setDistances(leftX, rightX, leftY, rightY += style.paragraphSpacing + style.lineSpacing);
  }
  
  function drawLine(color: string, lineWidth: number, init: Point, end: Point) {
    /** 線條顏色 */
    context.strokeStyle = color;
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
   * @description 目的是寫 Title
   * @param str 目標文字
   * @param type UI 類型
   * @param context 
   * @param style 樣式
   * @param canvasDistance 
   */
  function drawTitle(str: string, type: number, style: Style) {
    context.font = `12px ${style?.fontStyle}`;
    switch (type) {
      case 1: {
        canvasDistance.setDistances(canvasDistance.leftX, canvasDistance.rightX, canvasDistance.leftY + style?.paragraphSpacing, canvasDistance.rightY);
        /** 繪製背影顏色，設置 Title */
        drawLine('black', 20, { x: 0, y: canvasDistance.leftY }, { x: 130, y: canvasDistance.leftY })
        canvasDistance.setDistances(canvasDistance.leftX, canvasDistance.rightX, canvasDistance.leftY + 3, canvasDistance.rightY);
        drawText(str, TemplateSideEnum.Left, 130, style);
        canvasDistance.setDistances(canvasDistance.leftX, canvasDistance.rightX, canvasDistance.leftY + style?.paragraphSpacing, canvasDistance.rightY);
        break;
      }
    }
  }
  
  /**
   * @description 目的是 SKills 上不同樣式的呈現
   * @param skills Skill 資料
   * @param style 樣式
   * @param context 
   * @param canvasDistance 
   */
  function drawSkills(skills: InputType, style: Style) {
    drawText(skills.input, TemplateSideEnum.Left, 130, style);
    drawLine('black', 5, { x: 6, y: canvasDistance.leftY }, { x: 124, y: canvasDistance.leftY })
    drawLine('white', 5, { x: 6, y: canvasDistance.leftY }, { x: 124 * (skills.rate/5), y: canvasDistance.leftY })
    canvasDistance.setDistances(canvasDistance.leftX, canvasDistance.rightX, canvasDistance.leftY + style.paragraphSpacing, canvasDistance.rightY);
  }


  /** 
   * @description 繪畫 Cubic Template
   */
  const handleCubicTemplate = () => {
  }

  return {
    previewTemplate,
    handleCascadeTemplate,
    handleCubicTemplate
  }
}


export default {
  CanvasDistance,
  createCanvasService,
}