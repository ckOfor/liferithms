// react
import React from 'react';

// third-party libraries
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// pages
import { LandingPage } from "./pages/landing";

// css
import './App.css';
import 'antd/dist/antd.css';

const App: React.FC = () => {
  return (
    // @ts-ignore
    <Router>
      <Switch>
        {/* <Route exact path="/" component={SignInPage} /> */}
        <Route exact path="/" component={LandingPage} />
      </Switch>
    </Router>
  );
}

export default App;
