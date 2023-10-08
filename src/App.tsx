import { BrowserRouter } from 'react-router-dom';

import { queryClient, QueryClientProvider } from './libs/query';
import { PublicRoutes } from './routes';

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <PublicRoutes />
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
