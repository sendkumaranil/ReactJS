import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faUser,faPen,faAt } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

const RegisterForm = props => {

    return(
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',marginTop:'50px'}}>
        <div className="container h-100">
            <div className="d-flex justify-content-center h-100">
                <div className="user_card_register">
                    <div className="d-flex justify-content-center">
                        <div className="brand_logo_container">
                            <img src={process.env.PUBLIC_URL + "/expense.png"} className="brand_logo" alt="Logo"/>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center form_container">
                    <form>
                        <div className="input-group mb-1">
							<div className="input-group-append">
								<span className="input-group-text"><i><FontAwesomeIcon icon={faPen} /></i></span>
							</div>
							<input type="text" name="firstname" className="form-control input_user" value="" placeholder="first name"/>
						</div>
                        <div className="input-group mb-1">
							<div className="input-group-append">
								<span className="input-group-text"><i><FontAwesomeIcon icon={faPen} /></i></span>
							</div>
							<input type="text" name="lastname" className="form-control input_user" value="" placeholder="last name"/>
						</div>
                        <div className="input-group mb-1">
							<div className="input-group-append">
								<span className="input-group-text"><i><FontAwesomeIcon icon={faAt} /></i></span>
							</div>
							<input type="text" name="email" className="form-control input_user" value="" placeholder="email"/>
						</div>
						<div className="input-group mb-1">
							<div className="input-group-append">
								<span className="input-group-text"><i><FontAwesomeIcon icon={faUser} /></i></span>
							</div>
							<input type="text" name="username" className="form-control input_user" value="" placeholder="username"/>
						</div>
						<div className="input-group mb-1">
							<div className="input-group-append">
								<span className="input-group-text"><i><FontAwesomeIcon icon={faKey} /></i></span>
							</div>
							<input type="password" name="pwd" className="form-control input_pass" value="" placeholder="password"/>
						</div>
                        <div className="input-group mb-2">
							<div className="input-group-append">
								<span className="input-group-text"><i><FontAwesomeIcon icon={faKey} /></i></span>
							</div>
							<input type="password" name="repwd" className="form-control input_pass" value="" placeholder="re-enter password"/>
						</div>
						
						<div className="d-flex justify-content-center mt-2 login_container">
				 	        <button type="button" name="button" className="btn login_btn">Sign Up</button>
				        </div>
					</form>
                    </div>
                    <div className="mt-4">
					<div className="d-flex justify-content-center links" style={{color:'white'}}>
						Already have an account? 
                        <Link to={'/login'}>
                        <i><FontAwesomeIcon icon={faUser} /></i>
                            Sign In</Link>
					</div>
				</div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default RegisterForm;