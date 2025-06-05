import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Marathons from "../Pages/Marathons/Marathons";
import SignIn from "../Pages/SignIn/SignIn";
import Register from "../Pages/Register/Register";
import Error from "../Shared/Error/Error";
import DashBoardLayout from "../Layouts/DashBoardLayout";
import MyMarathonList from "../Pages/MyMarathonList/MyMarathonList";
import MyApplyList from "../Pages/MyApplyList/MyApplyList";
import AddMarathon from "../Pages/AddMarathon/AddMarathon";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "marathons",
        element: <Marathons />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashBoardLayout />,
    children: [
      {
      index: true,
      element: <AddMarathon />
    },
      {
        path: "add-marathon",
        element: <AddMarathon></AddMarathon>,
      },
      {
        path: "my-marathons",
        element: <MyMarathonList />,
      },
      {
        path: "my-applies",
        element: <MyApplyList />,
      },
    ],
  },
]);

export default router;
