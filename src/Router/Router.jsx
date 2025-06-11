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
import MarathonsDetails from "../Pages/Marathons/MarathonsDetails";
import PrivateRoutes from "../Routes/PrivateRoutes";
import ProfileInfo from "../Shared/Navbar/ProfileInfo";
import MarathonRegister from "../Pages/Marathons/MarathonRegister";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () => fetch("http://localhost:4000/marathons"),
      },
      {
        path:"/profileinfo",
        element: <ProfileInfo />
      },
      {
        path: "marathons",
        element: <Marathons />,
        loader: () => fetch("http://localhost:4000/marathons"),
      },
      {
        path: "marathons/:id",
        element: (
          <PrivateRoutes>
            <MarathonsDetails />
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:4000/marathons/${params.id}`),
      },
      {
        path: "marathons/:id/register",
        element: (
          <PrivateRoutes>
            <MarathonRegister></MarathonRegister>
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:4000/marathons/${params.id}`),
      },
      { path: "signin", element: <SignIn /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashBoardLayout />
      </PrivateRoutes>
    ),
    children: [
      { index: true, element: <AddMarathon /> },
      { path: "add-marathon", element: <AddMarathon /> },
      { path: "my-marathons", element: <MyMarathonList /> , loader: () => fetch("http://localhost:4000/marathons"), },
      { path: "my-applies", element: <MyApplyList />, loader: () => fetch("http://localhost:4000/registrations"), },
    ],
  },
]);

export default router;
