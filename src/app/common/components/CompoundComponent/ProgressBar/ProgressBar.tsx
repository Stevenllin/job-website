import React from 'react'
import { ProgressBarProps } from './types';
import { Progress } from 'antd';
import type { ProgressProps } from 'antd';
import Container from './Container';
import ProgressBarContext from './ProgressBarContext';
import useTemplateProgressBar from '../../../../core/hooks/useTemplateProgressBar';

const colors: ProgressProps['strokeColor'] = {
  '0%': '#108ee9',
  '100%': '#87d068',
};

const ProgressBar: React.FC<ProgressBarProps> = (props) => {
  const progress: number = useTemplateProgressBar();

  return (
    <section id="progress-bar">
      <div className="progress-bar">
        <div className="progress-bar-container">
          <ProgressBarContext.Provider value={{ currentStep: props.currentStep }}>
            <Container>
              {
                props.step.map((step, index) => (
                  step.visible ? (
                    <Container.Item value={step.value} key={index} url={step.url}>
                      {step.title}
                    </Container.Item>
                  ) : null
                ))
              }
            </Container>
          </ProgressBarContext.Provider>
          <div className="percentage">
            <span className="fs-1 fw-dark">RESUME COMPLETENESS:</span>
            <Progress percent={progress} strokeColor={colors} />
          </div>
        </div>
      </div>
      {props.children}
    </section>
  )
}

export default ProgressBar
