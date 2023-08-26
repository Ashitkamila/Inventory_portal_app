import React from "react";
import Marquee from "react-fast-marquee";

const Dashboard = () => {
  return (
    <div className={`main-content main-dashboard`}>
      <div className="mt-5">
        <Marquee speed="100">
          <h3> Work in Progress of Dashboard!</h3>
        </Marquee>
      </div>
    </div>
  );
};

export default Dashboard;
