import { ToastContainer } from 'react-toastify';

import { AuthProvider } from './contexts/auth';
import { queryClient, QueryClientProvider } from './libs/query';
import Routes from './routes';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes />
          <ToastContainer />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
