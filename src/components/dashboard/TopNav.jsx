import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/Context";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useEffect } from "react";

const TopNav = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { user, setUser, setVerified, setMessage, setStatus, setShowSnackbar } =
    useContext(GlobalContext);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickSettings = () => {
    navigate("settings");
    handleClose();
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("verified");
    setUser(null);
    setVerified(false);
    setShowSnackbar(true);
    setStatus("success");
    setMessage("You have logged out successfully");
    navigate("/");
    handleClose();
  };

  return (
    <div className="flex justify-between items-center p-10">
      <TextField
        type="text"
        placeholder="Search"
        size="small"
        sx={{ width: "20rem" }}
      />
      <div className="flex items-center gap-2">
        <IconButton>
          <NotificationsNoneOutlinedIcon fontSize="small" />
        </IconButton>
        <IconButton>
          <SmsOutlinedIcon fontSize="small" />
        </IconButton>
        <div>
          <Paper
            id="fade-button"
            component="button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            elevation={6}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              padding: "0.8rem",
              marginLeft: "0.8rem",
            }}
          >
            <div>
              <h6 className="text-sm font-bold">Welcome</h6>
              <p className="text-xs text-left">Admin</p>
            </div>
            <ArrowDropUpIcon />
          </Paper>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={handleClickSettings}>
              <ListItemIcon>
                <SettingsOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText fontSize="small">Settings</ListItemText>
            </MenuItem>
            <MenuItem onClick={logout}>
              <ListItemIcon>
                <LogoutOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default TopNav;
