import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AddGenericOption from "./addForm/AddGenericOption";
import AddNewRequest from "./addForm/AddNewRequest";
import AddHotel from "./Forms/AddHotelForm";
import AddOfflineReservation from "./Forms/AddOfflineReservation";
import AddWeddingHallForm from "./Forms/AddWeddingHallForm";
import EditHotel from "./Forms/EditHotelForm";
import EditWeddingHall from "./Forms/EditWeddingHall";
import EditOfflineReservation from "./Forms/OfflineReservation";
import GenericOptions from "./GenericOptions";
import Hotels from "./Hotels";
import ListOrders from "./ListOrders";
import ListRequests from "./ListRequests";
import ListUnApproved from "./ListUnApproved";
import OfflineReservation from "./OfflineReservation";
import WeddingHalls from "./WeddingHalls";
import WeddingHallTags from "./WeddingHallTags";
import HotelTagss from "./HotelTagss";
import EditHotelTagss from "./Forms/EditHotelTagss";
import WeddingHallDetails from "./WeddingHallDetails";
import ExtraPackage from "./ExtraPackage";
import AddWeddingHallDetailsForm from "./Forms/AddWeddingHallDetailsForm";
import EditWeddingHallDetailsFrom from "./Forms/EditWeddingHallDetailsFrom";
import AddWeddingHallExtra from "./Forms/ExtraPackage/AddWeddingHallExtra";
import ReadPendingProducts from "./Forms/ReadPendingProducts";
import ReadReservation from "./Forms/ReadReservation";
import EditWeddingHallExtra from "./Forms/ExtraPackage/EditWeddingHallExtra";
import Periods from './Periods'
import Add_new_Periods from './Forms/AddPeriods/index'
import Edit_Periods from './Forms/Edit_Periods/index';
import Special_Date from './Special_Date'
import Add_Special_Date from './Forms/Add_Special_date/index'
import Edit_Special_Date from './Forms/Edit_Special_Date/index'
import Trash from './Trash'
const index = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/Hotels`} />
      <Route path={`${match.url}/Hotels`} component={Hotels} />
      <Route path={`${match.url}/weddingHall`} component={WeddingHalls} />
      <Route path={`${match.url}/weddingTags`} component={WeddingHallTags} />
      <Route path={`${match.url}/ListRequests`} component={ListRequests} />
      <Route path={`${match.url}/ListOrders`} component={ListOrders} />
      <Route path={`${match.url}/ListPeriods`} component={Periods} />
      <Route path={`${match.url}/Add_Periods`} component={Add_new_Periods} />
      <Route path={`${match.url}/Edit_Periods`} component={Edit_Periods} />
      <Route path={`${match.url}/trash`} component={Trash} />

      {/* /Special Date/ */}
      <Route path={`${match.url}/ListSpecial_date`} component={Special_Date} />
      <Route path={`${match.url}/Add_Special_Date`} component={Add_Special_Date} />
      <Route path={`${match.url}/Edit_Special_Date`} component={Edit_Special_Date} />





      <Route path={`${match.url}/GenericOptions`} component={GenericOptions} />
      <Route path={`${match.url}/addWedding`} component={AddWeddingHallForm} />
      <Route path={`${match.url}/extraPackage`} component={ExtraPackage} />
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
        path={`${match.url}/addWeddingHallExtra`}
        component={AddWeddingHallExtra}
      />
      <Route
        path={`${match.url}/editWeddingHallExtra`}
        component={EditWeddingHallExtra}
      />

      <Route
        path={`${match.url}/AddGenericOption`}
        component={AddGenericOption}
      />

      <Route path={`${match.url}/AddNewRequest`} component={AddNewRequest} />
      <Route path={`${match.url}/addHotel`} component={AddHotel} />
      <Route path={`${match.url}/veHotelForm`} component={EditHotel} />
      <Route
        path={`${match.url}/editWeddinghall`}
        component={EditWeddingHall}
      />

      <Route path={`${match.url}/offline`} component={OfflineReservation} />
      <Route path={`${match.url}/hotelTagss`} component={HotelTagss} />
      <Route
        path={`${match.url}/editWeddingHallTagss`}
        component={EditHotelTagss}
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
        path={`${match.url}/hotelDetails`}
        component={WeddingHallDetails}
      />
      <Route
        path={`${match.url}/editWeddingHallDetailsFrom`}
        component={EditWeddingHallDetailsFrom}
      />
      <Route
        path={`${match.url}/addWeddingHallDetailsForm`}
        component={AddWeddingHallDetailsForm}
      />
    </Switch>
  );
};

export default index;
