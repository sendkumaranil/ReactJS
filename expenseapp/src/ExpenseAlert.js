import React from 'react'
import {Alert} from 'reactstrap'

const ExpenseAlert = props =>{

    return (
        <Alert color={props.color} isOpen={props.visible} toggle={props.onDismiss} fade={false} className='user_alert'>
            {props.message}
        </Alert>
    );

}

export default ExpenseAlert;