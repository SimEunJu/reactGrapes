import React, { Component } from 'react';
import './App.css';
import {Provider} from 'react-redux';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import reduxStore from './store/confgure';

import {MainPage, EntryPage, ShowcasePage} from './pages';

const store = reduxStore;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Switch>
              <Route exact path='/' component={EntryPage}></Route>
              <Route path='/grapes/:gno' component={MainPage}></Route>
              <Route path='/setting' component={ShowcasePage}></Route>
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
