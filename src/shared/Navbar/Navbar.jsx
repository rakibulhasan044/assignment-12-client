import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import useAuth from "../../hooks/useAuth";
import Dropdown from "./Dropdown";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="meals">Meals</NavLink>
      </li>
      <li>
        <NavLink to="upcoming-meals">Upcoming Meals</NavLink>
      </li>

      <li>
        <NavLink to="register">Register</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {links}
          </ul>
        </div>
        <img className="size-24" src={logo} alt="" />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex gap-5">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <Dropdown user={user} logOut={logOut} />
          </>
        ) : (
          <>
            <Link to="login">Join Us</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
