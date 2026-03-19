import React, { useState, useEffect, useRef } from "react";
import { logout } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const firstLetter = user?.name?.charAt(0).toUpperCase();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.data.success) {
        localStorage.removeItem("user");
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white transition-all duration-300 flex flex-col ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <span
            className={`text-xl font-bold transition-opacity duration-300 ${
              sidebarOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            KinBech
          </span>
          <button
            className="text-gray-400 hover:text-white focus:outline-none"
            // onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? "⟨" : "⟩"}
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a
            href="#"
            className="block p-2 rounded hover:bg-gray-700 transition"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="block p-2 rounded hover:bg-gray-700 transition"
          >
            Products
          </a>
          <a
            href="#"
            className="block p-2 rounded hover:bg-gray-700 transition"
          >
            Orders
          </a>
          <a
            href="#"
            className="block p-2 rounded hover:bg-gray-700 transition"
          >
            Users
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col transition-all duration-300">
        {/* Top Navbar */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              className="text-gray-500 lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>
            <h2 className="text-lg font-semibold">Dashboard</h2>
          </div>

          {/* Right section */}
          <div
            className="flex items-center space-x-4 relative"
            ref={dropdownRef}
          >
            {/* Notifications */}
            <button className="relative">
              🔔
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                3
              </span>
            </button>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {firstLetter}
                </div>
                <span className="hidden sm:block">{user.name}</span>
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                  >
                    Logout
                  </button>
                  {/* You can add more items like Profile here */}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto max-w-7xl mx-auto w-full transition-all duration-300">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-50 text-gray-600 py-4 text-center text-sm border-t border-gray-200">
          &copy; {new Date().getFullYear()} KinBech. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Layout;
