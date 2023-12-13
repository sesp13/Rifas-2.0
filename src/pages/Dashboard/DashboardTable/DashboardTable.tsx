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
import { Player } from '../../../interfaces';

export const DashboardTable = ({ players }: { players: Player[] }) => {
  const rows = players;

  return (
    <TableContainer component={Card} variant="outlined">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
            <TableRow key={row.id}>
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
              <TableCell>
                <Typography variant="body1" gutterBottom>
                  $ 1.000
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
