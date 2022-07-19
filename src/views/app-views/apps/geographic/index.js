import { Route, Switch, Redirect } from "react-router-dom";
import React from "react";
import Cities from "./Cities";
import Countries from "./Countries";
import AddCountries from "./Forms/AddForms/AddCountries";
import AddCities from "./Forms/AddForms/AddCities";
import EditCities from "./Forms/EditForms/EditCities";
import EditCountry from "./Forms/EditForms/EditCountry";
export default function index({ match }) {
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/geographic/countries`}
      />
      <Route path={`${match.url}/countries`} component={Countries} />
      <Route path={`${match.url}/cities`} component={Cities} />
      <Route path={`${match.url}/addCountry`} component={AddCountries} />
      <Route path={`${match.url}/addCity`} component={AddCities} />
      <Route path={`${match.url}/editCity`} component={EditCities} />
      <Route path={`${match.url}/editCountry`} component={EditCountry} />
    </Switch>
  );
}
