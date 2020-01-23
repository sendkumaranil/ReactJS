import React ,{ useState }from 'react'
import LoginForm from './LoginForm'


const LoginPage = (props) => {


    return(
       <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',marginTop:'50px'}}>
         <LoginForm />
       </div>
       );
}

export default LoginPage;