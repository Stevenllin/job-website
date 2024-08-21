import { PositionNewTypeTextEnum } from '../../enums/position'

export interface PositionType {
  label: PositionNewTypeTextEnum;
  value: PositionNewTypeTextEnum;
}

export const PositionTypeDefines: PositionType[] = [
  { label: PositionNewTypeTextEnum.ALL, value: PositionNewTypeTextEnum.ALL },
  { label: PositionNewTypeTextEnum.DATA_SCIENTIST, value: PositionNewTypeTextEnum.DATA_SCIENTIST },
  { label: PositionNewTypeTextEnum.SOFTWARE_ENGINEER, value: PositionNewTypeTextEnum.SOFTWARE_ENGINEER },
  { label: PositionNewTypeTextEnum.CLOUD_ENGINEER, value: PositionNewTypeTextEnum.CLOUD_ENGINEER },
  { label: PositionNewTypeTextEnum.UX_DESIGNER, value: PositionNewTypeTextEnum.UX_DESIGNER },
  { label: PositionNewTypeTextEnum.PRODUCT_MANAGER, value: PositionNewTypeTextEnum.PRODUCT_MANAGER },
  { label: PositionNewTypeTextEnum.SYSTEMS_ANALYST, value: PositionNewTypeTextEnum.SYSTEMS_ANALYST },
  { label: PositionNewTypeTextEnum.SECURITY_ENGINEER, value: PositionNewTypeTextEnum.SECURITY_ENGINEER },
  { label: PositionNewTypeTextEnum.DEVOPS_ENGINEER, value: PositionNewTypeTextEnum.DEVOPS_ENGINEER },
  { label: PositionNewTypeTextEnum.BACKEND_ENGINEER, value: PositionNewTypeTextEnum.BACKEND_ENGINEER },
  { label: PositionNewTypeTextEnum.MARKETING_MANAGER, value: PositionNewTypeTextEnum.MARKETING_MANAGER },
  { label: PositionNewTypeTextEnum.AI_ENGINEER, value: PositionNewTypeTextEnum.AI_ENGINEER },
  { label: PositionNewTypeTextEnum.MACHINE_LEARNING_ENGINEER, value: PositionNewTypeTextEnum.MACHINE_LEARNING_ENGINEER },
  { label: PositionNewTypeTextEnum.BUSINESS_ANALYST, value: PositionNewTypeTextEnum.BUSINESS_ANALYST },
  { label: PositionNewTypeTextEnum.FRONTEND_ENGINEER, value: PositionNewTypeTextEnum.FRONTEND_ENGINEER },
]