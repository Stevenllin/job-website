import { CSSProperties, ReactElement } from "react";

export interface VirtualizedListProps {
  /** 顯示 Item 的數量 */
  itemCount: number;
  /** 每個 Item 的高度 */
  itemHeight: number;
  /** list 的高度 */
  listHeight: number;
  /** 每排 Item 的數量 */
  itemsPerRow: number;
  /** 在前後提前渲染一些元素，提升 UX */
  buffer?: number;
  renderComponent: (index: number, style: CSSProperties) => ReactElement
}