import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';

import App from './routes/App.js';
import Home from './routes/Home';

import Register from './routes/Register.js';

import Ask from './routes/Ask.js';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/ask" component={Ask} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
