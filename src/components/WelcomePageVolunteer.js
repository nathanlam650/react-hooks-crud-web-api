import React, {  useEffect } from "react";

const WelcomePageVolunteer = () => {

  useEffect(() => {
    retrieveVolunteers();
  }, []);


  return (
    <div className="WelcomePageVolunteer">
        <h1>Welcome!!</h1>
    </div>
  );
};

export default WelcomePageVolunteer;
