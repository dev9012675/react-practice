import { RouterProvider, createBrowserRouter } from "react-router";
import { useAuth } from "../providers/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../pages/Login";
import HomePage from "../pages/HomePage";
import Logout from "../pages/Logout";

const Routes = () => {
  const { token } = useAuth();
  // Route configurations go here

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/posts",
          element: <div>All Posts</div>,
        },
        {
          path: "/logout",
          element: <Logout />,
        },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <div>Home Page</div>,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ];

  const router = createBrowserRouter([
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
