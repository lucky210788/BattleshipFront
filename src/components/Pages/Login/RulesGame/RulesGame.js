import React from 'react';
import './RulesGame.scss';

function RulesGame() {
  return (
    <div className="block-rules-game">
      <div>
        <p>Разместите на поле<br/>ваши корабли</p>
        <div className="ship-example">
          <p>1 x </p>
          <div className="ship-wrap">
            <div className="line"/>
            <div className="line"/>
            <div className="line"/>
          </div>
        </div>
        <div className="ship-example">
          <p>2 x </p>
          <div className="ship-wrap">
            <div className="line"/>
            <div className="line"/>
          </div>
        </div>
        <div className="ship-example">
          <p>3 x </p>
          <div className="ship-wrap">
            <div className="line"/>
          </div>
        </div>
        <div className="ship-example">
          <p>4 x </p>
          <div className="ship-wrap"/>
        </div>
      </div>
      <div>
        <p>Подсказка: так<br/>размещать корабли<br/>нельзя</p>
        <div className="ship-placement-wrap">
          <div className="ship-placement-1">
            <div className="ship-wrap"/>
            <div className="ship-wrap"/>
          </div>
          <div className="ship-placement-2">
            <div className="ship-wrap"/>
            <div className="ship-wrap"/>
          </div>
          <div className="ship-placement-3">
            <div className="ship-wrap"/>
            <div className="ship-wrap"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RulesGame;