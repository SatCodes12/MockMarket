import { useEffect, useState } from "react";
import { getProfile } from "../services/profileService";
import { logoutUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getProfile();

        if (!data || !data.username) {
          navigate("/login");
          return;
        }

        setUser(data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError("Failed to load profile");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      setError("Logout failed");
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="profile">
      <h2>Profile Details</h2>
      <p><strong>Full Name:</strong> {user.name}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Date of Birth:</strong> {user.dob? user.dob.split("T")[0] : "N/A"}</p>

      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;