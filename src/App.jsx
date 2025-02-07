// react roouter dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// layouts
import MainLayout from "./layout/MainLayout";

//  pages
import { Home } from "./pages";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
