import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ProductByTag from "./ProductByTag";
const index = ({ match }) => {
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/getProductByTag`}
      />
      <Route path={`${match.url}/getProductByTag`} component={ProductByTag} />
    </Switch>
  );
};

export default index;
