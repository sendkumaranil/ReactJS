import React from 'react'
import ExpenseCard from './ExpenseCard'

const AccessDenied = (props) =>{

    return (
        <ExpenseCard title='Access Denied' subtitle='401' text='unauthorized access the resource' textcolor='danger'/>
    );
}

export default AccessDenied;