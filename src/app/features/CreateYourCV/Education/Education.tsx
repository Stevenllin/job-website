import React, { useState } from 'react'
import TemplateBackground from '../../../common/layouts/TemplateBackground';
import { Form, Select, Input, Button, Row, Col } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { IconSizeEnum } from '../../../core/enums/iconSize';
import Collapse from "antd/lib/collapse";
import type { CollapseProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../core/enums/routerPath';

const Education: React.FC = () => {
  const [form] = Form.useForm();
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const navigate = useNavigate()

  const handleToggle = () => {
    setIsExpand(prev => !prev)
  }

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'This is panel header 1',
      children: <p>1</p>,
    },
    {
      key: '2',
      label: 'This is panel header 2',
      children: <p>1</p>,
    },
    {
      key: '3',
      label: 'This is panel header 3',
      children: <p>1</p>,
    },
  ];

  const onFinish = async () => {
    navigate(ROUTES.FEATURES__CREATE_YOUR_CV__SKILLS);
  }
  
  return (
    <div id="education">
      <TemplateBackground
        title="Tell us about your education"
        subtitle="Enter your education experience so far, even if you are a current student or did not graduate."
      />
      <section>
        <Form
          form={form}
          onFinish={onFinish}
        >
          <Row gutter={32}>
            {/** School Name */}
            <Col span="12">
              <Form.Item
                name="school_name"
                label="School Name"
                layout="vertical"
              >
                <Input
                  placeholder="e.g. San Jose State"
                  className="custom-input"
                  style={{ letterSpacing: '0.1rem' }}
                />
              </Form.Item>
            </Col>
            {/** School Location */}
            <Col span="12">
              <Form.Item
                name="school_location"
                label="School Location"
                layout="vertical"
              >
                <Input
                  placeholder="e.g. San Jose"
                  className="custom-input"
                  style={{ letterSpacing: '0.1rem' }}
                />
              </Form.Item>
            </Col>
            {/** Degree */}
            <Col span="12">
              <Form.Item
                name="degree"
                label="Degree"
                layout="vertical"
              >
                <Select
                  placeholder="e.g. Select"
                  options={[
                    { label: 'Bachelor', value: '1'},
                    { label: 'Master', value: '2'},
                    { label: 'PhD', value: '3'},
                  ]}
                >
                </Select>
              </Form.Item>
            </Col>
            {/** Field Of Study */}
            <Col span="12">
              <Form.Item
                name="field"
                label="Field of Study"
                layout="vertical"
              >
                <Input
                  placeholder="e.g. Accountant"
                  className="custom-input"
                  style={{ letterSpacing: '0.1rem' }}
                />
              </Form.Item>
            </Col>
          </Row>

          {/** Showcase */}
          <div className={isExpand ? 'showcase active' : 'showcase'}>
            {/** Title */}
            <div className="title" onClick={handleToggle}>
              <div className="d-flex align-center">
                {
                  isExpand ? 
                    <MdExpandLess style={{ 'fontSize': IconSizeEnum.Medium }} />
                  :
                    <MdExpandMore style={{ 'fontSize': IconSizeEnum.Medium }} />
                }
                <span className="ms-2">Add any additional coursework you're pround to showcase</span>
              </div>
              <span className="text--blue">Look here sample reference</span>
            </div>
            {/** Content */}
            <div className="content">
              <Row gutter={16}>
                <Col span="12">
                  <Collapse
                    defaultActiveKey={["1"]}
                    expandIconPosition="end"
                    items={items}
                    expandIcon={({isActive}) => isActive
                    ? <MdExpandLess style={{ 'fontSize': IconSizeEnum.Small }} />
                    : <MdExpandMore style={{ 'fontSize': IconSizeEnum.Small }} />}
                  >
                    {/* <Collapse.Panel
                      header="This is panel header 1"
                      key="1"
                    >
                      content
                    </Collapse.Panel> */}
                  </Collapse>
                </Col>
                <Col span="12">
                  Education Description

                </Col>
              </Row>
            </div>
          </div>
          <Button
            type="primary"
            icon={<ArrowRightOutlined />}
            iconPosition="end"
            htmlType="submit"
          >Next: Skills</Button>
        </Form>
      </section>
    </div>
  )
}

export default Education
