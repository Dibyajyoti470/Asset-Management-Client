import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { GlobalContext } from "../contexts/Context";
import { Paper, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import CenteredLayout from "../layouts/CenteredLayout";
import * as yup from "yup";

const schema = yup.object({
  code: yup
    .string()
    .required("*This field is required")
    .min(6, "*Must be 6-digit code")
    .max(6, "*Must be 6-digit code"),
});

const VerifyOTP = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: "",
    },
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const { setMessage, setStatus, loginOTP, setLoginOTP, setShowSnackbar } =
    useContext(GlobalContext);

  const navigate = useNavigate();

  const verifyOTP = (data) => {
    setLoading(true);
    if (data.code.trim() === loginOTP) {
      localStorage.setItem("verified", "true");
      setShowSnackbar(true);
      setStatus("success");
      setMessage("You have been logged in successfully.");
      navigate("/dashboard");
      setLoading(false);
      setLoginOTP("");
    } else {
      setShowSnackbar(true);
      setStatus("error");
      setMessage("Invalid OTP.");
      setLoading(false);
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
          <h1 className="text-xl font-bold">
            We have sent a code to your email
          </h1>
          <span className="text-sm">
            Enter the 6-digit verification code sent to x*****ad@techv.com
          </span>
        </div>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(verifyOTP)}
        >
          <div className="flex flex-col gap-2">
            <Controller
              name="code"
              control={control}
              render={({ field }) => (
                <TextField {...field} size="small" label="6 Digit Code" />
              )}
            />
            <span className="text-error text-sm">{errors.code?.message}</span>
          </div>
          <Button variant="text" size="small" sx={{ width: "max-content" }}>
            Resend Code
          </Button>
          {/* <Button
            type="submit"
            component="button"
            variant="contained"
            size="large"
            fullWidth
          >
            Submit
          </Button> */}
          <LoadingButton
            type="submit"
            loading={loading}
            variant="contained"
            size="large"
            sx={{ textTransform: "uppercase" }}
            fullWidth
          >
            Submit
          </LoadingButton>
        </form>
      </Paper>
    </CenteredLayout>
  );
};

export default VerifyOTP;
