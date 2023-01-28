import React, { useState } from "react";
import Card from "../UI/Card";
import classes from './AddUser.module.css'
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

const AddUser = props => {
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredAge, setEnteredAge] = useState('');
    const [error, setError] = useState();

    const addUserHandler = (event) => {
        // page doesn't reload
        event.preventDefault();
        if (enteredUsername.trim().length === 0 
                || enteredAge.trim().length === 0){
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid name and age (non-empty values).'
            })
            return;
        }
        // the "+" forces the enteredAge to turn into an int
        // by default, all input values in DOM are parsed as strings
        if (+enteredAge < 1){
            setError({
                title: "Invalid age",
                message: "Please enter a valid age (> 0)."
            });
            return;
        }
        props.onAddUser(enteredUsername, enteredAge);
        setEnteredUsername('');
        setEnteredAge('');
    }

    const usernameChangeHandler = (event) => {
        setEnteredUsername(event.target.value);
    }

    const ageChangeHandler = (event) => {
        setEnteredAge(event.target.value);
    }

    const errorHandler = () => {
        setError(null);
    }


    return (
        <div>
            {error && 
                <ErrorModal 
                    title={error.title} 
                    message={error.message}
                    onConfirm={errorHandler} 
                />}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input 
                        id="username" 
                        type="text" 
                        onChange={usernameChangeHandler}
                        value={enteredUsername}
                    ></input>
                    <label htmlFor="age">Age (Years)</label>
                    <input 
                        id="age" 
                        type="number" 
                        onChange={ageChangeHandler}
                        value={enteredAge}
                    ></input>
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
    </div>
    );
}

// the <Card></Card> component is a custom component that does NOT
// have the default html properties (className, id, style), so in
// order for them to work, the className needs to be passed in 
// as a prop and then injected using template literal `${} ${}` in
// the defined class

// the 'value' tag in HTML, which refers to the enteredValue, will 
// reflect the snapshot that is set in the userHandler. So once the
// submit button is clicked, the (onSubmit) and the addUserHandler
// method is called, it will clear both fields
export default AddUser;