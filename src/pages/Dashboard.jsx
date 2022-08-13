import React from "react";
import Sidebar from "../components/dashboard/Sidebar";
import TopNav from "../components/dashboard/TopNav";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="grid grid-rows-[1fr_8fr] grid-cols-[1fr_6fr] min-h-screen">
      <Sidebar />
      <TopNav />
      <Outlet />
    </div>
  );
};

export default Dashboard;
