import React, { useEffect, useState, useMemo } from 'react'
import useGetJobs from '../../core/hooks/useGetJobs';
import { Col, Row } from 'antd';
import { ColorPositionDefines } from '../../core/models/color';
import commonService from '../../core/services/commonService';
import DoughnutChart from '../../common/components/Chart/DoughnutChart';
import { Jobs } from '../../features/FindJobs/types';
import { LineChartState } from '../../common/components/Chart/LineChart/types';
import { BarChartState } from '../../common/components/Chart/BarChart/types';
import { IoMdArrowDropup, IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { IconSizeEnum } from '../../core/enums/icon';
import MapChart from '../../common/components/Chart/MapChart';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import { GetCountriesResp } from '../../api/models/get/getCountries';
import LineChart from '../../common/components/Chart/LineChart';
import BarChart from '../../common/components/Chart/BarChart';
import moment from 'moment';
import { TfiClipboard } from "react-icons/tfi";

export interface JobMap {
  [string: string]: Jobs[];
}

const SalaryInfomation: React.FC = () => {
  const { original, loading, group_job_type, group_location, group_published } = useGetJobs();
  const country = useSelector((state: RootState) => state.common.country_flag);

  /** 選擇的 Country */
  const [selectedCountry, setSelectedCountry] = useState<GetCountriesResp|null>(null)
  /** 各職缺所代表的顏色 */
  const color: string[] = Object.values(ColorPositionDefines);
  const [lineChart, setLineChart] = useState<LineChartState>({ title: '', labels: [], data: [], color: '', });
  const [barChart, setBarChart] = useState<BarChartState>({ labels: [], data: [] })
  const [selectedJobType, setSelectedJobType] = useState<JobMap>();

  const countryList = useMemo(() => {
    return Object.keys(group_location)
  }, [group_location]);
  
  const mapData = useMemo(() => {
    if (JSON.stringify(group_location) === '{}') return [];

    return Object.entries(group_location).map((item: any) => {
      return { name: item[0], coords: item[1][0].coords, number: item[1].length }
    });
  }, [group_location])
  
  const array_job_type = Object.entries(group_job_type);

  useEffect(() => {
    const target: GetCountriesResp | null = country.find(item => item.name === countryList[0]) ?? null;
    if (target) setSelectedCountry(target)
  }, [countryList])

  useEffect(() => {
    const target = Object.entries(group_location).find(item => item[0] === selectedCountry?.name);
    if (target) {
      /** 整理 BarChart 的資料 */
      const jobLists = target[1] as Jobs[];
      const grouped = commonService.groupData(jobLists, 'job_type');

      const labels: string[] = [];
      const data: number[] = [];
      Object.entries(grouped).forEach(item => {
        labels.push(item[0]);
        const jobs = item[1] as Jobs[];
        const average_salary = jobs.reduce((acc, curr) => acc + curr.salary_max, 0) / jobs.length

        data.push(average_salary);
      })
      setBarChart({ labels, data })
      // setSelectedCountryData(jobLists)
    }
  }, [selectedCountry])

  /** Job Type 的 Doughnut 圖 */
  const doughnutLabels: string[] = array_job_type.map(item => item[0]);
  const doughnutValues: number[] = array_job_type.map((item: any[]) => item[1].length);
  const [doughnutColor, setDoughnutColor] = useState<string[]>(color);

  const handleSelectPosition = (value: number, index: number) => {
    const selected = array_job_type.find(item => item[0] === doughnutLabels[index]);
    /** 整理 Bar Chart */
    if (selected) {
      /** 該職缺的 Job List */
      const jobs = selected[1] as Jobs[];
      const groupedJobs = commonService.groupData(jobs, 'salary_max');

      const array_salary_distribution = Object.entries(groupedJobs);
      const labels: string[] = [];
      const values: number[] = [];

      let j = 0;
      for (let i = 100000; i <= 200000; i += 5000) {
        /** Bar Labels */
        labels.push(commonService.formatCurrency(i));
        /** 計算 Bar 的 Value */
        const salary = array_salary_distribution[j] ? parseInt(array_salary_distribution[j][0]) : null;
        if (i === salary) {
          /** 整理薪資分佈的 Job List */
          const target = array_salary_distribution[j][1] as Jobs[];
          values.push(target.length);
          j++
        } else {
          values.push(0);
        }
      }
      /** 設置 Doughnut 的顏色 */
      setDoughnutColor(color.map((item, i) => {
        if (i === index) return '#0766bc'
        return '#dee2e8'
      }))
      /** 設置 Bar Chart 圖形 */
      setLineChart({
        title: doughnutLabels[index],
        labels: labels,
        data: values,
        color: color[index]
      })

      /** 取得 selected 的 Position Type */
      const groupType = commonService.groupData(jobs, 'types');
      setSelectedJobType(groupType)
    }
  }

  const handleSelectCountry = (countryName: string) => {
    const target: GetCountriesResp | null = country.find(item => item.name === countryName) ?? null;
    if (target) setSelectedCountry(target)
  }

  return (
    <div id="salary-information">
      <Row gutter={32} style={{ marginBottom: '32px', justifyContent: 'space-between' }}>
        <Col span="6">
          <div className="salary-card">
            <div className="d-flex align-center mb-3">
              <div className="vl"></div>
              <div className="title">
                <h4 className="ma-0 fs-2">Total Jobs</h4>
                <p className="fs-4 fw-dark">{ original.current.length }</p>
              </div>
              <div className="type-container pa-2 d-flex justify-center align-center" style={{ float: 'right', color: '#012643', width: 30, height: 30 }}>
                <TfiClipboard style={{ fontSize: IconSizeEnum.Small }} />
              </div>
            </div>
            <div className="d-flex align-center" style={{ color: '#fd3131' }}>
              <IoMdArrowDropup style={{ fontSize: IconSizeEnum.Medium }} />
              <span className="fw-dark">6.5%</span>
            </div>
          </div>
        </Col>
        <Col span="6">
          <div className="salary-card">
            <div className="d-flex align-center mb-3">
              <div className="vl"></div>
              <div className="title">
                <h4 className="ma-0 fs-2">Average Salary</h4>
                <p className="fs-4 fw-dark">{ commonService.formatCurrency(Math.floor((original.current.reduce((acc, job) => acc + job.salary_max, 0))/original.current.length)) }</p>
              </div>
              <div className="type-container pa-2 d-flex justify-center align-center" style={{ float: 'right', color: '#012643', width: 30, height: 30 }}>
                <TfiClipboard style={{ fontSize: IconSizeEnum.Small }} />
              </div>
            </div>
            <div className="d-flex align-center" style={{ color: '#74c674' }}>
              <IoMdArrowDropdown style={{ fontSize: IconSizeEnum.Medium }} />
              <span className="fw-dark">5.9%</span>
            </div>
          </div>
        </Col>
        <Col span="6">
          <div className="salary-card">
            <div className="d-flex align-center mb-3">
              <div className="vl"></div>
              <div className="title">
                <h4 className="ma-0 fs-2">Remote Work</h4>
                <p className="fs-4 fw-dark">{ original.current.filter(item => item.has_remote).length }</p>
              </div>
              <div className="type-container pa-2 d-flex justify-center align-center" style={{ float: 'right', color: '#012643', width: 30, height: 30 }}>
                <TfiClipboard style={{ fontSize: IconSizeEnum.Small }} />
              </div>
            </div>
            <div className="d-flex align-center" style={{ color: '#74c674' }}>
              <IoMdArrowDropdown style={{ fontSize: IconSizeEnum.Medium }} />
              <span className="fw-dark">6.6%</span>
            </div>
          </div>
        </Col>
        <Col span="6">
          <div className="salary-card">
            <div className="d-flex align-center mb-3">
              <div className="vl"></div>
              <div className="title">
                <h4 className="ma-0 fs-2">Past Three months</h4>
                <p className="fs-4 fw-dark">{ original.current.filter(item => moment(item.published).isAfter(moment().subtract(3, 'month'))).length }</p>
              </div>
              <div className="type-container pa-2 d-flex justify-center align-center" style={{ float: 'right', color: '#012643', width: 30, height: 30 }}>
                <TfiClipboard style={{ fontSize: IconSizeEnum.Small }} />
              </div>
            </div>
            <div className="d-flex align-center" style={{ color: '#74c674' }}>
              <IoMdArrowDropdown style={{ fontSize: IconSizeEnum.Medium }} />
              <span className="fw-dark">4.8%</span>
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={32}>
        {/** Doughnut Chart */}
        <Col span="6">
          <div className="salary-card">
            <div className="d-flex justify-center" style={{ height: '350px' }}>
              <DoughnutChart
                color={color}
                doughnutLabels={doughnutLabels}
                doughnutValues={doughnutValues}
                doughnutColor={doughnutColor}
                onClick={handleSelectPosition}
              />
            </div>
            <Row className="mt-3" justify="center">
              {selectedJobType && Object.entries(selectedJobType).map(item => {
                return (
                  <Col span="7" key={item[0]} className="text-center type-container ma-1">
                    <p className="fs-2">{item[0]}</p>
                    <p className="fw-dark fs-4">{item[1].length}</p>
                  </Col>
                )
              })}
            </Row>
          </div>
        </Col>
        {/** Bar Chart */}
        <Col span="18">
          <div className="salary-card">
            <LineChart lineChart={lineChart} />
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: '32px' }} gutter={32}>
        {/** MapChart */}
        <Col span="17">
          <div className="salary-card">
            {/** 有資料時再渲染畫面 */}
            {mapData.length > 0 && <MapChart mapData={mapData} onSelectCountry={handleSelectCountry} />}
          </div>
        </Col>
        <Col span="7">
          <div className="salary-card">
            <div style={{ width: '100%', backgroundSize: 'cover', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
              <img src={selectedCountry?.flag} style={{ width: '100%', borderRadius: '16px' }} />
            </div>
            <h4 className="text-center mt-2 fs-4">
              {selectedCountry?.name}
            </h4>
            {/* Total Jobs: {selectedCountryData?.length} */}
            <BarChart barChart={barChart} />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default SalaryInfomation
