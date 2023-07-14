import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Home from "./components/home/Home";
import Store from "./components/store/Store";
import Signup from "./components/signup/Signup";
import Song from "./components/song/Song";
import Artists from "./components/artists/Artists";
import Artist from "./components/artist/Artist";
import Cart from "./components/cart/Cart";
import Profile from "./components/profile/Profile";
import Settings from "./components/profile/settings/Settings";
import Security from "./components/profile/security/Security";

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
      {
        path: "my-cart",
        element: <Cart />,
      },
      {
        path: "my-profile",
        element: <Profile />,
        children: [
          {
            path: "settings",
            element: <Settings />,
          },
          {
            path: "security",
            element: <Security />,
          },
        ],
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
