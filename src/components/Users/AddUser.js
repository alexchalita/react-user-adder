import React, { useState } from "react";
import Card from "../UI/Card";
import classes from './AddUser.module.css'
import Button from "../UI/Button";

const AddUser = props => {
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredAge, setEnteredAge] = useState('');

    const addUserHandler = (event) => {
        // page doesn't reload
        event.preventDefault();
        console.log(enteredUsername);
        console.log(enteredAge);
    }

    const usernameChangeHandler = (event) => {
        setEnteredUsername(event.target.value);
    }

    const ageChangeHandler = (event) => {
        setEnteredAge(event.target.value);
    }

    return (
    <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
            <label htmlFor="username">Username</label>
            <input id="username" type="text" onChange={usernameChangeHandler}></input>
            <label htmlFor="age">Age (Years)</label>
            <input id="age" type="number" onChange={ageChangeHandler}></input>
            <Button type="submit">Add User</Button>
        </form>
    </Card>
    );
}

// the <Card></Card> component is a custom component that does NOT
// have the default html properties (className, id, style), so in
// order for them to work, the className needs to be passed in 
// as a prop and then injected using template literal `${} ${}` in
// the defined class
export default AddUser;