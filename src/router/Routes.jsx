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
import AdminDashboard from "../pages/Dasboard/Admin/AdminDashboard.jsx/AdminDashboard";
import Addmeal from "../pages/Dasboard/Admin/AddMeal/Addmeal";
import ManageUsers from "../pages/Dasboard/Admin/ManageUsers/ManageUsers";
import AllMeals from "../pages/Dasboard/Admin/AllMeals/AllMeals";
import Allreviews from "../pages/Dasboard/Admin/AllReviews/Allreviews";
import ServeMeals from "../pages/Dasboard/Admin/ServeMeals/ServeMeals";
import UpcomingMealsManage from "../pages/Dasboard/Admin/UpcomingMealsManage/UpcomingMealsManage";
import AdminProfile from "../pages/Dasboard/Admin/AdminProfile/AdminProfile";
import MyReviews from "../pages/Dasboard/MyReviews/MyReviews";
import UpdatePage from "../pages/Dasboard/Admin/AllMeals/UpdatePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "meals",
        element: <Meals />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "meal/:id",
        element: (
          <PrivateRoute>
            <MealDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "checkout/:id",
        element: (
          <PrivateRoute>
            <CheckOut />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "requested-meals",
        element: <RequestedMeals />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "payment",
        element: (
          <PrivateRoute>
            <PaymentPage />
          </PrivateRoute>
        ),
      },
      {
        path: "admin-dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "add-meal",
        element: <Addmeal />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "all-meals",
        element: <AllMeals />,
      },
      {
        path: "all-reviews",
        element: <Allreviews />,
      },
      {
        path: "serve-meals",
        element: <ServeMeals />,
      },
      {
        path: "manage-upcoming-meals",
        element: <UpcomingMealsManage />,
      },
      {
        path: "admin-profile",
        element: <AdminProfile />,
      },
      {
        path: "my-reviews",
        element: <MyReviews />,
      },
      {
        path: "update-meal/:id",
        element: <UpdatePage />,
      },
    ],
  },
]);

export default router;
