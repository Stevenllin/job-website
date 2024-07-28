import React from 'react'
import TemplateBackground from '../../../common/layouts/TemplateBackground';
import { Select, Input, Form, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';


const Summary: React.FC = () => {
  const [form] = Form.useForm();
  return (
    <div id="summary">
      <TemplateBackground
        title="Briefly tell us about your background"
        subtitle="Choose from our pre-written examples below or write your own."
      />
      <section>
        <Form
          form={form}
        >

          {/** Submit Button */}
          <Button
            type="primary"
            icon={<ArrowRightOutlined />}
            iconPosition="end"
            htmlType="submit"
          >Next: Finalize</Button>
        </Form>
      </section>
    </div>
  )
}

export default Summary
