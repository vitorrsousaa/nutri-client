import { Route, Routes } from 'react-router-dom';

import AnamnesePage from '../../pages/Anamnese';
import CreateAnamnesis from '../../pages/CreateAnamnesis';
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
  { path: '/pacientes/:id/anamnese', element: <AnamnesePage /> },
  {
    path: '/pacientes/:id/anamnese/criar',
    element: <CreateAnamnesis />,
  },
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
