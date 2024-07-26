import { StorageKeysEnum, StorageTypesEnum } from '../enums/storage';
import { StorageDefines, StorageItem } from '../models/storage';

/**
 * @description 設定儲存值
 */
const setItem = (key: StorageKeysEnum, value: string) => {
  switch (StorageDefines[key]) {
    case (StorageTypesEnum.Local): {
      localStorage.setItem(key, value)
      break;
    }
    case (StorageTypesEnum.Session): {
      sessionStorage.setItem(key, value)
      break;
    }
  }
}

/**
 * @description 取得儲存值
 */
const getItem = (key: StorageKeysEnum) => {
  switch (StorageDefines[key]) {
    case (StorageTypesEnum.Local): {
      return localStorage.getItem(key)
    }
    case (StorageTypesEnum.Session): {
      return sessionStorage.getItem(key)
    }
  }
}

/**
 * @description 移除儲存值
 */
const removeItem = (key: StorageKeysEnum) => {
  switch (StorageDefines[key]) {
    case (StorageTypesEnum.Local): {
      localStorage.removeItem(key)
      break;
    }
    case (StorageTypesEnum.Session): {
      sessionStorage.removeItem(key)
      break
    }
  }
}

/**
 * @description 取得所有值
 */
const getAll = {
  local: (): StorageItem[] => {
    return Object.keys(localStorage).map(k => ({
      key: k,
      value: localStorage[k],
      type: StorageTypesEnum.Local,
      length: localStorage[k].length
    }))
  },
  session: (): StorageItem[] => {
    return Object.keys(sessionStorage).map(k => ({
      key: k,
      value: sessionStorage[k],
      type: StorageTypesEnum.Session,
      length: sessionStorage[k].length
    }))
  },
  all: (): StorageItem[] => {
    const locals = getAll.local();
    const sessions = getAll.session();
    return locals.concat(sessions)
  }
}

/** 
 * @description 移除全部值
 */
const clearAll = {
  local: () => {
    localStorage.clear()
  },
  session: () => {
    sessionStorage.clear()
  },
  all: () => {
    localStorage.clear()
    sessionStorage.clear()
  }
}

export default {
  setItem,
  getItem,
  removeItem,
  clearAll
}