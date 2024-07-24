import React from 'react'
import Background from '../../../../assets/image/background.png';
import Template1 from '../../../../assets/image/template1.png';
import Template2 from '../../../../assets/image/template2.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation} from 'swiper/modules';

const ChooseTemplate: React.FC = () => {
  return (
    <div id="cv" className="p-relative">
      <div className="banner">
        {/** Background Image */}
        <img src={Background} width={200} style={{ left: '5%', zIndex: 1 }}></img>
        <img src={Background} width={200} style={{ right: '5%', transform: 'rotate(180deg)', zIndex: 1 }}></img>
        {/** Title and Subtitle */}
        <h1 className="text-center">CV Templates</h1>
        <div className="subtitle">
          <p>Choose a CV template, fill it out, and download in seconds. Create a professional curriculum vitae in a few clicks. Just pick one of 18+ CV templates below, add ready-to-use suggestions, and get the job.</p>
        </div>
      </div>

      {/** CV Template (使用 Swiper) */}
      <section id="template-swiper" className="pa-5">
        <Swiper
          pagination={{
            clickable: true,
          }}
          navigation={true} 
          modules={[Navigation]}
        >
          <SwiperSlide className="p-relative">
            <div className="template-container">
              <img src={Template1}></img>
            </div>
          </SwiperSlide>
          <SwiperSlide className="p-relative">
            <div className="template-container">
              <img src={Template2}></img>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

    </div>
  )
}

export default ChooseTemplate;
