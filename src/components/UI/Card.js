import React from "react";
import classes from './Card.module.css'

const Card = props => {
    return (
        <div className={`${classes.card} ${props.className}`}>
            {/**the props.children allows you to pass down any elements 
             * that are going to be be between the <Card></Card>
             */}
            {props.children}
        </div>
    );
}

export default Card;