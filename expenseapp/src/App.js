import React from 'react';
import { BrowserRouter as Router ,Switch,Route} from 'react-router-dom'
import Home from './Home'
import Expense from './Expense'
import Category from './Category'
import LoginPage from './LoginPage'
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import ForgotPassword from './ForgotPassword';

class App extends React.Component {
  state={ }
  render(){
    return (
      <Router>
        <Switch>
            <Route path="/" exact={true} component={LoginPage}/>
            <Route path="/home" exact={true} component={Home}/>
            <Route path="/categories" exact={true} component={Category}/>
            <Route path="/expense" exact={true} component={Expense}/>
            <Route path="/login" exact={true} component={LoginForm}/>
            <Route path="/registeruser" exact={true} component={RegisterForm}/>
            <Route path="/forgotpassword" exact={true} component={ForgotPassword}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
