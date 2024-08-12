import React, { useEffect, useState } from 'react'
import { GoLocation } from "react-icons/go";
import { RiSearchLine } from "react-icons/ri";
import { BiSolidCategory } from "react-icons/bi";
import { IconSizeEnum } from '../../core/enums/icon';
import { Slider, Col, Row, Select, Button } from 'antd';
import db from '../../core/services/firebaseService';
import { collection, onSnapshot,  query, where, getDocs, addDoc } from 'firebase/firestore';
import { Jobs } from './types';

const FindJobs: React.FC = () => {
  const [jobs, setJobs] = useState<Jobs[]>([]);

  useEffect(() => {
    /** onSnapshot 是當資料庫資料有異動時會再觸發 */
    onSnapshot(collection(db, 'jobs'), (snapshot) => {
      const results = snapshot.docs.map((doc) => doc.data() as Jobs);
      setJobs(results);
      console.log('results', results)
    });
  }, [])

  const handleCreateNew = async () => {
    const jobData = {
      has_remote: false,
      location: "Netherlands", // 更新后的国家/地区
      published: "2024-08-18T10:00:00Z", // 更新后的发布时间
      salary_max: 170000,
      salary_min: 130000,
      title: "Data Scientist - Machine Learning Specialist",
      job_type: "Data Scientist",
      types: "Full Time",
      company: {
        linkedin_url: "https://www.linkedin.com/company/philips",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Philips_logo.svg/368px-Philips_logo.svg.png",
        name: "Philips",
        website_url: "https://www.philips.com"
      }
    };
    
    // 获取 'jobs' 集合的引用
    const jobsCollectionRef = collection(db, 'jobs');
    
    // 新增一笔数据到 'jobs' 集合
    const docRef = await addDoc(jobsCollectionRef, jobData);
  }

  return (
    <div id="find-jobs">
      {/** Filter Header */}
      <section id="header">
        <Row className="w-100">
          {/** Job type */}
          <Col span="5" className="d-flex align-center">
            <RiSearchLine className="header-icon" style={{ 'fontSize': IconSizeEnum.Small }} />
            {/** Select */}
            <Select
              size="large"
              placeholder="Keyword"
              variant="borderless"
              options={[
                { value: 'jack', label: 'Jack' },
                { value: 'lucy', label: 'Lucy' },
                { value: 'Yiminghe', label: 'yiminghe' },
                { value: 'disabled', label: 'Disabled', disabled: true },
              ]}
            >
            </Select>
          </Col>
          {/** Vertical Line */}
          <Col span="1" className="d-flex align-center justify-center">
            <div className="vl"></div>
          </Col>
          {/** Location */}
          <Col span="5" className="d-flex align-center">
            <GoLocation className="header-icon" style={{ 'fontSize': IconSizeEnum.Small }} />
            {/** Select */}
            <Select
              size="large"
              placeholder="Location"
              variant="borderless"
              options={[
                { value: 'jack', label: 'Jack' },
                { value: 'lucy', label: 'Lucy' },
                { value: 'Yiminghe', label: 'yiminghe' },
                { value: 'disabled', label: 'Disabled', disabled: true },
              ]}
            >
            </Select>
          </Col>
          {/** Vertical Line */}
          <Col span="1" className="d-flex align-center justify-center">
            <div className="vl"></div>
          </Col>
          {/** Category */}
          <Col span="5" className="d-flex align-center">
            <BiSolidCategory className="header-icon" style={{ 'fontSize': IconSizeEnum.Small }} />
            {/** Select */}
            <Select
              size="large"
              placeholder="Category"
              variant="borderless"
              options={[
                { value: 'jack', label: 'Jack' },
                { value: 'lucy', label: 'Lucy' },
                { value: 'Yiminghe', label: 'yiminghe' },
                { value: 'disabled', label: 'Disabled', disabled: true },
              ]}
            >
            </Select>
          </Col>
          {/** Vertical Line */}
          <Col span="1" className="d-flex align-center justify-center">
            <div className="vl"></div>
          </Col>
          {/** Salary Range */}
          <Col span="6" className="header-range-container">
            <span className="fs-2">Salary Range</span>
            <br></br>
            <Slider range defaultValue={[20, 50]} />
          </Col>
        </Row>
      </section>
      <Row style={{ minHeight: 'calc(100vh - 205px)' }}>
        {/** Filter Sidebar */}
        <Col span="5" className="pa-4">
          <h3>Filters</h3>
          <p>Working Schedule</p>
          <p>Employment Type</p>
        </Col>
        {/** Search Section */}
        <Col span="19" className="pa-4">
          <h3>Recommended Jobs</h3>
          <div className="job-lists">
            <Row gutter={32}>
              {jobs.map((job, index) => (
                <Col key={`${job}_${index}`} span="8">
                  {job.title}
                </Col>
              ))}
            </Row>
          </div>
          {/* <Button onClick={handleCreateNew}>Create New</Button> */}
        </Col>
      </Row>
    </div>
  )
}

export default FindJobs
