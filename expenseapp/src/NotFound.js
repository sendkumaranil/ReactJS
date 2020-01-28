import React from 'react'
import ExpenseCard from './ExpenseCard'

const NotFound = () =>{

    return (
        <ExpenseCard title='Page Not Found' subtitle='404' text='Ops!! Looking page not found this site' textcolor='success'/>
    );
}

export default NotFound;