import {QueryClient, QueryClientProvider} from "react-query";
import {RouterProvider, createHashRouter, redirect} from "react-router-dom";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import ProtectectedAuthentication from "./Components/ProtectectedAuthentication/ProtectectedAuthentication";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Register from "./Components/Register/Register";
function App() {
  const queryClient = new QueryClient();
  const routers = createHashRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {index: true, loader: () => redirect("home")},
        // { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        {
          path: "home",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "register",
          element: (
            <ProtectectedAuthentication>
              <Register />{" "}
            </ProtectectedAuthentication>
          ),
        },
        {
          path: "login",
          element: (
            <ProtectectedAuthentication>
              <Login />
            </ProtectectedAuthentication>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routers} />
      </QueryClientProvider>
    </>
  );
}

export default App;
