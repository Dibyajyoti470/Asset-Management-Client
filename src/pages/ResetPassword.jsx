import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { GlobalContext } from "../contexts/Context";
import { yupResolver } from "@hookform/resolvers/yup";
import { Paper } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import CenteredLayout from "../layouts/CenteredLayout";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "../api/axios";
import * as yup from "yup";

const schema = yup.object({
  newPassword: yup
    .string()
    .required("*This field is required")
    .min(6, "*Password must contain at least 6 characters")
    .max(15, "*Password must not exceed 15 characters length"),
  confirmNewPassword: yup
    .string()
    .required("*This field is required")
    .oneOf([yup.ref("newPassword"), null], "*Passwords are not matched"),
});

const ResetPassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setMessage, setStatus, setShowSnackbar } = useContext(GlobalContext);

  const navigate = useNavigate();
  const { userID, resetToken } = useParams();

  const resetPassword = async (data) => {
    setLoading(true);
    console.log(data);
    const RESET_PASSWORD_URL = "/auth/reset-password";
    try {
      const response = await axios.patch(
        RESET_PASSWORD_URL,
        JSON.stringify({ password: data.newPassword }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            userID,
            resetToken,
          },
        }
      );
      console.log(response);
      setLoading(false);
      setShowSnackbar(true);
      setStatus("success");
      setMessage(response.data.msg);
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setShowSnackbar(true);
      setStatus("error");
      setMessage(error.response.data.msg);
    }
  };

  return (
    <CenteredLayout>
      <Paper
        className="flex flex-col gap-8"
        sx={{
          width: "25rem",
          padding: "2rem",
          boxShadow: "0 0.2rem 1rem 0.2rem #ebebeb",
        }}
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">Reset your password</h1>
          <span className="text-sm">
            Create a new password that is at least 6 characters long.
          </span>
        </div>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(resetPassword)}
        >
          <div className="flex flex-col gap-2">
            <label className="font-medium">New Password</label>
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  placeholder="New Password"
                  size="small"
                  type={showPassword ? "text" : "password"}
                />
              )}
            />
            <span className="text-error text-sm">
              {errors.newPassword?.message}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Re-enter Password</label>
            <Controller
              name="confirmNewPassword"
              control={control}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  placeholder="Re-enter Password"
                  size="small"
                  type={showPassword ? "text" : "password"}
                />
              )}
            />
            <span className="text-error text-sm">
              {errors.confirmNewPassword?.message}
            </span>
          </div>
          <LoadingButton
            type="submit"
            loading={loading}
            variant="contained"
            size="large"
            sx={{ textTransform: "uppercase" }}
            fullWidth
          >
            Confirm
          </LoadingButton>
        </form>
      </Paper>
    </CenteredLayout>
  );
};

export default ResetPassword;
