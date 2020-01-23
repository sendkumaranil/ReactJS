import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt,faUser, faEraser } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

const ForgotPassword = props =>{

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
								<span className="input-group-text"><i><FontAwesomeIcon icon={faAt} /></i></span>
							</div>
							<input type="text" name="email" className="form-control input_user" value="" placeholder="enter email"/>
						</div>
                        <div className="d-flex justify-content-center mt-3 login_container">
                            <button type="button" name="button" className="btn login_btn"><i><FontAwesomeIcon icon={faEraser} /></i>Reset Password</button>
                        </div>
					</form>
                    </div>
                    <div className="mt-4">
					<div className="d-flex justify-content-center links">
                        <Link to={'/login'}>
                        <i><FontAwesomeIcon icon={faUser} /></i>
                            Sign In
                            </Link>
					</div>
				</div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default ForgotPassword;