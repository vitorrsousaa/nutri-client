import { BrowserRouter } from 'react-router-dom';
import { PublicRoutes } from './routes';
import { queryClient, QueryClientProvider } from './libs/query';

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
