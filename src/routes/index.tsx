import {
  BrowserRouter,
  Route,
  RouteObject,
  Routes as ReactRoutes,
} from 'react-router-dom';

import AnamnesePage from '../pages/Anamnese';
import Anthropometry from '../pages/Anthropometry';
import CreateAnamnesis from '../pages/CreateAnamnesis';
import CreateAnthropometry from '../pages/CreateAnthropometry';
import CreatePlanning from '../pages/CreatePlanning';
import Dashboard from '../pages/Dashboard';
import LandingPage from '../pages/LandingPage';
import Patient from '../pages/Patient';
import Patients from '../pages/Patients';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import { AuthGuard } from './utils/AuthGuard';
import { routes } from './routes';

const publicRoutes: RouteObject[] = [
  { path: '/login', element: <SignIn /> },
  // eslint-disable-next-line react/jsx-no-undef
  { path: '/register', element: <SignUp /> },
  { path: '/', element: <LandingPage /> },
];

const privateRoutes: RouteObject[] = [
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

export default function Routes() {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route element={<AuthGuard isPrivate={false} />}>
          {publicRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
        <Route element={<AuthGuard isPrivate />}>
          {privateRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </ReactRoutes>
    </BrowserRouter>
  );
}
