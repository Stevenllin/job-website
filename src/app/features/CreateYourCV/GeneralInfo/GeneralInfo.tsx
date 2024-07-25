import React from 'react'
import { ROUTES } from '../../../core/enums/routerPath';
import { useNavigate } from 'react-router-dom';
import TemplateBackground from '../../../common/layouts/TemplateBackground';
import { Button, Form, Input, Row, Col } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const GeneralInfo: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate()

  const onFinish = () => {
    navigate(ROUTES.FEATURES__CREATE_YOUR_CV__WORK_HISTORY);
  };

  return (
    <div id="info">
      <TemplateBackground
        title="What’s the best way contact you?"
        subtitle="We suggest including an email and phone number."
      />
      <section>
        <Form
          form={form}
          onFinish={onFinish}
        >
          <div>
            <Row gutter={32}>
              {/** First Name */}
              <Col span="12">
                <Form.Item
                  label="First Name"
                  layout="vertical"
                >
                  <Input
                    placeholder="e.g. John"
                    className="custom-input"
                    style={{ letterSpacing: '0.1rem' }}
                  />
                </Form.Item>
              </Col>
              {/** Last Name */}
              <Col span="12">
                <Form.Item
                  label="Last Name"
                  layout="vertical"
                  >
                  <Input
                    placeholder="e.g. Smith"
                    className="custom-input"
                    style={{ letterSpacing: '0.1rem' }}
                  />
                </Form.Item>
              </Col>
              {/** Profession */}
              <Col span="24">
                <Form.Item
                  label="Profession"
                  layout="vertical"
                  >
                  <Input
                    placeholder="e.g. Software Engineer"
                    className="custom-input"
                    style={{ letterSpacing: '0.1rem' }}
                  />
                </Form.Item>
              </Col>
              {/** Country */}
              <Col span="12">
                <Form.Item
                  label="Country"
                  layout="vertical"
                  >
                  <Input
                    placeholder="e.g. example@gmail.com"
                    className="custom-input"
                    style={{ letterSpacing: '0.1rem' }}
                  />
                </Form.Item>
              </Col>
              {/** City */}
              <Col span="12">
                <Form.Item
                  label="City"
                  layout="vertical"
                  >
                  <Input
                    placeholder="e.g. 0978345950"
                    className="custom-input"
                    style={{ letterSpacing: '0.1rem' }}
                  />
                </Form.Item>
              </Col>
              {/** Phone */}
              <Col span="12">
                <Form.Item
                  label="Phone"
                  layout="vertical"
                  >
                  <Input
                    placeholder="e.g. 0978345950"
                    className="custom-input"
                    style={{ letterSpacing: '0.1rem' }}
                  />
                </Form.Item>
              </Col>
              {/** Email */}
              <Col span="12">
                <Form.Item
                  label="Email"
                  layout="vertical"
                  >
                  <Input
                    placeholder="e.g. example@gmail.com"
                    className="custom-input"
                    style={{ letterSpacing: '0.1rem' }}
                  />
                </Form.Item>
              </Col>
            </Row>
            
          </div>
          <Button
            type="primary"
            icon={<ArrowRightOutlined />}
            iconPosition="end"
            htmlType="submit"
          >Next: Work History</Button>
        </Form>
      </section>
    </div>
  )
}

export default GeneralInfo
