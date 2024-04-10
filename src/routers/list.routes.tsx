import { createBrowserRouter } from "react-router-dom";
import { ROOT_PATH } from "../constants/route.constant";
import { Home } from "../screens";
import Auth from "../screens/Auth/Auth";
import { SignUp } from "../screens/Auth/SignUp/SignUp";
import { SignIn } from "../screens/Auth/SignIn/SignIn";
import Plantation from "../screens/Plantation/Plantation";

export const routesList = createBrowserRouter([
  {
    path: ROOT_PATH,
    element: <Home />,
  },
  {
    path: '/auth/login',
    element: <Auth />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/sugestões-plantação',
    element: <Plantation />,
  },

]);
