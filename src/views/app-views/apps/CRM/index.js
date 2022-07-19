import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AdminLogs from "./AdminLogs";
import BecomeASeller from "./BecomeASeller";
import Client from "./Client";
import ClientRequestCalls from "./ClientRequestCalls";
import Complain from "./Complain";
import FlashDealRequests from "./FlashDealRequests";
import ClientEditForm from "./Forms/ClientForms/EditForm";
import ReadClient from "./Forms/ClientForms/ReadClient";
import WishListProducts from "./Forms/ClientForms/ReadClient/WishListProducts";
import ComplainForm from "./Forms/ComplainForm";
import AddOfflineClient from "./Forms/OfflineClients/AddOfflineClient";
import AddForm from "./Forms/SellerForms/AddSellerForm";
import EditForm from "./Forms/SellerForms/EditSellerForm";
import ReadSellerChanges from "./Forms/SellerForms/ReadSellerChanges";
import OfflineClients from "./OfflineClients";
import PackageRequest from "./PackageRequest";
import Seller from "./Seller";
import SellerChanges from "./SellerChanges";
import SellerLogs from "./SellerLogs";
import SellerRejectReasons from "./SellerRejectReasons";
import SellerRequestCalls from "./SellerRequestCalls";
import AddRejectedReasons from "./Forms/RejectedReasonForms/AddRejectedReasons";
import EditRejectedReasons from "./Forms/RejectedReasonForms/EditRejectedReasons";
import Online_Client_Pending from "./Online_Client_Pending";
// import ChatRoom from "./ChatRoom";
import ChatRoom from "./From/index";

import Sms from "./SmS"
import Search_by_phone from "../CRM/Forms/SearchByPhone/index";
import SearchKeyword from "./SearchKeyword";
import Translations from './Translations'
import Edit_Translations from './Forms/ClientTrans/Edit_translations'
// import How_to from './From/How_To/index';
import How_to from './From/How_To/HOW_TO'
import How_TO_Add from './From/How_To/Add_how_to/index'
import How_TO_Edit from './From/How_To/Edit_how_to/index'
import Setting_Service from './From/Setting_Service/Setting_Service'
import Edit_service from './From/Setting_Service/Edit_Setting_Service/index'


const Project = ({ match }) => {
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/complain`} />
      <Route path={`${match.url}/chatroom`} component={ChatRoom} />
      <Route path={`${match.url}/Translations`} component={Translations} />
      <Route path={`${match.url}/edit_Translations_ReadForm`} component={Edit_Translations} />
{/* /HOW TO/ */}

<Route path={`${match.url}/How_TO`} component={How_to} />
<Route path={`${match.url}/How_To_Add`} component={How_TO_Add} />
<Route path={`${match.url}/How_To_Edit`} component={How_TO_Edit} />

{/* /Setting_Service/ */}
<Route path={`${match.url}/ListOFService`} component={Setting_Service} />
<Route path={`${match.url}/Edit_Services`} component={Edit_service} />

{/* /////////////////////////////////////////////////////////////////////////////// */}
      <Route path={`${match.url}/SMS`} component={Sms} />

      <Route path={`${match.url}/complain`} component={Complain} />
      <Route path={`${match.url}/client`} component={Client} />
      <Route path={`${match.url}/seller`} component={Seller} />
      <Route path={`${match.url}/sellerChanges`} component={SellerChanges} />
      <Route
        path={`${match.url}/rejectResons`}
        component={SellerRejectReasons}
      />
      <Route path={`${match.url}/addForm`} component={AddForm} />
      <Route path={`${match.url}/veForm`} component={EditForm} />
      <Route path={`${match.url}/veClientForm`} component={ClientEditForm} />
      <Route path={`${match.url}/offlineClient`} component={OfflineClients} />
      <Route path={`${match.url}/clientPending`} component={Online_Client_Pending} />

      <Route path={`${match.url}/Search_Keywords`} component={SearchKeyword} />

      <Route path={`${match.url}/Search_By_Phone`} component={Search_by_phone} />

      <Route path={`${match.url}/viewComplain`} component={ComplainForm} />
      <Route path={`${match.url}/becomeSeller`} component={BecomeASeller} />
      <Route
        path={`${match.url}/addRejectedReasons`}
        component={AddRejectedReasons}
      />
      <Route
        path={`${match.url}/editRejectedReasons`}
        component={EditRejectedReasons}
      />
      <Route path={`${match.url}/SellerLogs`} component={SellerLogs} />
      <Route
        path={`${match.url}/readSellerChanges`}
        component={ReadSellerChanges}
      />
      <Route
        path={`${match.url}/wishListProducts`}
        component={WishListProducts}
      />
      <Route
        path={`${match.url}/clientRequestCalls`}
        component={ClientRequestCalls}
      />
      <Route
        path={`${match.url}/requestCalls`}
        component={SellerRequestCalls}
      />
      <Route path={`${match.url}/AdminLogs`} component={AdminLogs} />
      <Route path={`${match.url}/packageRequest`} component={PackageRequest} />
      <Route
        path={`${match.url}/addOfflineClient`}
        component={AddOfflineClient}
      />
      <Route path={`${match.url}/ReadClient`} component={ReadClient} />
      <Route
        path={`${match.url}/flashDealRequest`}
        component={FlashDealRequests}
      />
    </Switch>
  );
};

export default Project;
