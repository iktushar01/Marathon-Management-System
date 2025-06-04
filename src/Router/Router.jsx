import {
  createBrowserRouter,
} from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Marathons from "../Pages/Marathons/Marathons";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
        {
            index: true,
            element: <Home/>
        },
        {
          path : '/marathons',
          element : <Marathons></Marathons>
        }
    ]
  },
]);

export default router;