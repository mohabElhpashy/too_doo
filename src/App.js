import React, { useEffect, useState } from "react";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";

import { RecoilRoot } from "recoil";
import { THEME_CONFIG } from "./configs/AppConfig";
import { AUTH_TOKEN } from './redux/constants/Auth'
import store from "./redux/store";
import Views from "./views";
import history from './history'
const themes = {
  dark: `${process.env.PUBLIC_URL}/css/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/css/light-theme.css`,
};
const queryClient = new QueryClient();
function App() {
  // useEffect(()=>{
  //   history.push('/auth/login')

  // },[localStorage.getItem(AUTH_TOKEN)])

  // const [country,setCountry] = useRecoilState(allCountries)
  // useEffect(()=>{
  //   const fetchCountries =async()=>{
  //     const data = await service.get()
  //   }
  // },[])
  return (
    <div className="App">
      <RecoilRoot>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <ThemeSwitcherProvider
              themeMap={themes}
              defaultTheme={THEME_CONFIG.currentTheme}
              insertionPoint="styles-insertion-point"
            >
              <Router>
                <Switch>
                  <Route path="/" component={Views} />
                </Switch>
              </Router>
            </ThemeSwitcherProvider>
          </QueryClientProvider>
        </Provider>
      </RecoilRoot>
    </div>
  );
}

export default App;
