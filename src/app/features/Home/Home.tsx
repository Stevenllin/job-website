import React from 'react'
import Banner from '../../../assets/image/Rectangle 2.png';
import Business from '../../../assets/image/business1.jpeg';
import Holder1 from '../../../assets/image/holder1.jpeg';
import Holder2 from '../../../assets/image/holder2.jpeg';
import Holder3 from '../../../assets/image/holder3.jpeg';
import Value1 from '../../../assets/image/value1.jpeg';
import Value2 from '../../../assets/image/value2.jpeg';
import Laptop from '../../../assets/image/laptop.jpeg';
import Pic from '../../../assets/image/pic.png';
import Shape from '../../../assets/image/shape2.png';
import { Button, Col, Row, Input, Select } from 'antd';
import { MdSupervisorAccount } from "react-icons/md";
import { MdOutlineWork } from "react-icons/md";
import { IoDocument } from "react-icons/io5";
import { SearchOutlined } from '@ant-design/icons';
import { IconSizeEnum } from '../../core/enums/iconSize';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

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
        
        <Swiper
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
          className="value-swiper-container"
        >
          <SwiperSlide className="p-relative">
            <div className="h-100 w-50 d-flex flex-column justify-between">
              <div>
                <h3>User-Friendly Interface</h3>
                <p>Provide a simple and intuitive interface to help users quickly find the information they need.</p>

              </div>
              <div>
                Learn More
              </div>
            </div>
            {/** Image */}
            <div className="swiper-image-1">
              <img src={Value1} width={300} height={400}></img>
            </div>
            <div className="swiper-image-2">
              <img src={Laptop} width={100} height={100}></img>
            </div>
            
            <div className="swiper-image-3">
              <img src={Value2} width={200} height={300}></img>
            </div>

          </SwiperSlide>
          {/* <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide> */}
        </Swiper>
      </section>
      {/**  */}
      <div style={{ height: '5vh', background: '#dde7ef' }}></div>

      {/** Number */}
      <section id="number" className="p-relative">
        <h2 className="text-center">A Journey of Growth Together: Partnering for Success and Advancement</h2>
        <img src={Shape} width={350} style={{ top: '250px' }}></img>
        <img src={Pic} width={350}></img>
      </section>

      {/** What a Job Holder Say us */}
      <section id="holder">
        <div className="mb-5">
          <h2 className="text-center">What a job holder says About Us</h2>
          <p className="text-center">Discover Our Story: The Journey and Passion Behind Our Success</p>
        </div>
        <Row gutter={32}>
          <Col span="8">
            <div className="holder-card-container">
              <h4 className="fs-3 text-center">Oliver Smith</h4>
              <p className="fs-2 text-justify">I really love this theme. It has a beautiful design. From the web developer point of view, it's also really simple to use. And above all, customer support is awsome.</p>
              
              <div className="holder-image-container">
                <img src={Holder1}></img>
              </div>
            </div>
          </Col>
          <Col span="8">
            <div className="holder-card-container">
              <h4 className="fs-3 text-center">Emily Brown</h4>
              <p className="fs-2 text-justify">The website is incredibly user-friendly and offers a fantastic variety of CV templates. The job search functionality is intuitive and efficient, making it easy to find relevant opportunities. Great work!</p>

              <div className="holder-image-container">
                <img src={Holder2}></img>
              </div>
            </div>
          </Col>
          <Col span="8">
            <div className="holder-card-container">
              <h4 className="fs-3 text-center">James Johnson</h4>
              <p className="fs-2 text-justify">The diverse range of CV templates is impressive and really helps job seekers stand out. The search feature is seamless and effective, providing relevant job listings quickly. Excellent job!</p>

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
