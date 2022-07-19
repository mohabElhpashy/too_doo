import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AddDress from "./addForms/AddDress";
import AddDressStore from "./addForms/AddDressStore";
import AddNewRequest from "./addForms/AddNewRequest";
import Dresses from "./Dresses";
import DressStore from "./DressStore";
import ListOrders from "./ListOrders";
import ListRequests from "./ListRequests";
import OfflineReservation from "./OfflineReservation";
import ViewOfflineReservation from "./Froms/OfflineReservation";
import AddOfflineReservation from "./Froms/AddOfflineReservation";
import AddDressForm from "./Froms/AddDressForm";
import ListUnApproved from "./ListUnApproved";
//Edit Pages
import EditDressProduct from "./Froms/EditForms/EditDressProduct";
import EditDressStoreForm from "./Froms/EditForms/EditDressStoreForm";
import EditDressTags from "./Froms/EditForms/EditDressTags";
import DressTags from "./DressTags";
import DressDetails from "./DressDetails";
import AddDressDetailsForm from "./Froms/AddDressDetailsForm";
import EditDressDetailsFrom from "./Froms/EditForms/EditDressDetailsFrom";
import ReadPendingProducts from "./Froms/ReadPendingProducts";
import ReadReservation from "./Froms/ReadReservation";
import ReadOrder from "./Froms/ReadOrder";
import Trash from './Trash'

export default function index({ match }) {
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/dress`} />
      <Route path={`${match.url}/dress`} component={Dresses} />
      <Route path={`${match.url}/dressStore`} component={DressStore} />
      <Route path={`${match.url}/ListRequests`} component={ListRequests} />
      <Route path={`${match.url}/AddDressStore`} component={AddDressStore} />
      <Route path={`${match.url}/trash`} component={Trash} />

      <Route path={`${match.url}/AddNewRequest`} component={AddNewRequest} />
      <Route path={`${match.url}/dressTags`} component={AddNewRequest} />
      <Route path={`${match.url}/ListOrders`} component={ListOrders} />
      <Route path={`${match.url}/offline`} component={OfflineReservation} />
      <Route path={`${match.url}/dressTagss`} component={DressTags} />
      <Route path={`${match.url}/dressDetails`} component={DressDetails} />
      <Route
        path={`${match.url}/readReservation`}
        component={ReadReservation}
      />
      <Route path={`${match.url}/readOrder`} component={ReadOrder} />
      <Route
        path={`${match.url}/readPendingProducts`}
        component={ReadPendingProducts}
      />
      <Route
        path={`${match.url}/viewOffline`}
        component={ViewOfflineReservation}
      />
      <Route
        path={`${match.url}/AddOffline`}
        component={AddOfflineReservation}
      />
      <Route path={`${match.url}/AddDress`} component={AddDressForm} />
      <Route path={`${match.url}/unApproved`} component={ListUnApproved} />
      <Route
        path={`${match.url}/editDressStore`}
        component={EditDressStoreForm}
      />

      <Route path={`${match.url}/editProduct`} component={EditDressProduct} />
      <Route path={`${match.url}/EditDressTags`} component={EditDressTags} />
      <Route
        path={`${match.url}/editDressDetailsFrom`}
        component={EditDressDetailsFrom}
      />
      <Route
        path={`${match.url}/addDressDetailsForm`}
        component={AddDressDetailsForm}
      />
    </Switch>
  );
}
