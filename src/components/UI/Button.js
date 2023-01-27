import React from "react";
import classes from './Button.module.css';

const Button = props => {
    return (
        <button 
            className={classes.button}
            type={props.type || 'button' /*if props.type is not defined, it will use 'button' as a fallback*/}
            onClick={props.onClick}
        >
                {props.children /*to access the text that should be displayed on the button, SINCE it 
                                exists between the opening <Button>TEXT IS HERE</Button>*, use props.children*/}
        </button>
    );
}

export default Button;