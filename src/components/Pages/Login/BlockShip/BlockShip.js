import React from 'react';
import './BlockShip.scss';

class BlockShip extends React.Component {
  constructor() {
    super();
    this.state = {
      coordinates: [],
      fieldValues: [],
      wrongCoordinates: false,
      isValid: false,
      coordinatesIsSent: false
    }
  }

  checkNeighbors = (cellCoordinates) => {
    const XTempNum = parseInt(cellCoordinates.substring(1, 2));
    const neighbourLeft = `x${XTempNum - 1}${cellCoordinates.substring(2, 4)}`;
    const neighbourRight = `x${XTempNum + 1}${cellCoordinates.substring(2, 4)}`;
    const YTempNum = parseInt(cellCoordinates.substring(3, 4));
    const neighbourTop = `${cellCoordinates.substring(0, 2)}y${YTempNum - 1}`;
    const neighbourBottom = `${cellCoordinates.substring(0, 2)}y${YTempNum + 1}`;
    const neighbourTopRight = `x${XTempNum + 1}y${YTempNum - 1}`;
    const neighbourTopLeft = `x${XTempNum - 1}y${YTempNum - 1}`;
    const neighbourBottomRight = `x${XTempNum + 1}y${YTempNum + 1}`;
    const neighbourBottomLeft = `x${XTempNum - 1}y${YTempNum + 1}`;

    if (this.checkCell(neighbourLeft) + this.checkCell(neighbourRight) + this.checkCell(neighbourTop) + this.checkCell(neighbourBottom) + this.checkCell(neighbourTopRight) + this.checkCell(neighbourTopLeft) + this.checkCell(neighbourBottomRight) + this.checkCell(neighbourBottomLeft) === 8) {
      return true
    }
  };

  checkCell = (cell) => {
    let {tempValues} = this.props;
    let cellIsValid = 0;

    if (cell.length >= 5) {
      cellIsValid += 1;
    }

    tempValues.forEach(coord => {
      if (coord[cell] === 'empty') {
        cellIsValid += 1;
      }
    });

    return cellIsValid;
  };

  unlockButton = (coordinates) => {
    if (coordinates.every(elem => elem.length === 4)) {
      this.setState({
        isValid: true
      });
    }
  };

  handleChange = (event, i) => {
    let {tempValues} = this.props;
    let {coordinates, fieldValues} = this.state;
    const value = event.target.value.toUpperCase();

    if (value[1] && !Number.isInteger(parseInt(value[1]))) {
      this.setState({
        wrongCoordinates: true
      });
    } else {
      this.setState({
        wrongCoordinates: false
      });
    }

    const tempCoord = this.setCoordinates(value);

    tempValues.forEach(coord => {
      for (let prop in coord) {
        if (prop === tempCoord) {
          if (coord[prop] === 'empty') {
            if (this.checkNeighbors(tempCoord)) {
              if (coordinates[0] === '') {
                coordinates[i] = this.setCoordinates(value);

                this.unlockButton(coordinates);

                this.setState({
                  coordinates,
                  wrongCoordinates: false
                });
              }
              if (i > 0) {
                const coordinateX = coordinates[i - 1].substring(0, 2);
                const coordinateXTemp = this.setCoordinates(value).substring(0, 2);
                const coordinateY = coordinates[i - 1].substring(2, 4);
                const coordinateYTemp = this.setCoordinates(value).substring(2, 4);

                const coordinateXNum = parseInt(coordinates[i - 1].substring(1, 2));
                const coordinateXTempNum = parseInt(this.setCoordinates(value).substring(1, 2));
                const coordinateYNum = parseInt(coordinates[i - 1].substring(3, 4));
                const coordinateYTempNum = parseInt(this.setCoordinates(value).substring(3, 4));

                if (coordinateXTemp === coordinateX) {
                  if ((coordinateYTempNum + 1) === coordinateYNum || (coordinateYTempNum - 1) === coordinateYNum) {
                    coordinates[i] = this.setCoordinates(value);

                    this.unlockButton(coordinates);

                    this.setState({
                      coordinates,
                      wrongCoordinates: false
                    });
                  } else {
                    this.setState({
                      wrongCoordinates: true,
                      isValid: false
                    });
                  }
                } else if (coordinateYTemp === coordinateY) {
                  if ((coordinateXTempNum + 1) === coordinateXNum || (coordinateXTempNum - 1) === coordinateXNum) {
                    coordinates[i] = this.setCoordinates(value);

                    this.unlockButton(coordinates);

                    this.setState({
                      coordinates,
                      wrongCoordinates: false
                    });
                  } else {
                    this.setState({
                      wrongCoordinates: true,
                      isValid: false
                    });
                  }
                } else {
                  this.setState({
                    wrongCoordinates: true,
                    isValid: false
                  });
                }
              }
            } else {
              this.setState({
                wrongCoordinates: true,
                isValid: false
              });
            }
          } else {
            this.setState({
              wrongCoordinates: true,
              isValid: false
            });
          }
        }
      }
    });

    fieldValues[i] = value;

    this.setState({
      fieldValues
    });

  };

