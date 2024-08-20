import React, { useEffect, useState, useMemo } from 'react'
import useGetJobs from '../../core/hooks/useGetJobs';
import { Chart as ChartJS, ArcElement, Legend, ChartOptions } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Col, Row } from 'antd';
import { ColorPositionDefines } from '../../core/models/color';
import commonService from '../../core/services/commonService';
import DoughnutChart from '../../common/components/Chart/DoughnutChart';
import BarChart from '../../common/components/Chart/BarChart';
import { Jobs } from '../../features/FindJobs/types';
import { BarChartState } from '../../common/components/Chart/BarChart/types';
import { IoMdArrowDropup, IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { IconSizeEnum } from '../../core/enums/icon';
import MapChart from '../../common/components/Chart/MapChart';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import { GetCountriesResp } from '../../api/models/get/getCountries';

ChartJS.register(ArcElement, Legend, ChartDataLabels);

const SalaryInfomation: React.FC = () => {
  const { original, loading, group_job_type, group_location, group_published } = useGetJobs();
  const country = useSelector((state: RootState) => state.common.country_flag);

  /** 選擇的 Country */
  const [selectedCountry, setSelectedCountry] = useState<GetCountriesResp|null>(null)
  /** 選擇的 Country 職缺列表 */
  const [selectedCountryData, setSelectedCountryData] = useState<Jobs[]>()
  /** 各職缺所代表的顏色 */
  const color: string[] = Object.values(ColorPositionDefines);
  const [barChart, setBarChart] = useState<BarChartState>({
    title: '',
    labels: [],
    data: [],
    color: '',
  });

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
      console.log('target', target[1]);
      setSelectedCountryData(target[1] as Jobs[])
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
      const barLabels: string[] = [];
      const barValues: number[] = [];

      let j = 0;
      for (let i = 100000; i <= 200000; i += 5000) {
        /** Bar Labels */
        barLabels.push(commonService.formatCurrency(i));
        /** 計算 Bar 的 Value */
        const salary = array_salary_distribution[j] ? parseInt(array_salary_distribution[j][0]) : null;
        if (i === salary) {
          /** 整理薪資分佈的 Job List */
          const target = array_salary_distribution[j][1] as Jobs[];
          barValues.push(target.length);
          j++
        }
        barValues.push(0);
      }
      /** 設置 Doughnut 的顏色 */
      setDoughnutColor(color.map((item, i) => {
        if (i === index) return item
        return 'rgb(244 244 244)'
      }))
      /** 設置 Bar Chart 圖形 */
      setBarChart({
        title: doughnutLabels[index],
        labels: barLabels,
        data: barValues,
        color: color[index]
      })
    }
  }

  const handleSelectCountry = (countryName: string) => {
    const target: GetCountriesResp | null = country.find(item => item.name === countryName) ?? null;
    if (target) setSelectedCountry(target)
  }

  /** 各日期的 薪水分佈（折線圖）*/
  /** 國家根據職業排行薪水 */
  return (
    <div id="salary-information">
      <Row gutter={32} style={{ marginBottom: '32px', justifyContent: 'space-between' }}>
        <Col span="6">
          <div className="salary-card">
            <div className="d-flex align-center">
              <div className="vl"></div>
              <div className="title">
                <h4 className="ma-0 fs-2">Total Jobs</h4>
                <p className="fs-4">{ original.current.length }</p>
              </div>
            </div>
            <IoMdArrowDropup style={{ fontSize: IconSizeEnum.Medium }} />
          </div>
        </Col>
        <Col span="6">
          <div className="salary-card">
            <div className="d-flex align-center">
              <div className="vl"></div>
              <div className="title">
                <h4 className="ma-0 fs-2">Average Salary</h4>
                <p className="fs-4">{ commonService.formatCurrency(Math.floor((original.current.reduce((acc, job) => acc + job.salary_max, 0))/original.current.length)) }</p>
              </div>
            </div>
            <IoMdArrowDropdown style={{ fontSize: IconSizeEnum.Medium }} />
          </div>
        </Col>
        <Col span="6">
          <div className="salary-card">
            <div className="d-flex align-center">
              <div className="vl"></div>
              <div className="title">
                <h4 className="ma-0 fs-2">Remark Work</h4>
                <p className="fs-4">{ original.current.filter(item => item.has_remote).length }</p>
              </div>
            </div>
            <p>Previous Month:</p>
          </div>
        </Col>
        {/** 近三個月的 */}
        <Col span="6">
          <div className="salary-card">
            <div className="d-flex align-center">
              <div className="vl"></div>
              <div className="title">
                <h4 className="ma-0 fs-2">Most Popular Country</h4>
                <p className="fs-4">{ original.current.length }</p>
              </div>
            </div>
            <p>Previous Month:</p>
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
          </div>
        </Col>
        {/** Bar Chart */}
        <Col span="18">
          <div className="salary-card">
            <div>
              <BarChart barChart={barChart} />
            </div>
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: '32px' }} gutter={32}>
        {/** MapChart */}
        <Col span="18">
          <div className="salary-card">
            {/** 有資料時再渲染畫面 */}
            {mapData.length > 0 && <MapChart mapData={mapData} onSelectCountry={handleSelectCountry} />}
          </div>
        </Col>
        <Col span="6">
          <div className="salary-card">
            <div style={{ width: '100%', backgroundSize: 'cover', overflow: 'hidden' }}>
              <img src={selectedCountry?.flag} style={{ width: '100%' }} />
            </div>
            <h4 className="text-center mt-1">
              {selectedCountry?.name}
            </h4>
            Total Jobs: {selectedCountryData?.length}

          </div>
        </Col>
      </Row>
    </div>
  )
}

export default SalaryInfomation
