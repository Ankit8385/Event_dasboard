import { NavLink } from "react-router-dom";
import { Calendar, Users, CheckSquare, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-white shadow-lg h-full flex flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <Calendar className="w-8 h-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-800">EventDash</h1>
        </div>
      </div>
      <nav className="flex-1">
        <NavLink
          to="/events"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 ${
              isActive ? "bg-indigo-50 text-indigo-600" : ""
            }`
          }
        >
          <Calendar className="w-5 h-5 mr-3" />
          Events
        </NavLink>
        <NavLink
          to="/calendar"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 ${
              isActive ? "bg-indigo-50 text-indigo-600" : ""
            }`
          }
        >
          <Calendar className="w-5 h-5 mr-3" />
          Calendar
        </NavLink>
        <NavLink
          to="/attendees"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 ${
              isActive ? "bg-indigo-50 text-indigo-600" : ""
            }`
          }
        >
          <Users className="w-5 h-5 mr-3" />
          Attendees
        </NavLink>
        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 ${
              isActive ? "bg-indigo-50 text-indigo-600" : ""
            }`
          }
        >
          <CheckSquare className="w-5 h-5 mr-3" />
          Tasks
        </NavLink>
      </nav>
      <div className="p-4 border-t">
        <button
          onClick={() => {
            navigate("/");
            logout();
          }}
          className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
