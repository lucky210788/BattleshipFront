import React, {Component, Fragment} from 'react';
import {Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {logIn} from './actions/actionCreator';
import LoginRoute from './components/Routes/LoginRoute/LoginRoute';
import PrivateRoute from './components/Routes/PrivateRoute/PrivateRoute';
import Login from './components/Pages/Login/Login';
import Home from './components/Pages/Home/Home';
import Cookies from 'universal-cookie';

import './App.scss';

const cookies = new Cookies();

class App extends Component {
  componentDidMount() {
    const token = cookies.get('token');
    if (token) {
      this.props.logIn();
    }
  }

  render() {
    const {isLogIn} = this.props;

    return (
      <Fragment>
        <Switch>
          <LoginRoute
            exact
            path="/login"
            component={Login}
            isLogIn={isLogIn}/>
          <PrivateRoute
            exact
            path="/"
            component={Home}
            isLogIn={isLogIn}/>
        </Switch>
      </Fragment>
    );
  }

}

function mapStateToProps({logIn: {isLogIn}}) {
  return {
    isLogIn
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logIn
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);