import { useState, useContext } from "react";
import { GlobalContext } from "../contexts/Context";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Paper, TextField } from "@mui/material";
import CenteredLayout from "../layouts/CenteredLayout";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "../api/axios";
import * as yup from "yup";

const schema = yup.object({
  email: yup
    .string()
    .required("*This field is required")
    .email("*Invalid email"),
});

const ForgotPassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const { setMessage, setStatus, setShowSnackbar } = useContext(GlobalContext);

  const navigate = useNavigate();

  const requestPasswordReset = async (data) => {
    setLoading(true);
    console.log(data);
    const FORGOT_PASSWORD_URL = "/auth/forgot-password";
    try {
      const response = await axios.post(
        FORGOT_PASSWORD_URL,
        JSON.stringify({ email: data.email }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setLoading(false);
      setShowSnackbar(true);
      setStatus("success");
      setMessage("Email verified successfully");
      const { userID, resetToken } = response.data;
      navigate(`/reset-password/${userID}/${resetToken}`);
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
          <h1 className="text-primary text-3xl font-medium">Forgot Password</h1>
          <span className="text-sm">Reset password in two quick steps</span>
        </div>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(requestPasswordReset)}
        >
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
          {/* <Button
          type="submit"
          component="button"
          variant="contained"
          size="large"
          fullWidth
        >
          Reset Password
        </Button> */}
          <LoadingButton
            type="submit"
            loading={loading}
            variant="contained"
            size="large"
            sx={{ textTransform: "uppercase" }}
            fullWidth
          >
            Reset Password
          </LoadingButton>
          <Button variant="text" onClick={() => navigate(-1)}>
            Back
          </Button>
        </form>
      </Paper>
    </CenteredLayout>
  );
};

export default ForgotPassword;
