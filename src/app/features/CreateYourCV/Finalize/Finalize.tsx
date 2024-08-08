import React, { useEffect, useState } from 'react'
import TemplateBackground from '../../../common/layouts/TemplateBackground';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/types';
import { Row, Col, Slider, Select } from 'antd';
import Collapse from "antd/lib/collapse";
import type { CollapseProps } from 'antd';
import { IconSizeEnum } from '../../../core/enums/icon';
import { MdExpandMore, MdExpandLess, MdDownload, MdPrint, MdEmail } from "react-icons/md";
import EditTemplate from '../../../common/components/EditTemplate';
import CommonModal from '../../../common/components/Modals/CommonModal';
import { CommonTypeEnum } from '../../../core/enums/modal/';
import useAppDispatch from '../../../core/hooks/useAppDispatch';
import { setModalVisibleAction } from '../../../store/ui/actions';
import { ModalNameEnum } from '../../../core/enums/modal';
import commonService from '../../../core/services/commonService';
import storageService from '../../../core/services/storageService';
import { StorageKeysEnum } from '../../../core/enums/storage';
import { ProcessStepTextMatchesCodes, ProcessRouteMatchesStep, ProcessStepTextEnum } from '../types';
import { useNavigate } from 'react-router-dom';
import ColorPicker from '../../../common/components/Form/ColorPicker';
import { ColorPickerEnum } from '../../../core/enums/color';
import { TemplateStyle } from './types';
import { FaFont } from "react-icons/fa";

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
  const navigate = useNavigate()
  const reduxDispatch = useAppDispatch();
  /** 取得 Modal 狀態 */
  const modalsState = useSelector((state: RootState) => state.UI.modals);
  /** Template Style */
  const [templateStyle, setTemplateStyle] = useState<TemplateStyle>({
    color: ColorPickerEnum.Beige,
    fontSize: 'Normal',
    fontStyle: '',
    paragraphSpacing: 2,
    lineSpacing: 2,
  });
  /** 取得緩存 */
  const cache = JSON.parse(storageService.getItem(StorageKeysEnum.Template) ?? '{}');
  const finalize = cache[ProcessStepTextEnum.Finalize];

  /** 
   * @description 載入緩存
   */
  useEffect(() => {
    /** 設定 form */
    setTemplateStyle(finalize);
  }, [])

  useEffect(() => {
    const updated = { ...cache, [ProcessStepTextEnum.Finalize]: templateStyle };
    storageService.setItem(StorageKeysEnum.Template, JSON.stringify(updated));
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
          {['Small', 'Normal', 'Large'].map((size: string) => {
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
        <Slider min={8} max={24} defaultValue={templateStyle?.paragraphSpacing} onChange={(val) => updateTemplateStyle('paragraphSpacing', val)} />
        {/** Line Spacing */}
        <p>Line Spacing</p>
        <Slider min={8} max={24} defaultValue={templateStyle?.lineSpacing} onChange={(val) => updateTemplateStyle('lineSpacing', val)} />
      </div>
    )
  }
  
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Spell Check',
      children: <p>Spelling errors have been hightlighted in your resume. Click on each word to edit the text. </p>,
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
    },
    {
      key: '4',
      label: 'Add sections',
      children: <p>1</p>,
    },
  ]

  /**
   * @description 執行 Actions
   */
  const handleExecuteActions = () => {
    reduxDispatch(setModalVisibleAction(ModalNameEnum.Common, true))
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
          <Col span="16">
            <EditTemplate />
          </Col>
          {/** Actions & Changes */}
          <Col span="8">
            <div className="d-flex justify-between actions-container">
              <div className="actions-container--item" onClick={handleExecuteActions}>
                <MdDownload style={{ 'fontSize': IconSizeEnum.Large }} />
                <p>Download</p>
              </div>
              <div className="actions-container--item" onClick={handleExecuteActions}>
                <MdPrint style={{ 'fontSize': IconSizeEnum.Large }} />
                <p>Print</p>
              </div>
              <div className="actions-container--item" onClick={handleExecuteActions}>
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
