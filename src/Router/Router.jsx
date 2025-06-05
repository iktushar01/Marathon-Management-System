import {
  createBrowserRouter,
} from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Marathons from "../Pages/Marathons/Marathons";
import SignIn from "../Pages/SignIn/SignIn";
import Register from "../Pages/Register/Register";
import Error from "../Shared/Error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
    children: [
        {
            index: true,
            element: <Home/>
        },
        {
          path : '/marathons',
          element : <Marathons></Marathons>
        },
        {
          path : '/signin',
          element : <SignIn></SignIn>
        },
        {
          path : '/register',
          element : <Register></Register>
        }
    ]
  },
]);

export default router;