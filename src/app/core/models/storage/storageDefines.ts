import { StorageKeysEnum, StorageTypesEnum } from "../../enums/storage";

/** 
 * 組合 Storage 的儲存方式
 */
export const StorageDefines: Readonly<Record<StorageKeysEnum, StorageTypesEnum>> = {
  [StorageKeysEnum.Template]: StorageTypesEnum.Session
}
