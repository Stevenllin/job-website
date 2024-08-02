import React from 'react'
import { GoLocation } from "react-icons/go";
import { RiSearchLine } from "react-icons/ri";
import { BiSolidCategory } from "react-icons/bi";
import { IconSizeEnum } from '../../core/enums/icon';
import { Slider, Col, Row, Select } from 'antd';

const FindJobs: React.FC = () => {
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
          <Col span="1" className="d-flex justify-center">
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
          <Col span="1" className="d-flex justify-center">
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
          <Col span="1" className="d-flex justify-center">
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
        {/** style={{ borderRight: '0.5px solid rgba(128, 128, 128, 0.4509803922)' }} */}
        <Col span="5" className="pa-4">
          <h3>Filters</h3>
          <p>Working Schedule</p>
          <p>Employment Type</p>
        </Col>
        {/** Search Section */}
        <Col span="19" className="pa-4">
          <h3>Recommended Jobs</h3>
        </Col>
      </Row>
    </div>
  )
}

export default FindJobs
