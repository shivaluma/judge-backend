import React, { useState, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './assets/style.css';
import Landing from './pages/Landing';
import Fallback from './components/UI/Fallback';
const Login = React.lazy(() => import('./pages/Login'));
function App() {
  const [isAuth, setAuth] = useState(false);
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Landing} />
        <Route
          path='/accounts/login'
          render={() => (
            <Suspense fallback={<Fallback />}>
              <Login />
            </Suspense>
          )}
        />
      </Switch>
    </Router>
  );
}

export default App;
