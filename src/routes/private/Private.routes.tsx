import { Route, Routes } from 'react-router-dom';

import CreatePatient from '../../pages/CreatePatient';
import Dashboard from '../../pages/Dashboard';
import { TRoute } from '../types';
import { AuthGuard } from '../utils/AuthGuard';

const routes: TRoute[] = [
  { path: '/', element: <Dashboard /> },
  { path: '/create', element: <CreatePatient /> },
];

export default function PrivateRoutes() {
  return (
    <Routes>
      <Route element={<AuthGuard isPrivate />}>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
}
