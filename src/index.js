import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

class AppRouter extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(<AppRouter />, document.getElementById('root'));
registerServiceWorker();
