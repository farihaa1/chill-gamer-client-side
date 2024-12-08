import React, { useContext, useState } from "react";
import { ImCross } from "react-icons/im";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProviders";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  const closeProfile = () => setIsProfileOpen(false);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout()
      .then(() => {
        console.log("User logged out successfully.");
      })
      .catch((error) => {
        console.error("Logout error:", error.message);
      });
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-orange-500 font-bold" : ""
          }
          onClick={closeMenu}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-review"
          className={({ isActive }) =>
            isActive ? "text-orange-500 font-bold" : ""
          }
          onClick={closeMenu}
        >
          All Reviews
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/add-review"
          className={({ isActive }) =>
            isActive ? "text-orange-500 font-bold" : ""
          }
          onClick={closeMenu}
        >
          Add Review
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/watch-list"
          className={({ isActive }) =>
            isActive ? "text-orange-500 font-bold" : ""
          }
          onClick={closeMenu}
        >
          Game WatchList
        </NavLink>
      </li>
      <NavLink
        to='/my-reviews'
        className={({ isActive }) =>
          isActive ? "text-orange-500 font-bold" : ""
        }
        onClick={closeMenu}
      >
        My Reviews
      </NavLink>
    </>
  );

  const rightLinks = (
    <>
      {user ? (
        <div>
          <div
            onClick={toggleProfile}
            className="rounded-full w-12 h-12 cursor-pointer"
          >
            <img
              className="w-12 h-12 object-cover rounded-full"
              src={
                user?.photoURL ||
                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              }
              alt="Profile"
              title={user.displayName}
            />
          </div>
          {isProfileOpen && (
            <div
              className={`absolute top-36 w-72 py-6 rounded-xl right-2 bg-white px-6 dark:bg-[#1a202c] z-10 shadow-md  transform transition-transform duration-300 ease-in-out ${
                isProfileOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-full opacity-0"
              }`}
            >
              <ul className="menu-vertical p-4 space-y-2 py-6 text-base  w-full ">
                <li
                  onClick={closeProfile}
                  className=" flex justify-end cursor-pointer"
                >
                  <ImCross />
                </li>

                {/* Display user info if available */}
                <li className="py-1 pl-2">{user?.displayName || "No Name"}</li>
                <li className="py-1 pl-2">{user?.email || "No Email"}</li>
                <hr />

                <Link
                  to="/update-profile"
                  className="bg-orange-600 text-white md:text-lg px-5 py-2 rounded-xl"
                >
                  Update Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-orange-600 text-white md:text-lg px-5 py-2 rounded-xl"
                >
                  Log Out
                </button>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="space-x-2">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "bg-orange-500 text-gray-100  md:text-lg px-5 py-2 rounded-xl " : "bg-orange-600  text-white md:text-lg px-5 py-2 rounded-xl"
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? "bg-orange-500 text-gray-100  md:text-lg px-5 py-2 rounded-xl " : "bg-orange-600  text-white md:text-lg px-5 py-2 rounded-xl"
              }
            >
              Register
            </NavLink>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="navbar w-full px-4 sm:px-6 lg:px-8">
      <div className="navbar-start">
        <button
          onClick={toggleMenu}
          className="mr-3 lg:hidden focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
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
        </button>

        <Link to="/" className="text-xl lg:text-2xl font-bold font-poppins">
          Chill <span className="text-orange-500 "> Gamer</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu-horizontal px-1 text-base space-x-4">{links}</ul>
      </div>

      <div className="navbar-end">{rightLinks}</div>

      {isMenuOpen && (
        <div
          className={`absolute top-32 w-72 rounded-xl left-2 bg-white px-6 dark:bg-[#1a202c] z-10 shadow-md lg:hidden  transform transition-transform duration-300 ease-in-out ${
            isMenuOpen
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          }`}
        >
          <ul className="menu-vertical p-4 space-y-2 py-6 text-base  w-full ">
            <li
              onClick={closeMenu}
              className=" flex justify-end cursor-pointer"
            >
              <ImCross />
            </li>
            {links}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
