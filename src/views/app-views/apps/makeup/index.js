import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AddGenericOption from "./AddFroms/AddGenericOption";
import AddMakeUp from "./AddFroms/AddMakeUp";
import AddMakeupServiceOption from "./AddFroms/AddMakeupServiceOption";
import AddMakeupServiceReservationOptions from "./AddFroms/AddMakeupServiceReservationOptions";
import AddMakeupTag from "./AddFroms/AddMakeupTag";
import AddNewRequest from "./AddFroms/AddNewRequest";
import AddMakeUpDetailsForm from "./Form/AddMakeUpDetailsForm";
import AddMakeupForm from "./Form/AddMakeupForm";
import AddOfflineReservation from "./Form/AddOfflineReservation";
//Edit Forms
import EditMakeUpForm from "./Form/EditForm/EditMakeUpForm";
import EditMakeUpServiceForm from "./Form/EditForm/EditMakeUpServiceForm";
import EditMakeUpTagss from "./Form/EditForm/EditMakeUpTagss";
import EditMakeupDetailsFrom from "./Form/EditMakeupDetailsFrom";
import EditOfflineReservation from "./Form/OfflineReservation";
import GenericOptions from "./GenericOptions";
import ListOrders from "./ListOrders";
import ListRequests from "./ListRequests";
import ListUnApproved from "./ListUnApproved";
import MakeUp from "./MakeUp";
import MakeUpDetails from "./MakeUpDetails";
import MakeupService from "./MakeupService";
import ReadPendingProducts from "./Form/ReadPendingProducts";
import MakeupServiceOptions from "./MakeupServiceOptions";
import MakeupServiceReservationOptions from "./MakeupServiceReservationOptions";
import ReadReservation from "./Form/ReadReservation";
import MakeupTags from "./MakeupTags";
import OfflineReservation from "./OfflineReservation";
import Trash from './Trash'

const index = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/makeup`} />
      <Route path={`${match.url}/makeup`} component={MakeUp} />
      <Route path={`${match.url}/makeupTags`} component={MakeupTags} />
      <Route path={`${match.url}/makeupService`} component={MakeupService} />
      <Route path={`${match.url}/trash`} component={Trash} />

      <Route
        path={`${match.url}/makeupServiceOptions`}
        component={MakeupServiceOptions}
      />
      <Route
        path={`${match.url}/makeupReservationOptions`}
        component={MakeupServiceReservationOptions}
      />
      <Route path={`${match.url}/ListRequests`} component={ListRequests} />
      <Route path={`${match.url}/ListOrders`} component={ListOrders} />
      <Route path={`${match.url}/GenericOptions`} component={GenericOptions} />
      <Route path={`${match.url}/AddMakeUp`} component={AddMakeUp} />
      <Route path={`${match.url}/AddMakeupTag`} component={AddMakeupTag} />
      <Route path={`${match.url}/AddNewRequest`} component={AddNewRequest} />
      <Route path={`${match.url}/unApproved`} component={ListUnApproved} />
      <Route
        path={`${match.url}/readReservation`}
        component={ReadReservation}
      />

      <Route
        path={`${match.url}/AddGenericOption`}
        component={AddGenericOption}
      />
      <Route path={`${match.url}/AddMakeupService`} component={AddMakeupForm} />
      <Route
        path={`${match.url}/AddMakeupServiceOption`}
        component={AddMakeupServiceOption}
      />
      <Route
        path={`${match.url}/AddMakeupServiceReservationOptions`}
        component={AddMakeupServiceReservationOptions}
      />

      <Route path={`${match.url}/editReadForm`} component={EditMakeUpForm} />
      <Route
        path={`${match.url}/editmakeupService`}
        component={EditMakeUpServiceForm}
      />
      <Route path={`${match.url}/offline`} component={OfflineReservation} />
      <Route
        path={`${match.url}/readPendingProducts`}
        component={ReadPendingProducts}
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
        path={`${match.url}/editmMakeUpTagss`}
        component={EditMakeUpTagss}
      />
      <Route path={`${match.url}/makeupDetails`} component={MakeUpDetails} />
      <Route
        path={`${match.url}/addMakeUpDetailsForm`}
        component={AddMakeUpDetailsForm}
      />
      <Route
        path={`${match.url}/editMakeupDetailsFrom`}
        component={EditMakeupDetailsFrom}
      />
    </Switch>
  );
};

export default index;
