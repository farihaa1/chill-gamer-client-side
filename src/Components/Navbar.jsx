import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const links = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/all-review">All Reviews</Link>
      </li>
      <li>
        <Link to="/add-review">Add Review</Link>
      </li>
      <li>
        <Link to="/wish-list">Game WatchList</Link>
      </li>
    </>
  );

  const rightLinks = (
    <>
      <div className="space-x-2">
        <Link to="/login">
          <button className="bg-primary  text-base md:text-lg text-white px-5 py-2 rounded-xl">Login</button>
        </Link>
        <Link to="/register">
          <button className="bg-primary  text-base md:text-lg text-white px-5 py-2 rounded-xl">Register</button>
        </Link>
      </div>
    </>
  );

  return (
    <div className="navbar bg-base-100 w-full">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-64 py-12 p-2 shadow space-y-2"
          >
            {links}
          </ul>
        </div>
        <Link to="/" className="text-xl lg:text-2xl font-bold font-poppins">
          Chill Gamer
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">{rightLinks}</div>
    </div>
  );
};

export default Navbar;
