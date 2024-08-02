import { useRef } from 'react';
import { setModalVisibleAction } from '../../../../store/ui/actions';
import { ModalProps } from './types';
import useAppDispatch from '../../../../core/hooks/useAppDispatch';
import { IoCloseOutline } from "react-icons/io5";
import { IconSizeEnum } from '../../../../core/enums/icon';

const Modal: React.FC<ModalProps> = (props) => {
  const modalElemRef = useRef<HTMLDivElement>(null);
  const reduxDispatch = useAppDispatch();

  /**
   * @description 處理關閉
   */
  const handleClose = () => {
    if (props.onCancel) props.onCancel;
    reduxDispatch(setModalVisibleAction(props.name, false));
  }

  /**
   * @description 處理背景點擊執行的事件
   * @param event event object
   */
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === modalElemRef.current) {
      handleClose();
    }
  }

  /** 
   * @description 處理確認
   */
  const handleConfirm = () => {
    if (props.onConfirm) props.onConfirm;
    handleClose();
  }

  return (
    <>
      <div ref={modalElemRef} className={'modal fade' + (props.className ? ` ${props.className}` : '') + (props.visible ? ' modal--show show' : '')} onClick={handleBackdropClick}>
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          {/** Modal 內容區塊 */}
          <div className="modal-content">
            {/** Title and Close Button */}
            <div className="modal-header">
              <h4 className="modal-title">{props.title}</h4>
              <IoCloseOutline className="btn-close" style={{ 'fontSize': IconSizeEnum.Large }} onClick={handleClose} />

              {/* <button type="button" className="btn-close" ></button> */}
            </div>
            {/** Modal Body Children */}
            <div className="modal-body">
              {props.children}
            </div>
            {/** Modal Footer */}
            <div className="modal-footer">
              {props.cancelBtnText && (
                <button className="" onClick={handleClose}>
                  {props.cancelBtnText}
                </button>
              )}
              {props.confirmBtnText && (
                <button className="" onClick={handleConfirm}>
                  {props.confirmBtnText}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={'modal-backdrop fade' + (props.visible ? ' modal-backdrop--show show' : '')} />
    </>
  )
}

export default Modal;