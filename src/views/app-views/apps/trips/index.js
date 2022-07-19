import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Trips from "./Trips";
import TripsReservationOptions from "./TripsReservationOptions";
import ListOrders from "./ListOrders";
import GenericOptions from "./GenericOptions";
import ListRequests from "./ListRequests";
import TravelAgency from "./TravelAgency";
import TripsOptions from "./TripsOptions";
import TripsTags from "./TripsTags";

//Edit Forms
import EditTripForm from "./Forms/EditForms/EditTravelAgancyForm";
import OfflineReservation from "./OfflineReservation";
import AddOfflineReservation from "./Forms/AddOfflineReservation";
import EditOfflineReservation from "./Forms/OfflineReservation";
import ListUnApproved from "./ListUnApproved";
import AddTripForm from "./Forms/AddTripForm";
import EditTrip from "./Forms/EditForms/EditTrip";
import EditTripsTagss from "./Forms/EditForms/EditTripsTagss";
import AddTripsrDetailsForm from "./Forms/AddTripsrDetailsForm";
import EditTripsDetailsFrom from "./Forms/EditTripsDetailsFrom";
import TripsDetails from "./TripsDetails";
import TripsDestinations from "./TripsDestinations";
import AddTripDestination from "./Forms/AddTripDestination";
import EditTripDestinaion from "./Forms/EditTripDestinaion";
import ReadPendingProducts from "./Forms/ReadPendingProducts";
import ReadReservation from "./Forms/ReadReservation";
const index = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/Trips`} />
      <Route path={`${match.url}/Trips`} component={Trips} />
      <Route path={`${match.url}/travelAgency`} component={TravelAgency} />
      <Route path={`${match.url}/tripsOptions`} component={TripsOptions} />
      <Route
        path={`${match.url}/tripsReservationOptions`}
        component={TripsReservationOptions}
      />
      <Route path={`${match.url}/ListRequests`} component={ListRequests} />
      <Route path={`${match.url}/ListOrders`} component={ListOrders} />
      <Route path={`${match.url}/tripsTags`} component={TripsTags} />
      <Route path={`${match.url}/GenericOptions`} component={GenericOptions} />
      <Route path={`${match.url}/AddTripForm`} component={AddTripForm} />
      <Route path={`${match.url}/editReadTripForm`} component={EditTripForm} />

      <Route path={`${match.url}/offline`} component={OfflineReservation} />
      <Route path={`${match.url}/editReadTrip`} component={EditTrip} />
      <Route
        path={`${match.url}/readReservation`}
        component={ReadReservation}
      />
      <Route
        path={`${match.url}/AddOffline`}
        component={AddOfflineReservation}
      />
      <Route
        path={`${match.url}/viewOffline`}
        component={EditOfflineReservation}
      />
      <Route path={`${match.url}/unApproved`} component={ListUnApproved} />
      <Route path={`${match.url}/editTripsTagss`} component={EditTripsTagss} />
      <Route path={`${match.url}/tripsDetails`} component={TripsDetails} />
      <Route
        path={`${match.url}/readPendingProducts`}
        component={ReadPendingProducts}
      />
      <Route
        path={`${match.url}/editTripsDetailsFrom`}
        component={EditTripsDetailsFrom}
      />
      <Route path={`${match.url}/destination`} component={TripsDestinations} />
      <Route
        path={`${match.url}/editTripDestinaion`}
        component={EditTripDestinaion}
      />
      <Route
        path={`${match.url}/addTripDestination`}
        component={AddTripDestination}
      />
      <Route
        path={`${match.url}/addTripsrDetailsForm`}
        component={AddTripsrDetailsForm}
      />
    </Switch>
  );
};

export default index;
