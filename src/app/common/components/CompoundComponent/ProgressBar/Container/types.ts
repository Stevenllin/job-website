import Item from '../Item';

export interface ContainerProps {
  children: any;
}

export interface ContainerChildComponents {
  Item: typeof Item;
}