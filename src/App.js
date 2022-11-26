import { Route, Switch, Redirect } from 'react-router-dom';

import Welcome from './pages/Welcome';
import Home from './pages/Home';

function App() {
  return (
    <div className="App"> 
      <Switch>
        <Route component={Welcome} path="/welcome" exact />
        <Route component={Home} path="/home" exact />
        <Route exact path="/*">
          <Redirect to="/Welcome" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
