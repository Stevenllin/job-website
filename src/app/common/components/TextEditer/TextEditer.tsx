import { forwardRef, useImperativeHandle, useEffect } from 'react'
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; // Add css for snow theme
import { TextEditerProps, TextEditorHandle } from './types';

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
  }));

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
