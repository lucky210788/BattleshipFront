import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const LoginRoute = ({component: Component, isLogIn, ...rest}) => (
  <Route {...rest} render={matchProps => {
    if (isLogIn) {
      return <Redirect to="/"/>
    } else {
      return <Component {...matchProps}/>
    }
  }
  }/>
);

export default LoginRoute;