import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import GenericOptions from "../doctors/GenericOptions";
import ListOrders from "../doctors/ListOrders";
import ListRequests from "../doctors/ListRequests";
import AddCheckupOptions from "./AddFroms/AddCheckupOptions";
import AddCheckupReservationOptions from "./AddFroms/AddCheckupReservationOptions";
import AddCheckupTag from "./AddFroms/AddCheckupTag";
import AddClinics from "./AddFroms/AddClinics";
import DrAvailability from "./DrAvailability";
import AddGenericOption from "./AddFroms/AddGenericOption";
import AddNewRequest from "./AddFroms/AddNewRequest";
import CheckupOptions from "./CheckupOptions";
import CheckupReservationOptions from "./CheckupReservationOptions";
import CheckUPs from "./CheckUPs";
import CheckUpTagss from "./CheckUpTagss";
import Clinics from "./Clinics";
import AddDoctorForm from "./Forms/AddDoctorForm";
import AddOfflineReservation from "./Forms/AddOfflineReservation";
import EditCheckUp from "./Forms/EditForm/EditCheckUp";
import EditCheckUpTagss from "./Forms/EditForm/EditCheckUpTagss";
//Edit Forms
import EditClinicForm from "./Forms/EditForm/EditClinicForm";
import OfflineReservation from "./Forms/OfflineReservation";
import ListUnApproved from "./ListUnApproved";
import Offline from "./OfflineReservation";
import CheckUpDetails from "./ChekUpDetails";
import EditChekUpDetailsFrom from "./Forms/EditChekUpDetailsFrom";
import AddCheckUpDetailsForm from "./Forms/AddCheckUpDetailsForm";
import AddDrAvailability from "./Forms/AddDrAvailability";
import EditDrAvailability from "./Forms/EditDrAvailability";
import ReadPendingProducts from "./Forms/ReadPendingProducts";
import ReadReservation from "./Forms/ReadReservation";
import Trash from './Trash'
export default function index({ match }) {
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/Clinics`} />
      <Route path={`${match.url}/Clinics`} component={Clinics} />
      <Route path={`${match.url}/ListRequests`} component={ListRequests} />
      <Route path={`${match.url}/checkupOptions`} component={CheckupOptions} />
      <Route path={`${match.url}/checkupTag`} component={CheckUpTagss} />
      <Route
        path={`${match.url}/editDrAvailability`}
        component={EditDrAvailability}
      />
      <Route
        path={`${match.url}/checkupReservationOptions`}
        component={CheckupReservationOptions}
      />

      <Route path={`${match.url}/checkup`} component={CheckUPs} />
      <Route path={`${match.url}/ListOrders`} component={ListOrders} />
      <Route path={`${match.url}/GenericOptions`} component={GenericOptions} />
      <Route path={`${match.url}/AddNewRequest`} component={AddNewRequest} />
      <Route
        path={`${match.url}/AddGenericOption`}
        component={AddGenericOption}
      />

      <Route path={`${match.url}/trash`} component={Trash} />
      {/* Trash */}
      <Route path={`${match.url}/offline`} component={Offline} />


      <Route path={`${match.url}/AddClinics`} component={AddClinics} />
      <Route path={`${match.url}/AddCheckupTag`} component={AddCheckupTag} />
      <Route path={`${match.url}/AddCheckUPs`} component={AddDoctorForm} />
      <Route path={`${match.url}/unApproved`} component={ListUnApproved} />
      <Route path={`${match.url}/avaliabilty`} component={DrAvailability} />
      <Route path={`${match.url}/editReadForm`} component={EditClinicForm} />
      <Route path={`${match.url}/eeditCheckUp`} component={EditCheckUp} />
      <Route
        path={`${match.url}/readReservation`}
        component={ReadReservation}
      />
      <Route
        path={`${match.url}/readPendingProducts`}
        component={ReadPendingProducts}
      />
      <Route
        path={`${match.url}/addDrAvailability`}
        component={AddDrAvailability}
      />
      <Route
        path={`${match.url}/addCheckUpDetailsForm`}
        component={AddCheckUpDetailsForm}
      />
      <Route
        path={`${match.url}/editChekUpDetailsFrom`}
        component={EditChekUpDetailsFrom}
      />
      {/* <Route
        path={`${match.url}/editChekUpDetailsFrom`}
        component={EditChekUpDetailsFrom}
      /> */}
      <Route path={`${match.url}/doctorDetails`} component={CheckUpDetails} />
      <Route
        path={`${match.url}/editCheckUpTagss`}
        component={EditCheckUpTagss}
      />

      <Route
        path={`${match.url}/AddCheckupOptions`}
        component={AddCheckupOptions}
      />
      <Route
        path={`${match.url}/AddCheckupReservationOptions`}
        component={AddCheckupReservationOptions}
      />
      <Route
        path={`${match.url}/addOfflineReservation`}
        component={AddOfflineReservation}
      />
      <Route
        path={`${match.url}/veofflineReservation`}
        component={OfflineReservation}
      />
    </Switch>
  );
}
