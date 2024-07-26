import React, { useEffect } from 'react';
import { ROUTES } from '../../../core/enums/routerPath';
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

const WorkHistory: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  /** 取得緩存 */
  const cache = JSON.parse(storageService.getItem(StorageKeysEnum.Template) ?? '{}');
  const hasWorkHistory = cache[ProcessStepTextEnum.WorkHistory];
  /** 判斷使用者輸入過沒有 */
  let isEditing = false;

  /** 
   * @description 載入緩存並設置 Form 表單
   */
  useEffect(() => {
    const history = cache[ProcessStepTextEnum.WorkHistory] ? state.isEditMode ? state.data : cache[ProcessStepTextEnum.WorkHistory] : [];
    const updated = {
      ...history,
      start_date: history.start_date && dayjs(commonService.convertDateFormat(history.start_date), 'YYYY-MM'),
      end_date: history.end_date && dayjs(commonService.convertDateFormat(history.end_date), 'YYYY-MM'),
    }
    /** 設定 form */
    form.setFieldsValue(updated)
  }, [])

  /**
   * @description 更新緩存
  */
  const handleChange = async (val: any, all: any) => {
    /** 更新緩存 */
    let work_history = cache[ProcessStepTextEnum.WorkHistory] ?? [];
    const updated = { ...cache };
    const key = Object.keys(val)[0];
    const value = Object.values(val)[0];
  
    if (!hasWorkHistory || (!state.isEditMode && !isEditing)) {
      /** 這是首次沒有緩存時 或 Add new position 首次輸入時 */
      work_history.push({ id: uuidv4(), ...all });
    } else if (state.isEditMode) {
      /** 這是編輯模式時 */
      work_history = work_history.map((item: any) =>
        item.id === state.data.id ? { id: item.id, ...all } : item
      );
    } else if (isEditing) {
      /** 這是 Add new position 之後的輸入 */
      work_history[work_history.length - 1] = {
        ...work_history[work_history.length - 1],
        [key]: value
      };
    }
  
    updated[ProcessStepTextEnum.WorkHistory] = work_history;
    storageService.setItem(StorageKeysEnum.Template, JSON.stringify(updated));
  
    isEditing = true;
  };

  const onFinish = () => {
    navigate(ROUTES.FEATURES__CREATE_YOUR_CV__WORK_SUMMARY);
  };

  const { TextArea } = Input;

  return (
    <div id="work-history">
      <PreviewTemplate />
      <TemplateBackground
        title="Tell us about your most recent job"
        subtitle="We’ll start there and work backward."
      />
      <section>
        <Form
          form={form}
          onFinish={onFinish}
          onValuesChange={handleChange}
        >
          <Row gutter={32}>
            {/** Job Title */}
            <Col span="12">
              <Form.Item
                name="job_title"
                label="Job Title"
                layout="vertical"
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
          <Button
            type="primary"
            icon={<ArrowRightOutlined />}
            iconPosition="end"
            htmlType="submit"
          >Next</Button>
        </Form>
      </section>
    </div>
  )
}

export default WorkHistory
