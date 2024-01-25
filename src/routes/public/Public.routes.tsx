import { Route, RouteObject } from 'react-router-dom';

import LandingPage from '../../pages/LandingPage';
import SignIn from '../../pages/SignIn';
import SignUp from '../../pages/SignUp';
import { AuthGuard } from '../utils/AuthGuard';

const routes: RouteObject[] = [
  { path: '/login', element: <SignIn /> },
  { path: '/register', element: <SignUp /> },
  { path: '/', element: <LandingPage /> },
];

export default function PublicRoutes() {
  return (
    <Route element={<AuthGuard isPrivate={false} />}>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Route>
  );
}
