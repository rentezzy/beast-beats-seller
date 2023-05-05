import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./components/home/Home";
import Store from "./components/store/Store";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "store",
        element: <Store />,
      },
    ],
  },
]);
