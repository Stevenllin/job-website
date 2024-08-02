import React, { useEffect, useState, useRef } from 'react';
import { ROUTES } from '../../../core/enums/router';
import { useNavigate, useLocation } from 'react-router-dom';
import TemplateBackground from '../../../common/layouts/TemplateBackground';
import { Button, Form, Input, Row, Col, Checkbox, DatePicker } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import PreviewTemplate from '../../../common/layouts/PreviewTemplate';
import { ProcessStepTextEnum } from '../types';
import storageService from '../../../core/services/storageService';
import { StorageKeysEnum } from '../../../core/enums/storage';
import commonService from '../../../core/services/commonService';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { getRequiredRule, getStartDateRule, getEndDateRule } from '../../../core/services/validationService';

const WorkHistory: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  /** 取得緩存 */
  const cache = JSON.parse(storageService.getItem(StorageKeysEnum.Template) ?? '{}');
  /** 為了更新 Preview Template */
  const [template, setTemplate] = useState(cache)
  const hasWorkHistory = cache[ProcessStepTextEnum.WorkHistory];
  /** 判斷使用者輸入過沒有 */
  const isEditing = useRef<boolean>(false);
  /** 判斷目標輸入 id */
  const selectedId = useRef<string>(state?.isEditMode ? state.data.id : uuidv4());

  /** 
   * @description 載入緩存並設置 Form 表單
   */
  useEffect(() => {
    const history = cache[ProcessStepTextEnum.WorkHistory] ? state?.isEditMode ? state.data : cache[ProcessStepTextEnum.WorkHistory] : {};
    /** 待優化：若從 edit 過來，編輯完後 refresh 頁面，緩存成功，但一直用 state.data 顯示編輯前的資料 是否需要用 redux 暫存最新的資料 */
    const updatedHistory = Array.isArray(history) ? state?.isCreateNewMode ? {} : history[0] : history
    const updated = {
      ...updatedHistory,
      start_date: updatedHistory.start_date && dayjs(commonService.convertDateFormat(updatedHistory.start_date), 'YYYY-MM'),
      end_date: updatedHistory.end_date && dayjs(commonService.convertDateFormat(updatedHistory.end_date), 'YYYY-MM'),
    }
    /** 設定 form */
    form.setFieldsValue(updated)
  }, [])

  /**
   * @description 更新緩存
  */
  const handleChange = async (_: any, all: any) => {
    /** 更新緩存 */
    const cache = JSON.parse(storageService.getItem(StorageKeysEnum.Template) ?? '{}');
    let work_history = cache[ProcessStepTextEnum.WorkHistory] ?? [];
    const updated = { ...cache };

    /** 這是首次沒有緩存時 或 在 isCreateNewMode 首次輸入時 */
    if (!hasWorkHistory || (state?.isCreateNewMode && !isEditing.current)) {
      work_history.push({ id: selectedId.current, ...all });
    } else {
      /** 這是編輯模式時 或 在 isCreateNewMode 首次輸入之後 */
      work_history = work_history.map((item: any) =>
        item.id === selectedId.current ? { id: item.id, errors: item.errors, ...all } : item
      );
    }

    updated[ProcessStepTextEnum.WorkHistory] = work_history;
    storageService.setItem(StorageKeysEnum.Template, JSON.stringify(updated));
    setTemplate(updated)
  
    isEditing.current = true;
  };

  const handleSubmit = async () => {
    /** 更新緩存 */
    const cache = JSON.parse(storageService.getItem(StorageKeysEnum.Template) ?? '{}');
    /** 取得最新的 */
    let work_history = cache[ProcessStepTextEnum.WorkHistory] ?? [];
    const updated = { ...cache };

    try {
      await form.validateFields();
      /** 成功也要刷新 */
      work_history = work_history.map((item: any) => {
        if (item.id === selectedId.current) return { ...item, errors: null }
        return item;
      })
    } catch (error: any) {
      const { errorFields } = error;
      const errors = errorFields.map((field: any) => (field.name[0]))

      work_history = work_history.map((item: any) => {
        if (item.id === selectedId.current) return { ...item, errors }
        return item;
      })
      // updated[ProcessStepTextEnum.WorkHistory] = work_history;
      // storageService.setItem(StorageKeysEnum.Template, JSON.stringify(updated));
    }
    updated[ProcessStepTextEnum.WorkHistory] = work_history;
    storageService.setItem(StorageKeysEnum.Template, JSON.stringify(updated));
    /** 至 Work Summary */
    navigate(ROUTES.FEATURES__CREATE_YOUR_CV__WORK_SUMMARY);
  };

  const { TextArea } = Input;

  return (
    <div id="work-history">
      <TemplateBackground
        title="Tell us about your recent job"
        subtitle="We’ll start there and work backward."
      />
      <section>
        <Form
          form={form}
          onValuesChange={handleChange}
        >
          <div className="d-flex">
            <div className="pa-2">
              <Row gutter={32}>
                {/** Job Title */}
                <Col span="12">
                  <Form.Item
                    name="job_title"
                    label="Job Title"
                    layout="vertical"
                    rules={[getRequiredRule('Please input the Job Title')]}
                  >
                    <Input
                      placeholder="e.g. Customer Service Representative"
                      className="custom-input"
                      style={{ letterSpacing: '0.1rem' }}
                    />
                  </Form.Item>
                </Col>
                {/** Employer */}
                <Col span="12">
                  <Form.Item
                    name="employer"
                    label="Employer"
                    layout="vertical"
                    rules={[getRequiredRule('Please input the Employer')]}
                  >
                    <Input
                      placeholder="e.g. ACME Technologies"
                      className="custom-input"
                      style={{ letterSpacing: '0.1rem' }}
                    />
                  </Form.Item>
                </Col>
                {/** Location */}
                <Col span="12">
                  <Form.Item
                    name="location"
                    label="Location"
                    layout="vertical"
                  >
                    <Input
                      placeholder="e.g. San Francisco, California or CA"
                      className="custom-input"
                      style={{ letterSpacing: '0.1rem' }}
                    />
                  </Form.Item>
                </Col>
                <br></br>
                {/** Remote */}
                <Col span="12" className="d-flex align-center">
                  <Form.Item
                    name="remote"
                    label=""
                    layout="vertical"
                    className="mb-0"
                    valuePropName="checked"
                  >
                    <Checkbox >Remote</Checkbox>
                  </Form.Item>
                </Col>
                {/** Start Date */}
                <Col span="12">
                  <Form.Item
                    name="start_date"
                    label="Start Date"
                    layout="vertical"
                    rules={getStartDateRule(true, form)}
                  >
                    <DatePicker format="YYYY/MM" picker="month"></DatePicker>
                  </Form.Item>
                </Col>
                {/** End Date */}
                <Col span="12">
                  <Form.Item
                    name="end_date"
                    label="End Date"
                    layout="vertical"
                    rules={getEndDateRule(true, form)}
                  >
                    <DatePicker format="YYYY/MM" picker="month"></DatePicker>
                  </Form.Item>
                </Col>
                {/** Job Description */}
                <Col span="24">
                  <Form.Item
                    name="job_description"
                    label="Job Description"
                    layout="vertical"
                  >
                    <TextArea
                      placeholder="Controlled autosize"
                      autoSize={{ minRows: 8, maxRows: 10 }}
                    >
                    </TextArea>
                  </Form.Item>
                </Col>
              </Row>
            </div>
            {/** Preview Template */}
            <div className="pa-2">
              <PreviewTemplate template={template} />
            </div>
          </div>
          {/** Submit Button */}
          <Button
            type="primary"
            icon={<ArrowRightOutlined />}
            iconPosition="end"
            className="submit"
            onClick={handleSubmit}
          >Next: Work Summary</Button>
        </Form>
      </section>
    </div>
  )
}

export default WorkHistory
