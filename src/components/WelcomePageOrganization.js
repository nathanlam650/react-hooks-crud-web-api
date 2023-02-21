import React, {  useEffect } from "react";

const WelcomePageOrganization = () => {

  useEffect(() => {
    retrieveVolunteers();
  }, []);


  return (
    <div className="WelcomePageOrganization">
        <h1>Welcome!!</h1>
    </div>
  );
};

export default WelcomePageOrganization;
