import { forwardRef, useImperativeHandle, useEffect } from 'react'
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; // Add css for snow theme
import { TextEditerProps, TextEditorHandle } from './types';
import { OperationCodeEnum } from '../../../core/enums/operation';

const TextEditer = forwardRef<TextEditorHandle, TextEditerProps>((props, ref) => {
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
  /** 
   * @description 使用 useImperativeHandle 暴露 ref 對象的方法或屬性，以便母層組件可以訪問
   */
  useImperativeHandle(ref, () => ({
    getEditorContent: () => {
      return quill ? quill.root.innerHTML : '';
    },
    setEditorContent: (content: string, type: OperationCodeEnum) => {
      if (quill) {
        /** 目前的字段 */
        const currentContent = quill.root.innerHTML;
        if (type === OperationCodeEnum.Create) {
          /** 加入的新內容 */
          const newContent = `<ol><li data-list="bullet"><span class="ql-ui" contenteditable="true">${content}</span></li></ol>`;
          const htmlContent = currentContent === '<p><br></p>' ? newContent : `${currentContent}<br/>${newContent}`;
          handleHTMLToDelta(htmlContent)
        }
        if (type === OperationCodeEnum.Delete) {
          const replaced = currentContent.replace(content, '')
          handleHTMLToDelta(replaced)
        }
      }
    },
  }));

  const handleHTMLToDelta = (string: string) => {
    if (quill) {
      /** 將 HTML 轉換 Delta 格式 */
      const delta = quill.clipboard.convert({ html: string });
      /** 設置編輯器為轉換後的 Delta */
      quill.setContents(delta);
    }
  }

  /** 
   * @description 設置預設值與監聽
   */
  useEffect(() => {
    if (quill) {
      /** 設置預設值 */
      quill.clipboard.dangerouslyPasteHTML(props.default);
      
      /** 監聽輸入值變化 */
      quill.on('text-change', () => {
        props.onSave(quill.root.innerHTML)
      });
    }
  }, [quill])

  return (
    <div style={{ width: '100%', height: '95%' }} className="text-editer-container">
      <div ref={quillRef} />
    </div>
  )
});

export default TextEditer;
