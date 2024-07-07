import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
    const { user } = useAuth();
  return (
    <div className="flex max-w-screen-2xl mx-auto md:px-8 lg:px-16 xl:px-24">
      <aside className="flex flex-col w-1/3 md:w-1/5  min-h-screen px-1 md:px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">

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
            <a
              className="flex items-center py-2 text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-200"
              href="#"
            >

              <span className="mx-2 md:mx-4 font-medium">Dashboard</span>
            </a>

            <a
              className="flex items-center py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              href="#"
            >

              <span className="mx-2 md:mx-4 font-medium">Accounts</span>
            </a>

            <a
              className="flex items-center py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              href="#"
            >
              <span className="mx-2 md:mx-4 font-medium">Tickets</span>
            </a>

            <a
              className="flex items-center py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
              href="#"
            >
              <span className="mx-2 md:mx-4 font-medium">Settings</span>
            </a>
          </nav>
        </div>
      </aside>
      <Outlet />
    </div>
  );
};

export default Dashboard;
