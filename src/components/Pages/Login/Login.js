import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {logIn} from "../../../actions/actionCreator";
import openSocket from 'socket.io-client';
import Cookies from 'universal-cookie';
import Button from '../Button/Button';
import Field from "../Field/Field";
import BlockShip from "./BlockShip/BlockShip";

import './Login.scss';
import RulesGame from "./RulesGame/RulesGame";

const cookies = new Cookies();
const socket = openSocket('http://localhost:8000');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [
        {x0y0: 'empty'},
        {x1y0: 'empty'},
        {x2y0: 'empty'},
        {x3y0: 'empty'},
        {x4y0: 'empty'},
        {x5y0: 'empty'},
        {x6y0: 'empty'},
        {x7y0: 'empty'},
        {x8y0: 'empty'},
        {x9y0: 'empty'},
        {x0y1: 'empty'},
        {x1y1: 'empty'},
        {x2y1: 'empty'},
        {x3y1: 'empty'},
        {x4y1: 'empty'},
        {x5y1: 'empty'},
        {x6y1: 'empty'},
        {x7y1: 'empty'},
        {x8y1: 'empty'},
        {x9y1: 'empty'},
        {x0y2: 'empty'},
        {x1y2: 'empty'},
        {x2y2: 'empty'},
        {x3y2: 'empty'},
        {x4y2: 'empty'},
        {x5y2: 'empty'},
        {x6y2: 'empty'},
        {x7y2: 'empty'},
        {x8y2: 'empty'},
        {x9y2: 'empty'},
        {x0y3: 'empty'},
        {x1y3: 'empty'},
        {x2y3: 'empty'},
        {x3y3: 'empty'},
        {x4y3: 'empty'},
        {x5y3: 'empty'},
        {x6y3: 'empty'},
        {x7y3: 'empty'},
        {x8y3: 'empty'},
        {x9y3: 'empty'},
        {x0y4: 'empty'},
        {x1y4: 'empty'},
        {x2y4: 'empty'},
        {x3y4: 'empty'},
        {x4y4: 'empty'},
        {x5y4: 'empty'},
        {x6y4: 'empty'},
        {x7y4: 'empty'},
        {x8y4: 'empty'},
        {x9y4: 'empty'},
        {x0y5: 'empty'},
        {x1y5: 'empty'},
        {x2y5: 'empty'},
        {x3y5: 'empty'},
        {x4y5: 'empty'},
        {x5y5: 'empty'},
        {x6y5: 'empty'},
        {x7y5: 'empty'},
        {x8y5: 'empty'},
        {x9y5: 'empty'},
        {x0y6: 'empty'},
        {x1y6: 'empty'},
        {x2y6: 'empty'},
        {x3y6: 'empty'},
        {x4y6: 'empty'},
        {x5y6: 'empty'},
        {x6y6: 'empty'},
        {x7y6: 'empty'},
        {x8y6: 'empty'},
        {x9y6: 'empty'},
        {x0y7: 'empty'},
        {x1y7: 'empty'},
        {x2y7: 'empty'},
        {x3y7: 'empty'},
        {x4y7: 'empty'},
        {x5y7: 'empty'},
        {x6y7: 'empty'},
        {x7y7: 'empty'},
        {x8y7: 'empty'},
        {x9y7: 'empty'},
        {x0y8: 'empty'},
        {x1y8: 'empty'},
        {x2y8: 'empty'},
        {x3y8: 'empty'},
        {x4y8: 'empty'},
        {x5y8: 'empty'},
        {x6y8: 'empty'},
        {x7y8: 'empty'},
        {x8y8: 'empty'},
        {x9y8: 'empty'},
        {x0y9: 'empty'},
        {x1y9: 'empty'},
        {x2y9: 'empty'},
        {x3y9: 'empty'},
        {x4y9: 'empty'},
        {x5y9: 'empty'},
        {x6y9: 'empty'},
        {x7y9: 'empty'},
        {x8y9: 'empty'},
        {x9y9: 'empty'}
      ],
      ships: [],
      shipsValid: false,
    };
  }

  shipsValidate = () => {
    const values = this.state.values;
    let count = 0;

    values.forEach(value => {
      for (let val in value) {
        if (value[val] === 'empty ship') {
          count += 1;
        }
      }
    });

    let shipsValid = false;

    if (count === 20) {
      shipsValid = true;
    }

    this.setState({
      shipsValid
    })
  };

  loginHandler = () => {
    const user = {
      values: this.state.values,
      ships: this.state.ships
    };

    this.login(JSON.stringify(user))
  };

  login = (data) => {
    socket.emit('login', data, (error, data) => {
      if (error) {
        console.error(error)
      } else {
        const {logIn} = this.props;
        const userData = JSON.parse(data);
        cookies.set('token', userData.token, {path: '/'});
        logIn();
      }
    });
  };

  handleAddShip = (shipCoordinates) => {
    let values = this.state.values;

    shipCoordinates.forEach(coordinate => {
      values.forEach(cell => {
        for (let val in cell) {
          if (coordinate === val) {
            cell[val] += ' ship';
          }
        }
      });
    });

    let ships = this.state.ships;
    let ship = {};
    shipCoordinates.forEach(coord => {
      ship[coord] = 'ship';
    });
    ships.push(ship);

    this.setState({
      values,
      ships
    }, () => {
      this.shipsValidate();
    });
  };

  componentDidMount() {
    socket.on('connect', function () {
      console.log('connect');
    });
  }

  render() {
    const {values, shipsValid} = this.state;

    return (
      <div className="container">
        <div>
          <div>
            <BlockShip shipName={'first'}
                       shipRank={'firstRankShip0'}
                       shipSize={4}
                       handleAddShip={this.handleAddShip}
                       tempValues={values}/>
            <BlockShip shipName={'second'}
                       shipRank={'secondRankShip0'}
                       shipSize={3}
                       handleAddShip={this.handleAddShip}
                       tempValues={values}/>
            <BlockShip shipName={'second'}
                       shipRank={'secondRankShip1'}
                       shipSize={3}
                       handleAddShip={this.handleAddShip}
                       tempValues={values}/>
            <BlockShip shipName={'third'}
                       shipRank={'thirdRankShip0'}
                       shipSize={2}
                       handleAddShip={this.handleAddShip}
                       tempValues={values}/>
            <BlockShip shipName={'third'}
                       shipRank={'thirdRankShip1'}
                       shipSize={2}
                       handleAddShip={this.handleAddShip}
                       tempValues={values}/>
            <BlockShip shipName={'third'}
                       shipRank={'thirdRankShip2'}
                       shipSize={2}
                       handleAddShip={this.handleAddShip}
                       tempValues={values}/>
            <BlockShip shipName={'fourth'}
                       shipRank={'fourthRankShip0'}
                       shipSize={1}
                       handleAddShip={this.handleAddShip}
                       tempValues={values}/>
            <BlockShip shipName={'fourth'}
                       shipRank={'fourthRankShip1'}
                       shipSize={1}
                       handleAddShip={this.handleAddShip}
                       tempValues={values}/>
            <BlockShip shipName={'fourth'}
                       shipRank={'fourthRankShip2'}
                       shipSize={1}
                       handleAddShip={this.handleAddShip}
                       tempValues={values}/>
            <BlockShip shipName={'fourth'}
                       shipRank={'fourthRankShip3'}
                       shipSize={1}
                       handleAddShip={this.handleAddShip}
                       tempValues={values}/>
          </div>

        </div>
        <div className="rules-field">
          <RulesGame/>
        <Field btnDisabled={true}
               values={values}/>
        </div>
        <Button
          disabled={!shipsValid}
          className={'btn-main'}
          onClick={this.loginHandler}
        >Играть</Button>

      </div>
    );
  }
}

function mapStateToProps({users: {users}}) {
  return {
    users
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logIn
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);