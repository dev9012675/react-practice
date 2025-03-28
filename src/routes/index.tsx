import { RouterProvider, createBrowserRouter } from "react-router";
import { useAuth } from "../providers/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../pages/Login";
import HomePage from "../pages/HomePage";
import Register from "../pages/Register";
import Posts from "../pages/Posts";
import CreatePost from "../pages/CreatePost";
import UpdatePost from "../pages/UpdatePost";
import ViewAudio from "../pages/ViewAudio";

const Routes = () => {
  const { user } = useAuth();
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
          element: <Posts />,
        },
        {
          path: "/posts/create",
          element: <CreatePost />,
        },
        {
          path: "/posts/update/:id",
          element: <UpdatePost />,
        },
        {
          path: "/posts/:id/audio",
          element: <ViewAudio />,
        },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ];

  const router = createBrowserRouter([
    ...(!user ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
