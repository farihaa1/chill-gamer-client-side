import React, { useContext, useState } from "react";

import { ImCross } from "react-icons/im";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProviders";

const Navbar = () => {

  const {user, logout } = useContext(AuthContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
const handleLogout= ()=>{
  logout()
  .then(() => {
    console.log("User logged out successfully.");
  })
  .catch((error) => {
    console.error("Logout error:", error.message);
  });
}

  

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
          to="/wish-list"
          className={({ isActive }) =>
            isActive ? "text-orange-500 font-bold" : ""
          }
          onClick={closeMenu}
        >
          Game WatchList
        </NavLink>
      </li>
    </>
  );

  const rightLinks = (
    <>
      {
        user ? <div>
       
          <button onClick={handleLogout} className="bg-orange-600 text-white md:text-lg px-5 py-2 rounded-xl">
            Log Out
          </button>
       
        </div> : <div>
        <div className="space-x-2">
        <NavLink to="/login">
          <button className="bg-orange-600 text-white md:text-lg px-5 py-2 rounded-xl">
            Login
          </button>
        </NavLink>
        <NavLink to="/register">
          <button className="bg-orange-600 text-white md:text-lg px-5 py-2 rounded-xl">
            Register
          </button>
        </NavLink>
      </div></div>
      }
    </>
  );

  return (
    <div className="navbar w-full px-4 sm:px-6 lg:px-8">
      {/* Left Section */}
      <div className="navbar-start">
        {/* Mobile Menu Button */}
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
        {/* Brand */}
        <Link to="/" className="text-xl lg:text-2xl font-bold font-poppins">
          Chill Gamer
        </Link>
      </div>

      {/* Center Links for Large Screens */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu-horizontal px-1 text-base space-x-4">{links}</ul>
      </div>

      {/* Right Section */}
      <div className="navbar-end">{rightLinks}</div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`absolute top-32 w-72 rounded-xl left-2 bg-white px-6 dark:bg-[#1a202c] z-10 shadow-md lg:hidden  transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}>
          <ul className="menu-vertical p-4 space-y-2 py-6 text-base  w-full ">
            <li onClick={closeMenu} className=" flex justify-end">
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
