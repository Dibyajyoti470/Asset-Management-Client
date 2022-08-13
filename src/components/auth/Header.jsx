import React from "react";
import Button from "@mui/material/Button";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Header = ({ showAuthMenu }) => {
  const navigate = useNavigate();
  return (
    <nav className="container flex justify-between items-center px-40 py-10">
      <img className="w-28" src={logo} alt="techvariable-logo" />
      {showAuthMenu && (
        <div className="flex gap-4">
          <Button
            size="small"
            sx={{ textTransform: "uppercase" }}
            onClick={() => navigate("/")}
          >
            Log In
          </Button>
          <Button
            size="small"
            variant="contained"
            sx={{ textTransform: "uppercase" }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Header;
