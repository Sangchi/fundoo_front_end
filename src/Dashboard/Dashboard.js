import React, { useState } from "react";
import Header from "../layout/Header";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded); 
  };

  return (
    <>
      <Header toggleSidebar={toggleSidebar} /> 
      <Sidebar isSidebarExpanded={isSidebarExpanded} /> 
    </>
  );
};

export default Dashboard;
