import React from "react";
import Header from "./components/header/Header";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Store from "./components/store/Store";
import Home from "./components/home/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />}>
      <Route path="home" element={<Home />} />
      <Route path="store" element={<Store />} />
    </Route>
  )
);
function App() {
  return (
    <div>
      <Header />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
