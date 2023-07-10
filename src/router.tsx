import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Home from "./components/home/Home";
import Store from "./components/store/Store";
import Signup from "./components/signup/Signup";
import Song from "./components/song/Song";
import Artists from "./components/artists/Artists";
import Artist from "./components/artist/Artist";

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
      {
        path: "artists",
        element: <Artists />,
      },
      {
        path: "artist",
        element: <Navigate to="/artists" />,
      },
      {
        path: "artist/:id",
        element: <Artist />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
