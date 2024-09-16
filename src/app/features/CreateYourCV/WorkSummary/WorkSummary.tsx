import React, { useState, useEffect, useRef } from 'react'
import { ROUTES } from '../../../core/enums/router';
import TemplateBackground from '../../../common/layouts/TemplateBackground';
import { useNavigate } from 'react-router-dom';
import PreviewTemplate from '../../../common/layouts/PreviewTemplate';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { StorageKeysEnum } from '../../../core/enums/storage';
import storageService from '../../../core/services/storageService';
import { ProcessStepTextEnum } from '../types';
import { WorkHistory } from './types';
import { FaTrash } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { IconSizeEnum } from '../../../core/enums/icon'
import commonService from '../../../core/services/commonService';
import { DateFormatEnum } from '../../../core/enums/date';
import { RootState } from '../../../store/types';
import { useSelector } from 'react-redux';
import { CommonTypeEnum } from '../../../core/enums/modal/';
import CommonModal from '../../../common/components/Modals/CommonModal';
import useAppDispatch from '../../../core/hooks/useAppDispatch';
import { ModalNameEnum } from '../../../core/enums/modal';
import { setModalVisibleAction } from '../../../store/ui/actions';

const WorkSummary: React.FC = () => {
  const [histories, setHistories] = useState<WorkHistory[]>([]);
  const selected = useRef<string>();
  const navigate = useNavigate();
  const reduxDispatch = useAppDispatch();
  /** 取得 Modal 狀態 */
  const modalsState = useSelector((state: RootState) => state.UI.modals);

  /**
   * @description 載入緩存並設置 Form 表單
   */
   useEffect(() => {
    /** 取得緩存 */
    const cache = JSON.parse(storageService.getItem(StorageKeysEnum.Template) ?? '{}');
    /** 若沒有選擇 Template 跳轉畫面 */
    const template = cache[ProcessStepTextEnum.ChooseTemplate];
    if (!template) navigate(ROUTES.FEATURES__CREATE_YOUR_CV__CHOOSE_TEMPLATE)
    const history = cache[ProcessStepTextEnum.WorkHistory] ? cache[ProcessStepTextEnum.WorkHistory] : [];
    setHistories(history);
  }, [])

  const handleAddPosition = () => {
    navigate(ROUTES.FEATURES__CREATE_YOUR_CV__WORK_HISTORY, { state: { isCreateNewMode: true } });
  }
  
  const handleEditPosition = (history: WorkHistory) => {
    navigate(ROUTES.FEATURES__CREATE_YOUR_CV__WORK_HISTORY, { state: { isEditMode: true, data: history } });
  }

  const handleClickNext = () => {
    navigate(ROUTES.FEATURES__CREATE_YOUR_CV__EDUCATION);
  }

  const handleDelete = (history: WorkHistory) => {
    reduxDispatch(setModalVisibleAction(ModalNameEnum.Common, true));
    selected.current = history.id;
  }

  const handleConfirm = () => {
    /** 取得緩存 */
    const cache = JSON.parse(storageService.getItem(StorageKeysEnum.Template) ?? '{}');
    const current = cache[ProcessStepTextEnum.WorkHistory] ? cache[ProcessStepTextEnum.WorkHistory] : [];
    const filtered = current.filter((item: WorkHistory) => item.id !== selected.current);
    const updated = { ...cache, [ProcessStepTextEnum.WorkHistory]: filtered };
    
    storageService.setItem(StorageKeysEnum.Template, JSON.stringify(updated));
    setHistories(filtered);
  }

  return (
    <div id="work-summary">
      <CommonModal
        visible={modalsState.commonVisible}
        title={CommonTypeEnum.Warning}
        content="Are you sure you want to delete this work experience? This action cannot be undone. Please confirm before proceeding."
        onConfirm={handleConfirm}
      >
      </CommonModal>
      <TemplateBackground
        title="Work History Summary"
        subtitle="Further Enhance Your Experience"
      />
      <section>
        <div className="d-flex">
          <div className="w-100 pa-2">
            <div className="summary-container">
              <div className="work-list">
                {histories.map((history, index) => (
                  <div className="work-list--item" key={index}>
                    <div className="number fs-3">{index+1}</div>
                    {/** Job title and Employer */}
                    <span className="fs-3 fw-dark">{history.job_title}, {history.employer}</span>
                    <br></br>
                    <span>{history.location} | {history.start_date && commonService.convertDateFormat(history.start_date, DateFormatEnum.YYYYMM)} - {history.end_date && commonService.convertDateFormat(history.end_date, DateFormatEnum.YYYYMM)}</span>
                    <span></span>
                    <div className="icon-container">
                      <MdModeEditOutline style={{ 'fontSize': IconSizeEnum.Medium }} onClick={() => handleEditPosition(history)} />
                      <FaTrash style={{ 'fontSize': IconSizeEnum.Medium }} onClick={() => handleDelete(history)} />
                    </div>
                  </div>
                ))}
              </div>
              <Button type="text" className="add-position" onClick={handleAddPosition}>ADD NEW POSITION</Button>
            </div>
          </div>
          {/** Preview Template */}
          <div className="pa-2">
            <PreviewTemplate />
          </div>
        </div>
        {/** Submit Button */}
        <Button
          type="primary"
          icon={<ArrowRightOutlined />}
          iconPosition="end"
          onClick={handleClickNext}
          className="submit"
        >Next: Education</Button>
      </section>
    </div>
  )
}

export default WorkSummary
