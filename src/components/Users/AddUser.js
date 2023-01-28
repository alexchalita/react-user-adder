import React, { useState, Fragment, useRef } from "react";
import Card from "../UI/Card";
import classes from './AddUser.module.css'
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

const AddUser = props => {
    const nameInputRef = useRef();
    const ageInputRef = useRef();

    const [error, setError] = useState();

    const addUserHandler = (event) => {
        // page doesn't reload
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredUserAge = ageInputRef.current.value;
        if (enteredName.trim().length === 0 
                || enteredUserAge.trim().length === 0){
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid name and age (non-empty values).'
            })
            return;
        }
        // the "+" forces the enteredAge to turn into an int
        // by default, all input values in DOM are parsed as strings
        if (+enteredUserAge < 1){
            setError({
                title: "Invalid age",
                message: "Please enter a valid age (> 0)."
            });
            return;
        }
        props.onAddUser(enteredName, enteredUserAge);
        // THE ONLY TIME YOU SHOULD USE REFs TO MANIPULATE THE DOM
        // IS TO RESET INPUTS. It can cause issues in other applications
        nameInputRef.current.value = '';
        ageInputRef.current.value = '';
    }

    const errorHandler = () => {
        setError(null);
    }


    return (
        <Fragment>
            {error && 
                <ErrorModal 
                    title={error.title} 
                    message={error.message}
                    onConfirm={errorHandler} 
                />
            }
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input 
                        id="username" 
                        type="text" 
                        ref={nameInputRef}
                    ></input>
                    <label htmlFor="age">Age (Years)</label>
                    <input 
                        id="age" 
                        type="number" 
                        ref={ageInputRef}
                    ></input>
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
    </Fragment>
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

// using refs to read values is called uncontrolled because their
// internal state, is not controlled by React. Using refs is good 
// for getting data and provides less code, but using the useState
// approach with handlers, values and setters is "cleaner", 
// especially because we "have to manipulate the DOM" using ref (BIG NO)
// using useState, is the controlled approach because the input
// field is controlled by React
export default AddUser;