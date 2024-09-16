import React from 'react'
import TemplateBackground from '../../../common/layouts/TemplateBackground';
import { Template1 } from '../../../../assets/image/images';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation} from 'swiper/modules';
import { ROUTES } from '../../../core/enums/router';
import { TemplateNameEnum } from '../../../core/enums/template';
import { useNavigate } from 'react-router-dom';
import storageService from '../../../core/services/storageService';
import { ProcessStepTextEnum } from '../types';
import { StorageKeysEnum } from '../../../core/enums/storage';

const ChooseTemplate: React.FC = () => {
  const navigate = useNavigate()

  /**
   * 
   * @param template template 名稱
   */
  const handleChooseTemplate = (template: TemplateNameEnum) => {
    /** 取得緩存 */
    const cache = JSON.parse(storageService.getItem(StorageKeysEnum.Template) ?? '{}');
    /** 更新緩存 */
    const updated = { ...cache, [ProcessStepTextEnum.ChooseTemplate]: template }
    storageService.setItem(StorageKeysEnum.Template, JSON.stringify(updated))
    navigate(ROUTES.FEATURES__CREATE_YOUR_CV__GENERAL_INFO)
  }

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
              <img src={Template1} onClick={() => handleChooseTemplate(TemplateNameEnum.Cascade)}></img>
              <div className="text">
                <h4 className="fs-4">{TemplateNameEnum.Cascade}</h4>
                <p className="text-center">Professional CV template. Neatly aligned no matter the word count.</p>
              </div>
            </div>
          </SwiperSlide>
          {/* <SwiperSlide className="p-relative">
            <div className="template-container">
              <img src={Template2} onClick={() => handleChooseTemplate(TemplateNameEnum.Cubic)}></img>
              <div className="text">
                <h4 className="fs-4">{TemplateNameEnum.Cubic}</h4>
                <p className="text-center">Perfect CV template. Ideal readability for the densest of CVs.</p>
              </div>
            </div>
          </SwiperSlide> */}
        </Swiper>
      </section>

    </div>
  )
}

export default ChooseTemplate;
