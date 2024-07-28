import React, { useState } from 'react'
import TemplateBackground from '../../../common/layouts/TemplateBackground';
import { Select, Input, Form, Button, Rate, Row, Col } from 'antd';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { SkillsDefines, SkillsTypeDefines, SkillsTypeBackgroundDefines } from './types';
import { FaSquarePlus } from "react-icons/fa6";
import { IconSizeEnum } from '../../../core/enums/iconSize';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../core/enums/routerPath';

const Skills: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState([{ id: uuidv4(), name: '', rate: 0 }]);

  const handleChange = () => {

  }

  const handleAddSkills = () => {
    setInputs(prev => [
      ...prev,
      { id: uuidv4(), name: '', rate: 0 }
    ])
  }

  const onFinish = async () => {
    console.log(form.getFieldsValue())
    navigate(ROUTES.FEATURES__CREATE_YOUR_CV__SUMMARY);
  }

  return (
    <div id="skills">
      <TemplateBackground
        title="What skills would you like to highlight?"
        subtitle="Choose from our pre-written examples below or write your own."
      />
      <section>
        <Form
          form={form}
          onFinish={onFinish}
          onValuesChange={handleChange}
        >
          <Row className="justify-between">
            {/** Search Container */}
            <Col span="10" className="search-container">
              {/** Skills Type */}
              <div className="select mb-2">
                <Select
                  placeholder="e.g. Select"
                  options={SkillsTypeDefines}
                  style={{ width: '250px' }}
                >
                </Select>
              </div>
              {/** Skills Data */}
              <div className="data">
                {SkillsDefines.map(item => (
                  <div className="skills-container fs-3" key={item.name}>
                    <FaSquarePlus style={{ 'fontSize': IconSizeEnum.Large }} />
                    <div>
                      <p className="fs-2 fw-dark">{item.name}</p>
                      <span className="fs-1" style={{ background: SkillsTypeBackgroundDefines[item.typeText] }}>{item.typeText}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
            {/** Input and Rate */}
            <Col span="8" className="inputs-container">
              {inputs.map((item, index) => (
                <div key={item.id}>
                  <Form.Item
                    name={`input_${item.id}`}
                    label={`Skills ${index + 1}`}
                    layout="vertical"
                  >
                    <Input
                      placeholder="e.g. MySQL"
                      className="custom-input"
                      style={{ letterSpacing: '0.1rem' }}
                    />
                  </Form.Item>
                  <Form.Item
                    name={`rate_${item.id}`}
                  >
                    <Rate />
                  </Form.Item>
                </div>
              ))}
              <Button
                type="link"
                icon={<PlusOutlined />}
                iconPosition="start"
                onClick={handleAddSkills}
              >Add more skills</Button>
            </Col>
          </Row>
          {/** Submit Button */}
          <Button
            type="primary"
            icon={<ArrowRightOutlined />}
            iconPosition="end"
            htmlType="submit"
          >Next: Summary</Button>
        </Form>
      </section>
    </div>
  )
}

export default Skills
