import React from 'react'
import TemplateBackground from '../../../common/layouts/TemplateBackground';
import Template1 from '../../../../assets/image/template1.png';
import Template2 from '../../../../assets/image/template2.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation} from 'swiper/modules';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../core/enums/routerPath';

const ChooseTemplate: React.FC = () => {
  return (
    <div id="cv" className="p-relative">
      <TemplateBackground
        title="CV Templates"
        subtitle="Choose a CV template, fill it out, and download in seconds. Create a professional curriculum vitae in a few clicks. Just pick one of 18+ CV templates below, add ready-to-use suggestions, and get the job."
      />

      {/** CV Template (使用 Swiper) */}
      <section id="template-swiper" className="">
        <Swiper
          pagination={{
            clickable: true,
          }}
          navigation={true} 
          modules={[Navigation]}
        >
          <SwiperSlide className="p-relative">
            <div className="template-container">
              <Link to={ROUTES.FEATURES__CREATE_YOUR_CV__GENERAL_INFO}>
                <img src={Template1}></img>
              </Link>
              <div className="text">
                <h4 className="fs-4">Cascade</h4>
                <p className="text-center">Professional CV template. Neatly aligned no matter the word count.</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="p-relative">
            <div className="template-container">
              <img src={Template2}></img>
              <div className="text">
                <h4 className="fs-4">Cubic</h4>
                <p className="text-center">Perfect CV template. Ideal readability for the densest of CVs.</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

    </div>
  )
}

export default ChooseTemplate;
