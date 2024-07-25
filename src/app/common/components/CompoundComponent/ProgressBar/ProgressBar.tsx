import React from 'react'
import { ProgressBarProps } from './types';
import Container from './Container';
import ProgressBarContext from './ProgressBarContext';

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
        </div>
      </div>
      {props.children}
    </section>
  )
}

export default ProgressBar
