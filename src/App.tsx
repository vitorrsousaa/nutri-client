import { ToastContainer } from 'react-toastify';

import { AuthProvider } from './contexts/auth';
import { queryClient, QueryClientProvider } from './libs/query';
import ThemeProvider from './libs/ui/components/ThemeProvider';
import Routes from './routes';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            <Routes />
          </ThemeProvider>
          <ToastContainer />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
