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
import PreviewTemplate from '../../../common/layouts/PreviewTemplate';
import useAppDispatch from '../../../core/hooks/useAppDispatch';
import { setModalVisibleAction } from '../../../store/ui/actions';
import { ModalNameEnum } from '../../../core/enums/modalName';

const Education: React.FC = () => {
  const [form] = Form.useForm();
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const navigate = useNavigate()
  const reduxDispatch = useAppDispatch();

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

  const handleCheckSampleRef = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    reduxDispatch(setModalVisibleAction(ModalNameEnum.EducationSampleRef, true))
  }
  
  return (
    <div id="education">
      <TemplateBackground
        title="Tell us about your Education"
        subtitle="Enter your education experience so far, even if you are a current student or did not graduate."
      />
      <section>
        <Form
          form={form}
          onFinish={onFinish}
        >
          <div className="d-flex">
            <div className="pa-2 w-100">
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
                  <span className="text--blue" onClick={handleCheckSampleRef}>Look here sample reference</span>
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
                      </Collapse>
                    </Col>
                    <Col span="12">
                      Education Description
                    </Col>
                  </Row>
                </div>
              </div>

            </div>
            {/** Preview Template */}
            <div className="pa-2">
              <PreviewTemplate />
            </div>
          </div>
          {/** Submit Button */}
          <div className="pa-2 d-flex justify-end">
            <Button
              type="primary"
              icon={<ArrowRightOutlined />}
              iconPosition="end"
              htmlType="submit"
            >Next: Skills</Button>
          </div>
        </Form>
      </section>
    </div>
  )
}

export default Education
