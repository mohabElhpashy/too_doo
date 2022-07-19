import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Loading from "components/shared-components/Loading";

const Apps = ({ match }) => (
  <Suspense fallback={<Loading cover="content" />}>
    <Switch>
      <Route
        path={`${match.url}/hotel`}
        component={lazy(() => import(`./hotel`))}
      />
      <Route
        path={`${match.url}/doctors`}
        component={lazy(() => import(`./doctors`))}
      />
      <Route
        path={`${match.url}/beauty`}
        component={lazy(() => import(`./Beauty-Center`))}
      />
      <Route
        path={`${match.url}/photographer`}
        component={lazy(() => import(`./photographer`))}
      />
      {/* <Route
        path={`${match.url}/chatroom`}
        component={lazy(() => import(`./chat`))}
      /> */}
      <Route
        path={`${match.url}/cars`}
        component={lazy(() => import(`./cars`))}
      />
      <Route
        path={`${match.url}/dresses`}
        component={lazy(() => import(`./dresses`))}
      />
      <Route
        path={`${match.url}/trips`}
        component={lazy(() => import(`./trips`))}
      />
      <Route
        path={`${match.url}/makeup`}
        component={lazy(() => import(`./makeup`))}
      />
      <Route
        path={`${match.url}/CRM`}
        component={lazy(() => import(`./CRM`))}
      />
      <Route
        path={`${match.url}/social`}
        component={lazy(() => import(`./social`))}
      />
      <Route
        path={`${match.url}/marketing`}
        component={lazy(() => import(`./marketing`))}
      />
       <Route
        path={`${match.url}/Reservations`}
        component={lazy(() => import(`./Reservations`))}
      />
      <Route
       path={`${match.url}/Banners`}
       component={lazy(() => import(`./Banners`))}
      />
{/* /Roles/ */}
<Route
       path={`${match.url}/Rules`}
       component={lazy(() => import(`./Rules`))}
      />
      <Route
       path={`${match.url}/Competitions`}
       component={lazy(() => import(`./Competitions`))}
      />
      <Route
       path={`${match.url}/True_View`}
       component={lazy(() => import(`./True_View`))}
      />
      {/* <Route
        path={`${match.url}/Banners_Media`}
        component={lazy(() => import(`./Banners_Media`))}
      /> */}
      <Route
        path={`${match.url}/staticPages`}
        component={lazy(() => import(`./static`))}
      />
      <Route
        path={`${match.url}/geographic`}
        component={lazy(() => import(`./geographic`))}
      />
      <Route
        path={`${match.url}/generic`}
        component={lazy(() => import(`./generic`))}
      />
      <Route
        path={`${match.url}/getProductByTag`}
        component={lazy(() => import(`./getProductByTag`))}
      />
      <Redirect from={`${match.url}`} to={`/app/dashboards/default`} />
    </Switch>
  </Suspense>
);

export default Apps;
