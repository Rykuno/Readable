import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../containers/Home';
import PostDetail from '../components/PostDetail';
import NoMatch from '../components/NoMatch';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/r/:category" component={Home} />
      <Route exact path="/r/:category/:id" component={PostDetail} />
      <Route component={NoMatch} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
