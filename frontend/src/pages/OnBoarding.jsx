import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import "./OnBoarding.css"

function OnBoarding() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/home");
        }
    }, [isAuthenticated])

    return (
        <div className="onboarding">
            <h1>Welcome to MockMarket</h1>
            <p>Simulate trades. Track holdings. Learn markets.</p>
            <div className="button-group">
                <Link to="/login" className="btn">Login</Link>
                <Link to="/register" className="btn">Register</Link>
            </div>
        </div>
    )
}

export default OnBoarding;