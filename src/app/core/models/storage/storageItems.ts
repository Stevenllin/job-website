import { StorageTypesEnum } from '../../enums/storage';

/**
 * @description Storage item
 */
 export interface StorageItem {
  key: string;
  value: string;
  type: StorageTypesEnum;
  length: number;
}
