import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { GlobalContext } from "./contexts/Context";
import Auth from "./pages/Auth";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Assets from "./components/dashboard/Assets";
import AddAsset from "./components/dashboard/AddAsset";
import EditAsset from "./components/dashboard/EditAsset";
import Settings from "./components/dashboard/Settings";
import NotificationBar from "./components/utils/NotificationBar";

function App() {
  const { user, setUser, setVerified, setToken } = useContext(GlobalContext);
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const verified = JSON.parse(localStorage.getItem("verified"));
  const storedToken = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (!user) {
      setUser(loggedInUser || null);
      setVerified(verified || false);
      setToken(storedToken || "");
    }
  }, [user]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Auth />}>
          <Route index element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="verify-otp" element={<VerifyOTP />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route
          path="reset-password/:userID/:resetToken"
          element={<ResetPassword />}
        />
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<Assets />} />
          <Route path="add-asset" element={<AddAsset />} />
          <Route path="edit-asset" element={<EditAsset />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      <NotificationBar />
    </div>
  );
}

export default App;
