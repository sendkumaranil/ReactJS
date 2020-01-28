import React, { useState, useRef, useEffect } from 'react'
import './LoginForm.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faUser,faPenFancy,faEraser } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import ExpenseAlert from './ExpenseAlert'
import AuthenticationService from './service/AuthenticationService'

const LoginForm = props =>{
	const [username,setUsername] = useState('');
	const [passwd,setPasswd] = useState('');
	const [fieldEmptyVisible,setFieldEmptyVisible] = useState(false);
	const [invalidCreddVisible,setInvalidCreds] = useState(false);

	const usernameInputRef=useRef();
	const userpasswordInputRef=useRef();
	
	useEffect(() => AuthenticationService.logout());

	function handleUsernameChange(event){
		event.preventDefault();
		let username=event.target.value;
		setUsername(username);
	}

	function handlePasswordChange(event){
		event.preventDefault();
		let password=event.target.value;
		setPasswd(password);
	}

	function handleLogIn(event){
		event.preventDefault();
		if(username === "" || passwd === ""){
			setFieldEmptyVisible(true);
			window.setTimeout(()=>{
				setFieldEmptyVisible(false);
			},2000);
		}else{
			validateUserNamePassword(username,passwd);
		}
	}

	function validateUserNamePassword(username,password){
		
		AuthenticationService.executeJwtAuthenication(username,password)
		.then((response) => {
			let token = response.data.token;
			AuthenticationService.registerSuccessfullLoginWithJwt(username,token);
			props.history.push("/home");
		})
		.catch((error) =>{
			setInvalidCreds(true);
			window.setTimeout(() =>{
				setInvalidCreds(false);
			},2000);
			userpasswordInputRef.current.value='';
			usernameInputRef.current.focus();
		});
	}

	const onDismiss = () =>{
		setFieldEmptyVisible(false);
	}

    return (
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',marginTop:'50px'}}>
        <div className="container h-50">
            <div className="d-flex justify-content-center h-50">
                <div className="user_card">
                    <div className="d-flex justify-content-center">
                        <div className="brand_logo_container">
                            <img src={process.env.PUBLIC_URL + "/expense.png"} className="brand_logo" alt="Logo"/>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center form_container">
                    <form>
						<div className="input-group mb-3">
							<div className="input-group-append">
								<span className="input-group-text"><i><FontAwesomeIcon icon={faUser} /></i></span>
							</div>
							<input type="text" name="username" onChange={handleUsernameChange} className="form-control input_user" placeholder="username" ref={usernameInputRef} autoFocus={true}/>
						</div>
						<div className="input-group mb-2">
							<div className="input-group-append">
								<span className="input-group-text"><i><FontAwesomeIcon icon={faKey} /></i></span>
							</div>
							<input type="password" name="passwd" onChange={handlePasswordChange} className="form-control input_pass" placeholder="password" ref={userpasswordInputRef}/>
						</div>
						<div className="form-group">
							<div className="custom-control custom-checkbox">
								<input type="checkbox" className="custom-control-input" id="customControlInline" />
								<label className="custom-control-label" htmlFor="customControlInline">Remember me</label>
							</div>
						</div>
							<div className="d-flex justify-content-center mt-3 login_container">
				 	<button type="button" name="btnLogin" onClick={handleLogIn} className="btn login_btn">Login</button>
				   </div>
					</form>
                    </div>
                    <div className="mt-4">
					<div className="d-flex justify-content-center links" style={{color:'white'}}>
						Don't have an account? 
                        <Link to={'/registeruser'}>
                        <i><FontAwesomeIcon icon={faPenFancy} /></i>
                            Sign Up</Link>
					</div>
					<div className="d-flex justify-content-center links">
                        <Link to={'/forgotpassword'}>Forgot your password?
                        <i><FontAwesomeIcon icon={faEraser} /></i>
                        </Link>
					</div>
				</div>
                </div>
            </div>
			<ExpenseAlert color='danger' message='username and password cannot be empty' visible={fieldEmptyVisible} onDismiss={onDismiss}/>
			<ExpenseAlert color='danger' message='invalid username and password' visible={invalidCreddVisible} onDismiss={onDismiss}/>
        </div>
        </div>
    );
}

export default LoginForm;