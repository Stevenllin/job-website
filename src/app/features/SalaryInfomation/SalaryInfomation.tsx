import React, { useState } from 'react'
import useGetJobs from '../../core/hooks/useGetJobs';
import { Chart as ChartJS, ArcElement, Legend, ChartOptions } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Col, Row } from 'antd';
import { ColorPositionDefines } from '../../core/models/color';
import commonService from '../../core/services/commonService';
import DoughnutChart from '../../common/components/Chart/DoughnutChart';
import BarChart from '../../common/components/Chart/BarChart';
import { Jobs } from '../../features/FindJobs/types';

ChartJS.register(ArcElement, Legend, ChartDataLabels);

interface BarChart {
  labels: string[],
  values: number[],
  color: string;
}

const SalaryInfomation: React.FC = () => {
  const { original, loading, group_job_type, group_location, group_published } = useGetJobs();
  const [barChart, setBarChart] = useState<BarChart>({
    labels: [],
    values: [],
    color: '',
  });

  const array_job_type = Object.entries(group_job_type);

  /** Job Type 的 Doughnut 圖 */
  const doughnutLabels: string[] = array_job_type.map(item => item[0]);
  const doughnutValues: number[] = array_job_type.map((item: any[]) => item[1].length);
  const doughnutColor = Object.values(ColorPositionDefines);

  const handleSelectPosition = (label: string, value: number, index: number) => {
    const selected = array_job_type.find(item => item[0] === label);
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
        barLabels.push(i.toString());
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
      setBarChart({
        labels: barLabels,
        values: barValues,
        color: doughnutColor[index]
      })
    }
  }

  /** 各職業的 百分比（甜甜圈圖 點選後顯示該職業的柱狀圖）*/
  /** 各職業的 薪水分佈（柱狀圖）*/

  /** 各國家的 薪水分佈（地圖＋列表）*/
  /** 各日期的 薪水分佈（折線圖）*/
  return (
    <div id="salary-information">
      <Row gutter={16}>
        <Col span="8">
          <div className="salary-card">
            <DoughnutChart
              doughnutLabels={doughnutLabels}
              doughnutValues={doughnutValues}
              doughnutColor={doughnutColor}
              onClick={handleSelectPosition}
            />
          </div>
        </Col>
        <Col span="16">
          <div className="salary-card">
            <BarChart data={barChart.values} labels={barChart.labels} color={barChart.color} />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default SalaryInfomation
