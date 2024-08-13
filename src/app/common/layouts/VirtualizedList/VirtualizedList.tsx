
import React, { memo, ReactElement, useState, useMemo, useEffect } from 'react';
import { VirtualizedListProps } from './types';
import commonService from '../../../core/services/commonService';

export const VirtualizedList = memo<VirtualizedListProps>(({ itemsPerRow, itemCount, itemHeight, listHeight, buffer = 0, renderComponent }) => {
  /** 計算總行數 */
  const rowCount = Math.ceil(itemCount / itemsPerRow);
  /** 目標渲染的子物件 */
  const [items, setItems] = useState<ReactElement[]>([]);

  /**
   * @description 計算容器內部的高度
   */
  const innerHeight = useMemo(() => {
    return rowCount * itemHeight;
  }, [rowCount, itemHeight]);

  const rerenderComponents = (target?: HTMLDivElement) => {
    /** 當前的滾動高度 */
    const scrollTop = target?.scrollTop ?? 0;

    /** 計算當前的滾動位置所應得起始索引 */
    /** -1 代表索引向前推移一個行距 */
    /** 使用 Math.max 防止滾動位置非常靠上時索引為負 */
    const pastIndex = Math.max(
      Math.floor(scrollTop / itemHeight) - 1 - buffer,
      -1
    );
    /** Math.min 確保不會超過行數 */
    const futureIndex = Math.min(
      Math.ceil((scrollTop + listHeight) / itemHeight) + buffer,
      rowCount
    );

    const temp: ReactElement[] = [];
    for (let i = pastIndex + 1; i < futureIndex; i++) {
      const rowItems = [];
      for (let j = 0; j < itemsPerRow; j++) {
        const itemIndex = i * itemsPerRow + j;
        if (itemIndex < itemCount) {
          rowItems.push(
            renderComponent(itemIndex, {
              position: 'absolute',
              width: `${100 / itemsPerRow}%`,
              transform: `translateY(${i * itemHeight}px) translateX(${j * 100}%)`,
            })
          );
        }
      }
      temp.push(...rowItems);
    }
    setItems([...temp]);
  };

  /**
   * @description 滾輪的事件
   * @param e 
   */
  const handleScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLDivElement;
    rerenderComponents(target);
  };

  /**
   * @description 根據參數，重新渲染
   */
  useEffect(() => {
    rerenderComponents();
  }, [itemCount, itemHeight, listHeight, renderComponent]);

  return (
    <div
      className="virtualizedList__wrapper"
      style={{ overflow: 'scroll', height: listHeight }}
      onScroll={commonService.throttle(handleScroll, 100)}
    >
      <div
        className="virtualizedList__inner"
        style={{ position: 'relative', height: innerHeight }}
      >
        {items}
      </div>
    </div>
  );
});