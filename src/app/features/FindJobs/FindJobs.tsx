import React, { useEffect, useState } from 'react'
import { GoLocation } from "react-icons/go";
import { RiSearchLine } from "react-icons/ri";
import { IconSizeEnum } from '../../core/enums/icon';
import { Form, Slider, Col, Row, Select, Button, Input, Checkbox } from 'antd';
import db from '../../core/services/firebaseService';
import { collection, addDoc } from 'firebase/firestore';
import { Jobs, Filters } from './types';
import VirtualizedList from '../../common/layouts/VirtualizedList';
import commonService from '../../core/services/commonService';
import { FaRegBookmark } from "react-icons/fa6";
import { ColorPositionDefines } from '../../core/models/color';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import { PositionTypeDefines } from '../../core/models/position';
import { PositionNewTypeTextEnum } from '../../core/enums/position';
import { FaRegCalendarAlt } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { IoBagSharp } from "react-icons/io5";
import useGetJobs from '../../core/hooks/useGetJobs';

const defaultFilters = {
  title: '',
  location: '',
  job_type: '',
  salary: [],
  work_mode: [],
  employment_type: [],
}

const FindJobs: React.FC = () => {
  const [form] = Form.useForm();
  /** 紀錄 filters */
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  /** Job 列表 */
  const country = useSelector((state: RootState) => state.common.country_flag);
  const { original, loading } = useGetJobs();
  const [jobs, setJobs] = useState<Jobs[]>([]);

  useEffect(() => {
    setJobs(original.current)
  }, [original.current])

  const handleCreateNew = async () => {
    const jobData = {
      has_remote: true,
      location: "Switzerland",
      published: "2024-06-25T14:00:00Z",
      salary_max: 105000,
      salary_min: 100000,
      title: "Software Engineer - Research Expert",
      job_type: "Software Engineer",
      coords: [46.8182, 8.2275],
      types: "Full Time",
      company: {
        linkedin_url: "https://www.linkedin.com/company/ericsson",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Ericsson_logo.svg/368px-Ericsson-logo.svg.png",
        name: "Ericsson",
        website_url: "https://www.ericsson.com"
      }
    };
    
    // 获取 'jobs' 集合的引用
    const jobsCollectionRef = collection(db, 'jobs');
    
    // 新增一笔数据到 'jobs' 集合
    const docRef = await addDoc(jobsCollectionRef, jobData);
  }

  const handleChange = (_: any, all: any) => {
    setFilters(prev => ({
      work_mode: prev.work_mode,
      employment_type: prev.employment_type,
      ...all
    }))
  }

  const handleChangeCheckbox = (type: string, checkedValues: string[],): void => {  
    setFilters(prev => ({ ...prev, [type]: checkedValues, }));
  };

  useEffect(() => {
    const { title, location, job_type, salary, work_mode, employment_type } = filters;

    const temp: Jobs[] = original.current.filter(item => {
      /** undefined 的話就回傳 true */
      const matchesTitle = title ? item.title.includes(title) : true;
      const matchesLocation = location ? item.location === location : true;
      const matchesJobType = job_type && job_type !== PositionNewTypeTextEnum.ALL ? item.job_type === job_type : true;

      const matchesSalary = salary && salary.length === 2 
        ? item.salary_min >= salary[0] && item.salary_max <= salary[1]
        : true;

      const matchesWorkMode = work_mode && work_mode.length > 0 
        ? item.has_remote 
          ? work_mode.includes('remote') 
          : work_mode.includes('on-site')
        : true;
      const matchesEmploymentType = employment_type && employment_type.length > 0
        ? employment_type.includes(item.types)
        : true;

      return matchesTitle && matchesLocation && matchesSalary && matchesJobType && matchesWorkMode && matchesEmploymentType
    })
    setJobs(temp)
  }, [filters])

  return (
    <div id="find-jobs">
      {/** Filter Header */}
      <section id="header">
        <Form
          form={form}
          onValuesChange={handleChange}
          className="w-100"
        >
          <Row className="w-100">
            {/** Job type */}
            <Col span="5" className="d-flex align-center">
              <RiSearchLine className="header-icon" style={{ 'fontSize': IconSizeEnum.Small }} />
              {/** Input */}
              <Form.Item
                name="title"
                className="mb-0 w-100"
              >
                <Input
                  placeholder="Job Title"
                  variant="borderless"
                  style={{ letterSpacing: '0.1rem', color: 'white' }}
                />
              </Form.Item>
            </Col>
            {/** Vertical Line */}
            <Col span="1" className="d-flex align-center justify-center">
              <div className="vl"></div>
            </Col>
            {/** Location */}
            <Col span="5" className="d-flex align-center">
              <GoLocation className="header-icon" style={{ 'fontSize': IconSizeEnum.Small }} />
              {/** Select */}
              <Form.Item
                name="location"
                className="mb-0 w-100"
              >
                <Select
                  size="large"
                  placeholder="Location"
                  variant="borderless"
                  options={country}
                  fieldNames={{ label: 'name', value: 'name' }}
                >
                </Select>
              </Form.Item>
            </Col>
            {/** Vertical Line */}
            <Col span="1" className="d-flex align-center justify-center">
              <div className="vl"></div>
            </Col>
            {/** Category */}
            <Col span="5" className="d-flex align-center">
              <IoBagSharp className="header-icon" style={{ 'fontSize': IconSizeEnum.Small }} />
              {/** Select */}
              <Form.Item
                name="job_type"
                className="mb-0 w-100"
              >
                <Select
                  size="large"
                  placeholder="Job Type"
                  variant="borderless"
                  options={PositionTypeDefines}
                >
                </Select>
              </Form.Item>
            </Col>
            {/** Vertical Line */}
            <Col span="1" className="d-flex align-center justify-center">
              <div className="vl"></div>
            </Col>
            {/** Salary Range */}
            <Col span="6" className="header-range-container">
              <div className="fs-2 d-flex justify-between">
                <span>Salary Range</span>
                {!filters.salary || filters.salary?.length === 0 ? (
                  <span>-</span>
                ) : (
                  <span>{commonService.formatCurrency(filters.salary[0])} - {commonService.formatCurrency(filters.salary[1])}</span>
                )}
              </div>
              <Form.Item
                name="salary"
                className="mb-0"
              >
                <Slider range min={100000} max={200000}  />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </section>
      <Button onClick={handleCreateNew}>Create New</Button>

      <Row style={{ minHeight: 'calc(100vh - 205px)' }}>
        {/** Filter Sidebar */}
        <Col span="5" className="pa-4">
          <h3>Filters</h3>
          <p className="fs-2">Work Mode</p>
          <Checkbox.Group onChange={(val) => handleChangeCheckbox('work_mode', val)}>
            <Row>
              <Col span="24" className="mb-2">
                <Checkbox value="remote">Remote</Checkbox>
              </Col>
              <Col span="24">
                <Checkbox value="on-site">On-site</Checkbox>  
              </Col>
            </Row>
          </Checkbox.Group>
          <p className="fs-2 ">Employment Type</p>
          <Checkbox.Group onChange={(val) => handleChangeCheckbox('employment_type', val)}>
            <Row>
              <Col span="24" className="mb-2">
                <Checkbox value="Full Time">Full Time</Checkbox>
              </Col>
              <Col span="24" className="mb-2">
                <Checkbox value="Part Time">Part Time</Checkbox>  
              </Col>
              <Col span="24">
                <Checkbox value="Contract">Contract</Checkbox>  
              </Col>
            </Row>
          </Checkbox.Group>
        </Col>
        {/** Search Section */}
        <Col span="19" className="pa-4">
          <h3 className="ms-1">Recommended Jobs</h3>
          <div className="job-lists">
            {/** 若數量為 0，尚未讀取到 Jobs 時進入 loading 狀態 */}
            {loading === false && (
              <VirtualizedList
                itemCount={20}
                itemHeight={400}
                listHeight={800}
                itemsPerRow={3}
                renderComponent={(index: number, style: React.CSSProperties) => (
                  <div key={index} style={{ height: 380, ...style }} className="virtualizedList__item">
                    <div className="card-skeleton">
                      <div className="skeleton-body"></div>
                      <div className="skeleton-footer"></div>
                    </div>
                  </div>
                )}
              />
            )}

            <VirtualizedList
              itemCount={jobs.length}
              itemHeight={400}
              listHeight={800}
              itemsPerRow={3}
              renderComponent={(index: number, style: React.CSSProperties) => (
                <div key={index} style={{ height: 380, ...style }} className="virtualizedList__item">
                  <div className="job-card">
                    <div className="card-background" style={{ background: ColorPositionDefines[jobs[index].job_type] }}>
                      <div className="d-flex justify-between">
                        <span className="fs-3 mb-2">{jobs[index].company.name}</span>
                        <FaRegBookmark style={{ fontSize: IconSizeEnum.Small, cursor: 'pointer' }} />
                      </div>
                      <div className="fs-4 fw-dark mb-2">{jobs[index].title}</div>
                      <div className="mb-1 d-flex align-center"><FaRegCalendarAlt className="me-2"/> {jobs[index].published}</div>
                      <div className="mb-1 d-flex align-center"><HiLocationMarker className="me-2"/>{jobs[index].location}</div>
                      <div className="mb-2 d-flex align-center"><IoBagSharp className="me-2" /> {jobs[index].job_type}</div>
                      <div className="d-flex" style={{ flexWrap: 'wrap' }}>
                        <span className="me-1 chips">{jobs[index].types}</span>
                        <span className="me-1 chips">{jobs[index].has_remote ? 'Remote' : 'On-site'}</span>
                      </div>
                    </div>
                    <div className="card-footer d-flex justify-between align-center">
                      <span className="fs-2">{commonService.formatCurrency(jobs[index].salary_min)} - {commonService.formatCurrency(jobs[index].salary_max)}</span>
                      <Button type="primary" style={{ height: '48px' }}>Apply Now</Button>
                    </div>
                  </div>
                </div>
              )}
            />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default FindJobs
