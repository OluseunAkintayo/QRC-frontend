import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/global.css';
import './style/index.css';
import { Toaster } from "@/components/ui/toaster"
import axios from 'axios';
import Home from './Pages/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Welcome from './Pages/Welcome';
import Login from './Pages/Login';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const router = createBrowserRouter([
  {
    path: "/reception",
    element: <Home />
  },
  {
    path: "/",
    element: <Welcome />
  },
  {
    path: "/login",
    element: <Login />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </StrictMode>,
);
