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
import Privacy from "../Pages/Privacy/Privacy";
import Terms from "../Pages/Terms/Terms";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () => fetch("https://stridez-server.vercel.app/marathons"),
      },
      {
        path:"/profileinfo",
        element: <ProfileInfo />
      },
      {
        path: "marathons",
        element: <Marathons />,
        loader: () => fetch("https://stridez-server.vercel.app/marathons"),
      },
      {
        path: "marathons/:id",
        element: (
          <PrivateRoutes>
            <MarathonsDetails />
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          fetch(`https://stridez-server.vercel.app/marathons/${params.id}`),
      },
      {
        path: "marathons/:id/register",
        element: (
          <PrivateRoutes>
            <MarathonRegister></MarathonRegister>
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          fetch(`https://stridez-server.vercel.app/marathons/${params.id}`),
      },
      { path: "signin", element: <SignIn /> },
      { path: "register", element: <Register /> },
      { path: "privacy", element: <Privacy /> },
      { path: "terms", element: <Terms /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashBoardLayout />
      </PrivateRoutes>
    ),
    errorElement: <Error />, 
    children: [
      { index: true, element: <AddMarathon /> },
      { path: "add-marathon", element: <AddMarathon /> },
      { path: "my-marathons", element: <MyMarathonList /> },
      { path: "my-applies", element: <MyApplyList />, loader: () => fetch("https://stridez-server.vercel.app/registrations"), },
    ],
  },
]);

export default router;
