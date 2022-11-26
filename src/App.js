import { Route, Switch, Redirect } from 'react-router-dom';

import Welcome from './pages/Welcome';
import Home from './pages/Home';

function App() {
  return (
    <> 
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/" component={Welcome} />
        <Route path="/*">
            <Redirect to="/" />
        </Route>
      </Switch>
    </>
  );
}

export default App;
