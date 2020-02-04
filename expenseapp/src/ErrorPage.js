import React from 'react'
import AppNav from './AppNav'

const ErrorPage = (props) => {

    return(
        <div>
            <AppNav/>
            <div>
                {props.errorMessage}
            </div>
        </div>
    );
}

export default ErrorPage;