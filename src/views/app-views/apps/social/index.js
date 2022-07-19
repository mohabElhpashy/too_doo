import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Followers from "./Followers";
import Reviews from "./Reviews";
import Recommended from "./Recommended";
import AddRecommendedForm from "./Forms/AddRecommendedForm";
const index = ({ match }) => {
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/reviews`} />
      <Route path={`${match.url}/reviews`} component={Reviews} />
      <Route path={`${match.url}/recommended`} component={Recommended} />
      <Route path={`${match.url}/followers`} component={Followers} />
      <Route
        path={`${match.url}/addRecommendedForm`}
        component={AddRecommendedForm}
      />
    </Switch>
  );
};

export default index;
