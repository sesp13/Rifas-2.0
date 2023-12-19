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
import { calcDebt } from '../../../helpers';
import { Player } from '../../../interfaces';

interface DashboardTableProps {
  players: Player[];
  entryValue: number;
  kickoutValue: number;
}

export const DashboardTable = ({
  players,
  entryValue,
  kickoutValue,
}: DashboardTableProps) => {
  const rows = players;

  return (
    <TableContainer component={Card} variant="outlined">
      <Table sx={{ minWidth: 650 }} aria-label="dashboard-table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Puntaje</TableCell>
            <TableCell>Vuela con</TableCell>
            <TableCell>Número de voladas</TableCell>
            <TableCell>Deuda acumulada</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow className='body-row' key={row.id}>
              <TableCell component="th" scope="row">
                <Typography variant="body1" gutterBottom>
                  {row.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" gutterBottom>
                  {row.points}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" gutterBottom>
                  {101 - row.points}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" gutterBottom>
                  {row.kickOuts}
                </Typography>
              </TableCell>
              <TableCell className='debt-column'>
                <Typography variant="body1" gutterBottom>
                  {calcDebt({
                    entryValue,
                    kickoutValue,
                    numberOfKickouts: row.kickOuts,
                  })}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
