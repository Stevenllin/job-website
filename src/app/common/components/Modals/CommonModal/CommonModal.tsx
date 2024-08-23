import React from 'react'
import { CommonModalProps } from './types'
import Modal from '../Modal';
import { ModalNameEnum } from '../../../../core/enums/modal';
import { RiErrorWarningFill } from "react-icons/ri";
import { IconSizeEnum } from '../../../../core/enums/icon';

const CommonModal: React.FC<CommonModalProps> = (props) => {

  return (
    <Modal
      name={ModalNameEnum.Common}
      title={<RiErrorWarningFill style={{ fontSize: IconSizeEnum.Largest }} />}
      visible={props.visible}
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
      onConfirm={props.onConfirm}
    >
      <div className="d-flex justify-center align-center h-100 fs-3">{props.content}</div>
    </Modal>
  )
}

export default CommonModal
