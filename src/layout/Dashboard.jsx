import { Link, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex gap-3 md:gap-8 lg:gap-12 max-w-screen-2xl mx-auto md:px-8 lg:px-16 xl:px-24">
      <aside className="flex flex-col w-[110px] md:w-1/5 min-h-screen px-1 md:px-4 py-8 bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700 relative">
        <div className="flex flex-col items-center mt-6 -mx-2">
          <img
            className="object-cover size-20 md:mx-2 rounded-full"
            src={user?.photoURL}
            alt="avatar"
          />
          <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200">
            {user?.displayName}
          </h4>
        </div>

        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav>
            <Link
              to="/dashboard"
              className={`flex items-center py-2 ${
                isActive("/dashboard")
                  ? "text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
                  : "text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              }`}
            >
              <span className="mx-2 md:mx-4 font-medium">Dashboard</span>
            </Link>

            <Link
              to="/dashboard/requested-meals"
              className={`flex items-center py-2 mt-5 ${
                isActive("/dashboard/requested-meals")
                  ? "text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
                  : "text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              }`}
            >
              <span className="mx-2 md:mx-4 font-medium">Requested Meals</span>
            </Link>

            <Link
              to="/dashboard/profile"
              className={`flex items-center py-2 mt-5 ${
                isActive("/dashboard/tickets")
                  ? "text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
                  : "text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              }`}
            >
              <span className="mx-2 md:mx-4 font-medium">Profile</span>
            </Link>

            <Link
              to="/dashboard/settings"
              className={`flex items-center py-2 mt-5 ${
                isActive("/dashboard/settings")
                  ? "text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
                  : "text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              }`}
            >
              <span className="mx-2 md:mx-4 font-medium">Settings</span>
            </Link>
          </nav>
        </div>
        <Link
              to="/"
              className={`flex items-center py-2 mt-5 ${
                isActive("/dashboard/settings")
                  ? "text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
                  : "text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              }`}
            >
              <span className="mx-2 md:mx-4 font-medium">Home</span>
            </Link>
      </aside>
      <Outlet />
    </div>
  );
};

export default Dashboard;
