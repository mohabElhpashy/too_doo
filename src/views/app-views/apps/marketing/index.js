import { Route, Switch, Redirect } from "react-router-dom";
import React from "react";
import Offers from "./Offers";
import Packages from "./Packages";
import FlashDeals from "./FlashDeals";
import FlashDealAddForm from "./forms/FlashDeal/AddForm";
import FlashDealEditForm from "./forms/FlashDeal/EditForm";
import AddPackageForm from "./forms/Package/AddPackageForm";
import EditPackageForm from "./forms/Package/EditPackageForm";

// offers
import AddOffersForm from "./forms/Offers/AddOffersForm";
import EditOffersForm from "./forms/Offers/EditOffersForm";

export default function index({ match }) {
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/packagess`} />
      <Route path={`${match.url}/packagess`} component={Packages} />
      <Route path={`${match.url}/offers`} component={Offers} />
      <Route path={`${match.url}/addPackageForm`} component={AddPackageForm} />
      <Route path={`${match.url}/flashdeals`} component={FlashDeals} />
      <Route path={`${match.url}/AddFlashDeal`} component={FlashDealAddForm} />
      <Route path={`${match.url}/veEditForm`} component={FlashDealEditForm} />
      <Route path={`${match.url}/editPackage`} component={EditPackageForm} />
      <Route path={`${match.url}/addOffer`} component={AddOffersForm} />
      <Route path={`${match.url}/editOffer`} component={EditOffersForm} />
    </Switch>
  );
}
