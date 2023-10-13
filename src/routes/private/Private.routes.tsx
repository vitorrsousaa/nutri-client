import { Route, Routes } from 'react-router-dom';

import Dashboard from '../../pages/Dashboard';
import { AuthGuard } from '../utils/AuthGuard';

const routes = [{ path: '/', element: <Dashboard /> }];

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
