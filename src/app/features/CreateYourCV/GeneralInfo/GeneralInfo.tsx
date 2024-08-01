import React, { useState, useEffect } from 'react'
import apiServices from '../../../api/services/apiServices';
import { ROUTES } from '../../../core/enums/routerPath';
import { useNavigate } from 'react-router-dom';
import TemplateBackground from '../../../common/layouts/TemplateBackground';
import { Button, Form, Input, Row, Col, Select } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/types';
import { ProcessStepTextEnum } from '../types';
import storageService from '../../../core/services/storageService';
import { StorageKeysEnum } from '../../../core/enums/storage';
import PreviewTemplate from '../../../common/layouts/PreviewTemplate';
import { getRequiredRule, getMobileRule, getEmailRule } from '../../../core/services/validationService';

const GeneralInfo: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const country = useSelector((state: RootState) => state.common.country_flag);
  const [cities, setCities] = useState([])
  /** 取得緩存 */
  const cache = JSON.parse(storageService.getItem(StorageKeysEnum.Template) ?? '{}');
  /** 取得緩存 */
  const info = cache[ProcessStepTextEnum.GeneralInfo];
  /** 為了更新 Preview Template */
  const [template, setTemplate] = useState(cache)

  /** 
   * @description 載入緩存
   */
  useEffect(() => {
    /** 設定 form */
    form.setFieldsValue(info)
  }, [])
  
  /**
   * @description
   */
  const handleChange = async (val: any, all: any) => {
    /** 取得 city */
    if (val.country) {
      const response = await apiServices.postCities(val.country)
      const updated = response.map((city: string) => {
        return { label: city, value: city }
      })
      setCities(updated)
    }
    /** 更新緩存 */
    const cache = JSON.parse(storageService.getItem(StorageKeysEnum.Template) ?? '{}');
    /** 取得緩存 (這邊要取得最新的 info) */
    const info = cache[ProcessStepTextEnum.GeneralInfo];
    const updated = { ...cache, [ProcessStepTextEnum.GeneralInfo]: { ...all, errors: info?.errors } }    
    storageService.setItem(StorageKeysEnum.Template, JSON.stringify(updated));
    setTemplate(updated)
  };

  const handleSubmit = async () => {
    /** 更新緩存 */
    const cache = JSON.parse(storageService.getItem(StorageKeysEnum.Template) ?? '{}');
    const histories = cache[ProcessStepTextEnum.WorkHistory];
    /** 取得緩存 (這邊要取得最新的 info) */
    const info = cache[ProcessStepTextEnum.GeneralInfo];
    try {
      await form.validateFields();
      /** 成功也要更新 */
      delete info.errors
      const updated = { ...cache, [ProcessStepTextEnum.GeneralInfo]: { ...info }}
      storageService.setItem(StorageKeysEnum.Template, JSON.stringify(updated));
    } catch (error: any) {
      /** 將錯誤 field name 資訊緩存 */
      const { errorFields } = error;
      const errors = errorFields.map((field: any) => (field.name[0]))
      const updated = { ...cache, [ProcessStepTextEnum.GeneralInfo]: { ...info, errors }}
      storageService.setItem(StorageKeysEnum.Template, JSON.stringify(updated));
    }
    /** 無論驗證失敗都會轉導 */
    if (histories && histories.length > 0) {
      /** 至 Work Summary */
      navigate(ROUTES.FEATURES__CREATE_YOUR_CV__WORK_SUMMARY);
    } else {
      /** 至 Work History */
      navigate(ROUTES.FEATURES__CREATE_YOUR_CV__WORK_HISTORY, { state: { isCreateNewMode: true } });
    }
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
          onValuesChange={handleChange}
        >
          <div className="d-flex">
            <div className="pa-2">
              <Row gutter={32}>
                {/** First Name */}
                <Col span="12">
                  <Form.Item
                    name="first_name"
                    label="First Name"
                    layout="vertical"
                    rules={[getRequiredRule('Please input your First Name')]}
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
                    name="last_name"
                    label="Last Name"
                    layout="vertical"
                    rules={[getRequiredRule('Please input your Last Name')]}
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
                    name="profession"
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
                    name="country"
                    label="Country"
                    layout="vertical"
                  >
                    <Select
                      placeholder="e.g. Taiwan"
                      options={country}
                      fieldNames={{ label: 'name', value: 'name' }}
                    >
                    </Select>
                  </Form.Item>
                </Col>
                {/** City */}
                <Col span="12">
                  <Form.Item
                    name="city"
                    label="City"
                    layout="vertical"
                  >
                    <Select
                      placeholder="e.g. Taipei"
                      options={cities}
                    >
                    </Select>
                  </Form.Item>
                </Col>
                {/** Phone */}
                <Col span="12">
                  <Form.Item
                    name="phone"
                    label="Phone"
                    layout="vertical"
                    rules={getMobileRule(false)}
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
                    name="email"
                    label="Email"
                    layout="vertical"
                    rules={getEmailRule(true)}
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
            {/** Preview Template */}
            <div className="pa-2">
              <PreviewTemplate template={template} />
            </div>
            {/** Submit Button */}
            <Button
              type="primary"
              className="submit"
              icon={<ArrowRightOutlined />}
              iconPosition="end"
              onClick={handleSubmit}
            >Next: Work History</Button>
          </div>
        </Form>
      </section>
    </div>
  )
}

export default GeneralInfo
