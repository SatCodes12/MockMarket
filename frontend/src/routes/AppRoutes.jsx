import { Routes, Route } from "react-router-dom";
import OnBoarding from "../pages/OnBoarding";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import TradeLab from "../pages/TradeLab";
import Portfolio from "../pages/Portfolio";
import Profile from "../pages/Profile";
import StockDetails from "../pages/StockDetails";
import OrderHistory from "../pages/OrderHistory";
import ProtectedLayout from "../layouts/ProtectedLayout";
import NotFound from "../pages/NotFound";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<OnBoarding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
                path="/home"
                element={
                    <ProtectedLayout>
                        <Home />
                    </ProtectedLayout>
                }
            />
            <Route
                path="/tradelab"
                element={
                    <ProtectedLayout>
                        <TradeLab />
                    </ProtectedLayout>
                }
            />
            <Route
                path="/portfolio"
                element={
                    <ProtectedLayout>
                        <Portfolio />
                    </ProtectedLayout>
                }
            />
            <Route
                path="/pastorders"
                element={
                    <ProtectedLayout>
                        <OrderHistory />
                    </ProtectedLayout>
                }
            />
            <Route
                path="/profile"
                element={
                    <ProtectedLayout>
                        <Profile />
                    </ProtectedLayout>
                }
            />
            <Route
                path="/stock/:symbol"
                element={
                    <ProtectedLayout>
                        <StockDetails />
                    </ProtectedLayout>
                }
            />

            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default AppRoutes;
