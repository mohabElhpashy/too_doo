import { Route, Switch, Redirect } from "react-router-dom";
import React from "react";
import Banners_Media from "./Banners_Media";
import AddBannerMedia from './forms/Banners_Media/AddForm/Index'
import EditForm from './forms/Banners_Media/EditForm/index'
import TargetType from './TargetType'
import AddtargetType from './forms/Targettype/AddForm/Index'
import EditTargettype from './forms/Targettype/EditForm/index'
import Banner from "./Banner";
import AddBanners from './forms/Banners/AddForm/Index'
import EditBanners from './forms/Banners/EditForm/index'


export default function index({ match }) {
  return (
    <Switch>
      {/* banners_media */}
           <Route path={`${match.url}/BannersMedia`} component={Banners_Media} />
           <Route path={`${match.url}/AddBannersMedia`} component={AddBannerMedia} />
           <Route path={`${match.url}/editReadForm`} component={EditForm} />
    {/* targetType */}
           <Route path={`${match.url}/targetType`} component={TargetType} />
           <Route path={`${match.url}/AddtargetType`} component={AddtargetType} />
           <Route path={`${match.url}/edit_target_ReadForm`} component={EditTargettype} />

    {/* BANNER */}
    <Route path={`${match.url}/Banner`} component={Banner} />
    <Route path={`${match.url}/AddBanners`} component={AddBanners} />
    <Route path={`${match.url}/edit_Banners_ReadForm`} component={EditBanners} />







    </Switch>
  );
}
