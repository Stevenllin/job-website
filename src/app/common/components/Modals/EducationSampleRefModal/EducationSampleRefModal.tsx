import { EducationSampleRefModalProps } from './types';
import { ModalNameEnum } from '../../../../core/enums/modalName';
import Modal from '../Modal';

const EducationSampleRefModal: React.FC<EducationSampleRefModalProps> = (props) => {
  return (
    <Modal
      name={ModalNameEnum.EducationSampleRef}
      visible={props.visible}
      title="Education section samples"
    >
      <div>1</div>
    </Modal>
  )
}

export default EducationSampleRefModal;