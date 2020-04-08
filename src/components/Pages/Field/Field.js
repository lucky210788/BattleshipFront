import React, {Component, Fragment} from 'react';
import Cell from '../Cell/Cell'
import './Field.scss'
import Winner from "./Winner/Winner";
import Letters from "./Letters/Letters";
import Figures from "./Figures/Figures";

export default class Field extends Component {
  render() {
    const {values, btnDisabled, handleSetValue, showWinner} = this.props;

    const cell = values.map((value) => {
      const cellProperty = Object.keys(value);
      return (
        <Cell
          cellClass={value[cellProperty]}
          id={cellProperty}
          key={cellProperty}
          btnDisabled={btnDisabled}
          handleSetValue={() => handleSetValue(cellProperty)}/>
      )
    });

    const field = values.length > 0 ? <Fragment>
        <div className="field-wrap">
          <Letters/>
          <Figures/>
          {showWinner ? <Winner/> : null}
          {cell}
        </div>
      </Fragment> :
      null;

    return field;
  }
}
