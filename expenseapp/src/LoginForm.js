import React from 'react'
import './LoginForm.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faUser,faPenFancy,faEraser } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

const LoginForm = props =>{

    return (
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',marginTop:'50px'}}>
        <div className="container h-50">
            <div className="d-flex justify-content-center h-50">
                <div className="user_card">
                    <div className="d-flex justify-content-center">
                        <div className="brand_logo_container">
                            <img src={process.env.PUBLIC_URL + "/expense.png"} class="brand_logo" alt="Logo"/>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center form_container">
                    <form>
						<div className="input-group mb-3">
							<div className="input-group-append">
								<span className="input-group-text"><i><FontAwesomeIcon icon={faUser} /></i></span>
							</div>
							<input type="text" name="" className="form-control input_user" value="" placeholder="username"/>
						</div>
						<div className="input-group mb-2">
							<div className="input-group-append">
								<span className="input-group-text"><i><FontAwesomeIcon icon={faKey} /></i></span>
							</div>
							<input type="password" name="" className="form-control input_pass" value="" placeholder="password"/>
						</div>
						<div className="form-group">
							<div className="custom-control custom-checkbox">
								<input type="checkbox" className="custom-control-input" id="customControlInline" />
								<label className="custom-control-label" for="customControlInline">Remember me</label>
							</div>
						</div>
							<div className="d-flex justify-content-center mt-3 login_container">
				 	<button type="button" name="button" className="btn login_btn">Login</button>
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
        </div>
        </div>
    );
}

export default LoginForm;