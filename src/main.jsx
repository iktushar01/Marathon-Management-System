import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import router from './Router/Router.jsx';
import AuthPorvider from './Contexts/AuthPorvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthPorvider>
      <RouterProvider router={router} />
    </AuthPorvider>
  </StrictMode>,
);