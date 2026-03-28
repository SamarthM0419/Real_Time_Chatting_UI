import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/auth/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const photo = user?.profilePic || user?.photoUrl;

  const navLinks = [
    {
      to: "/friends",
      label: "Connections",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
    },
    {
      to: "/chat",
      label: "Chat",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="navbar bg-base-200 shadow-md px-6">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl font-bold">
          💬 <span className="text-primary">Ping</span>Talk
        </Link>
      </div>

      {user && (
        <div className="flex items-center gap-1 mr-3">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`btn btn-ghost btn-sm gap-1.5 text-sm ${
                location.pathname.startsWith(link.to) ? "btn-active text-primary" : ""
              }`}
            >
              {link.icon}
              <span className="hidden sm:inline">{link.label}</span>
            </Link>
          ))}
        </div>
      )}

      {photo && (
        <div className="flex gap-2">
          <div className="dropdown dropdown-end mx-2 flex">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="user photo" src={photo} />
              </div>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><Link to="/friends">Connections</Link></li>
              <li><Link to="/chat">Chat</Link></li>
              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
