import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';

import App from './routes/App.js';
import Home from './routes/Home';

import Register from './routes/Register.js';

import Ask from './routes/Ask.js';

import People from './routes/People.js';

import Question from './routes/Question.js';

import Topic from './routes/Topic.js';

import Search from './routes/Search.js';

import News from './routes/News.js';

import Jobs from "./routes/Jobs.js";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/ask" component={Ask} />
        <Route path="/people/:id" component={People} />
        <Route path="/question/:id" component={Question} />
        <Route path="/topic" component={Topic} />
        <Route path="/search" component={Search} />
        <Route path="/news" component={News} />
      </Route>
      <Route path="/jobs" component={Jobs} />
    </Router>
  );
}

export default RouterConfig;
