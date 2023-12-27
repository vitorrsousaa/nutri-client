import { Route, Routes } from 'react-router-dom';

import CreatePlanning from '../../pages/CreatePlanning';
import Dashboard from '../../pages/Dashboard';
import Patient from '../../pages/Patient';
import Patients from '../../pages/Patients';
import { TRoute } from '../types';
import { AuthGuard } from '../utils/AuthGuard';

const routes: TRoute[] = [
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/pacientes', element: <Patients /> },
  { path: '/pacientes/:id', element: <Patient /> },
  { path: '/pacientes/:id/plano/criar', element: <CreatePlanning /> },
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
