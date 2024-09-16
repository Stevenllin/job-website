import React, { useRef, useEffect, useState } from 'react'
import TemplateBackground from '../../../common/layouts/TemplateBackground';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/types';
import { Row, Col, Slider, Select, Button } from 'antd';
import Collapse from "antd/lib/collapse";
import type { CollapseProps } from 'antd';
import { IconSizeEnum } from '../../../core/enums/icon';
import { MdExpandMore, MdExpandLess, MdDownload, MdPrint, MdEmail } from "react-icons/md";
import CommonModal from '../../../common/components/Modals/CommonModal';
import { CommonTypeEnum } from '../../../core/enums/modal/';
import useAppDispatch from '../../../core/hooks/useAppDispatch';
import { setModalVisibleAction, setSpinnerVisibleAction } from '../../../store/ui/actions';
import { ModalNameEnum } from '../../../core/enums/modal';
import commonService from '../../../core/services/commonService';
import storageService from '../../../core/services/storageService';
import { StorageKeysEnum } from '../../../core/enums/storage';
import { ProcessStepTextMatchesCodes, ProcessRouteMatchesStep, ProcessStepTextEnum } from '../types';
import { useNavigate } from 'react-router-dom';
import ColorPicker from '../../../common/components/Form/ColorPicker';
import { ColorNameEnum } from '../../../core/enums/color';
import { TemplateStyle, SpellingResult } from './types';
import { FaFont } from "react-icons/fa";
import { FontSizeEnum } from '../../../core/enums/font';
import { ROUTES } from '../../../core/enums/router';
import PreviewTemplate from '../../../common/layouts/PreviewTemplate';
import { TemplateActionEnum } from '../../../core/enums/template';
import { v4 as uuidv4 } from 'uuid';

