import React from 'react'
import ExpenseCard from './ExpenseCard'

const AccessDenied = (props) =>{

    return (
        <ExpenseCard title='Access Denied' subtitle='401' text='Ops!! unauthorized access the resource' textcolor='danger' homedisplay='true' newUserDisplay='false'/>
    );
}

export default AccessDenied;