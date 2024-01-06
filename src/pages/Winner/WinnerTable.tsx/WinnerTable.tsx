import {
  Card,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Player } from '../../../interfaces';
import { calcDebtWithFormat } from '../../../helpers';

interface WinnerTableProps {
  players: Player[];
  entryValue: number;
  kickoutValue: number;
}

export const WinnerTable = ({
  players,
  entryValue,
  kickoutValue,
}: WinnerTableProps) => {
  return (
    <TableContainer component={Card} variant="outlined">
      <Table sx={{ minWidth: 650 }} aria-label="winner-table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Deuda</TableCell>
            <TableCell>Número de voladas</TableCell>
          </TableRow>
          {players.map((player) => (
            <TableRow className='body-row' key={player.id}>
              <TableCell component="th" scope="row" className='name-column'>
                <Typography variant="body1" gutterBottom>
                  {player.name}
                </Typography>
              </TableCell>
              <TableCell component="th" scope="row" className="debt-column">
                <Typography variant="body1" gutterBottom>
                  {calcDebtWithFormat({
                    entryValue,
                    kickoutValue,
                    numberOfKickouts: player.kickOuts,
                  })}
                </Typography>
              </TableCell>
              <TableCell className='kickouts-column'>
                <Typography variant="body1" gutterBottom>
                  {player.kickOuts}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableHead>
      </Table>
    </TableContainer>
  );
};
