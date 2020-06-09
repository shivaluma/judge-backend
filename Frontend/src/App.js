import React, { useState, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './assets/style.css';
import Landing from './pages/Landing';
import Fallback from './components/UI/Fallback';
const Login = React.lazy(
  () =>
    new Promise((resolve, _) => {
      setTimeout(() => resolve(import('./pages/Login')), 1000);
    })
);
function App() {
  const [isAuth, setAuth] = useState(false);
  return (
    <>
      <Router>
        <Switch>
          <Route path='/' exact component={Landing} />
          <Route
            path='/accounts/login'
            render={() => (
              <Suspense fallback={<Fallback />}>
                <Login isLogin={true} />
              </Suspense>
            )}
          />
          <Route
            path='/accounts/signup'
            render={() => (
              <Suspense fallback={<Fallback />}>
                <Login isLogin={false} />
              </Suspense>
            )}
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;
