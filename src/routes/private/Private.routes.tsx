import { lazy } from 'react';

import { Route, RouteObject, Routes } from 'react-router-dom';

import { routes } from '../routes';
import { AuthGuard } from '../utils/AuthGuard';

const Dashboard = lazy(() => import('../../pages/Dashboard'));
const AnamnesePage = lazy(() => import('../../pages/Anamnese'));
const CreateAnamnesis = lazy(() => import('../../pages/CreateAnamnesis'));
const CreatePlanning = lazy(() => import('../../pages/CreatePlanning'));
const Patients = lazy(() => import('../../pages/Patients'));
const Patient = lazy(() => import('../../pages/Patient'));

const renderRoutes: RouteObject[] = [
  { path: routes.dashboard, element: <Dashboard /> },
  { path: routes.patients, element: <Patients /> },
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
      {renderRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<AuthGuard>{route.element}</AuthGuard>}
        />
      ))}
    </Routes>
  );
}
