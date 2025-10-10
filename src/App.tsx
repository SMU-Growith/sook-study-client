import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { SignUpPage } from '@/features/auth/pages/SignUpPage';
import { Home } from '@/features/study/pages/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/study" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
