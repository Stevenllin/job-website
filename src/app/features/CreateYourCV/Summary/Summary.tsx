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
    console.log('summary', summary);
  }, [])

  const handleSubmit = () => {
    if (editorRef.current) {
      const content = editorRef.current.getEditorContent();
      console.log('content', content);
    }
  }

  return (
    <div id="summary">
      <TemplateBackground
        title="Briefly tell us about your background"
        subtitle="Choose from our pre-written examples below or write your own."
      />
      <section>
        <TextEditer processStepText={ProcessStepTextEnum.Summary} ref={editorRef} />

        {/** Submit Button */}
        <Button
          type="primary"
          icon={<ArrowRightOutlined />}
          iconPosition="end"
          htmlType="submit"
          onClick={handleSubmit}
        >Next: Finalize</Button>
      </section>
    </div>
  )
}

export default Summary
