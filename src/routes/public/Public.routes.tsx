import { Route, Routes as RoutesProvider } from 'react-router-dom';

import CreatePatient from '../../pages/CreatePatient';
import LandingPage from '../../pages/LandingPage';
import SignIn from '../../pages/SignIn';
import SignUp from '../../pages/SignUp';

const routes = [
  { path: '/', element: <LandingPage /> },
  { path: '/sign-in', element: <SignIn /> },
  { path: '/sign-up', element: <SignUp /> },
  { path: '/create', element: <CreatePatient /> },
];

export default function PublicRoutes() {
  return (
    <RoutesProvider>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </RoutesProvider>
  );
}
