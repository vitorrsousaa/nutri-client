import { Route, Routes } from 'react-router-dom';

import CreatePlanning from '../../pages/CreatePlanning';
import Dashboard from '../../pages/Dashboard';
import Patient from '../../pages/Patient';
import { TRoute } from '../types';
import { AuthGuard } from '../utils/AuthGuard';

const routes: TRoute[] = [
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/patient/:id', element: <Patient /> },
  { path: '/patient/:id/plano', element: <CreatePlanning /> },
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
