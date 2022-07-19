import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Reservations from "./Rservations";

const Project = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.url}/ListofReservations`} component={Reservations} />
     
    </Switch>
  );
};

export default Project;
