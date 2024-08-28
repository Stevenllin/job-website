import React, { useRef, useEffect, useState } from 'react'
import TemplateBackground from '../../../common/layouts/TemplateBackground';
import { ArrowRightOutlined } from '@ant-design/icons';
import TextEditer from '../../../common/components/TextEditer';
import { ProcessStepTextEnum } from '../../../features/CreateYourCV/types';
import storageService from '../../../core/services/storageService';
import { StorageKeysEnum } from '../../../core/enums/storage';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../core/enums/router';
import { Button } from 'antd';
import PreviewTemplate from '../../../common/layouts/PreviewTemplate';

const Summary: React.FC = () => {
  const navigate = useNavigate();
  const editorRef = useRef<{ getEditorContent: () => string }>(null);
  /** 取得緩存 */
  const cache = JSON.parse(storageService.getItem(StorageKeysEnum.Template) ?? '{}');
  /** 為了更新 Preview Template */
  const [template, setTemplate] = useState(cache);

  useEffect(() => {
    /** 若沒有選擇 Template 跳轉畫面 */
    const cv_template = cache[ProcessStepTextEnum.ChooseTemplate];
    if (!cv_template) navigate(ROUTES.FEATURES__CREATE_YOUR_CV__CHOOSE_TEMPLATE)

    const summary = cache[ProcessStepTextEnum.Summary] ?? {};
    console.log('summary', summary)
  }, [])

  const handleSubmit = () => {
    if (editorRef.current) {
      const content = editorRef.current.getEditorContent();
      console.log('content', content)
    }
  }

  /** 
   * @description 監聽 TextEditor 變化，暫存
   */
  const handleSaveSummary = (innerHTML: string) => {
    /** 更新緩存 */
    const updated = { ...cache, [ProcessStepTextEnum.Summary]: innerHTML }
    setTemplate(updated);
    storageService.setItem(StorageKeysEnum.Template, JSON.stringify(updated))
  }

  return (
    <div id="summary">
      <TemplateBackground
        title="Briefly tell us about your background"
        subtitle="Choose from our pre-written examples below or write your own."
      />
      <section>
          <div className="d-flex">
            <div className="pa-2" style={{ width: '100%', height: '556px' }}>
              <TextEditer ref={editorRef} default={cache[ProcessStepTextEnum.Summary]} onSave={handleSaveSummary} />
            </div>
            <div className="pa-2">
              <PreviewTemplate template={template} />
            </div>
          </div>

          {/** Submit Button */}
          <Button
            type="primary"
            icon={<ArrowRightOutlined />}
            iconPosition="end"
            onClick={handleSubmit}
            className="submit"
          >Next: Finalize</Button>
      </section>
    </div>
  )
}

export default Summary
