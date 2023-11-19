import { Routes, Route, Navigate } from 'react-router-dom';
import { SetupPage } from './pages/Setup/SetupPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/setup" element={<SetupPage />} />
      <Route path="/*" element={<Navigate to="setup" />} />
    </Routes>
  );
};
