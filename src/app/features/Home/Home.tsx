import React from 'react'
import Banner from '../../../assets/image/Rectangle 2.png';
import Business from '../../../assets/image/business1.jpeg';
import Holder1 from '../../../assets/image/holder1.jpeg';
import Holder2 from '../../../assets/image/holder2.jpeg';
import Holder3 from '../../../assets/image/holder3.jpeg';
import Value1 from '../../../assets/image/value1.jpeg';
import Value2 from '../../../assets/image/value2.jpeg';
import Value3 from '../../../assets/image/value3.jpeg';
import Laptop from '../../../assets/image/laptop.jpeg';
import Pic from '../../../assets/image/pic.png';
import Shape from '../../../assets/image/shape.png';
import { Button, Col, Row, Input, Select } from 'antd';
import { MdSupervisorAccount } from "react-icons/md";
import { MdOutlineWork } from "react-icons/md";
import { IoDocument } from "react-icons/io5";
import { SearchOutlined } from '@ant-design/icons';
import { IconSizeEnum } from '../../core/enums/iconSize';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { ArrowRightOutlined } from '@ant-design/icons';
import { TbHexagonNumber1Filled, TbHexagonNumber2Filled, TbHexagonNumber3Filled } from "react-icons/tb";

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
                <MdSupervisorAccount style={{ 'fontSize': IconSizeEnum.Largest }} />
                <h3>Create Account</h3>
                <p className="fs-3">Lease fill in the details below to create your account.</p>
              </div>
            </div>
          </Col>
          <Col span="8">
            <div className="step-container">
              <IoDocument style={{ 'fontSize': IconSizeEnum.Largest }} />
              <h3>Cv/Resume</h3>
              <p className="fs-3">Offer multiple CV templates for you to use.</p>
            </div>
          </Col>
          <Col span="8">
            <div className="step-container">
              <MdOutlineWork style={{ 'fontSize': IconSizeEnum.Largest }} />
              <h3>Search Jobs</h3>
              <p className="fs-3">Explore a wide range of job opportunities</p>
            </div>
          </Col>
        </Row>
      </section>
      {/** Core Value */}
      <section id="value" className="p-relative">
        <h2 className="text-center">Core Values of Our Job Platform</h2>
        <p className="text-center fs-3">Guiding Principles that Drive Our Commitment to Your Career Success</p>
        
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
          {/** Swiper 1 */}
          {/* <SwiperSlide className="p-relative">
            <div className="h-100 w-50 d-flex flex-column justify-between fs-3">
              <div>
                <h3 className="fs-4">User-Friendly Interface</h3>
                <p>Provide a simple and intuitive interface to help users quickly find the information they need.</p>
                <div className="d-flex align-center">
                  <TbHexagonNumber1Filled style={{ fill: '#a22626', 'fontSize': IconSizeEnum.Large }} />
                  <p style={{ color: '#a22626' }} className="ms-2 fw-dark">Professional Resume Templates</p>
                </div>
                <p className="ps-5 mt-0 mb-0">Offer a variety of professional resume templates to help users easily create outstanding resumes.</p>
                <div className="d-flex align-center">
                  <TbHexagonNumber2Filled style={{ fill: '#ff6600', 'fontSize': IconSizeEnum.Large }} />
                  <p style={{ color: '#ff6600' }} className="ms-2 fw-dark">Diverse Job Opportunities</p>
                </div>
                <p className="ps-5 mt-0 mb-0">Cover job opportunities across various industries and regions to meet the needs of different job seekers.</p>
                <div className="d-flex align-center">
                  <TbHexagonNumber3Filled style={{ fill: '#ffc800', 'fontSize': IconSizeEnum.Large }} />
                  <p style={{ color: '#ffc800' }} className="ms-2 fw-dark">Market Insights</p>
                </div>
                <p className="ps-5 mt-0 mb-0">Provide insights into job market trends and salary data to help job seekers make informed career decisions.</p>
              </div>
              <div>
                <Button
                  type="link"
                  className="fs-3"
                  icon={<ArrowRightOutlined />}
                  iconPosition="end"
                  style={{ float: 'right' }}
                >Learn More</Button>
              </div>
            </div>
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
          <SwiperSlide>
            <Row className="h-100">
              <Col span="12">
                <div className="swiper-image-4">
                  <img src={Value3} width={450}></img>
                </div>
              </Col>
              <Col span="12" className="fs-3 p-relative">
                <h3 className="fs-4">Corporate Social Responsibility</h3>
                <p>Enhancing the company's trust and reputation among job seekers and the community</p>
                <div className="d-flex align-center">
                  <TbHexagonNumber1Filled style={{ fill: '#a22626', 'fontSize': IconSizeEnum.Large }} />
                  <p style={{ color: '#a22626' }} className="ms-2 fw-dark">Diversity and Inclusion</p>
                </div>
                <p className="ps-5 mt-0 mb-0">Committed to fostering a diverse and inclusive job market by providing equal opportunities for all candidates, regardless of their background or identity.</p>
                <div className="d-flex align-center">
                  <TbHexagonNumber2Filled style={{ fill: '#ff6600', 'fontSize': IconSizeEnum.Large }} />
                  <p style={{ color: '#ff6600' }} className="ms-2 fw-dark">Environmental Sustainability</p>
                </div>
                <p className="ps-5 mt-0 mb-0">Dedicated to eco-friendly practices by reducing the platform's carbon footprint and promoting remote work to minimize environmental impact.</p>
                <div className="d-flex align-center">
                  <TbHexagonNumber3Filled style={{ fill: '#ffc800', 'fontSize': IconSizeEnum.Large }} />
                  <p style={{ color: '#ffc800' }} className="ms-2 fw-dark">Ethical Standards</p>
                </div>
                <p className="ps-5 mt-0 mb-0">Uphold high ethical standards by ensuring transparency, fairness, and non-discrimination in all job postings and hiring processes.</p>
                <Button
                  type="link"
                  className="fs-3"
                  icon={<ArrowRightOutlined />}
                  iconPosition="end"
                  style={{ position: 'absolute', right: '0px', bottom: '0px' }}
                >Learn More</Button>
              </Col>
            </Row>
          </SwiperSlide> */}
          <SwiperSlide>
            <img src={Shape} width={350} style={{ top: '250px' }}></img>
            <img src={Pic} width={350}></img>

          </SwiperSlide>
        </Swiper>
      </section>
      {/**  */}
      <div style={{ height: '5vh', background: '#ebf6ff' }}></div>

      {/** Number */}
      <section id="number" className="p-relative">
        <h2 className="text-center">A Journey of Growth Together: Partnering for Success and Advancement</h2>
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
