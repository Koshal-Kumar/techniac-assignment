import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file for styling

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const parsedUser = typeof user === "string" ? JSON.parse(user) : (user?user:'');
  const profilePictureBase64 = parsedUser?.data?.profilePicture;

  // Function to detect MIME type
  const detectMimeType = (base64) => {
    const signatures = {
      jpeg: "/9j",
      png: "iVBORw",
      gif: "R0lGOD",
      bmp: "Qk0",
    };

    for (const [format, signature] of Object.entries(signatures)) {
      if (base64.startsWith(signature)) {
        return `image/${format}`;
      }
    }

    return "image/png"; // Default MIME type if none matches
  };

  const profilePictureSrc = profilePictureBase64
    ? `data:${detectMimeType(
        profilePictureBase64
      )};base64,${profilePictureBase64}`
    : ""; // Provide a fallback if the profile picture is not available

  return (
    <div className="nav-container">
      <div className="page-width">
        <nav className="navbar" style={{ padding: "20px 10px" }}>
          <div className="navbar-left">
            <Link to="/" className="navbar-logo">
              <span style={{ fontSize: "20px" }}>Quiz App</span>
            </Link>
          </div>
          <div className="navbar-right">
            <ul className="navbar-links">
              <li style={{ fontSize: "20px" }}>
                <Link to="/">Home</Link>
              </li>
              {!parsedUser.token ? (
                <li style={{ fontSize: "20px" }}>
                  <Link to="/login">Login</Link>
                </li>
              ) : (
                <li style={{ fontSize: "20px" }}>
                   <button
                    onClick={handleLogout}
                    style={{
                      background: "none",
                      border: "none",
                      color: "inherit",
                      font: "inherit",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
            {parsedUser && (
              <div
                className="profile-box d-flex gap-3"
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <div className="navbar-profile">
                  <img
                    src={profilePictureSrc}
                    alt="Profile"
                    className="profile-img"
                  />
                </div>
                <div style={{ fontSize: "20px" }}>
                  {parsedUser.data.Firstname}
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
