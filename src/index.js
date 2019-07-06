import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <App />
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<AppRouter />, document.getElementById('root'));
registerServiceWorker();
