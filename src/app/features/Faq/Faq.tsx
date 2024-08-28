import React from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { Button, Row, Col } from 'antd';
import { TbTargetArrow } from "react-icons/tb";
import { IconSizeEnum } from '../../core/enums/icon';

const Faqs: React.FC = () => {
  return (
    <div id="faq">
      <section id="banner">
        <h1>How can we Help?</h1>
        <div className="search-container">
          <div className="ms-3">Ask a Question</div>
          {/** Button */}
          <Button type="primary" shape="circle" size="large" icon={<SearchOutlined />}></Button>
        </div>
      </section>
      <div id="article">
        <h2 className="ma-0">Featured support Articles</h2>
      </div>
      <div className="faq-container">
        <Row gutter={128}>
          <Col span="12">
            <h3 className="fs-4 d-flex align-center">
              <span className="me-1"><TbTargetArrow style={{ 'fontSize': IconSizeEnum.Large }} /></span>
              How do I create a new resume?
            </h3>
            <p className="fs-2 text-justify text">Click the "Create Resume" button on the homepage, then choose your preferred resume template. Follow the prompts to enter your personal information, work experience, education, and other details. Once completed, you can download or share your resume online.</p>
          </Col>
          <Col span="12">
            <h3 className="fs-4 d-flex align-center">
              <span className="me-1"><TbTargetArrow style={{ 'fontSize': IconSizeEnum.Large }} /></span>
              How do I search for job opportunities?
            </h3>
            <p className="fs-2 text-justify text">Enter the job title, company name, or location you are interested in into the search bar on the homepage and click the search button. You can use filters to refine your search results, such as by salary range, job type, or industry.</p>
          </Col>
          <Col span="12">
            <h3 className="fs-4 d-flex align-center">
              <span className="me-1"><TbTargetArrow style={{ 'fontSize': IconSizeEnum.Large }} /></span>
              Do I need to register an account to apply for jobs?
            </h3>
            <p className="fs-2 text-justify text">Yes, you need to register and log in to your account to apply for jobs. The registration process is quick and straightforward; you only need to provide basic contact information and an email address.</p>
          </Col>
          <Col span="12">
            <h3 className="fs-4 d-flex align-center">
              <span className="me-1"><TbTargetArrow style={{ 'fontSize': IconSizeEnum.Large }} /></span>
              How can I manage my job applications?
            </h3>
            <p className="fs-2 text-justify text">After logging in, you can view and manage all your submitted job applications on the "My Applications" page. You can check the status of your applications, update your resume, or withdraw an application.</p>
          </Col>
          <Col span="12">
            <h3 className="fs-4 d-flex align-center">
              <span className="me-1"><TbTargetArrow style={{ 'fontSize': IconSizeEnum.Large }} /></span>
              Is my personal information secure?
            </h3>
            <p className="fs-2 text-justify text">We take your privacy and data security very seriously. We implement various security measures to protect your personal information and will not share your data with third parties without your consent.</p>
          </Col>
          <Col span="12">
            <h3 className="fs-4 d-flex align-center">
              <span className="me-1"><TbTargetArrow style={{ 'fontSize': IconSizeEnum.Large }} /></span>
              How can I contact customer support?
            </h3>
            <p className="fs-2 text-justify text">If you have any questions or need assistance, please visit our "Contact Us" page. You can reach our support team via email, phone, or live chat, and we will respond to your inquiry as soon as possible.</p>
          </Col>
          <Col span="12">
            <h3 className="fs-4 d-flex align-center">
              <span className="me-1"><TbTargetArrow style={{ 'fontSize': IconSizeEnum.Large }} /></span>
              Can I edit a resume I have already submitted?
            </h3>
            <p className="fs-2 text-justify text">Yes, you can edit a submitted resume. Log in to your account, go to the "My Resumes" page, select the resume you want to edit, make your changes, and save.</p>
          </Col>
          <Col span="12">
            <h3 className="fs-4 d-flex align-center">
              <span className="me-1"><TbTargetArrow style={{ 'fontSize': IconSizeEnum.Large }} /></span>
              How do I set up job alerts?
            </h3>
            <p className="fs-2 text-justify text">After logging in, go to the "Job Alerts" page, and set your preferences for job types, locations, and other criteria. You will receive email notifications when new job opportunities match your settings.</p>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Faqs
