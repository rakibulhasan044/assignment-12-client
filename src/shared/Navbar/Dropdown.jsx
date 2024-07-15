import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import PropTypes from 'prop-types';

const Dropdown = ({ user, logOut }) => {
  const handleLogOut = async () => {
    console.log("logout");
    logOut().then(
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Logged Out",
        showConfirmButton: false,
        timer: 1500,
      })
    );
  };
  return (
    <div className="relative w-52 text-right">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-full bg-gray-800 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-700">
          <div className="avatar">
            <div className="w-14 rounded-full">
              <img src={user?.photoURL} />
            </div>
          </div>
        </MenuButton>

        <MenuItems className="absolute right-0 w-52 mt-2 origin-top-right rounded-xl border border-white/5 bg-black/80 p-1 text-sm text-white shadow-lg focus:outline-none z-50">
          <MenuItem>
            {({ active }) => (
              <button
                disabled
                className={`group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 ${
                  active ? "bg-white/10" : ""
                }`}
              >
                {user?.displayName}
              </button>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <Link to='/dashboard'
                className={`group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 ${
                  active ? "bg-white/10" : ""
                }`}
              >
                {/* <Square2StackIcon className="h-4 w-4 fill-white/30" /> */}
                Dashboard
              </Link>
            )}
          </MenuItem>
          <div className="my-1 h-px bg-white/5" />
          <MenuItem>
            {({ active }) => (
              <button
                onClick={handleLogOut}
                className={`group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 ${
                  active ? "bg-white/10" : ""
                }`}
              >
                {/* <ArchiveBoxXMarkIcon className="h-4 w-4 fill-white/30" /> */}
                LogOut
              </button>
            )}
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
};

Dropdown.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func
}

export default Dropdown;
