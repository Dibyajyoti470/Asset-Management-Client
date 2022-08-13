import { OutlinedInput } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import { Controller } from "react-hook-form";

const Password = ({ control, showPassword, handleClickShowPassword }) => {
  return (
    <Controller
      name="password"
      control={control}
      render={({ field }) => (
        <OutlinedInput
          {...field}
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment sx={{ paddingRight: "5px" }} position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                // onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? (
                  <VisibilityOutlinedIcon />
                ) : (
                  <VisibilityOffOutlinedIcon />
                )}
              </IconButton>
            </InputAdornment>
          }
        />
      )}
    ></Controller>
  );
};

export default Password;
