import React from 'react';
import { ROUTES } from '../../../core/enums/routerPath';
import { useNavigate } from 'react-router-dom';
import TemplateBackground from '../../../common/layouts/TemplateBackground';
import { Button, Form, Input, Row, Col, Checkbox, DatePicker } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const WorkHistory: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate()

  const onFinish = () => {
    navigate(ROUTES.FEATURES__CREATE_YOUR_CV__WORK_HISTORY);
  };

  const { TextArea } = Input;

  return (
    <div id="work">
      <div id="preview"></div>
      <TemplateBackground
        title="Tell us about your most recent job"
        subtitle="We’ll start there and work backward."
      />
      <section>
        <Form
          form={form}
          onFinish={onFinish}
        >
          <Row gutter={32}>
            {/** Job Title */}
            <Col span="12">
              <Form.Item
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
              <Checkbox>Remote</Checkbox>
            </Col>
            {/** Start Date */}
            <Col span="12">
              <label>Start Date</label>
              <DatePicker className="mt-1" picker="month"></DatePicker>
            </Col>
            {/** End Date */}
            <Col span="12">
              <label>End Date</label>
              <DatePicker className="mt-1" picker="month"></DatePicker>
            </Col>
            {/** Job Description */}
            <Col span="24" className="mt-3">
              <label>Job Description</label>
              <TextArea
                className="mt-1"
                placeholder="Controlled autosize"
                autoSize={{ minRows: 8, maxRows: 10 }}
              >
              </TextArea>
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
