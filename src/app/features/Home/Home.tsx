import React from 'react'
import Banner from '../../../assets/image/Rectangle 1.png';
import Business from '../../../assets/image/business1.jpeg';
import Holder1 from '../../../assets/image/holder1.jpeg';
import Holder2 from '../../../assets/image/holder2.jpeg';
import Holder3 from '../../../assets/image/holder3.jpeg';
import Pic from '../../../assets/image/pic.png';
import Shape from '../../../assets/image/shape.png';
import { Button, Col, Row, Input, Select } from 'antd';
import { MdSupervisorAccount } from "react-icons/md";
import { MdOutlineWork } from "react-icons/md";
import { IoDocument } from "react-icons/io5";
import { SearchOutlined } from '@ant-design/icons';
import { IconSizeEnum } from '../../core/enums/iconSize';

const Home: React.FC = () => {
  return (
    <div id="home">
      {/** Banner */}
      <section id="banner">
        <div className="banner-container">
          <Row>
            <Col span="12">
              <h1>Find the Perfect Job for you</h1>
              <p className="fs-4">Search your career opportunity through 1000 jobs</p>

              <div className="search-container">
                {/** Input */}
                <div className="w-50">
                  <Input size="large" placeholder="Keyword" variant="borderless" />
                </div>
                <div className="vl"></div>
                {/** Select */}
                  <Select
                    size="large"
                    placeholder="Location"
                    variant="borderless"
                    style={{ marginLeft: '11px', width: 'calc(50% - 76px)' }}
                    options={[
                      { value: 'jack', label: 'Jack' },
                      { value: 'lucy', label: 'Lucy' },
                      { value: 'Yiminghe', label: 'yiminghe' },
                      { value: 'disabled', label: 'Disabled', disabled: true },
                    ]}
                  >
                  </Select>
                {/** Button */}
                <Button type="primary" shape="circle" size="large" icon={<SearchOutlined />}></Button>
              </div>
            </Col>
            {/** Image */}
            <Col span="12" className="p-relative">
              <div className="banner-image-container--3">
              </div>
              <div className="banner-image-container--2">
              </div>
              <div className="banner-image-container--1" style={{ backgroundImage: `url(${Business})` }}>
              </div>
            </Col>
          </Row>
        </div>
        <img src={Banner}></img>
      </section>
      {/** Step */}
      <section id="step">
        <h2 className="text-center">Easy 3 steps to New Capabilities</h2>
        <p className="text-center">Achieve Greater Capabilities with Minimal Effort and Maximum Impact</p>
        <Row gutter={32}>
          <Col span="8">
            <div className="step-container">
              <div className="icon-container">
                <MdSupervisorAccount style={{ 'fontSize': IconSizeEnum.Large }} />
                <h3>Create Account</h3>
                <p className="fs-3">Lease fill in the details below to create your account.</p>
              </div>
            </div>
          </Col>
          <Col span="8">
            <div className="step-container">
              <IoDocument style={{ 'fontSize': IconSizeEnum.Large }} />
              <h3>Cv/Resume</h3>
              <p className="fs-3">Offer multiple CV templates for you to use.</p>
            </div>
          </Col>
          <Col span="8">
            <div className="step-container">
              <MdOutlineWork style={{ 'fontSize': IconSizeEnum.Large }} />
              <h3>Search Jobs</h3>
              <p className="fs-3">Explore a wide range of job opportunities</p>
            </div>
          </Col>
        </Row>
      </section>
      {/** Core Value */}
      <section id="value" className="p-relative">
        <h2 className="text-center">Core Values of Our Job Platform</h2>
        <p className="text-center">Guiding Principles that Drive Our Commitment to Your Career Success</p>
        <img src={Shape} width={350} style={{ top: '180px' }}></img>
        <img src={Pic} width={350}></img>
        

      </section>

      {/**  */}
      <div style={{ height: '5vh', background: '#dde7ef' }}></div>

      {/** Number */}
      <section id="number">
        <h2 className="text-center">A Journey of Growth Together: Partnering for Success and Advancement</h2>
      </section>

      {/** What a Job Holder Say us */}
      <section id="holder">
        <div>
          <h2 className="text-center">What a job holder says About Us</h2>
          <p className="text-center">Discover Our Story: The Journey and Passion Behind Our Success</p>
        </div>
        <Row gutter={32}>
          <Col span="8">
            <div className="holder-card-container">
              <div className="holder-image-container">
                <img src={Holder1}></img>
              </div>
            </div>
          </Col>
          <Col span="8">
            <div className="holder-card-container">
              <div className="holder-image-container">
                <img src={Holder2}></img>
              </div>
            </div>
          </Col>
          <Col span="8">
            <div className="holder-card-container">
              <div className="holder-image-container">
                <img src={Holder3}></img>
              </div>
            </div>
          </Col>
        </Row>
      </section>
      {/** Jobs */}
      {/** CV */}
      {/** Footer */}
      <section id="footer">
      </section>
    </div>
  )
}

export default Home
