import { AuthProvider } from './contexts/auth';
import { queryClient, QueryClientProvider } from './libs/query';
import Routes from './routes';

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
