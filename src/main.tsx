import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; //track status devtool
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { AppContextProvider } from './context';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <App />
        <ReactQueryDevtools />
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
