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
import { calcDebtWithFormat } from '../../../helpers';
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
          {players.map((playerRow) => (
            <TableRow className="body-row" key={playerRow.id}>
              <TableCell component="th" scope="row">
                <Typography variant="body1" gutterBottom>
                  {playerRow.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" gutterBottom>
                  {playerRow.points}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" gutterBottom>
                  {101 - playerRow.points}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" gutterBottom>
                  {playerRow.kickOuts}
                </Typography>
              </TableCell>
              <TableCell className="debt-column">
                <Typography variant="body1" gutterBottom>
                  {calcDebtWithFormat({
                    entryValue,
                    kickoutValue,
                    numberOfKickouts: playerRow.kickOuts,
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
