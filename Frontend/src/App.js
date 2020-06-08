import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './assets/style.css';
import Landing from './pages/Landing';
function App() {
  const [isAuth, setAuth] = useState(false);
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Landing} />
      </Switch>
    </Router>
  );
}

export default App;
