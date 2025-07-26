import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { baseApi } from './app/api/baseApi/baseApi.ts';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApiProvider api={baseApi}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApiProvider>
  </StrictMode>
);
