import { Route, Switch, Redirect } from 'react-router-dom';

import Welcome from '../components/Welcome';
import Home from '../components/Home';

function Routes() {
  return (
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/bookmark" component={Home} />
        <Route exact path="/" component={Welcome} />
        <Route path="/*">
            <Redirect to="/" />
        </Route>
      </Switch>
  );
}

export default Routes;
