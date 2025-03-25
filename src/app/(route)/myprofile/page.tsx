import React, { useState } from "react";

function Myprofile() {
  const [activeTab, setActiveTab] = useState("myprofile");

  const handleTabClick = (tab) => {
    setActiveTab(activeTab);
  };

  return (
    <>
      <div>
        <button onClick={() => handleTabClick("profile")}>MY PROFILE</button>
        <button onClick={() => handleTabClick("profile")}>ORDER HISTORY</button>
      </div>
    </>
  );
}

export default Myprofile;
