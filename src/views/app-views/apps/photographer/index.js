import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AddGenericOption from "./AddFroms/AddGenericOption";
import AddNewRequest from "./AddFroms/AddNewRequest";
import AddPhotoSession from "./AddFroms/AddPhotoSession";
import AddOfflineReservation from "./Forms/AddOfflineReservation";
import EditOfflineReservation from "./Forms/OfflineReservation";
import GenericOptions from "./GenericOptions";
import ListOrders from "./ListOrders";
import ListRequests from "./ListRequests";
import OfflineReservation from "./OfflineReservation";
import PhotoGrapher from "./PhotoGrapher";
import PhotoSession from "./PhotoSession";
import PhotoSessionOptions from "./PhotoSessionOptions";
import PhotoSessionReservationOptions from "./PhotoSessionReservationOptions";
import PhotoSessionTags from "./PhotoSessionTags";
import ListUnApproved from "./ListUnApproved";
import AddPhotoSessionForm from "./Forms/AddPhotoSessionForm";
import EditPhotoSessionService from "./Forms/EditForms/EditPhotoSessionService";
import EditPhotoGrapherTags from "./Forms/EditForms/EditPhotoGrapherTags";
import PhotoSessionDetails from "./PhotoSessionDetails";
import AddPhotoSessionDetailsForm from "./Forms/AddPhotoSessionDetailsForm";
import EditPhotoSessionDetailsFrom from "./Forms/EditPhotoSessionDetailsFrom";
import ReadPendingProducts from "./Forms/ReadPendingProducts";
import ReadReservation from "./Forms/ReadReservation";
import Album from "./Album";
import Trash from './Trash'

//Edit Forms
import EditPhotoGrapherForm from "./Forms/EditForms/EditPhotoGrapherForm";
const index = ({ match }) => {
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/photoGrapher`} />
      <Route path={`${match.url}/photoGrapher`} component={PhotoGrapher} />
      <Route path={`${match.url}/photoSession`} component={PhotoSession} />
      <Route path={`${match.url}/trash`} component={Trash} />

      <Route
        path={`${match.url}/photoSessionOptions`}
        component={PhotoSessionOptions}
      />
      <Route
        path={`${match.url}/photoSessionReservationOptions`}
        component={PhotoSessionReservationOptions}
      />
      <Route
        path={`${match.url}/photoSessionTags`}
        component={PhotoSessionTags}
      />
      <Route path={`${match.url}/ListRequests`} component={ListRequests} />
      <Route path={`${match.url}/ListOrders`} component={ListOrders} />

      <Route
        path={`${match.url}/AddGenericOption`}
        component={AddGenericOption}
      />
      <Route path={`${match.url}/AddNewRequest`} component={AddNewRequest} />
      <Route
        path={`${match.url}/AddPhotoSession`}
        component={AddPhotoSessionForm}
      />
      <Route path={`${match.url}/unApproved`} component={ListUnApproved} />

      <Route path={`${match.url}/GenericOptions`} component={GenericOptions} />
      <Route
        path={`${match.url}/readReservation`}
        component={ReadReservation}
      />

      <Route
        path={`${match.url}/editReadForm`}
        component={EditPhotoGrapherForm}
      />
      <Route path={`${match.url}/offline`} component={OfflineReservation} />
      <Route
        path={`${match.url}/editphotoSession`}
        component={EditPhotoSessionService}
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
        path={`${match.url}/editPhotoGraphertag`}
        component={EditPhotoGrapherTags}
      />
      <Route
        path={`${match.url}/photoDetails`}
        component={PhotoSessionDetails}
      />
      <Route
        path={`${match.url}/photoDetails`}
        component={PhotoSessionDetails}
      />
      <Route
        path={`${match.url}/photoDetails`}
        component={PhotoSessionDetails}
      />
      <Route path={`${match.url}/album`} component={Album} />
      <Route
        path={`${match.url}/editPhotoSessionDetailsFrom`}
        component={EditPhotoSessionDetailsFrom}
      />
      <Route
        path={`${match.url}/addPhotoSessionDetailsForm`}
        component={AddPhotoSessionDetailsForm}
      />
      <Route
        path={`${match.url}/readPendingProducts`}
        component={ReadPendingProducts}
      />
    </Switch>
  );
};

export default index;
