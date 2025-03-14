import { createRoot } from 'react-dom/client';  
import './index.css';
import App from './App.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';  // @tanstack/react-query로 수정
import { BrowserRouter } from 'react-router-dom';  

const queryClient = new QueryClient();  // QueryClient 인스턴스 생성
const root = createRoot(document.getElementById('root'));  // createRoot 사용

root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
);