const fontOptions = [
  { value: 'PingFang TC', label: 'PingFang TC' },
  { value: 'Arial', label: 'Arial' },
  { value: 'Helvetica', label: 'Helvetica' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Courier New', label: 'Courier New' },
  { value: 'Verdana', label: 'Verdana' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Palatino', label: 'Palatino' },
  { value: 'Garamond', label: 'Garamond' },
  { value: 'Comic Sans MS', label: 'Comic Sans MS' },
  { value: 'Trebuchet MS', label: 'Trebuchet MS' },
  { value: 'Arial Black', label: 'Arial Black' },
  { value: 'Impact', label: 'Impact' },
  { value: 'Tahoma', label: 'Tahoma' },
  { value: 'Lucida Sans Unicode', label: 'Lucida Sans Unicode' },
  { value: 'Times', label: 'Times' },
  { value: 'Courier', label: 'Courier' },
  { value: 'Lucida Console', label: 'Lucida Console' },
  { value: 'Monaco', label: 'Monaco' },
  { value: 'Brush Script MT', label: 'Brush Script MT' },
  { value: 'Segoe UI', label: 'Segoe UI' },
];

const Finalize: React.FC = () => {
  const previewTemplateRef = useRef<{ exportToPDF: () => void }>(null);
  const navigate = useNavigate()
  const reduxDispatch = useAppDispatch();
  /** 取得 Modal 狀態 */
  const modalsState = useSelector((state: RootState) => state.UI.modals);
  /** Template Style */
  const [templateStyle, setTemplateStyle] = useState<TemplateStyle>({
    color: ColorNameEnum.Gray,
    fontSize: FontSizeEnum.Medium,
    fontStyle: 'Arial',
    paragraphSpacing: 8,
    lineSpacing: 8,
    typo: []
  });
  /** 取得緩存 */
  const cache = JSON.parse(storageService.getItem(StorageKeysEnum.Template) ?? '{}');
  const finalize = cache[ProcessStepTextEnum.Finalize];
  /** 為了更新 Preview Template */
  const [template, setTemplate] = useState(cache);
  /** 
   * @description 載入緩存
   */
  useEffect(() => {
    const template = cache[ProcessStepTextEnum.ChooseTemplate];
    if (!template) navigate(ROUTES.FEATURES__CREATE_YOUR_CV__CHOOSE_TEMPLATE)
    /** 設定 form */
    if (finalize) setTemplateStyle(finalize);
  }, [])

  useEffect(() => {
    const updated = { ...cache, [ProcessStepTextEnum.Finalize]: templateStyle };
    storageService.setItem(StorageKeysEnum.Template, JSON.stringify(updated));
    setTemplate(updated)
  }, [templateStyle])
  
  /**
   * 
   * @param key 目標 Template 樣式
   * @param value 樣式的 Value
   */
  const updateTemplateStyle = (key: keyof TemplateStyle, value: string | number) => {
    setTemplateStyle(prev => ({ ...prev, [key]: value, }));
  };

  const handleDisplayFormatting = () => {
    return (
      <div>
        {/** Font Size */}
        <div className="d-flex justify-between actions-container">
          {[FontSizeEnum.Small, FontSizeEnum.Medium, FontSizeEnum.Large].map((size: FontSizeEnum) => {
            return (
              <div key={size} className={'actions-container--item' + (templateStyle?.fontSize === size ? ' selected' : '')} onClick={() => updateTemplateStyle('fontSize', size)}>
                <FaFont style={{ 'fontSize': IconSizeEnum.Medium }} />
                <p>{size}</p>
              </div>
            )
          })}
        </div>
        {/** Font Style */}
        <p>Font Style</p>
        <Select
          size="large"
          placeholder="Please Select"
          options={fontOptions}
          className="w-100"
          defaultValue={templateStyle?.fontStyle}
          onChange={(val) => updateTemplateStyle('fontStyle', val)}
        >
        </Select>
        {/** Paragraph Spacing */}
        <p>Paragraph Spacing</p>
        <Slider min={6} max={24} defaultValue={templateStyle?.paragraphSpacing} onChange={(val) => updateTemplateStyle('paragraphSpacing', val)} />
        {/** Line Spacing */}
        <p>Line Spacing</p>
        <Slider min={6} max={24} defaultValue={templateStyle?.lineSpacing} onChange={(val) => updateTemplateStyle('lineSpacing', val)} />
      </div>
    )
  }

  const handleCheckSpelling = async () => {
    let spellingResult: SpellingResult[] = [];
    const Summary = template[ProcessStepTextEnum.Summary];
    const Education = template[ProcessStepTextEnum.Education];

    reduxDispatch(setSpinnerVisibleAction(true));
  
    try {
      // 創建 Promise 陣列来存儲異步操作
      const promises = [];
      // 如果 Summary 存在，添加對應的 Promise
      if (Summary) promises.push(createCheckSpellingPromise(Summary));
      // 如果 Education.coursework 存在，添加對應的 Promise
      if (Education?.coursework) promises.push(createCheckSpellingPromise(Education.coursework));

      await Promise.all(promises);
      setTemplateStyle({ ...finalize, typo: spellingResult });
    } catch (error) {
      console.error('error', error);
    } finally {
      reduxDispatch(setSpinnerVisibleAction(false));
    }

    /**
     * 
     * @param textContent 目標 Section 的 HTML 文字
     * @returns 回傳一個 Promise
     */
    function createCheckSpellingPromise (textContent: string): Promise<void> {
      return new Promise<void>((resolve) => {
        commonService.handleFilterText(textContent, async (node) => {
          const result: SpellingResult[] = (await getText(node)).filter(item => item.check === false);
          spellingResult = [...spellingResult, ...result]
          resolve();
        });
      })
    };
  };
  /**
   * @description 目的是取出 HTML 內純文字
   * @param node 目標的 HTML 的元素
   */
  async function getText(node: ChildNode) {
    const element = node as HTMLElement;
    switch (node.nodeName) {
      case 'P': {
        if (element.textContent?.trim()) {
          const stringArray = element.textContent.trim().split(' ').filter(word => !/\d/.test(word));
          if (stringArray.length === 0) return []
          try {
            const spellResult = await commonService.checkSpelling(stringArray);
            return spellResult;
          } catch (error) {
            console.error('Error checking spelling for paragraph:', error);
          }
          return []
        }
        break;
      }
      case 'OL': {
        const listItems = element.querySelectorAll('li');
        for (const li of listItems) {
          if (li.textContent?.trim()) {
            const stringArray = li.textContent.trim().split(' ').filter(word => !/\d/.test(word));
            if (stringArray.length === 0) return []
            try {
              const spellResult = await commonService.checkSpelling(stringArray);
              return spellResult;
            } catch (error) {
              console.error('Error checking spelling for paragraph:', error);
            }
            return []
          }
        }
        break;
      }
      default:
        return []
    }
    return []
  }
  
  /**
   * @description 將目標文字取代原文字
   * 
   * @param origin 原文字
   * @param target 目標文字
   */
  const handleUseSuggestion = (origin: string, target: string) => {
    let summary_text = ''
    let education_text = ''
    const Summary = template[ProcessStepTextEnum.Summary];
    const Education = template[ProcessStepTextEnum.Education];

    if (Summary) summary_text = Summary.replaceAll(origin, target);
    if (Education?.coursework) education_text = Education?.coursework.replaceAll(origin, target);

    /** 更新緩存 */
    const updated = { ...cache,
      [ProcessStepTextEnum.Summary]: summary_text,
      [ProcessStepTextEnum.Education]: {
        ...cache[ProcessStepTextEnum.Education],
        coursework: education_text
      }
    };
    storageService.setItem(StorageKeysEnum.Template, JSON.stringify(updated));
    setTemplate(updated)
  }
  
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Spell Check',
      children: (
        <div>
          {templateStyle?.typo.length === 0 ? (
            <>
              <p>Spelling errors have been hightlighted in your resume. Click on each word to edit the text. </p>
              <Button
                type="primary"
                onClick={handleCheckSpelling}
              >Check your spelling</Button>
            </>
          ) : (
            <>
              <div className="d-flex justify-center">
                <Button
                  type="primary"
                  onClick={handleCheckSpelling}
                >Check again?</Button>
              </div>
              <div className="suggestion-container">
                {templateStyle?.typo.map((origin, index) => (
                  <div key={uuidv4()}>
                    <p>{index+1} {origin.string}</p>
                    <div className="d-flex" style={{ flexWrap: 'wrap' }}>
                      <span className="me-2">Suggestion:</span>
                      {origin.suggestion.map(text => (
                        <span
                          key={uuidv4()}
                          className="me-2 suggestion-text"
                          onClick={() => handleUseSuggestion(origin.string, text)}
                        >{text}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      ),
    },
    {
      key: '2',
      label: 'Template & Color',
      children: <ColorPicker onChange={(val) => updateTemplateStyle('color', val)} selected={templateStyle?.color} />,
    },
    {
      key: '3',
      label: 'Formatting Tools',
      children: handleDisplayFormatting(),
    }
  ]

  /**
   * @description 執行 Actions
   */
  const handleExecuteActions = (action: TemplateActionEnum) => {
    /** 取得緩存 */
    const cache = JSON.parse(storageService.getItem(StorageKeysEnum.Template) ?? '{}');
    const inValid: string[] = commonService.handleCheckTemplatePage(cache, false);
    if (inValid.length > 0) reduxDispatch(setModalVisibleAction(ModalNameEnum.Common, true));

    switch (action) {
      case TemplateActionEnum.Download: {
        if (inValid.length === 0) previewTemplateRef.current?.exportToPDF();
        break;
      }
      case TemplateActionEnum.Print: {
        break;
      }
    }
  }

  const handleConfirmWarning = () => {
    /** 取得緩存 */
    const cache = JSON.parse(storageService.getItem(StorageKeysEnum.Template) ?? '{}');
    const inValid: string[] = commonService.handleCheckTemplatePage(cache, false);
    /** 取得第一筆驗證錯誤的頁面 */
    const targetPage: string = inValid.pop() ?? '';
    if (targetPage) {
      /** 強制讓 targetPage 作為 ProcessStepTextEnum 的類型 */
      const targetPageEnum = targetPage as ProcessStepTextEnum;
      const foundItem = Object.entries(ProcessRouteMatchesStep).find((item) => item[1] === ProcessStepTextMatchesCodes[targetPageEnum]);

      const url = foundItem ? foundItem[0] : undefined;
      if (url) navigate(url)
    }
  }

  return (
    <div id="finalize">
      <CommonModal
        visible={modalsState.commonVisible}
        title={CommonTypeEnum.Warning}
        content="Some fields in your form are incomplete or contain errors. Please review each step and ensure all required fields are filled out correctly before submitting. Thank you."
        onConfirm={handleConfirmWarning}
      >
      </CommonModal>

      <TemplateBackground
        title="Review your resume"
        subtitle="Review and make any final changes to your resume. Then download or email yourself a copy and apply for jobs!"
      />
      <section>
        <Row gutter={32} className="h-100">
          {/** Resume */}
          <Col span="16" style={{ height: 'calc(100vh - 307px)', overflow: 'scroll' }}>
            <PreviewTemplate ref={previewTemplateRef} template={template} />
          </Col>
          {/** Actions & Changes */}
          <Col span="8">
            <div className="d-flex justify-between actions-container">
              <div className="actions-container--item" onClick={() => handleExecuteActions(TemplateActionEnum.Download)}>
                <MdDownload style={{ 'fontSize': IconSizeEnum.Large }} />
                <p>Download</p>
              </div>
              <div className="actions-container--item" onClick={() => handleExecuteActions(TemplateActionEnum.Print)}>
                <MdPrint style={{ 'fontSize': IconSizeEnum.Large }} />
                <p>Print</p>
              </div>
              <div className="actions-container--item" onClick={() => handleExecuteActions(TemplateActionEnum.Email)}>
                <MdEmail style={{ 'fontSize': IconSizeEnum.Large }} />
                <p>Email</p>
              </div>
            </div>
            <div className="pa-2">
              <Collapse
                accordion
                defaultActiveKey={["1"]}
                expandIconPosition="end"
                items={items}
                expandIcon={({isActive}) => isActive
                ? <MdExpandLess style={{ 'fontSize': IconSizeEnum.Small }} />
                : <MdExpandMore style={{ 'fontSize': IconSizeEnum.Small }} />}
              >
              </Collapse>
            </div>
          </Col>
        </Row>
      </section>
    </div>
  )
}

export default Finalize
