import React from 'react'
import './Buton.css'

const Button = props => {
    return (
        <button
            type="button"
            className={props.className}
            onClick={props.onClick}
            disabled={props.disabled}
        >{props.children}</button>
    )
};

export default Button