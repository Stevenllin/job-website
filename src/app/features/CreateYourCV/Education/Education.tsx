import React, { useState, useRef, useEffect } from 'react'
import TemplateBackground from '../../../common/layouts/TemplateBackground';
import { Form, Select, Input, Button, Row, Col, DatePicker } from 'antd';
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
import { getRequiredRule, getStartDateRule, getEndDateRule } from '../../../core/services/validationService';
import TextEditer from '../../../common/components/TextEditer';
import CheckItem from '../../../common/components/CheckItem';
import { CourseworkDefines, Coursework } from '../Education/types';
import { CourseworkTypeEnum } from "../../../core/enums/coursework";
import { Skill } from '../Skills/types';
import { TextEditorHandle } from '../../../common/components/TextEditer/types';
import { OperationCodeEnum } from '../../../core/enums/operation';
import commonService from '../../../core/services/commonService';
import storageService from '../../../core/services/storageService';
import { StorageKeysEnum } from '../../../core/enums/storage';
import { ProcessStepTextEnum } from '../types';
import dayjs from 'dayjs';
import { DateFormatEnum } from '../../../core/enums/date';

const Education: React.FC = () => {
  const [form] = Form.useForm();
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const navigate = useNavigate()
  const reduxDispatch = useAppDispatch();
  const editorRef = useRef<TextEditorHandle>(null);
  /** 呈現更新後的 CourseworkDefines */
  const [updatedCourseworkDefines, setUpdatedCourseworkDefines] = useState<Coursework[]>(CourseworkDefines);
  /** 取得緩存 */
  const cache = JSON.parse(storageService.getItem(StorageKeysEnum.Template) ?? '{}');
  const education = cache[ProcessStepTextEnum.Education];
  /** 為了更新 Preview Template */
  const [template, setTemplate] = useState(cache);

  /** 
   * @description 載入緩存
  */
  useEffect(() => {
    /** 設定 form */
    const updated = {
      ...education,
      start_date: education && education.start_date && dayjs(commonService.convertDateFormat(education.start_date, DateFormatEnum.YYYYMM), 'YYYY-MM'),
      end_date: education && education.end_date && dayjs(commonService.convertDateFormat(education.end_date, DateFormatEnum.YYYYMM), 'YYYY-MM')
    }

    form.setFieldsValue(updated)
    /** 將緩存的 options 更新 CheckItem */
    if (education?.options) setUpdatedCourseworkDefines(education.options);
    /** 若有錯誤，顯示錯誤欄位 */
    if (education?.errors && education?.errors.length > 0) {
      form.validateFields();
    }
  }, [])

  /** 
   * @description 緩存 CheckItem 的狀態
   */
  useEffect(() => {
    /** 取得緩存 */
    const cache = JSON.parse(storageService.getItem(StorageKeysEnum.Template) ?? '{}');
    const education = cache[ProcessStepTextEnum.Education];
    /** 更新緩存 */
    const updated = { ...cache, [ProcessStepTextEnum.Education]: { ...education, options: updatedCourseworkDefines }}
    storageService.setItem(StorageKeysEnum.Template, JSON.stringify(updated));
    
  }, [updatedCourseworkDefines])

  const handleToggle = () => {
    setIsExpand(prev => !prev)
  }

  const handleCheck = (item: Skill | Coursework) => {
    /** 斷定 Item 就是 Coursework */
    const courseworkItem = item as Coursework;
    /** 1. 更新 CourseworkDefines */
    const updated = updatedCourseworkDefines.map((skill: Coursework) => {
      if (skill.id === courseworkItem.id) return { ...skill, checked: !skill.checked }
      return skill; 
    })
    setUpdatedCourseworkDefines(updated)

    if (!editorRef.current?.setEditorContent) return;
    /** 2. 若點選得是 false */
    if (!item.checked) {
      /** 增加 Content */
      editorRef.current.setEditorContent(courseworkItem.description, OperationCodeEnum.Create)
    } else {
      /** 移除 Content */
      editorRef.current.setEditorContent(courseworkItem.description, OperationCodeEnum.Delete)
    }
  } 

  const handleCreateCollapse = (type: CourseworkTypeEnum) => {
    const filtered = updatedCourseworkDefines?.filter(item => item.type === type) ?? [];
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

  /**
   * @description 更新 CheckItem updatedCourseworkDefines
   * @param innerHTML 目前 Text Editer 的字段
   */
  const handleSaveSummary = (innerHTML: string) => {
    const doc: Document = commonService.convertInnerHTMLToDoc(innerHTML);
    /** 獲取所有 <li> 元素 */
    const listItems = doc.querySelectorAll('li');
    /** description 儲存所有 <li /> 內所有的字 */
    /** text is string 過濾 string 類型 */
    const description: string[] = Array.from(listItems)
      .map(li => li.textContent?.trim())
      .filter((text): text is string => text !== undefined && text !== '');

    const copied: Coursework[] = CourseworkDefines.map(item => ({
      ...item,
      checked: description.includes(item.description)
    }));
    /** 更新 CheckItem 狀態 */
    setUpdatedCourseworkDefines(copied);

    /** 取得緩存 */
    const cache = JSON.parse(storageService.getItem(StorageKeysEnum.Template) ?? '{}');
    const education = cache[ProcessStepTextEnum.Education];
    /** 更新緩存 */
    const updated = { ...cache, [ProcessStepTextEnum.Education]: { ...education, coursework: innerHTML }}
    storageService.setItem(StorageKeysEnum.Template, JSON.stringify(updated));
  }

  const handleCheckSampleRef = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    reduxDispatch(setModalVisibleAction(ModalNameEnum.EducationSampleRef, true))
  }

  /**
   * @description
   * @param val 
   * @param all 
   */
  const handleChange = (_: any, all: any) => {
    /** 更新緩存 */
    const cache = JSON.parse(storageService.getItem(StorageKeysEnum.Template) ?? '{}');
    /** 取得緩存 (這邊要取得最新的 education) */
    const education = cache[ProcessStepTextEnum.Education];
    const updated = { ...cache, [ProcessStepTextEnum.Education]: { ...all, options: education.options, coursework:  education.coursework, errors: education?.errors } }
    storageService.setItem(StorageKeysEnum.Template, JSON.stringify(updated));
    setTemplate(updated)
  }

  const handleSubmit = async () => {
    /** 更新緩存 */
    const cache = JSON.parse(storageService.getItem(StorageKeysEnum.Template) ?? '{}');
    /** 取得緩存 (這邊要取得最新的 education) */
    const education = cache[ProcessStepTextEnum.Education];
    
    try {
      await form.validateFields();
      /** 成功也要更新 */
      delete education.errors
      const updated = { ...cache, [ProcessStepTextEnum.Education]: { ...education }}
      storageService.setItem(StorageKeysEnum.Template, JSON.stringify(updated));
    } catch (error: any) {
      /** 將錯誤 field name 資訊緩存 */
      const { errorFields } = error;
      const errors = errorFields.map((field: any) => (field.name[0]))
      const updated = { ...cache, [ProcessStepTextEnum.Education]: { ...education, errors }}
      storageService.setItem(StorageKeysEnum.Template, JSON.stringify(updated));
    }
    /** 轉導至 Skills 頁面 */
    navigate(ROUTES.FEATURES__CREATE_YOUR_CV__SKILLS);
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
          onValuesChange={handleChange}
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
                        { label: 'Bachelor', value: 'Bachelor'},
                        { label: 'Master', value: 'Master'},
                        { label: 'PhD', value: 'PhD'},
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
                      {updatedCourseworkDefines.length > 0 && (
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
                      )}
                    </Col>
                    <Col span="12">
                      <TextEditer ref={editorRef} default={cache[ProcessStepTextEnum.Education]?.coursework ?? ''} onSave={handleSaveSummary} />
                    </Col>
                  </Row>
                </div>
              </div>

            </div>
            {/** Preview Template */}
            <div className="pa-2">
              <PreviewTemplate template={template} />
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
