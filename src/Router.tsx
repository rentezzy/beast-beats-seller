import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Home from "./components/home/Home";
import Store from "./components/store/Store";
import Signup from "./components/signup/Signup";
import Song from "./components/song/Song";

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
      {
        path: "song",
        element: <Navigate to="/store" />,
      },
      {
        path: "song/:id",
        element: <Song />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
