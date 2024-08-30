import { renderHook } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import useCheckHomePage from './useCheckHomePage';
import { ROUTES } from '../../enums/router';

describe('useCheckHomePage', () => {
  it('當路由為首頁時，應該返回 true', () => {
    /** result 中的 current 代表 Hook 的當前返回值 */
    const { result } = renderHook(() => useCheckHomePage(), {
      wrapper: ({ children }) => (
        /** 用來模擬路由環境，設置測試中使用的路由 */
        <MemoryRouter initialEntries={[ROUTES.FEATURES__HOME]}>
          {children}
        </MemoryRouter>
      ),
    });
    /** 驗證 hook 返回的值是否符合預期 */
    expect(result.current).toBe(true);
  });

  it('當路由不是首頁時，應該返回 false', () => {
    const { result } = renderHook(() => useCheckHomePage(), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={[ROUTES.FEATURES__FAQ]}>
          {children}
        </MemoryRouter>
      ),
    });
    expect(result.current).toBe(false);
  });
});