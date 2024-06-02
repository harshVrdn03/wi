import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  const [darkMode, setDarkMode] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };
  const hideMobileMenu = () => {
    setShowMobileMenu(false);
  };
  return (
    <>
      <div
        className={`${
          darkMode ? "dark " : ""
        }min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        {/* Navbar */}
        <nav className="bg-white dark:bg-gray-800 shadow-md w-full fixed">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="hidden sm:block">
                <div className="flex space-x-4">
                  <NavLink to="/" label="Dashboard" />
                  <NavLink to="/dns" label="DNS" />
                  <NavLink to="/security" label="Security" />
                </div>
              </div>
              {/* Mobile Menu */}
              <div className="sm:hidden flex items-center">
                <button
                  onClick={toggleMobileMenu}
                  className="text-gray-500 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:text-gray-900 dark:focus:text-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={
                        showMobileMenu
                          ? "M6 18L18 6M6 6l12 12"
                          : "M4 6h16M4 12h16m-7 6h7"
                      }
                    />
                  </svg>
                </button>
              </div>
              {/* Dark Mode Toggle */}
              <div className="flex items-center">
                <button
                  onClick={toggleDarkMode}
                  className="p-1 rounded-md text-gray-400 dark:text-gray-100 hover:text-gray-800 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">Toggle Dark Mode</span>
                  {!darkMode ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          {/* Mobile Menu Dropdown */}
          {showMobileMenu && (
            <div className="sm:hidden absolute top-16 w-full bg-white dark:bg-gray-800 shadow-md py-2 px-4">
              <NavLink
                onClick={() => hideMobileMenu()}
                to="/"
                label="Dashboard"
              />
              <NavLink onClick={() => hideMobileMenu()} to="/dns" label="DNS" />
              <NavLink
                onClick={() => hideMobileMenu()}
                to="/security"
                label="Security"
              />
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </main>
      </div>
    </>
  );
}

const NavLink = ({ to, label }) => (
  <Link
    to={to}
    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:text-gray-900 dark:focus:text-gray-100 focus:bg-gray-200 dark:focus:bg-gray-700"
    activeClassName="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
  >
    {label}
  </Link>
);
