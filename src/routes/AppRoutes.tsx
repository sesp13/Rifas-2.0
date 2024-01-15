import { Routes, Route, Navigate } from 'react-router-dom';
import { SetupPage } from '../pages/Setup/SetupPage';
import { SetupPlayers } from '../pages/SetupPlayers/SetupPlayers';
import { DashboardPage } from '../pages/Dashboard/DashboardPage';
import { EndRoundPage } from '../pages/EndRound/EndRoundPage';
import { WinnerPage } from '../pages/Winner/WinnerPage';
import { AppRouting } from './AppRouting.enum';
import { GameLogPage } from '../pages/GameLog/GameLogPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={AppRouting.SET_UP} element={<SetupPage />} />
      <Route path={AppRouting.PLAYERS} element={<SetupPlayers />} />
      <Route path={AppRouting.DASHBOARD} element={<DashboardPage />} />
      <Route path={AppRouting.END_ROUND} element={<EndRoundPage />} />
      <Route path={AppRouting.WINNER} element={<WinnerPage />} />
      <Route path={AppRouting.GAME_LOG} element={<GameLogPage />} />
      <Route path="/*" element={<Navigate to="setup" />} />
    </Routes>
  );
};
