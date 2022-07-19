import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ListRequests from "./ListRequests";
import CarOption from "./CarOption";
import GenericOptions from "./GenericOptions";
import Cars from "./Cars";
import Agency from "./Agency";
import CarTags from "./CarTags";
import CarReservationOptions from "./CarReservationOptions";
import OfflineReservation from "./OfflineReservation";

import AddCar from "./AddFroms/AddCar";
import AddAgency from "./AddFroms/AddAgency";
import AddCarReservationOption from "./AddFroms/AddCarReservationOption";
import AddCarTag from "./AddFroms/AddCarTag";
import AddGenericOption from "./AddFroms/AddGenericOption";
import AddNewRequest from "./AddFroms/AddNewRequest";

import AddOfflineForm from "./Form/AddForm";
import EditOfflineForm from "./Form/EditForm";
import ListOrders from "./ListOrders";

import AddFormGenericOption from "./Form/GenericOptionsForm/AddForm";
import EditFormGenericOption from "./Form/GenericOptionsForm/EditForm";
import ListUnApproved from "./ListUnApproved";
//Edit Forms
import EditAgancyForm from "./Form/EditForm/EditAgancyForm";
import EditCar from "./Form/EditForm/EditCar";
import EditCarssTags from "./Form/EditForm/EditCarTagss";
import AddCarForm from "./Form/AddCarForm";
import CarDetails from "./CarDetails";
import AddCarDetailsForm from "./Form/AddCarDetailsForm";
import EditCarDetailsFrom from "./Form/EditCarDetailsFrom";
import ReadPendingProducts from "./ReadPendingProducts";
import ReadReservation from "./Form/ReadReservation";
import Trash from './Trash'

const index = ({ match }) => {
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/agency`} />
      <Route path={`${match.url}/agency`} component={Agency} />
      <Route path={`${match.url}/cars`} component={Cars} />
      <Route path={`${match.url}/ListRequests`} component={ListRequests} />
      <Route path={`${match.url}/carOption`} component={CarOption} />
      <Route path={`${match.url}/GenericOptions`} component={GenericOptions} />
      <Route path={`${match.url}/carTags`} component={CarTags} />
      <Route path={`${match.url}/trash`} component={Trash} />

      <Route
        path={`${match.url}/carReservationOptions`}
        component={CarReservationOptions}
      />
      <Route
        path={`${match.url}/AddCarReservationOption`}
        component={AddCarReservationOption}
      />
      <Route path={`${match.url}/AddCar`} component={AddCarForm} />
      <Route path={`${match.url}/AddAgency`} component={AddAgency} />
      <Route path={`${match.url}/AddCarTag`} component={AddCarTag} />
      <Route path={`${match.url}/AddNewRequest`} component={AddNewRequest} />
      <Route path={`${match.url}/ListOrders`} component={ListOrders} />
      <Route path={`${match.url}/unApproved`} component={ListUnApproved} />
      <Route
        path={`${match.url}/readReservation`}
        component={ReadReservation}
      />
      <Route
        path={`${match.url}/addFormGenericOptions`}
        component={AddFormGenericOption}
      />
      <Route
        path={`${match.url}/veditGenericOptions`}
        component={EditFormGenericOption}
      />
      <Route
        path={`${match.url}/AddGenericOption`}
        component={AddGenericOption}
      />
      <Route path={`${match.url}/editReadForm`} component={EditAgancyForm} />
      <Route path={`${match.url}/offline`} component={OfflineReservation} />
      <Route path={`${match.url}/AddOffline`} component={AddOfflineForm} />
      <Route path={`${match.url}/viewOffline`} component={EditOfflineForm} />
      <Route path={`${match.url}/editCarTagss`} component={EditCarssTags} />
      <Route path={`${match.url}/editCar`} component={EditCar} />
      <Route path={`${match.url}/carDetails`} component={CarDetails} />
      <Route
        path={`${match.url}/readPendingProducts`}
        component={ReadPendingProducts}
      />
      <Route
        path={`${match.url}/addCarDetailsForm`}
        component={AddCarDetailsForm}
      />
      <Route
        path={`${match.url}/editCarDetailsFrom`}
        component={EditCarDetailsFrom}
      />
    </Switch>
  );
};

export default index;
