import { Skill } from '../../../features/CreateYourCV/Skills/types'
import { Coursework } from '../../../features/CreateYourCV/Education/types';

export interface CheckItemProps {
  item: Skill | Coursework;
  name: string;
  type?: string;
  onCheck: (item: Skill | Coursework) => void;
}