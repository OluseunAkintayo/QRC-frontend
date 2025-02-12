import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/global.css';
import './style/index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Auth/Login';
import Scan from './Pages/Scan';
import QRCodes from './Pages/Dashboard/QRCodes';
import { Toaster } from "@/components/ui/toaster"
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ViewQRCode from './Pages/Dashboard/ViewQRCode';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './Pages/Dashboard';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
// axios.defaults.baseURL = "http://localhost:5237/api";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/auth/login",
    element: <Login />
  },
  {
    path: "scan",
    element: <Scan />
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <Dashboard />
      },
      {
        path: "/dashboard/qrcodes",
        element: <QRCodes />
      },
      {
        path: "/dashboard/qrcodes/:codeId",
        element: <ViewQRCode />
      }
    ]
  }
]);

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  </StrictMode>,
)