  setCoordinates = (value) => {
    let coordinateX;
    let coordinateY = value.slice(1);

    switch (value[0]) {
      case 'A':
        coordinateX = 'x0';
        break;
      case 'B':
        coordinateX = 'x1';
        break;
      case 'C':
        coordinateX = 'x2';
        break;
      case 'D':
        coordinateX = 'x3';
        break;
      case 'E':
        coordinateX = 'x4';
        break;
      case 'F':
        coordinateX = 'x5';
        break;
      case 'G':
        coordinateX = 'x6';
        break;
      case 'H':
        coordinateX = 'x7';
        break;
      case 'I':
        coordinateX = 'x8';
        break;
      case 'J':
        coordinateX = 'x9';
        break;
      default:
        this.setState({
          wrongCoordinates: true
        });
    }

    coordinateY = `y${coordinateY}`;
    return coordinateX + coordinateY;
  };

  transferCoordinates = () => {
    const {handleAddShip, shipRank} = this.props;
    const {coordinates} = this.state;

    this.setState({
      isValid: false,
      coordinatesIsSent: true
    });

    handleAddShip(coordinates, shipRank);
  };

  componentDidMount() {
    let {coordinates, fieldValues} = this.state;
    const {shipSize} = this.props;

    for (let i = 0; i < shipSize; i++) {
      coordinates.push('');
      fieldValues.push('');
    }

    this.setState({
      coordinates,
      fieldValues
    });
  }

  render() {
    const {shipName} = this.props;
    const {fieldValues, wrongCoordinates, isValid, coordinatesIsSent} = this.state;

    const coordinatesCells = fieldValues.map((cell, i) => {
      return <input type="text"
                    className="block-ship-coordinate"
                    value={cell}
                    onChange={(event) => this.handleChange(event, i)}
                    key={i}
                    maxLength="2"
                    disabled={coordinatesIsSent}/>
    });

    let ship;

    switch (shipName) {
      case 'first':
        ship = 'первого';
        break;
      case 'second':
        ship = 'второго';
        break;
      case 'third':
        ship = 'третьего';
        break;
      case 'fourth':
        ship = 'четвертого';
        break;
      default:
        ship = '';
    }

    return (
      <div className="block-ship">
        <div>
          <p className="block-ship-name">Координаты корабля {ship} ранга </p>
          <div className="block-coordinates">
            <div>
              {coordinatesCells}
            </div>
            {wrongCoordinates ? <p className="error-text">Неправильные координаты</p> : null}
          </div>
        </div>
        <button type="button"
                onClick={() => this.transferCoordinates()}
                className=" btn-main"
                disabled={!isValid}>ok
        </button>
      </div>
    );
  }
}

export default BlockShip;