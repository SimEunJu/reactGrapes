import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import { EntryPage, MainPage, ShowcasePage } from './pages';
import reduxStore from './store/confgure';

const store = reduxStore;

interface AppProps {}

const App: React.FC<AppProps> = props => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={EntryPage} />
          <Route path='/grapes/:gno' component={MainPage} />
          <Route path='/setting' component={ShowcasePage} />
        </Switch>
      </BrowserRouter>
    </Provider>

  );
}

export default App;
