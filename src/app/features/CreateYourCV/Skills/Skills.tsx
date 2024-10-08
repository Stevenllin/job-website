import React, { useEffect, useState } from 'react'
import TemplateBackground from '../../../common/layouts/TemplateBackground';
import { Select, Input, Form, Button, Rate, Row, Col } from 'antd';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { SkillsDefines, SkillsTypeDefines, Skill, InputType } from './types';
import { useNavigate } from 'react-router-dom';
import { PositionTypeCodeEnum } from '../../../core/enums/position';
import { ROUTES } from '../../../core/enums/router';
import storageService from '../../../core/services/storageService';
import { StorageKeysEnum } from '../../../core/enums/storage';
import { ProcessStepTextEnum } from '../types';
import PreviewTemplate from '../../../common/layouts/PreviewTemplate';
import CheckItem from '../../../common/components/CheckItem';
import { Coursework } from '../Education/types';
import commonService from '../../../core/services/commonService';

const Skills: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState([{ id: uuidv4(), input: '', rate: 0 }]);
  /** 呈現的列表 */
  const [skills, setSkills] = useState<Skill[]>(SkillsDefines);
  /** 更新 Check 狀態的 SkillsDefines */
  const [updatedSkillsDefines, setUpdatedSkillsDefines] = useState<Skill[]>(SkillsDefines);
  /** 取得緩存 */
  const cache = JSON.parse(storageService.getItem(StorageKeysEnum.Template) ?? '{}');
  const skillsCache = cache[ProcessStepTextEnum.Skills] ?? {};
  /** 為了更新 Preview Template */
  const [template, setTemplate] = useState(cache);
  
  const handleChangeForm = (_: any, all: any) => {
    /** 更新緩存 */
    updateFormCache(all)
  }

  /** 
   * @description 載入緩存並設置 Form 表單
   */
  useEffect(() => {
    /** 若沒有選擇 Template 跳轉畫面 */
    const template = cache[ProcessStepTextEnum.ChooseTemplate];
    if (!template) navigate(ROUTES.FEATURES__CREATE_YOUR_CV__CHOOSE_TEMPLATE)

    if (skillsCache.formValue) {
      /** 更新 Form 表單 */
      form.setFieldsValue(skillsCache.formValue);
      /** 更新 UI Inputs 畫面 */
      const result: InputType[] = commonService.handleAddressSkillsData(skillsCache.formValue);
      setInputs(result)
    }
    if (skillsCache.options) {
      /** 更新 Check */
      setUpdatedSkillsDefines(skillsCache.options)
    }
  }, [])

  /** 
   * @description 這裡的 render 次數可以再優化一下
   */
  useEffect(() => {
    const ids = skills.map(skill => skill.id);
    // 過濾 skills 中的元素
    const filteredSkills = updatedSkillsDefines.filter(skill => ids.includes(skill.id));

    // 更新緩存
    updateOptionCache()
    // 這裡渲染一次
    setSkills(filteredSkills)
  }, [updatedSkillsDefines])

  /**
   * @description 提供使用者點選 Skill Options
   * @param val 選擇得 Skill
   */
  const handleChangeOptions = (val: number) => {
    if (val === PositionTypeCodeEnum.ALL) setSkills(updatedSkillsDefines)
    else {
      const updated = updatedSkillsDefines.filter(item => item.typeCode === val);
      setSkills(updated)
    }
  }

  /**
   * @description 點選增加 Skills 按鈕
   */
  const handleAddSkills = () => {
    setInputs(prev => [ ...prev, { id: uuidv4(), input: '', rate: 0 } ])
  }
  
  /**
   * @description 提供使用者點選 Skill
   * @param item Skill 物件
   */
  const handleCheck = (item: Skill | Coursework) => {
    /** 1. 更新 SkillsDefines */
    const updated = updatedSkillsDefines.map((skill: Skill) => {
      if (skill.id === item.id) return { ...skill, checked: !skill.checked }
      return skill; 
    })
    setUpdatedSkillsDefines(updated)

    /** 2. 更新 Input 以及 Form 資料 */
    /** 若點選得是 true，取消 */
    if (item.checked) {
      /** 目標 skill */
      const target = inputs.find(elem => elem.input === item.name);
      /** 更新表單 */
      const forms = form.getFieldsValue();
      if (target) delete forms[`input_${target.id}`]
      if (target) delete forms[`rate_${target.id}`]
      form.setFieldsValue(forms)
      /** 更新 UI 顯示 */
      const updated = inputs.filter(elem => elem.input !== item.name);
      setInputs(updated)

      /** 更新緩存 */
      updateFormCache(forms)
    } else {
      /** 若點選得是 false，確認 */
      const id = uuidv4();
      setInputs(prev => [ ...prev, { id, input: item.name, rate: 0 } ])
      form.setFieldValue(`input_${id}`, item.name);
      form.setFieldValue(`rate_${id}`, 0);
      
      /** 更新緩存 */
      const updated = { ...form.getFieldsValue(), [`input_${id}`]: item.name, [`rate_${id}`]: 0 }
      updateFormCache(updated)
    }
  }

  const updateCache = (_: keyof typeof ProcessStepTextEnum, updateCallback: (updated: any) => void) => {
    const updated = { ...cache };
    updateCallback(updated);
    storageService.setItem(StorageKeysEnum.Template, JSON.stringify(updated));
    setTemplate(updated)
  }
  
  /**
   * @description 更新 Options 緩存資料
   */
  const updateOptionCache = () => {
    updateCache(ProcessStepTextEnum.Skills, (updated) => {
      updated[ProcessStepTextEnum.Skills] = {
        ...updated[ProcessStepTextEnum.Skills],
        options: updatedSkillsDefines,
      };
    });
  }
  
  /**
   * @description 更新 Form 緩存資料
   * @param target Form 表單值
   */
  const updateFormCache = (target: any) => {
    updateCache(ProcessStepTextEnum.Skills, (updated) => {
      updated[ProcessStepTextEnum.Skills] = {
        ...updated[ProcessStepTextEnum.Skills],
        formValue: { ...target }
      };
    });
  }

  const handleSubmit = async () => {
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
          onValuesChange={handleChangeForm}
        >
          <div className="d-flex">
            <div className="pa-2 w-100">
              <Row className="justify-between">
                {/** Search Container */}
                <Col span="12" className="search-container">
                  {/** Skills Type */}
                  <div className="select mb-2">
                    <Select
                      placeholder="e.g. Select"
                      options={SkillsTypeDefines}
                      style={{ width: '250px' }}
                      onChange={handleChangeOptions}
                    >
                    </Select>
                  </div>
                  {/** Skills Data */}
                  <div className="data">
                    <Row>              
                      {skills.map((item) => (
                        <Col span="12" key={item.name}>
                          <CheckItem item={item} onCheck={handleCheck} name={item.name} type={item.typeText} />
                        </Col>
                      ))}
                    </Row>
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
          >Next: Summary</Button>
        </Form>
      </section>
    </div>
  )
}

export default Skills
