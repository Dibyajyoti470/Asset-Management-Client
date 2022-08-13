import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-20 row-span-2 bg-sidebar p-10">
      <img className="self-center w-28" src={logo} alt="techvariable-logo" />
      <nav>
        <ul>
          <li>
            <Button
              onClick={() => navigate("/dashboard")}
              variant="contained"
              startIcon={<ShoppingBagOutlinedIcon />}
              fullWidth
            >
              Assets
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
