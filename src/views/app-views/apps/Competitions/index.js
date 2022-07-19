import { Route, Switch, Redirect } from "react-router-dom";
import React from "react";
import My_Contestants  from "../Competitions/Contestants ";

import Competiontions from './Competitions'
import Add_Competiontions from './Forms/Add_Record/Index'
import Edit_Competiontions from './Forms/Edit_Record/index'

export default function index({ match }) {
  return (
    <Switch>
      {/* Contestants  */}
           <Route path={`${match.url}/Contestants`} component={My_Contestants} />
           <Route path={`${match.url}/Competitions`} component={Competiontions} />
           <Route path={`${match.url}/AddCompetitions`} component={Add_Competiontions} />
           <Route path={`${match.url}/edit_Competitions_ReadForm`} component={Edit_Competiontions} />



           {/* <Route path={`${match.url}/AddBannersMedia`} component={AddBannerMedia} />
           <Route path={`${match.url}/editReadForm`} component={EditForm} /> */}




    </Switch>
  );
}
