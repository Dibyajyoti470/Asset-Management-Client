import { createContext, useState } from "react";

export const GlobalContext = createContext();

const Context = ({ children }) => {
  const [user, setUser] = useState(null);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("success");
  const [loginOTP, setLoginOTP] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [token, setToken] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        message,
        setMessage,
        status,
        setStatus,
        loginOTP,
        setLoginOTP,
        showSnackbar,
        setShowSnackbar,
        verified,
        setVerified,
        token,
        setToken,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default Context;
