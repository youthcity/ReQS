import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';

import App from './routes/App.js';
import Home from './routes/Home';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
