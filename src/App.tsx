import { ChakraProvider } from '@chakra-ui/react';
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
          <ChakraProvider>
            <Routes />
          </ChakraProvider>
          <ToastContainer />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
