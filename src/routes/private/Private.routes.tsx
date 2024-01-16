import { Route, Routes } from 'react-router-dom';

import AnamnesePage from '../../pages/Anamnese';
import Anthropometry from '../../pages/Anthropometry';
import CreateAnamnesis from '../../pages/CreateAnamnesis';
import CreateAnthropometry from '../../pages/CreateAnthropometry';
import CreatePlanning from '../../pages/CreatePlanning';
import Dashboard from '../../pages/Dashboard';
import Patient from '../../pages/Patient';
import Patients from '../../pages/Patients';
import { TRoute } from '../types';
import { AuthGuard } from '../utils/AuthGuard';

const routes: TRoute[] = [
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/pacientes', element: <Patients /> },
  { path: '/:id', element: <Patient /> },
  { path: '/:id/plano/criar', element: <CreatePlanning /> },
  { path: '/:id/anamnese', element: <AnamnesePage /> },
  {
    path: '/:id/anamnese/criar',
    element: <CreateAnamnesis />,
  },
  {
    path: '/:id/antropometria',
    element: <Anthropometry />,
  },
  {
    path: '/:id/antropometria/criar',
    element: <CreateAnthropometry />,
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
