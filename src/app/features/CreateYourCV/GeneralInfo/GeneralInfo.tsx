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

const GeneralInfo: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const country = useSelector((state: RootState) => state.common.country_flag);
  const [cities, setCities] = useState([])
  /** 取得緩存 */
  const cache = JSON.parse(storageService.getItem(StorageKeysEnum.Template) ?? '{}');

  /** 
   * @description 載入緩存
   */
  useEffect(() => {
    /** 取得緩存 */
    const cache = JSON.parse(storageService.getItem(StorageKeysEnum.Template) ?? '{}');
    const info = cache[ProcessStepTextEnum.GeneralInfo];
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
    /** 取得緩存 */
    const cache = JSON.parse(storageService.getItem(StorageKeysEnum.Template) ?? '');
    /** 更新緩存 */
    const updated = { ...cache, [ProcessStepTextEnum.GeneralInfo]: all }    
    storageService.setItem(StorageKeysEnum.Template, JSON.stringify(updated));
  };

  const onFinish = async () => {
    const histories = cache[ProcessStepTextEnum.WorkHistory];
    if (histories && histories.length > 0) {
      navigate(ROUTES.FEATURES__CREATE_YOUR_CV__WORK_SUMMARY);
    } else {
      navigate(ROUTES.FEATURES__CREATE_YOUR_CV__WORK_HISTORY, { state: { isEditMode: false } });
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
          onFinish={onFinish}
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
                    rules={[
                      {
                        pattern: /^[0-9]{10}$/,
                        message: 'Please enter a valid phone number!',
                      },
                    ]}
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
                    rules={[
                      { type: 'email', message: 'The input is not valid E-mail!', },
                    ]}
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
              <PreviewTemplate />
            </div>
            {/** Submit Button */}
            <Button
              type="primary"
              icon={<ArrowRightOutlined />}
              iconPosition="end"
              htmlType="submit"
            >Next: Work History</Button>
          </div>
        </Form>
      </section>
    </div>
  )
}

export default GeneralInfo
