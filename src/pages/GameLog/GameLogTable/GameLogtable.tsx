import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Player, PlayerEvent } from '../../../interfaces';

interface GameLogTableProps {
  playerEvents: Record<string, PlayerEvent>;
  players: Record<string, Player>;
}

export const GameLogTable = (params: GameLogTableProps) => {
  const { playerEvents, players: storePlayers } = params;
  const playerKeys = Object.keys(playerEvents);

  return (
    <TableContainer component={Card} variant="outlined">
      <Table sx={{ minWidth: 650 }} className="log-table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Puntaje inicial</TableCell>
            <TableCell>Puntaje adquirido</TableCell>
            <TableCell>Puntaje final</TableCell>
            <TableCell>Voló en la ronda</TableCell>
            <TableCell>Número de voladas</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {playerKeys.map((key) => {
            return (
              <TableRow key={key}>
                <TableCell>
                  <Typography>{storePlayers[key].name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{playerEvents[key].startPoints}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{playerEvents[key].earnedPoints}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{playerEvents[key].endPoints}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {playerEvents[key].isKickedOut ? 'Si' : 'No'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>{playerEvents[key].kickOuts}</Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
