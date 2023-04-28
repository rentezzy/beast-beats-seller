import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import Home from "./components/home/Home";
import Store from "./components/store/Store";

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Home />}>
        <Route path="home" element={<Home />} />
        <Route path="store" element={<Store />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default Router;
