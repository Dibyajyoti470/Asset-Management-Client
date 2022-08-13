import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../contexts/Context";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "../../api/axios";
import * as yup from "yup";

const schema = yup.object({
  category: yup.string().required("*This field is required"),
  assetID: yup.string().required("*This field is required"),
  name: yup.string().required("*This field is required"),
  assignedAt: yup.date().required("*This field is required"),
  assignedTo: yup.string().required("*This field is required"),
  status: yup.string().required("*This field is required"),
  notes: yup.string(),
});

const AddAsset = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: "",
      assetID: "",
      name: "",
      assignedAt: "",
      assignedTo: "",
      status: "",
      notes: "",
    },
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const { setMessage, setStatus, setShowSnackbar } = useContext(GlobalContext);

  const navigate = useNavigate();

  const createAsset = async (data) => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem("token"));
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(data);
    const ADD_ASSET_URL = "/asset/create";
    try {
      const assetData = {
        category: data.category,
        assetID: data.assetID,
        name: data.name,
        assignedTo: data.assignedTo,
        assignedAt: data.assignedAt,
        status: data.status,
        notes: data.notes,
      };
      const response = await axios.post(
        ADD_ASSET_URL,
        JSON.stringify(assetData),
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          params: {
            userID: user.id,
          },
        }
      );
      console.log(response);
      setShowSnackbar(true);
      setMessage(response.data.msg);
      setStatus("success");
      navigate("/dashboard");
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
    <main
      className="flex flex-col gap-8 p-10"
      sx={{
        padding: "2rem",
        marginBottom: "10rem",
        boxShadow: "0 0.2rem 1rem 0.2rem #ebebeb",
      }}
    >
      <form
        className="grid grid-cols-2 gap-4 max-w-fit"
        onSubmit={handleSubmit(createAsset)}
      >
        <div className="flex flex-col gap-2">
          <label className="font-medium">Category of Asset</label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField placeholder="Category" {...field} size="small" />
            )}
          />
          <span className="text-error text-sm">{errors.category?.message}</span>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Asset ID</label>
          <Controller
            name="assetID"
            control={control}
            render={({ field }) => (
              <TextField placeholder="Asset ID" {...field} size="small" />
            )}
          />
          <span className="text-error text-sm">{errors.assetID?.message}</span>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Name of Asset</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField placeholder="Name of Asset" {...field} size="small" />
            )}
          />
          <span className="text-error text-sm">{errors.name?.message}</span>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Date of Assignment</label>
          <Controller
            name="assignedAt"
            control={control}
            render={({ field }) => (
              <TextField placeholder="DD-MM-YYYY" {...field} size="small" />
            )}
          />
          <span className="text-error text-sm">
            {errors.assignedAt?.message}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Asset Status</label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <TextField placeholder="Asset Status" {...field} size="small" />
            )}
          />
          <span className="text-error text-sm">{errors.status?.message}</span>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Asset Assigned to</label>
          <Controller
            name="assignedTo"
            control={control}
            render={({ field }) => (
              <TextField
                placeholder="Asset Assigned to"
                {...field}
                size="small"
              />
            )}
          />
          <span className="text-error text-sm">
            {errors.assignedTo?.message}
          </span>
        </div>
        <div className="col-span-2 flex flex-col gap-2">
          <label className="font-medium">Notes</label>
          <Controller
            name="notes"
            control={control}
            render={({ field }) => (
              <TextField
                placeholder="Personal note..."
                {...field}
                size="small"
                multiline
                minRows={5}
              />
            )}
          />
          <span className="text-error text-sm">{errors.notes?.message}</span>
        </div>
        <div className="col-span-2">
          <LoadingButton
            type="submit"
            loading={loading}
            variant="contained"
            size="large"
            sx={{ textTransform: "uppercase" }}
            fullWidth
          >
            Add Asset
          </LoadingButton>
        </div>
      </form>
    </main>
  );
};

export default AddAsset;
