import { Button, Grid, MenuItem, Select } from '@mui/material';
import { OrderableList, OrderablePlayer } from '../OrderableList/OrderableList';
import { useAppDispatch, useAppSelector, useForm } from '../../../hooks';
import { FormEvent } from 'react';
import { changePlayersOrder } from '../../../store';
import { useNavigate } from 'react-router-dom';
import { AppRouting } from '../../../routes';

interface initialChangeOrderFormType {
  playersOrdered: OrderablePlayer[];
  repartitorId: string;
}

export const ChangeOrderForm = () => {
  const { players, roundsOrder } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const playersToOrder: OrderablePlayer[] = roundsOrder.map((key) => ({
    id: key,
    name: players[key].name,
  }));

  const initialForm: initialChangeOrderFormType = {
    playersOrdered: [...playersToOrder],
    repartitorId: playersToOrder[0].id,
  };

  const {
    setFormState,
    onInputChange,
    repartitorId,
    playersOrdered,
    formState,
  } = useForm(initialForm);

  const handleNewOrder = (items: OrderablePlayer[]) => {
    const newFormState = { ...formState };
    newFormState.playersOrdered = items;
    setFormState(newFormState);
  };

  const submitChangeForm = (e: FormEvent) => {
    e.preventDefault();
    const playersOrder = playersOrdered.map((item) => item.id);
    dispatch(changePlayersOrder({ playersOrder, repartitorId }));
    navigate(AppRouting.DASHBOARD);
  };

  return (
    <form aria-label="change-order-form" onSubmit={submitChangeForm}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <p>
            Por favor situa el nombre del jugador en la posición que desees
            arrastrando su nombre
          </p>
          <OrderableList
            itemsParams={playersToOrder}
            onNewOrder={handleNewOrder}
          />
        </Grid>
        <Grid item xs={12}>
          <p>Nuevo repartidor</p>
          <Select
            labelId="new-repartitor-label"
            value={repartitorId}
            onChange={onInputChange}
            name="repartitorId"
            sx={{ width: 400 }}
          >
            {Object.keys(players).map((playerKey) => (
              <MenuItem key={playerKey} value={playerKey}>
                {players[playerKey].name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            type="submit"
            aria-label="submit-btn"
            sx={{ marginTop: '25px' }}
          >
            Cambiar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
