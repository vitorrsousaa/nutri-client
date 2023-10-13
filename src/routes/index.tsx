import { BrowserRouter } from 'react-router-dom';

import PrivateRoutes from './private/Private.routes';
import PublicRoutes from './public/Public.routes';

export default function Routes() {
  return (
    <BrowserRouter>
      <PublicRoutes />
      <PrivateRoutes />
    </BrowserRouter>
  );
}
