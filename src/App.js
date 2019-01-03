import React, { Component } from 'react';
import './App.css';
import {Provider} from 'react-redux';
import reduxStore from './store/confgure';

import GrapeWrapperContainer from './containers/GrapeWrapperContainer';
import UserInput from './components/UserInput';
import Header from './components/Header';

const store = reduxStore;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header />
          
          <GrapeWrapperContainer />
        </div>
      </Provider>
    );
  }
}

export default App;
