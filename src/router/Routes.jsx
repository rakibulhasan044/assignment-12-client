import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Main from "../layout/Main";
import Meals from "../pages/Meals/Meals";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import MealDetails from "../pages/MealDetails.jsx/MealDetails";
import CheckOut from "../pages/CheckOut/CheckOut";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layout/Dashboard";
import RequestedMeals from "../pages/Dasboard/RequestedMeals/RequestedMeals";
import Profile from "../pages/Dasboard/Profile/Profile";
import PaymentPage from "../pages/Dasboard/PaymentPage.jsx/PaymentPage";



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
        },
        {
            path: 'meal/:id',
            element: <PrivateRoute>
                <MealDetails/>
            </PrivateRoute>,
        },
        {
            path: 'checkout/:id',
            element: <PrivateRoute>
                <CheckOut />
            </PrivateRoute>
        },
        
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute>
        <Dashboard />
    </PrivateRoute>,
    children: [
        {
            path: 'requested-meals',
            element: <RequestedMeals />
        },
        {
            path: 'profile',
            element: <Profile />
        },
        {
            path: 'payment',
            element: <PrivateRoute>
                <PaymentPage />
            </PrivateRoute>
        }
    ]
  }
]);

export default router;
