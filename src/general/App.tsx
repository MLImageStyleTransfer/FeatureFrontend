import React from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'
import { BrowserRouter as BrowRout } from 'react-router-dom'

import {FeatureRoot} from "../apps/feature/feature-root";
import {NotFound} from "../common/components/not-found/not-found";
import {About} from "../common/components/about/about";
import {Header} from "../common/components/header/header";
import {ContentWrapper} from "../common/components/content-wrapper/content-wrapper";
import {Home} from "../common/components/home/home";
import {AccountRoot} from "../apps/users/account/account-root";
import {SignInRoot} from "../apps/users/sing-in/sign-in-root";
import {SignUpRoot} from "../apps/users/sign-up/sign-up-root";

import './App.css'

function App() {
  return (
    <div className="App">
      <BrowRout>
        <Header/>
        <ContentWrapper>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/edit/" component={FeatureRoot} />
            <Route exact path="/profile/:login/" component={AccountRoot} />
            <Route exact path="/sign-in/" component={SignInRoot} />
            <Route exact path="/sign-up/" component={SignUpRoot} />
            <Route exact path="/about/" component={About} />
            <Route exact path="/not-found" component={NotFound} />

            <Redirect to="/not-found" />
          </Switch>
        </ContentWrapper>
      </BrowRout>
    </div>
  );
}

export default App
