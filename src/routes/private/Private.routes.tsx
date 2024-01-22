import { lazy, Suspense } from 'react';

import Spinner from '@godiet-ui/Spinner';

import { Route, RouteObject, Routes } from 'react-router-dom';

import { routes } from '../routes';
import { AuthGuard } from '../utils/AuthGuard';

const Dashboard = lazy(() => import('../../pages/Dashboard'));
const AnamnesePage = lazy(() => import('../../pages/Anamnese'));
const CreateAnamnesis = lazy(() => import('../../pages/CreateAnamnesis'));
const CreatePlanning = lazy(() => import('../../pages/CreatePlanning'));
const Patients = lazy(() => import('../../pages/Patients'));
const Patient = lazy(() => import('../../pages/Patient'));
const Anthropometry = lazy(() => import('../../pages/Anthropometry'));
const CreateAnthropometry = lazy(
  () => import('../../pages/CreateAnthropometry')
);

const renderRoutes: RouteObject[] = [
  { path: routes.dashboard, element: <Dashboard /> },
  { path: routes.patients, element: <Patients /> },
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
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route element={<AuthGuard isPrivate />}>
          {renderRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </Suspense>
  );
}
