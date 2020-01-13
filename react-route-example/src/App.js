import React from 'react';
import {BrowserRouter as Router ,Switch,Link,Route} from 'react-router-dom'
import './App.css';
import Home from './components/Home'
import Contact from './components/Contact'
import About from './components/About'


function App() {
  return (
    <React.Fragment>
    <header>
    <Router>
      <div>
        <h2>Morya Online Shopping</h2>
        </div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <ul className="navbar-nav mr-auto">
          <li><Link to={'/'} activeClassName="active">Home</Link></li>
          <li><Link to={'/about'} activeClassName="active">About</Link></li>
          <li><Link to={'/contact'} activeClassName='active' >Contact</Link></li>
        </ul>
      </nav>
      <hr/>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route  path='/about' component={About}/>
        <Route  path='/contact' component={Contact}/>
      </Switch>
    </Router>
    </header>
    
    </React.Fragment>
  );
}

export default App;
