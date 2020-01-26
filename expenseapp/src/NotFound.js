import React from 'react'

const NotFound = () =>{

    return (
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',marginTop:'50px'}}>
            <img src={process.env.PUBLIC_URL + "/expense.png"} className="brand_logo" alt="Logo"/>
            
            
        </div>
    );
}

export default NotFound;