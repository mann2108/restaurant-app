import { Route, Switch, Redirect } from 'react-router-dom';

import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Switch>
      <Route exact path="/home" component={Dashboard} />
      <Route exact path="/bookmark" component={Dashboard} />
      <Route exact path="/" component={Welcome} />
      <Route path="/*">
          <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default App;
