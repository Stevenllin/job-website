import { ProcessStepTextEnum } from '../../features/CreateYourCV/types';
import { TemplateSideEnum } from '../enums/template';
import { FontSizeTypeEnum } from '../enums/font';
import { FontMappingDefines } from '../models/font';
import { ColorNameEnum } from '../enums/color';
import { ColorMappingDefines } from '../models/color';
import { InputType } from '../../features/CreateYourCV/Skills/types';
import commonService from './commonService';
import { DateFormatEnum } from '../enums/date';
import { Style } from '../models/style';
import { ROUTES } from "../../core/enums/router";

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
  const colorEnum = template[ProcessStepTextEnum.Finalize]?.color as ColorNameEnum
  const style: Style = commonService.handleAddressTemplateStyle(template)
  const isFinalize = window.location.pathname === ROUTES.FEATURES__CREATE_YOUR_CV__FINALIZE;
  const previewElement = document.getElementById('preview');
  const width = isFinalize ? previewElement?.getBoundingClientRect().width : 400;
  const height = isFinalize && width ? width * Math.sqrt(2) : 566;

  /**
   * @description 建立畫布長寬
   */
  const previewTemplate = () => {
    return (handleTemplate: () => void) => {
      canvasDistance.resetDistances();
      /** 清除畫布 */
      context.clearRect(0, 0, width || 400, height);
      /** 設定畫布的寬度和高度並提高解析度 */
      canvas.style.width = isFinalize ? `${width}px` : `400px`
      canvas.style.height = isFinalize ? `${height}px` : `566px`
      /** 像素比率 */
      const dpr = 4
      /** 設置 Canvas 的實際寬度，考慮像素比 */
      canvas.width = 400 * dpr;
      canvas.height = 566 * dpr;
      /** 縮放，以適應設備像素比 */
      context.scale(dpr, dpr)
      /** 根據 Cascade 或 Cubic Template */
      handleTemplate();
    }
  }

  /**
   * @description 繪畫 Cascade Template
   */
  function handleCascadeTemplate () {
    /** 左側背景顏色 */
    context.fillStyle = style.color;
    context.fillRect(0, 0, 130, height);

    /** 繪製名字 */
    context.fillStyle = 'white';
    context.font = `bold ${FontMappingDefines[FontSizeTypeEnum.Name][style.fontSize]} ${style.fontStyle}`;

    /** Left Side: Heading */
    const Heading = template[ProcessStepTextEnum.GeneralInfo];
    if (Heading) {
      const { first_name, last_name, profession, email, phone, country, city } = Heading;
      /** First Name / LastName */
      const name = first_name || last_name ? `${first_name || ''} ${last_name || ''}`.trim() : '';
      drawText(name, TemplateSideEnum.Left, 130);
      canvasDistance.setDistances(canvasDistance.leftX, canvasDistance.rightX, canvasDistance.leftY + style.paragraphSpacing, canvasDistance.rightY);
      
      /** Profession */
      context.font = `${FontMappingDefines[FontSizeTypeEnum.Title][style.fontSize]} ${style.fontStyle}`;
      if (profession) drawText(profession, TemplateSideEnum.Left, 130);
      canvasDistance.setDistances(canvasDistance.leftX, canvasDistance.rightX, canvasDistance.leftY + style.paragraphSpacing, canvasDistance.rightY);

      /** Personal Info */
      drawTitle('Personal Info', 1, TemplateSideEnum.Left);
      if (email) drawPersonalInfo('Email', email, TemplateSideEnum.Left)
      if (phone) drawPersonalInfo('Phone', phone, TemplateSideEnum.Left)
      if (country || city) drawPersonalInfo('Location', `${city ? city : ''} ${country}`, TemplateSideEnum.Left)
    }

    /** Skills */
    const Skills = template[ProcessStepTextEnum.Skills];

    if (Skills?.formValue) {
      drawTitle('Skills', 1, TemplateSideEnum.Left);
      const inputs: InputType[] = commonService.handleAddressSkillsData(Skills.formValue).filter(input => input.rate !== 0);
      inputs.forEach(input => drawSkills(input, TemplateSideEnum.Left))
    }

    context.fillStyle = 'black'; 

    /** Right Side: Summary */
    const Summary = template[ProcessStepTextEnum.Summary];
    if (Summary) commonService.handleFilterText(Summary, (item) => drawHTMLFormat(item, TemplateSideEnum.Right))

    /** Right Side: Experience */
    const WorkHistory = template[ProcessStepTextEnum.WorkHistory];
    if (WorkHistory) {
      drawTitle('Experience', 2, TemplateSideEnum.Right);
      canvasDistance.setDistances(canvasDistance.leftX, canvasDistance.rightX, canvasDistance.leftY, canvasDistance.rightY + 2 * style.lineSpacing);
      for (let i = 0; i < WorkHistory.length; i++) {
        context.font = `${FontMappingDefines[FontSizeTypeEnum.Content][style.fontSize]} ${style.fontStyle}`;
        const { start_date, end_date, location, job_title, employer, job_description } = WorkHistory[i];
        if (start_date) drawText(`${commonService.convertDateFormat(start_date, DateFormatEnum.YYYYMM)} `, TemplateSideEnum.Right, 280);
        if (end_date) drawText(`${commonService.convertDateFormat(end_date, DateFormatEnum.YYYYMM)}`, TemplateSideEnum.Right, 280);
        if (!start_date && !end_date) {
          canvasDistance.setDistances(canvasDistance.leftX, canvasDistance.rightX, canvasDistance.leftY, canvasDistance.rightY += 4 * style.lineSpacing);
        } else {
          if (!start_date || !end_date) canvasDistance.setDistances(canvasDistance.leftX, canvasDistance.rightX, canvasDistance.leftY, canvasDistance.rightY += 2 * style.lineSpacing);
        }
        /** 因 drawText 移動四格 Line Spacing */
        canvasDistance.setDistances(canvasDistance.leftX, canvasDistance.rightX, canvasDistance.leftY, canvasDistance.rightY - 4 * style.lineSpacing);
        canvasDistance.setDistances(canvasDistance.leftX, canvasDistance.rightX + 56, canvasDistance.leftY, canvasDistance.rightY);
        if (job_title) drawText(job_title, TemplateSideEnum.Right, 438);
        context.font = `italic ${FontMappingDefines[FontSizeTypeEnum.Content][style.fontSize]} ${style.fontStyle}`;
        if (employer && location) drawText(`${employer}, ${location}`, TemplateSideEnum.Right, 438);
        context.font = `${FontMappingDefines[FontSizeTypeEnum.Content][style.fontSize]} ${style.fontStyle}`;
        if (job_description) drawText(job_description, TemplateSideEnum.Right, 438)
        canvasDistance.setDistances(canvasDistance.leftX, canvasDistance.rightX - 56, canvasDistance.leftY, canvasDistance.rightY);
      }
      canvasDistance.setDistances(canvasDistance.leftX, canvasDistance.rightX, canvasDistance.leftY, canvasDistance.rightY - style.lineSpacing);
    }
    
    /** Right Side: Education */
    const Education = template[ProcessStepTextEnum.Education];
    if (Education) {
      drawTitle('Education', 2, TemplateSideEnum.Right);
      context.font = `${FontMappingDefines[FontSizeTypeEnum.Content][style.fontSize]} ${style.fontStyle}`;
      canvasDistance.setDistances(canvasDistance.leftX, canvasDistance.rightX, canvasDistance.leftY, canvasDistance.rightY + 2 * style.lineSpacing);
      const { degree, field, school_name, school_location, start_date, end_date, coursework } = Education;
      const title = `${degree} in ${field}`
      
      drawText(`${commonService.convertDateFormat(start_date, DateFormatEnum.YYYYMM)} `, TemplateSideEnum.Right, 280);
      drawText(`${commonService.convertDateFormat(end_date, DateFormatEnum.YYYYMM)}`, TemplateSideEnum.Right, 280);
      /** 因 drawText 移動四格 Line Spacing */
      canvasDistance.setDistances(canvasDistance.leftX, canvasDistance.rightX, canvasDistance.leftY, canvasDistance.rightY - 4 * style.lineSpacing);
      canvasDistance.setDistances(canvasDistance.leftX, canvasDistance.rightX + 56, canvasDistance.leftY, canvasDistance.rightY);
      drawText(`${school_name}, ${school_location}`, TemplateSideEnum.Right, 438);
      context.font = `italic ${FontMappingDefines[FontSizeTypeEnum.Content][style.fontSize]} ${style.fontStyle}`;
      drawText(title, TemplateSideEnum.Right, 438);

      /** 根據 HTML 繪圖 */
      /** Item 是由 Foreach 中傳入 */
      if (coursework) commonService.handleFilterText(coursework, (item) => drawHTMLFormat(item, TemplateSideEnum.Right))
    }
  }

  function drawPersonalInfo(title: string, str: string, side: TemplateSideEnum) {
    context.font = `bold ${FontMappingDefines[FontSizeTypeEnum.Title][style.fontSize]} ${style.fontStyle}`;
    drawText(title, TemplateSideEnum.Left, 130);
    context.font = `${FontMappingDefines[FontSizeTypeEnum.Content][style.fontSize]} ${style.fontStyle}`;
    drawText(str, TemplateSideEnum.Left, 130);

    /** 增加 Paragraph Spacing */
    if (side === TemplateSideEnum.Left) {
      canvasDistance.setDistances(canvasDistance.leftX, canvasDistance.rightX, canvasDistance.leftY + style.paragraphSpacing, canvasDistance.rightY);
    } else {
      canvasDistance.setDistances(canvasDistance.leftX, canvasDistance.rightX, canvasDistance.leftY, canvasDistance.rightY + style.paragraphSpacing);
    }
  }

  function drawTextAndUpdatePosition(str: string, startIdx: number, endIdx: number, x: number, y: number, updateDistances: () => void) {
    let currentX = x;
    for (let i = startIdx; i < endIdx; i++) {
      const char = str[i];
      context.fillText(char, currentX, y);
      /** 控制間距大小 */
      currentX += context.measureText(char).width - 1.2;
    }
    updateDistances();
    return endIdx;
  }
  
  /**
   * 
   * @param str 文字
   * @param side 右側或左側
   * @param canvasWidth 文字寬度大小限制
   */
  function drawText(str: string, side: TemplateSideEnum, canvasWidth: number) {
    let { leftX, leftY, rightX, rightY } = canvasDistance;
    let lineWidth = 0;
    let lastSubStrIndex = 0;
    
    function updateLeftDistances() {
      canvasDistance.setDistances(leftX, rightX, leftY += 2 * style.lineSpacing, rightY);
    }
    
    function updateRightDistances() {
      canvasDistance.setDistances(leftX, rightX, leftY, rightY += 2 * style.lineSpacing);
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
  }
  
  /**
   * @description 繪畫線條
   * @param color 背景顏色
   * @param lineWidth 線條寬度
   * @param init 起點
   * @param end 終點
   */
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
   */
  function drawTitle(str: string, type: number, side: TemplateSideEnum) {
    context.font = `${FontMappingDefines[FontSizeTypeEnum.Title][style.fontSize]} ${style.fontStyle}`;
    switch (type) {
      case 1: {
        /** 繪製背影顏色，設置 Title */
        drawLine(ColorMappingDefines[colorEnum]?.Secondary ?? 'black', 20, { x: 0, y: canvasDistance.leftY }, { x: 130, y: canvasDistance.leftY })
        canvasDistance.setDistances(canvasDistance.leftX, canvasDistance.rightX, canvasDistance.leftY + 3, canvasDistance.rightY);
        drawText(str, side, 130);
        canvasDistance.setDistances(canvasDistance.leftX, canvasDistance.rightX, canvasDistance.leftY + style.paragraphSpacing, canvasDistance.rightY);
        break;
      }
      case 2: {
        drawLine('black', 1.5, { x: canvasDistance.rightX, y: canvasDistance.rightY }, { x: 390, y: canvasDistance.rightY })
        /** 設定右側的高度 注意這邊要乘以 3 */
        canvasDistance.setDistances(canvasDistance.leftX, canvasDistance.rightX, canvasDistance.leftY, canvasDistance.rightY + 3 * style.lineSpacing);
        drawText(str, side, 435);
        drawLine('black', 1.5, { x: canvasDistance.rightX, y: canvasDistance.rightY }, { x: 390, y: canvasDistance.rightY })
        break;
      }
    }
  }
  
  /**
   * @description 目的是 SKills 上不同樣式的呈現
   * @param skills Skill 資料
   */
  function drawSkills(skills: InputType, side: TemplateSideEnum) {
    if (skills.input) {
      drawText(skills.input, side, 130);
      drawLine(ColorMappingDefines[colorEnum]?.Secondary ?? 'black', 5, { x: 6, y: canvasDistance.leftY }, { x: 124, y: canvasDistance.leftY })
      drawLine('white', 5, { x: 6, y: canvasDistance.leftY }, { x: 124 * (skills.rate/5), y: canvasDistance.leftY })
      canvasDistance.setDistances(canvasDistance.leftX, canvasDistance.rightX, canvasDistance.leftY + 2 * style.paragraphSpacing, canvasDistance.rightY);
    }
  }

  function drawHTMLFormat(node: ChildNode, side: TemplateSideEnum) {
    const element = node as HTMLElement;
    switch (node.nodeName) {
      case ('P'): {
        /** 组合最终的 font 樣式 */
        context.font = handleAddressFontStyle(element)
        if (element.textContent?.trim()) drawText(element.textContent?.trim(), side, 438);
        break;
      }
      case ('OL'): {
        const listItems = element.querySelectorAll('li');
        Array.from(listItems).forEach(li => {
          /** 组合最终的 font 樣式 */
          context.font = handleAddressFontStyle(li);
          /** 劃圓 */
          canvasDistance.setDistances(canvasDistance.leftX, canvasDistance.rightX, canvasDistance.leftY, canvasDistance.rightY + parseInt(`${FontMappingDefines[FontSizeTypeEnum.Title][style.fontSize]}`)/10);
          drawCircle(TemplateSideEnum.Right)
          canvasDistance.setDistances(canvasDistance.leftX, canvasDistance.rightX, canvasDistance.leftY, canvasDistance.rightY - parseInt(`${FontMappingDefines[FontSizeTypeEnum.Title][style.fontSize]}`)/10);

          /** 增加 X 軸的距離 */
          canvasDistance.setDistances(canvasDistance.leftX, canvasDistance.rightX + 12, canvasDistance.leftY, canvasDistance.rightY);
          if (li.textContent?.trim()) drawText(li.textContent?.trim(), side, 438)
          /** 重置 X 軸的距離以及增加 Line Spacing */
          canvasDistance.setDistances(canvasDistance.leftX, canvasDistance.rightX - 12, canvasDistance.leftY, canvasDistance.rightY);
        })
        break;
      }
    }
  }

  /**
   * 
   * @param element 目標 Element
   * @returns 
   */
  function handleAddressFontStyle(element: HTMLElement) {
    const isStrong = element.querySelector('strong') !== null;
    const isItalic = element.querySelector('em') !== null;
    const fontWeight = isStrong ? 'bold' : 'normal';
    const fontStyle = isItalic ? 'italic' : 'normal';

    return `${fontStyle} ${fontWeight} ${FontMappingDefines[FontSizeTypeEnum.Content][style.fontSize]} ${style.fontStyle}`;
  }

  /**
   * @description 繪製圓點
   */
  function drawCircle(side: TemplateSideEnum) {
    context.beginPath();
    if (side === TemplateSideEnum.Left) {
      context.arc(canvasDistance.leftX, canvasDistance.leftY - 5, 2, 0, 2 * Math.PI);
    } else {
      context.arc(canvasDistance.rightX, canvasDistance.rightY - 5, 2, 0, 2 * Math.PI);
    }
    context.fill();
    context.closePath();
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