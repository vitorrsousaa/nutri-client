import { Route, Routes } from 'react-router-dom';

import SignIn from '../../pages/SignIn';
import SignUp from '../../pages/SignUp';
import { AuthGuard } from '../utils/AuthGuard';

const routes = [
  { path: '/login', element: <SignIn /> },
  { path: '/register', element: <SignUp /> },
];

export default function PublicRoutes() {
  return (
    <Routes>
      <Route element={<AuthGuard isPrivate={false} />}>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
}
