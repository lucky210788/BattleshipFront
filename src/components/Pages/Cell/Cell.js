import React from 'react';
import './Cell.scss';


function Cell({cellClass, id, handleClickCell, handleSetValue, btnDisabled}) {
  const classes = `cell ${cellClass}`;

  return (
    <button
      type="button"
      className={classes}
      onClick={handleSetValue}
      disabled={btnDisabled}>
      <span className='for-miss'/>
    </button>
  );
}

export default Cell;