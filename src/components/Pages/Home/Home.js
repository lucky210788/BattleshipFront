import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {loadUsers, resetLoading, logOut} from "../../../actions/actionCreator";
import Field from "../Field/Field";
import openSocket from 'socket.io-client';
import Cookies from 'universal-cookie';
import Loader from "./Loader/Loader";
import Button from "../Button/Button";

import './Home.scss';

const socket = openSocket('http://localhost:8000');
const cookies = new Cookies();

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: cookies.get('token'),
      player: [],
      opponent: [],
      yourTurn: false,
      playerShipsLeft: 10,
      opponentShipsLeft: 10
    };
  }

  handleSetValue = (index) => {
    const playerMove = {
      token: this.state.token,
      cell: index
    };

    socket.emit('move', JSON.stringify(playerMove));

    socket.on('move', data => {
      const {loadUsers} = this.props;
      loadUsers(JSON.parse(data.users), JSON.parse(data.remainingShips));
      this.takeCoordinatesShips();
      this.findAmountEnemyRemaining();
    });
  };

  componentDidMount() {
    socket.on('connect', () => {
      console.log('connect');
    });
    socket.on('disconnect', () => {
      console.log('disconnect');
    });

    this.props.resetLoading();

    socket.emit('getShips', {token: this.state.token}, (error, data) => {
      if (error) {
        console.error(error)
      }
    });

    socket.on('getShips', data => {
      const {loadUsers} = this.props;
      loadUsers(JSON.parse(data.data), JSON.parse(data.remainingShips));
      this.takeCoordinatesShips();
      this.findAmountEnemyRemaining();
    });

    socket.on('move', data => {
      const {loadUsers} = this.props;
      loadUsers(JSON.parse(data.users), JSON.parse(data.remainingShips));
      this.takeCoordinatesShips();
      this.findAmountEnemyRemaining();
    });
  }

  takeCoordinatesShips = () => {
    const {users} = this.props;

    if (users[0].token === this.state.token) {
      this.setState({
        player: users[0].ships,
        yourTurn: users[0].yourTurn
      });
      if (users[1]) {
        this.clearShips(users[1].ships);
        this.setState({
          opponent: users[1].ships
        })
      }
    } else if (users[1].token === this.state.token) {
      this.clearShips(users[0].ships);
      this.setState({
        player: users[1].ships,
        opponent: users[0].ships,
        yourTurn: users[1].yourTurn
      });
    }
  };

  findAmountEnemyRemaining = () => {
    const {remainingShips} = this.props;

    if (remainingShips[0].token === this.state.token) {
      this.setState({
        playerShipsLeft: remainingShips[0].ships.length
      });
      if (remainingShips[1]) {
        this.setState({
          opponentShipsLeft: remainingShips[1].ships.length
        });
      }
    } else if (remainingShips[1].token === this.state.token) {
      this.setState({
        playerShipsLeft: remainingShips[1].ships.length,
        opponentShipsLeft: remainingShips[0].ships.length
      });
    }
  };

  clearShips = (ships) => {
    const re = /ship/gi;

    ships.forEach(ship => {
      for (var key in ship) {
        ship[key] = ship[key].replace(re, '');
      }
    })
  };

  onLogOut = () => {
    cookies.remove('token');
    const {logOut} = this.props;
    logOut();
    socket.emit('logout', this.state.token);
  };

  render() {
    const {player, opponent, yourTurn, playerShipsLeft, opponentShipsLeft} = this.state;
    const {isLoading} = this.props;

    if (isLoading) {
      return <Loader/>
    }

    return (
      <div className="container">
        <header className="header">
          <p className="who-walks">{yourTurn ? 'Ваш ход' : 'Ход противника'}</p>
          <Button className={'btn-main'}
                  onClick={this.onLogOut}>Выйти
          </Button>
        </header>
        <div className="playing-field">
          <div>
            <p className="field-name">Моё поле</p>
            <p>Осталось кораблей: {playerShipsLeft} из 10</p>
            <Field
              values={player}
              btnDisabled={true}
              showWinner={opponentShipsLeft === 0}
            />
          </div>
          <div>
            <p className="field-name">Противник</p>
            <p>Осталось кораблей: {opponentShipsLeft} из 10</p>
            <Field
              values={opponent}
              btnDisabled={!yourTurn || opponentShipsLeft === 0}
              showWinner={playerShipsLeft === 0}
              handleSetValue={this.handleSetValue}/>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({users: {users, isLoading, remainingShips}}) {
  return {
    users,
    isLoading,
    remainingShips
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadUsers,
    resetLoading,
    logOut
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);