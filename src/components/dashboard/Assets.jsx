import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import { TbListDetails, TbLayoutGrid } from "react-icons/tb";
import { DataGrid } from "@mui/x-data-grid";
import TuneIcon from "@mui/icons-material/Tune";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import axios from "../../api/axios";

const columns = [
  { field: "name", headerName: "Name" },
  { field: "id", headerName: "ID" },
  { field: "date", headerName: "Date" },
  { field: "assignedTo", headerName: "Assigned to" },
  { field: "status", headerName: "Status" },
];

const rows = [
  {
    name: "Macbook Pro 2022",
    id: "MAS233NMAB",
    date: "07-06-2022",
    assignedTo: "Biraj Das",
    status: "Active",
  },
];

const Assets = () => {
  const [assets, setAssets] = useState([]);
  const navigate = useNavigate();

  const getAllAssets = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const GET_ALL_ASSET_URL = "/asset/view-all";
    try {
      const response = await axios.get(GET_ALL_ASSET_URL, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      setAssets(response.data.assets);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllAssets();
  }, []);

  return (
    <main className="p-10">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-medium">All Assets</h2>
        <div className="flex items-center gap-2">
          <IconButton sx={{ color: "#292929" }}>
            <TbLayoutGrid />
          </IconButton>
          <IconButton sx={{ color: "#292929" }}>
            <TbListDetails />
          </IconButton>
          <Button
            variant="outlined"
            sx={{ color: "#292929", fontWeight: "600" }}
            endIcon={<TuneIcon />}
          >
            Filter
          </Button>
          <Button
            variant="contained"
            sx={{ fontWeight: "600" }}
            endIcon={<AddOutlinedIcon />}
            onClick={() => navigate("add-asset")}
          >
            Add Asset
          </Button>
        </div>
      </div>
      <DataGrid
        rows={assets.map((asset) => {
          return {
            name: asset.name,
            id: asset.assetID,
            date: asset.assignedAt.slice(0, 9),
            assignedTo: asset.assignedTo,
            status: asset.status,
          };
        })}
        columns={columns}
        checkboxSelection
      />
    </main>
  );
};

export default Assets;
