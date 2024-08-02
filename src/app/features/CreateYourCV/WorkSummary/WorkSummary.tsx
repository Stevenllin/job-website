import React, { useState, useEffect } from 'react'
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

const WorkSummary: React.FC = () => {
  const [histories, setHistories] = useState<WorkHistory[]>([]);
  const navigate = useNavigate();

  /**
   * @description 載入緩存並設置 Form 表單
   */
   useEffect(() => {
    /** 取得緩存 */
    const cache = JSON.parse(storageService.getItem(StorageKeysEnum.Template) ?? '{}');
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

  return (
    <div id="work-summary">
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
                    <span>{history.location} | {commonService.convertDateFormat(history.start_date)} - {commonService.convertDateFormat(history.end_date)}</span>
                    <span></span>
                    <div className="icon-container">
                      <MdModeEditOutline style={{ 'fontSize': IconSizeEnum.Medium }} onClick={() => handleEditPosition(history)} />
                      <FaTrash style={{ 'fontSize': IconSizeEnum.Medium }}  />
                    </div>
                  </div>
                ))}
              </div>
              <Button type="text" className="add-position" onClick={handleAddPosition}>Add new position</Button>
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
