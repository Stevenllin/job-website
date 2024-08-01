import { Skill } from '../../../features/CreateYourCV/Skills/types'

export interface CheckItemProps {
  item: Skill;
  name: string;
  type: string;
  onCheck: (item: Skill) => void;
}