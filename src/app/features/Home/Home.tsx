import React from 'react'
import {
  Rectangle2,
  Business1,
  Holder1,
  Holder2,
  Holder3,
  Holder4,
  Holder5,
  Value1,
  Value2,
  Value3,
  Laptop,
  Pic,
  Shape1,
  Other,
} from '../../../assets/image/images';
import { Button, Col, Row, Input, Select } from 'antd';
import { MdSupervisorAccount, MdOutlineWork, MdFeedback } from "react-icons/md";
import { IoDocument } from "react-icons/io5";
import { SearchOutlined } from '@ant-design/icons';
import { RiSearchLine } from "react-icons/ri";
import { FaUser, FaCity } from "react-icons/fa6";
import { IconSizeEnum } from '../../core/enums/icon';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { ArrowRightOutlined } from '@ant-design/icons';
import { BiWorld } from "react-icons/bi";
import { TbHexagonNumber1Filled, TbHexagonNumber2Filled, TbHexagonNumber3Filled } from "react-icons/tb";

const Home: React.FC = () => {
  return (
    <div id="home">
      {/** Banner 區塊 */}
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
              <div className="banner-image-container--1" style={{ backgroundImage: `url(${Business1})` }}>
              </div>
            </Col>
          </Row>
        </div>
        <img src={Rectangle2}></img>
      </section>

      {/** Step 區塊 */}
      <section id="step" className="text-center">
        <h2>Easy 3 steps to New Capabilities</h2>
        <p className="fs-4">Achieve Greater Capabilities with Minimal Effort and Maximum Impact</p>
        <Row gutter={32} className="mt-5">
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

      {/** Core Value 區塊 */}
      <section id="value" className="p-relative">
        {/** Title */}
        <h2 className="text-center">Core Values of Our Job Platform</h2>
        <p className="text-center fs-4">Guiding Principles that Drive Our Commitment to Your Career Success</p>
        
        {/** Swipers */}
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
          <SwiperSlide className="p-relative">
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
          </SwiperSlide>
          <SwiperSlide>
            <img src={Shape1} width={350} style={{ top: '250px' }}></img>
            <img src={Pic} width={350}></img>

          </SwiperSlide>
        </Swiper>
      </section>

      {/**  */}
      <div style={{ height: '10vh', background: '#ebf6ff' }}></div>

      {/** Number 區塊 */}
      <section id="number" className="p-relative">
        <h2 className="text-center">A Journey of Growth Together: Partnering for Success and Advancement</h2>
        <p className="text-center fs-4">Empowering Job Seekers and Companies with High Satisfaction and Success Rates</p>
        <div className="flex-container w-100 h-100">
          <div className="hover flex d-flex align-center">
            <RiSearchLine style={{ 'fontSize': IconSizeEnum.Largest }} />
            <p className="fw-dark">Job Seeker</p>
            <div className="mt-3 text-container text-center">
              <p>Registered job seekers: <span className="fw-dark">50,000+</span></p>
              <p>New job seekers per month: <span className="fw-dark">5,000+</span></p>
              <p>Job seekers who received interview invitations: <span className="fw-dark">10,000+</span></p>
              <p>Job seekers who successfully found jobs: <span className="fw-dark">8,000+</span></p>
            </div>
          </div>
          <div className="hover flex d-flex align-center">
            <FaUser style={{ 'fontSize': IconSizeEnum.Largest }} />         
            <p className="fw-dark">Company and Job</p>
            <div className="mt-3 text-container text-center">
              <p>Registered companies: <span className="fw-dark">2,000+</span></p>
              <p>Job postings: <span className="fw-dark">10,000+</span></p>
              <p>New job postings per month: <span className="fw-dark">1,000+</span></p>
              <p>Popular companies (most followed by job seekers): <span className="fw-dark">100+</span></p>
            </div>
          </div>
          <div className="hover flex d-flex align-center">
            <FaCity style={{ 'fontSize': IconSizeEnum.Largest }} />
            <p className="fw-dark">Industry Distribution</p>
            <div className="mt-3 text-container text-center">
              <p>Industries covered: <span className="fw-dark">50+</span></p>
              <p>Popular industries: <span className="fw-dark">Technology, Finance, Healthcare, Education, Manufacturing, etc.</span></p>
              <p>Average salary by industry: Technology $80,000+, Finance $75,000+, etc.</p>
            </div>
          </div>
          <div className="hover flex d-flex align-center">
            <MdFeedback style={{ 'fontSize': IconSizeEnum.Largest }} />
            <p className="fw-dark">User Feedback</p>
            <div className="mt-3 text-container text-center">
              <p>User satisfaction rate: <span className="fw-dark">95%</span></p>
              <p>User recommendation rate: <span className="fw-dark">90%</span></p>
              <p>Resume template usage: <span className="fw-dark">20,000+</span></p>
              <p>Job search success rate: <span className="fw-dark">75%</span></p>
            </div>
          </div>
          <div className="hover flex d-flex align-center">
            <BiWorld style={{ 'fontSize': IconSizeEnum.Largest }} />
            <p className="fw-dark">Geographic Distribution</p>
            <div className="mt-3 text-container text-center">
              <p>Regions covered: Worldwide</p>
              <p>Popular job search regions: <span className="fw-dark">North America, Europe, Asia, etc.</span></p>
              <p>Average salary by region: North America $70,000+, Europe $65,000+, etc.</p>
            </div>
          </div>
        </div>
          {/* <div className="circle-1"></div>
          <div className="circle-2"></div>
          <div className="circle-3"></div> */}
      </section>

      {/** Holder 區塊 */}
      <section id="holder">
        {/** Title */}
        <div className="mb-5">
          <h2 className="text-center">What a job holder says About Us</h2>
          <p className="text-center fs-4">Discover Our Story: The Journey and Passion Behind Our Success</p>
        </div>
        {/** Holders 區塊 */}
        <div className="holders">
          {/** Holder 1 */}
          <div className="holder" style={{ width: '100px', height: '100px', left: '5%', top: '15%' }}>
            <img src={Holder1} style={{ width: '100px' }}></img>
          </div>
          <div className="text-container" style={{ left: '-10%', top: 'calc(15% + 120px)' }}>
            <h4 className="fs-3 text-center">Oliver Smith</h4>
            <p className="fs-2 text-justify">I really love this theme. It has a beautiful design. From the web developer point of view, it's also really simple to use. And above all, customer support is awsome.</p>
          </div>

          {/** Holder 2 */}
          <div className="holder" style={{ width: '125px', height: '125px', left: '15%', bottom: '5%' }}>
            <img src={Holder2} style={{ width: '125px' }}></img>
          </div>
          <div className="text-container" style={{ left: '', bottom: 'calc(5% + 150px)' }}>
            <h4 className="fs-3 text-center">Emily Brown</h4>
            <p className="fs-2 text-justify">The website is incredibly user-friendly and offers a fantastic variety of CV templates. The job search functionality is intuitive and efficient, making it easy to find relevant opportunities. Great work!</p>
          </div>

          {/** Holder 3 */}
          <div className="holder" style={{ width: '85px', left: '55%', top: '30%', height: '85px', }}>
            <img src={Holder3} style={{ width: '85px' }}></img>
          </div>
          <div className="text-container" style={{ left: '40%', top: 'calc(30% + 100px)' }}>
            <h4 className="fs-3 text-center">James Johnson</h4>
            <p className="fs-2 text-justify">The diverse range of CV templates is impressive and really helps job seekers stand out. The search feature is seamless and effective, providing relevant job listings quickly. Excellent job!</p>
          </div>

          {/** Holder 4 */}
          <div className="holder" style={{ width: '125px', left: '45%', top: '5%', height: '125px' }}>
            <img src={Holder4} style={{ width: '125px' }}></img>
          </div>
          <div className="text-container" style={{ left: '55%', top: '5%' }}>
            <h4 className="fs-3 text-center">William Harris</h4>
            <p className="fs-2 text-justify">The variety of CV templates is remarkable, making it easier for job seekers to distinguish themselves. The search functionality is smooth and efficient, delivering pertinent job listings promptly. Great work!</p>
          </div>

          {/** Holder 5 */}
          <div className="holder" style={{ width: '150px', left: '85%', bottom: '35%', height: '150px' }}>
            <img src={Holder5} style={{ width: '150px' }}></img>
          </div>
          <div className="text-container" style={{ left: '70%', bottom: '15%' }}>
            <h4 className="fs-3 text-center">Charlotte Brown</h4>
            <p className="fs-2 text-justify">The extensive selection of CV templates is outstanding, greatly aiding job seekers in making a unique impression. The search feature is intuitive and efficient, offering relevant job listings swiftly. Fantastic job!</p>
          </div>
        </div>
      </section>

      <div style={{ height: '20vh', background: 'linear-gradient(to bottom, whitesmoke, #ebf6ff)' }}></div>
      {/** Footer 區塊 */}
      
      <section id="other">
        <img src={Other} />
      </section>
      {/* <div style={{ height: '40vh', background: '#012643' }}></div> */}

    </div>
  )
}

export default Home
