import React from 'react'
import { ProgressBarProps } from './types';
import { Progress } from 'antd';
import type { ProgressProps } from 'antd';
import Container from './Container';
import ProgressBarContext from './ProgressBarContext';

const colors: ProgressProps['strokeColor'] = {
  '0%': '#108ee9',
  '100%': '#87d068',
};

const ProgressBar: React.FC<ProgressBarProps> = (props) => {
  return (
    <section id="progress-bar">
      <div className="progress-bar">
        <div className="progress-bar-container">
          <ProgressBarContext.Provider value={{ currentStep: props.currentStep }}>
            <Container>
              {
                props.step.map((step, index) => (
                  step.visible ? (
                    <Container.Item value={step.value} key={index}>
                      {step.title}
                    </Container.Item>
                  ) : null
                ))
              }
            </Container>
          </ProgressBarContext.Provider>
          <div className="percentage">
            <span className="fs-1 fw-dark">RESUME COMPLETENESS:</span>
            <Progress percent={99.9} strokeColor={colors} />
          </div>
        </div>
      </div>
      {props.children}
    </section>
  )
}

export default ProgressBar
