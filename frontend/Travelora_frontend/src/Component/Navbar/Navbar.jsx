
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/authProvider";
import logo from '../../assets/icon/travel-bag.png';

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [isRoleFetched, setIsRoleFetched] = useState(false);


    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/users/role?email=${user.email}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log("User Role:", data.role);
                    setUserRole(data.role);
                    setIsRoleFetched(true);
                })
                .catch((error) => {
                    console.error("Error fetching user role:", error);
                    setIsRoleFetched(true);
                });
        }
    }, [user]);


    useEffect(() => {
        localStorage.removeItem('dashboardReloaded');
    }, []);


    const handleLogout = async () => {
        try {
            await signOutUser();
            console.log("User logged out successfully");
            navigate("/");
        } catch (error) {
            console.error("Logout error:", error.message);
        }
    };


    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);


    const links = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `px-4 py-2 rounded ${isActive ? " bg-[#1E90FF] text-white" : "bg-transparent text-black"}`
                    }
                >
                    Home
                </NavLink>
            </li>
            <li className="mx-1">
                <NavLink
                    to="/community"
                    className={({ isActive }) =>
                        `px-4 py-2 rounded ${isActive ? " bg-[#52C960] text-white" : "bg-transparent text-black"}`
                    }
                >
                    Community
                </NavLink>
            </li>
            <li className="mx-1">
                <NavLink
                    to="/aboutus"
                    className={({ isActive }) =>
                        `px-4 py-2 rounded ${isActive ? " bg-[#52C960] text-white" : "bg-transparent text-black"}`
                    }
                >
                    About Us
                </NavLink>
            </li>
            {user && user.displayName && (
                <>
                    <li className="mx-1">
                        <NavLink
                            to="/alltirpspages"
                            className={({ isActive }) =>
                                `px-4 py-2 rounded ${isActive ? " bg-[#52C960] text-white" : "bg-transparent text-black"}`
                            }
                        >
                            All Trips
                        </NavLink>
                    </li>
                    <li className="mx-1">
                        <NavLink
                            to="/alltourguides"
                            className={({ isActive }) =>
                                `px-4 py-2 rounded ${isActive ? " bg-[#52C960] text-white" : "bg-transparent text-black"}`
                            }
                        >
                            Our Tour Guides
                        </NavLink>
                    </li>
                </>
            )}
        </>
    );

    const dashboardLink = () => {
        switch (userRole) {
            case "Tour guide":
                return "/dashboard/tourguide";
            case "Admin":
                return "/dashboard/admin";
            case "Tourist":
                return "/dashboard/tourist";
            default:
                return "/dashboard/tourist";
        }
    };
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };



    return (
        <div className=" sticky top-0 z-50">
            {user && user.displayName && (
                <div className="bg-[#87CEEB]/90 text-center py-2">
                    <span className="text-sm font-medium text-[#333533]">
                        Welcome, {user.displayName}!
                    </span>
                </div>
            )}
            <div className="navbar bg-[#87CEEB]">


                <div className="navbar-start">
                    <div className="dropdown">
                        <button tabIndex={0} className="btn btn-ghost lg:hidden text-[#3F0113]">
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
                        </button>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow"
                            style={{ backgroundColor: "#FEFAE0", color: "#333533" }}
                        >
                            {links}
                        </ul>
                    </div>

                    <NavLink
                        to="/"
                        className="btn btn-ghost normal-case md:text-xl font-bold text-[#1E90FF]"
                    >
                        <img src={logo} alt="" className="w-6 h-6 mr-2" /> Travelora
                    </NavLink>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">{links}</ul>
                    <button onClick={toggleTheme} className="btn btn-outline px-3 py-1">
                        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
                    </button>
                </div>
                <div className="navbar-end gap-4 flex items-center">
                    {user && user.photoURL && (
                        <div className="relative">
                            <img
                                src={user.photoURL}
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full cursor-pointer"
                                onClick={toggleDropdown}
                            />
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10">
                                    <div className="px-4 py-2 text-sm text-gray-700">
                                        <p className="font-bold">{user.displayName}</p>
                                        <p>{user.email}</p>
                                    </div>
                                    <hr />
                                    <NavLink
                                        to={dashboardLink()}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={(e) => {
                                            if (userRole === undefined) {
                                                e.preventDefault();
                                                window.location.reload();
                                            }
                                        }}
                                    >
                                        Dashboard
                                    </NavLink>

                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                    {!user && (
                        <div className="flex gap-4">
                            <NavLink
                                to="/register"
                                className="btn btn-outline border-[#52C960] text-[#52C960]"
                            >
                                Sign Up
                            </NavLink>
                            <NavLink
                                to="/login"
                                className="btn btn-outline border-[#52C960] text-[#52C960]"
                            >
                                Log In
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
