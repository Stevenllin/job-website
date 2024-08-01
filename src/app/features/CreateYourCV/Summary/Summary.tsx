import React, { useRef, useEffect } from 'react'
import TemplateBackground from '../../../common/layouts/TemplateBackground';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import TextEditer from '../../../common/components/TextEditer';
import { ProcessStepTextEnum } from '../../../features/CreateYourCV/types';
import storageService from '../../../core/services/storageService';
import { StorageKeysEnum } from '../../../core/enums/storage';

const Summary: React.FC = () => {
  const editorRef = useRef<{ getEditorContent: () => string }>(null);
  /** 取得緩存 */
  const cache = JSON.parse(storageService.getItem(StorageKeysEnum.Template) ?? '{}');

  useEffect(() => {
    const summary = cache[ProcessStepTextEnum.Summary] ?? {};
  }, [])

  const handleSubmit = () => {
    if (editorRef.current) {
      const content = editorRef.current.getEditorContent();
    }
  }

  /** 
   * @description 監聽 TextEditor 變化，暫存
   */
  const handleSaveSummary = (innerHTML: string) => {
    /** 更新緩存 */
    const updated = { ...cache, [ProcessStepTextEnum.Summary]: innerHTML }
    storageService.setItem(StorageKeysEnum.Template, JSON.stringify(updated))
  }

  return (
    <div id="summary">
      <TemplateBackground
        title="Briefly tell us about your background"
        subtitle="Choose from our pre-written examples below or write your own."
      />
      <section>
        <TextEditer ref={editorRef} default={cache[ProcessStepTextEnum.Summary]} onSave={handleSaveSummary} />

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
