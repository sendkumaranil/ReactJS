import React, { useEffect } from 'react'
import ExpenseCard from './ExpenseCard'
import AuthenticationService from './service/AuthenticationService'

const Logout = props =>{

    useEffect(() => {
        AuthenticationService.logout();
    });

    return (
        <ExpenseCard title='Thank You! Good Day!!' subtitle='Logged Out' text='you have logged out, click to Sign In' textcolor='warning' homedisplay='false'/>
    );
}

export default Logout;