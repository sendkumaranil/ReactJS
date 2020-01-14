import React from 'react';
import { BrowserRouter as Router ,Switch,Route} from 'react-router-dom'
import Home from './Home'
import Expense from './Expense'
import Category from './Category'

class App extends React.Component {
  state={ }
  render(){
    return (
      <Router>
        <Switch>
            <Route path="/" exact={true} component={Home}/>
            <Route path="/categories" exact={true} component={Category}/>
            <Route path="/expense" exact={true} component={Expense}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
