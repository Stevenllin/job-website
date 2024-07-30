import React, { forwardRef, useImperativeHandle, useEffect } from 'react'
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; // Add css for snow theme
import { TextEditerProps, TextEditorHandle } from './types';
import storageService from '../../../core/services/storageService';
import { StorageKeysEnum } from '../../../core/enums/storage';
import { ProcessStepTextEnum } from '../../../features/CreateYourCV/types';

const TextEditer = forwardRef<TextEditorHandle, TextEditerProps>((_, ref) => {
  /** 設置 Toolbar */
  const modules = {
    toolbar: [
      [
        { 'size': ['small', false, 'large'] },
        'bold',
        'italic',
        'underline',
        { 'list': 'ordered' },
        { 'list': 'bullet' },
      ],
    ],
  };
  const { quill, quillRef } = useQuill({ modules });
  /** 取得緩存 */
  const cache = JSON.parse(storageService.getItem(StorageKeysEnum.Template) ?? '{}');

  /** 
   * @description 使用 useImperativeHandle 暴露 ref 對象的方法或屬性，以便母層組件可以訪問
   */
  useImperativeHandle(ref, () => ({
    getEditorContent: () => {
      return quill ? quill.root.innerHTML : '';
    },
  }));

  /** 
   * @description 設置預設值與監聽
   */
  useEffect(() => {
    if (quill) {
      /** 設置預設值 */
      quill.clipboard.dangerouslyPasteHTML(cache[ProcessStepTextEnum.Summary]);
      
      /** 監聽輸入值變化 */
      quill.on('text-change', () => {
        /** 更新緩存 */
        const updated = { ...cache, [ProcessStepTextEnum.Summary]: quill.root.innerHTML }
        storageService.setItem(StorageKeysEnum.Template, JSON.stringify(updated))
      });
    }
  }, [quill])

  return (
    <div style={{ width: '100%', height: 300 }} className="text-editer-container">
      <div ref={quillRef} />
    </div>
  )
});

export default TextEditer;
