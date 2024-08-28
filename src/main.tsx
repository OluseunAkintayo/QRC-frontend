import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/global.css';
import './style/index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Admin from './Pages/Admin';
import Scan from './Pages/Scan';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/admin",
    element: <Admin />
  },
  {
    path: "/:url-id",
    element: <Scan />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
