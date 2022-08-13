import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../contexts/Context";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Paper, TextField } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../api/axios";
import * as yup from "yup";

const schema = yup.object({
  usernameEmail: yup.string().required("*This field is required"),
  password: yup.string().required("*This field is required"),
});

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      usernameEmail: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser, setMessage, setStatus, setLoginOTP, setShowSnackbar } =
    useContext(GlobalContext);

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const loginUser = async (data) => {
    setLoading(true);
    const USER_LOGIN_URL = "/auth/login";
    try {
      const userData = {
        usernameEmail: data.usernameEmail,
        password: data.password,
      };
      const response = await axios.post(
        USER_LOGIN_URL,
        JSON.stringify(userData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      localStorage.setItem("token", JSON.stringify(response?.data?.token));
      localStorage.setItem("user", JSON.stringify(response?.data?.user));
      setShowSnackbar(true);
      setMessage("OTP has been sent successfully.");
      setStatus("success");
      setUser(response.data.user);
      setLoginOTP(response.data.otp);
      navigate("/verify-otp");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setShowSnackbar(true);
      setMessage(error.response.data.msg);
      setStatus("error");
      setLoading(false);
    }
  };

  return (
    <Paper
      className="flex flex-col gap-8"
      sx={{ padding: "2rem", boxShadow: "0 0.2rem 1rem 0.2rem #ebebeb" }}
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-primary text-3xl font-medium">Welcome</h1>
        <span className="text-sm">
          Log in to get the moment updates on the things
        </span>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(loginUser)}>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Username or Email</label>
          <Controller
            name="usernameEmail"
            control={control}
            render={({ field }) => (
              <TextField
                placeholder="Username or Email"
                {...field}
                size="small"
              />
            )}
          />
          <span className="text-error text-sm">
            {errors.usernameEmail?.message}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Password</label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <OutlinedInput
                {...field}
                placeholder="Password"
                size="small"
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
          />
          <span className="text-error text-sm">{errors.password?.message}</span>
        </div>
        <div className="flex flex-row justify-between items-center">
          <FormControlLabel
            control={<Checkbox size="small" />}
            label="Remember Me"
          />
          <Link
            className="text-primary text-sm font-medium hover:underline"
            to="/forgot-password"
          >
            Forgot Password
          </Link>
        </div>
        <LoadingButton
          type="submit"
          loading={loading}
          variant="contained"
          size="large"
          sx={{ textTransform: "uppercase" }}
          fullWidth
        >
          Log In
        </LoadingButton>
      </form>
      <div className="flex justify-center items-center gap-2">
        <span className="text-sm">Don’t have an account yet? </span>
        <Link
          to="signup"
          className="text-primary text-sm font-medium hover:underline"
        >
          Sign Up
        </Link>
      </div>
    </Paper>
  );
};

export default Login;
