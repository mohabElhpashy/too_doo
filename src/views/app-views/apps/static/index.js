import { Route, Switch, Redirect } from "react-router-dom";
import React from "react";
import Privacy from "./Privacy";
import Terms from "./Terms";
import FAQ from "./FAQ";
import PrivacyAddForm from "./Froms/PrivacyForm/AddForm";
import PrivacyEditForm from "./Froms/PrivacyForm/EditFrom";
import FAQAddForm from "./Froms/FAQFrom/AddForm";
import FAQEditForm from "./Froms/FAQFrom/EditFrom";
import TermsAddForm from "./Froms/TermsAndConditions/AddForm";
import TermsEditForm from "./Froms/TermsAndConditions/EditFrom";

export default function index({ match }) {
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/staticPages`} />
      <Route path={`${match.url}/staticPages`} component={FAQ} />
      <Route path={`${match.url}/privacy`} component={Privacy} />
      <Route path={`${match.url}/terms`} component={Terms} />
      <Route path={`${match.url}/privacyAddForm`} component={PrivacyAddForm} />
      <Route
        path={`${match.url}/privacyEditForm`}
        component={PrivacyEditForm}
      />
      <Route path={`${match.url}/FAQAddForm`} component={FAQAddForm} />
      <Route path={`${match.url}/FAQEditForm`} component={FAQEditForm} />
      <Route path={`${match.url}/TermsAddForm`} component={TermsAddForm} />
      <Route path={`${match.url}/TermsEditForm`} component={TermsEditForm} />
    </Switch>
  );
}
