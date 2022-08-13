import { useState, useContext } from "react";
import { GlobalContext } from "../../contexts/Context";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Paper, TextField } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../api/axios";
import * as yup from "yup";

const schema = yup.object({
  username: yup.string().required("*This field is required"),
  email: yup
    .string()
    .required("*This field is required")
    .email("*Invalid email"),
  password: yup
    .string()
    .required("*This field is required")
    .min(6, "*Password must contain at least 6 characters")
    .max(15, "*Password must not exceed 15 characters length"),
  confirmPassword: yup
    .string()
    .required("*This field is required")
    .oneOf([yup.ref("password"), null], "*Passwords are not matched"),
  policyAgreement: yup
    .boolean()
    .oneOf([true], "*You must accept the terms and conditions."),
});

const Signup = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      policyAgreement: false,
    },
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setMessage, setStatus, setShowSnackbar } = useContext(GlobalContext);

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const registerUser = async (data) => {
    setLoading(true);
    const USER_REGISTRATION_URL = "/auth/register";
    try {
      const userData = {
        username: data.username,
        email: data.email,
        password: data.password,
      };
      const response = await axios.post(
        USER_REGISTRATION_URL,
        JSON.stringify(userData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setShowSnackbar(true);
      setMessage(response.data.msg);
      setStatus("success");
      navigate("/");
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
      sx={{
        padding: "2rem",
        marginBottom: "10rem",
        boxShadow: "0 0.2rem 1rem 0.2rem #ebebeb",
      }}
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-primary text-3xl font-medium">Welcome</h1>
        <span className="text-sm">
          Sign up and explore things that were never imagined.
        </span>
      </div>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(registerUser)}
      >
        <div className="flex flex-col gap-2">
          <label className="font-medium">Username</label>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextField placeholder="Username" {...field} size="small" />
            )}
          />
          <span className="text-error text-sm">{errors.username?.message}</span>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Email</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField placeholder="Email" {...field} size="small" />
            )}
          />
          <span className="text-error text-sm">{errors.email?.message}</span>
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
        <div className="flex flex-col gap-2">
          <label className="font-medium">Confirm Password</label>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <OutlinedInput
                {...field}
                placeholder="Confirm Password"
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
          <span className="text-error text-sm">
            {errors.confirmPassword?.message}
          </span>
        </div>
        <div>
          <Controller
            name="policyAgreement"
            control={control}
            render={({ field }) => <Checkbox {...field} size="small" />}
          />
          <label className="font-medium">
            I agree to the terms and conditions
          </label>
        </div>
        <span className="text-error text-sm">
          {errors.policyAgreement?.message}
        </span>
        <LoadingButton
          type="submit"
          loading={loading}
          variant="contained"
          size="large"
          sx={{ textTransform: "uppercase" }}
          fullWidth
        >
          Sign Up
        </LoadingButton>
      </form>
      <div className="flex justify-center items-center gap-2">
        <span className="text-sm">Already Have An Account? </span>
        <Link
          to="/"
          className="text-primary text-sm font-medium hover:underline"
        >
          Log In
        </Link>
      </div>
    </Paper>
  );
};

export default Signup;
