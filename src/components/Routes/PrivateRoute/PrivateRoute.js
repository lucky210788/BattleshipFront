import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({component: Component, isLogIn, ...rest}) => (
  <Route {...rest} render={matchProps => {
    if (!isLogIn) {
      return <Redirect to="/login"/>
    } else {
      return <Component {...matchProps}/>
    }
  }
  }/>
);

export default PrivateRoute;