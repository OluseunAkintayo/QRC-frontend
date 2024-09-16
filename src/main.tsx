import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/global.css';
import './style/index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Auth/Login';
import Admin from './Pages/Admin';
import Scan from './Pages/Scan';
import QRCodes from './Pages/Admin/QRCodes';
import Signup from './Pages/Auth/Signup';
import { Toaster } from "@/components/ui/toaster"
import ViewQRCode from './Pages/Admin/QRCodes/View';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;


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
    path: "/auth/signup",
    element: <Signup />
  },
  {
    path: "/dashboard",
    element: <Admin />
  },
  {
    path: "/dashboard/qrcodes",
    element: <QRCodes />
  },
  {
    path: "/dashboard/qrcodes/:codeId",
    element: <ViewQRCode />
  },
  {
    path: "scan",
    element: <Scan />
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
