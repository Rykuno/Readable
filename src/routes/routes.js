import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../containers/Home';
import PostDetail from '../components/PostDetail';
import NoMatch from '../components/NoMatch';
import About from '../components/About';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/r/:category" component={Home} />
      <Route exact path="/r/:category/:id" component={PostDetail} />
      <Route exact path="/about" component={About} />
      <Route component={NoMatch} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
