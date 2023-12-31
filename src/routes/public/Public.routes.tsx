import { Route, Routes } from 'react-router-dom';

import LandingPage from '../../pages/LandingPage';
import SignIn from '../../pages/SignIn';
import SignUp from '../../pages/SignUp';
import { TRoute } from '../types';

const routes: TRoute[] = [
  { path: '/login', element: <SignIn /> },
  { path: '/register', element: <SignUp /> },
  { path: '/', element: <LandingPage /> },
];

export default function PublicRoutes() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}
