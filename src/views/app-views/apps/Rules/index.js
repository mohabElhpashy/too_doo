import { Route, Switch, Redirect } from "react-router-dom";
import React from "react";
import Rules from "./Roles";
import Permision from "./Permisions"
import Add_Role from './forms/Banners_Media/AddForm/Index'
import EditForm from '../Rules/forms/Banners_Media/EditForm/index'
 import AddAssign_Perm from './forms/Banners_Media/Add_assign_perm/Index'
import Assign_perm from './AssignPermsToRoles'
import EditAssign_perm from './forms/Banners_Media/Edit_assign_perm/index'
import Single_prm from './forms/Banners_Media/ViewPerm/index'

export default function index({ match }) {
  return (
    <Switch>
      {/*Rules */}
           <Route path={`${match.url}/Roles`} component={Rules} />
           <Route path={`${match.url}/AddRole`} component={Add_Role} />
           <Route path={`${match.url}/editReadForm`} component={EditForm} />
  
      {/*Permision */}

      <Route path={`${match.url}/Permision`} component={Permision} />
      <Route path={`${match.url}/SinglePermision`} component={Single_prm} />


      {/*Assign_perm_to_roles */}
      <Route path={`${match.url}/Assign_perm`} component={Assign_perm} /> 
      <Route path={`${match.url}/AddAssign_Perm`} component={AddAssign_Perm} />
      <Route path={`${match.url}/editReadForm`} component={EditAssign_perm} />



    </Switch>
  );
}
