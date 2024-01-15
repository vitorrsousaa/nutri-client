import { QueryClientProvider } from '@godiet-query';

import { ToastContainer } from 'react-toastify';

import { AuthProvider } from './contexts/auth';
import ThemeProvider from './libs/ui/components/ThemeProvider';
import Routes from './routes';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <QueryClientProvider>
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
