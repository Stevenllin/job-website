import React, { useState, useRef, useEffect } from 'react'
import TemplateBackground from '../../../common/layouts/TemplateBackground';
import { Form, Select, Input, Button, Row, Col } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { IconSizeEnum } from '../../../core/enums/icon';
import Collapse from "antd/lib/collapse";
import type { CollapseProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../core/enums/router';
import PreviewTemplate from '../../../common/layouts/PreviewTemplate';
import useAppDispatch from '../../../core/hooks/useAppDispatch';
import { setModalVisibleAction } from '../../../store/ui/actions';
import { ModalNameEnum } from '../../../core/enums/modal';
import { getRequiredRule } from '../../../core/services/validationService';
import TextEditer from '../../../common/components/TextEditer';
import CheckItem from '../../../common/components/CheckItem';
import { CourseworkDefines, Coursework } from '../Education/types';
import { CourseworkTypeEnum } from "../../../core/enums/coursework";
import { Skill } from '../Skills/types';

const Education: React.FC = () => {
  const [form] = Form.useForm();
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const navigate = useNavigate()
  const reduxDispatch = useAppDispatch();
  const editorRef = useRef<{ getEditorContent: () => string }>(null);
  /** 呈現更新後的 CourseworkDefines */
  const [updatedCourseworkDefines, setUpdatedCourseworkDefines] = useState<Coursework[]>(CourseworkDefines);

  const handleToggle = () => {
    setIsExpand(prev => !prev)
  }

  const handleCheck = (item: Skill | Coursework) => {
    console.log('item', item);
  } 

  const handleCreateCollapse = (type: CourseworkTypeEnum) => {
    const filtered = updatedCourseworkDefines.filter(item => item.type === type);
    return (
      <>
        {filtered.map(item => (
          <div key={item.id}>
            <CheckItem item={item} name={item.name} onCheck={handleCheck}></CheckItem>
          </div>
        ))}
      </>
    )
  }

  useEffect(() => {

  }, [])

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Educational Achievements',
      children: handleCreateCollapse(CourseworkTypeEnum.ACHIEVEMENTS),
    },
    {
      key: '2',
      label: 'Awards, Bursaries, Prizes and Scholarships',
      children: handleCreateCollapse(CourseworkTypeEnum.AWARDS),
    },
    {
      key: '3',
      label: 'Major Projects',
      children: handleCreateCollapse(CourseworkTypeEnum.PROJECTS),
    },
  ];

  const handleSubmit = async () => {
    navigate(ROUTES.FEATURES__CREATE_YOUR_CV__SKILLS);
  }

  const handleSaveSummary = (innerHTML: string) => {
    console.log('innerHTML', innerHTML);
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
                    rules={[getRequiredRule('Please input the school name')]}
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
                    rules={[getRequiredRule('Please input the school location')]}
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
                    rules={[getRequiredRule('Please input the degree')]}
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
                    rules={[getRequiredRule('Please input the field')]}
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
                        accordion
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
                      <TextEditer ref={editorRef} default="" onSave={handleSaveSummary} />
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
              className="submit"
              onClick={handleSubmit}
            >Next: Skills</Button>
          </div>
        </Form>
      </section>
    </div>
  )
}

export default Education
