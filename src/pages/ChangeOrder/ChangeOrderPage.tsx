import { Grid } from '@mui/material';
import { useAppSelector } from '../../hooks';
import { OrderableList, OrderablePlayer } from './OrderableList/OrderableList';

export const ChangeOrderPage = () => {
  const { players, roundsOrder } = useAppSelector((state) => state.game);

  const playersToOrder: OrderablePlayer[] = roundsOrder.map((key) => ({
    id: key,
    name: players[key].name,
  }));

  return (
    <Grid container>
      <Grid item xs={12}>
        <h2>Orderable List</h2>
      </Grid>
      <Grid item xs={12}>
        <OrderableList itemsParams={playersToOrder} />
      </Grid>
    </Grid>
  );
};
