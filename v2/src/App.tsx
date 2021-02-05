import * as React from 'react';

import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import { EntryPage, MainPage, ShowcasePage } from './pages';


interface AppProps {}

const App: React.FC<AppProps> = props => {

  return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={EntryPage} />
          <Route path='/grapes/:gno' component={MainPage} />
          <Route path='/setting' component={ShowcasePage} />
        </Switch>
      </BrowserRouter>

  );
}

export default App;
