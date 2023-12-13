import { Routes, Route, Navigate } from 'react-router-dom';
import { SetupPage } from './pages/Setup/SetupPage';
import { SetupPlayers } from './pages/SetupPlayers/SetupPlayers';
import { DashboardPage } from './pages/Dashboard/DashboardPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/setup" element={<SetupPage />} />
      <Route path="/players" element={<SetupPlayers />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/*" element={<Navigate to="setup" />} />
    </Routes>
  );
};
