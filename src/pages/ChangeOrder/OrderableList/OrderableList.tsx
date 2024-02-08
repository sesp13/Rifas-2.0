/* eslint-disable @typescript-eslint/no-explicit-any */
import { List, ListItem, ListItemText } from '@mui/material';
import { useState } from 'react';

export interface OrderablePlayer {
  id: string;
  name: string;
}

interface OrderableListParams {
  itemsParams: OrderablePlayer[];
}

export const OrderableList = ({ itemsParams }: OrderableListParams) => {
  const [draggingItem, setDraggingItem] = useState<OrderablePlayer | null>(
    null
  );
  const [items, setListItems] = useState<OrderablePlayer[]>(itemsParams);

  const handleDragStart = (e: any, item: OrderablePlayer) => {
    setDraggingItem(item);
    e.dataTransfer.setData('text/plain', '');
  };

  const handleDragEnd = () => {
    setDraggingItem(null);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = (e: any, targetItem: OrderablePlayer) => {
    if (!draggingItem) return;

    const currentIndex = items.indexOf(draggingItem);
    const targetIndex = items.indexOf(targetItem);

    if (currentIndex !== -1 && targetIndex !== -1) {
      items.splice(currentIndex, 1);
      items.splice(targetIndex, 0, draggingItem);
      setListItems(items);
    }
  };

  return (
    <List>
      {items.map((item) => (
        <ListItem
          sx={{ border: '1px', borderColor: 'white' }}
          key={item.id}
          draggable="true"
          onDragStart={(e) => handleDragStart(e, item)}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, item)}
        >
          <ListItemText sx={{ textAlign: 'center' }}>{item.name}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
};
