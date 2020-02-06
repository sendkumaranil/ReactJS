import React from 'react'
import ExpenseCard from './ExpenseCard'

const NotFound = () =>{

    return (
        <ExpenseCard title='Page Not Found' subtitle='404' text='Ops!! Looking page not found this site' textcolor='warning' homedisplay='true' newUserDisplay='false'/>
    );
}

export default NotFound;