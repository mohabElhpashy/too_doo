import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ListRequests from "./ListRequests";
import ListOrders from "./ListOrders";
import GenericOptions from "./GenericOptions";
import BeautyCenter from "./BeautyCenter";
import BeautyCenterServices from "./BeautyCenterServices";
import BeautyCenterTag from "./BeautyCenterTag";
import BeautyCenterServiceOptions from "./BeautyCenterServiceOptions";
import BeautyCenterServiceReservationOptions from "./BeautyCenterServiceReservationOptions";
import AddNewRequest from "./AddFroms/AddNewRequest";
import AddGenericOption from "./AddFroms/AddGenericOption";
import AddBeautyCenterTag from "./AddFroms/AddBeautyCenterTag";
import AddBeautyCenterServices from "./AddFroms/AddBeautyCenterServices";
import AddBeautyCenterServiceReservationOptions from "./AddFroms/AddBeautyCenterServiceReservationOptions";
import AddBeautyCenterServiceOptions from "./AddFroms/AddBeautyCenterServiceOptions";
import AddBeautyCenter from "./AddFroms/AddBeautyCenter";
import ListUnApproved from "./ListUnApproved";
import ReadReservation from "./Forms/ReadReservation";
import BeautyCenterDetails from "./BeautyCenterDetails";

//Edit Forms

import EditOfflineReservation from "./Forms/OfflineReservation";
import EditBeautyCenterForm from "./Forms/EditForms/EditBeautyCenterForm";
import EditBeautyCenterService from "./Forms/EditForms/EditBeautyCenterService";
import EditBeautyCenterTagss from "./Forms/EditForms/EditBeautyCenterTagss";

import AddBeautyCenterForm from "./Forms/AddBeautyCenterForm";
import OfflineReservation from "./OfflineReservation";
import AddOfflineReservation from "./Forms/AddOfflineReservation";
import AddBeautyCenterDetailsForm from "./Forms/AddBeautyCenterDetailsForm";
import EditBeautyCenterDetailsFrom from "./Forms/EditBeautyCenterDetailsFrom";
import ReadPendingProducts from "./Forms/ReadPendingProducts";
import Trash from './Trash'
const index = ({ match }) => {
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/beautyCenter`} />
      <Route path={`${match.url}/beautyCenter`} component={BeautyCenter} />
      <Route path={`${match.url}/trash`} component={Trash} />

      <Route
        path={`${match.url}/beautyCenterServices`}
        component={BeautyCenterServices}
      />
      <Route
        path={`${match.url}/beautyCenterTag`}
        component={BeautyCenterTag}
      />
      <Route path={`${match.url}/GenericOptions`} component={GenericOptions} />
      <Route
        path={`${match.url}/beautyCenterServiceOptions`}
        component={BeautyCenterServiceOptions}
      />
      <Route
        path={`${match.url}/beautyCenterServiceReservationOptions`}
        component={BeautyCenterServiceReservationOptions}
      />
      <Route path={`${match.url}/ListRequests`} component={ListRequests} />
      <Route path={`${match.url}/ListOrders`} component={ListOrders} />
      <Route path={`${match.url}/AddNewRequest`} component={AddNewRequest} />
      <Route path={`${match.url}/unApproved`} component={ListUnApproved} />
      <Route
        path={`${match.url}/readReservation`}
        component={ReadReservation}
      />
      <Route
        path={`${match.url}/readPendingProducts`}
        component={ReadPendingProducts}
      />
      <Route
        path={`${match.url}/editReadForm`}
        component={EditBeautyCenterForm}
      />

      <Route
        path={`${match.url}/AddGenericOption`}
        component={AddGenericOption}
      />
      <Route
        path={`${match.url}/AddBeautyCenterTag`}
        component={AddBeautyCenterTag}
      />
      <Route
        path={`${match.url}/AddBeautyCenterServices`}
        component={AddBeautyCenterForm}
      />
      <Route
        path={`${match.url}/AddBeautyCenterServiceReservationOptions`}
        component={AddBeautyCenterServiceReservationOptions}
      />
      <Route
        path={`${match.url}/AddBeautyCenterServiceOptions`}
        component={AddBeautyCenterServiceOptions}
      />
      <Route
        path={`${match.url}/AddBeautyCenter`}
        component={AddBeautyCenter}
      />
      <Route path={`${match.url}/offline`} component={OfflineReservation} />
      <Route
        path={`${match.url}/beautyDetails`}
        component={BeautyCenterDetails}
      />
      <Route
        path={`${match.url}/AddOffline`}
        component={AddOfflineReservation}
      />

      <Route
        path={`${match.url}/viewOffline`}
        component={EditOfflineReservation}
      />
      <Route
        path={`${match.url}/editBeautyCenterService`}
        component={EditBeautyCenterService}
      />
      <Route
        path={`${match.url}/editBeautyCenterTagss`}
        component={EditBeautyCenterTagss}
      />
      <Route
        path={`${match.url}/addBeautyCenterDetailsForm`}
        component={AddBeautyCenterDetailsForm}
      />
      <Route
        path={`${match.url}/editBeautyCenterDetailsFrom`}
        component={EditBeautyCenterDetailsFrom}
      />
    </Switch>
  );
};

export default index;
