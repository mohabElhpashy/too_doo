import { Route, Switch, Redirect } from "react-router-dom";
import React from "react";
import Tags from "./Tags";
import AddTagsForm from "./Forms/TagForm/AddForm";
import AddDetailesForm from "./Forms/DetailesForm/AddForm";
import EditDetailesForm from "./Forms/DetailesForm/EditFrom";
import EditTagsForm from "./Forms/TagForm/EditFrom";
import Detailes from "./Detailes";
import IncreaseProfit from "./IncreaseProfit";
import IncreaseProfitAddForm from "./Forms/IncreaseProfitForm/AddForm";
import IncreaseProfitEditFrom from "./Forms/IncreaseProfitForm/EditFrom";
import DetaliesType from "./DetaliesType";
import DetailsTypesAddForm from "./Forms/DetailesTypesForm/AddForm";
import DetailsTypesEditFrom from "./Forms/DetailesTypesForm/EditFrom";
import ReadOrder from "./Forms/ReadOrder";
export default function index({ match }) {
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/generic/tags`} />
      <Route path={`${match.url}/tags`} component={Tags} />
      <Route path={`${match.url}/addTagsForm`} component={AddTagsForm} />
      <Route path={`${match.url}/editTagsForm`} component={EditTagsForm} />
      <Route path={`${match.url}/detalies`} component={Detailes} />
      <Route path={`${match.url}/increaseProfit`} component={IncreaseProfit} />
      <Route
        path={`${match.url}/editIncreaseForm`}
        component={IncreaseProfitEditFrom}
      />
      <Route path={`${match.url}/readOrder`} component={ReadOrder} />

      <Route path={`${match.url}/detaliesType`} component={DetaliesType} />
      <Route
        path={`${match.url}/increaseProfitAddForm`}
        component={IncreaseProfitAddForm}
      />
      <Route
        path={`${match.url}/detaliesTypeAddForm`}
        component={DetailsTypesAddForm}
      />
      <Route
        path={`${match.url}/detaliesTypeEditForm`}
        component={DetailsTypesEditFrom}
      />
      <Route
        path={`${match.url}/editDetialsForm`}
        component={EditDetailesForm}
      />
      <Route
        path={`${match.url}/addDetailesForm`}
        component={AddDetailesForm}
      />
    </Switch>
  );
}
