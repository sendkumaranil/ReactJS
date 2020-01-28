import React from 'react';
import { BrowserRouter as Router ,Switch,Route} from 'react-router-dom'
import Home from './Home'
import Expense from './Expense'
import Category from './Category'
import LoginPage from './LoginPage'
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import ForgotPassword from './ForgotPassword';
import NotFound from './NotFound';
import AccessDenied from './AccessDenied'

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
            <Route path="/accessdenied" exact={true} component={AccessDenied}/>
            <Route path='*' exact={true} component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
