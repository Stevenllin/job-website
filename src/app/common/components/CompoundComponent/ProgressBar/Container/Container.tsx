import React from 'react'
import { ContainerProps, ContainerChildComponents } from './types';
import Item from '../Item';

const Container: React.FC<ContainerProps> & ContainerChildComponents = (props) => {
  return (
    <div>
      {
        React.Children.map(props.children, (child) => 
          child
      )}
    </div>
  )
}

Container.Item = Item;

export default Container
