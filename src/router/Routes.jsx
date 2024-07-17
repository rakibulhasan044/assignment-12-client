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
import UpcomingMeals from "../pages/UpcomingMeals/UpcomingMeals";
import AdminRoutes from "./AdminRoutes";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
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
         
            <MealDetails />
          
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
      {
        path: "upcoming-meals",
        element: <UpcomingMeals />,
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
        element: (
          <PrivateRoute>
            <RequestedMeals />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
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
        element: (
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "add-meal",
        element: (
          <AdminRoutes>
            <PrivateRoute>
              <Addmeal />
            </PrivateRoute>
          </AdminRoutes>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoutes>
            <PrivateRoute>
              <ManageUsers />
            </PrivateRoute>
          </AdminRoutes>
        ),
      },
      {
        path: "all-meals",
        element: (
          <AdminRoutes>
            <PrivateRoute>
              <AllMeals />
            </PrivateRoute>
          </AdminRoutes>
        ),
      },
      {
        path: "all-reviews",
        element: (
          <AdminRoutes>
            <PrivateRoute>
              <Allreviews />
            </PrivateRoute>
          </AdminRoutes>
        ),
      },
      {
        path: "serve-meals",
        element: (
          <AdminRoutes>
            <PrivateRoute>
              <ServeMeals />
            </PrivateRoute>
          </AdminRoutes>
        ),
      },
      {
        path: "manage-upcoming-meals",
        element: (
          <AdminRoutes>
            <PrivateRoute>
              <UpcomingMealsManage />
            </PrivateRoute>
          </AdminRoutes>
        ),
      },
      {
        path: "admin-profile",
        element: (
          <AdminRoutes>
            <PrivateRoute>
              <AdminProfile />
            </PrivateRoute>
          </AdminRoutes>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <PrivateRoute>
            <MyReviews />
          </PrivateRoute>
        ),
      },
      {
        path: "update-meal/:id",
        element: (
          <AdminRoutes>
            <PrivateRoute>
              <UpdatePage />
            </PrivateRoute>
          </AdminRoutes>
        ),
      },
    ],
  },
]);

export default router;
