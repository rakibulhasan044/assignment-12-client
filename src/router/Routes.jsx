import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Main from "../layout/Main";
import Meals from "../pages/Meals/Meals";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
        {
            path: '/',
            element: <Home />
        },
        {
            path: 'meals',
            element: <Meals />
        },
        {
            path: 'login',
            element: <Login />
        },
        {
            path: 'register',
            element: <Register />
        }
    ]
  },
]);

export default router;
