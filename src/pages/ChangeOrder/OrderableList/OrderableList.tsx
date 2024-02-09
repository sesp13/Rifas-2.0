/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';

export interface OrderablePlayer {
  id: string;
  name: string;
}

interface OrderableListParams {
  itemsParams: OrderablePlayer[];
  onNewOrder: (items: OrderablePlayer[]) => void;
}

export const OrderableList = ({
  itemsParams,
  onNewOrder,
}: OrderableListParams) => {
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
      onNewOrder([...items]);
    }
  };

  return (
    <Grid container justifyContent={'center'}>
      <List sx={{ bgcolor: 'background.paper', width: 300, padding: 0 }}>
        {items.map((item, index) => (
          <Box key={item.id}>
            <ListItem
              sx={{
                display: 'flex',
                justifyContent: 'center',
                padding: '10px',
              }}
              draggable="true"
              onDragStart={(e) => handleDragStart(e, item)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, item)}
            >
              <Box>
                <ListItemText sx={{ textAlign: 'center' }}>
                  Posicion {index + 1}
                </ListItemText>
                <ListItemText sx={{ textAlign: 'center' }}>
                  {item.name}
                </ListItemText>
              </Box>
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
    </Grid>
  );
};
