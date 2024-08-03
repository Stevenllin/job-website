import React from 'react'
import TemplateBackground from '../../../common/layouts/TemplateBackground';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/types';
import { Button, Row, Col } from 'antd';
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

const Finalize: React.FC = () => {
  const navigate = useNavigate()
  const reduxDispatch = useAppDispatch();
  /** 取得 Modal 狀態 */
  const modalsState = useSelector((state: RootState) => state.UI.modals);
  
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Spell Check',
      children: <p>1</p>,
    },
    {
      key: '2',
      label: 'Template & Color',
      children: <p>1</p>,
    },
    {
      key: '3',
      label: 'Formatting Tools',
      children: <p>1</p>,
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
