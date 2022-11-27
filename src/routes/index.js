import { Route, Switch, Redirect } from 'react-router-dom';

import Welcome from '../components/Welcome';

import ProtectedHome from '../protected/ProtectedHome';

function Routes() {
  return (
      <Switch>
        <Route exact path="/home" component={ProtectedHome} />
        <Route exact path="/bookmark" component={ProtectedHome} />
        <Route exact path="/" component={Welcome} />
        <Route path="/*">
            <Redirect to="/" />
        </Route>
      </Switch>
  );
}

export default Routes;
