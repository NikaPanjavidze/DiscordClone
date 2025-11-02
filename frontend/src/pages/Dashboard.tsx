import React from "react";
import FriendsSideBar from "../Components/Sidebar/Friends/FriendsSideBar";
import { ChatArea } from "../Components/Dashboard/Chat/ChatArea";

const Dashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* <ServersSideBar /> */}
      <FriendsSideBar />
      <ChatArea/>
      {/* <AppBar /> */} 
    </div>
  );
};

export default Dashboard;
