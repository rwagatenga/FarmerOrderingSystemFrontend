import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "@/pages/ErrorPage";
import Layout from "@/layout/Layout";
import Login from "@/pages/Login";
import DashboardRoutes from "@/routers/DashboardRoutes";

// import { basename } from './utils/AppUrl'

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Login />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/dashboard",
      element: <Layout />,
      children: DashboardRoutes(),
    },
  ],
  // { basename: basename }
);

export default router;
