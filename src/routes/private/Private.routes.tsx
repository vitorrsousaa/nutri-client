import { Route, Routes } from 'react-router-dom';

import Dashboard from '../../pages/Dashboard';
import Patient from '../../pages/Patient';
import { TRoute } from '../types';
import { AuthGuard } from '../utils/AuthGuard';

const routes: TRoute[] = [
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/patient/:id', element: <Patient /> },
];

export default function PrivateRoutes() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<AuthGuard>{route.element}</AuthGuard>}
        />
      ))}
    </Routes>
  );
}
