import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faUser,faPen,faAt, faPhone } from '@fortawesome/free-solid-svg-icons'
import {Link, withRouter} from 'react-router-dom'
import ExpenseAlert from './ExpenseAlert'
import passwordValidator from 'password-validator'
import {EXPENSE_SERVICE_BASE_ENDPOINT} from './constant'

const RegisterForm = props => {

	const [firstname,setFirstName] = useState('');
	const [lastname,setLastName] = useState('');
	const [emailId,setEmailId] = useState('');
	const [username,setUserName] = useState('');
	const [password,setPassword] = useState('');
	const [reenterpassword,setReEnterPassword] = useState('');
	const [mobilenumber,setMobileNumber] = useState('');
	const [fieldEmptyVisible,setFieldEmptyVisible] = useState(false);
	const [myError,setMyError] = useState('');
	
	const schema = new passwordValidator();
	const schemaUsername = new passwordValidator();
	schema
	.is().min(8)
	.is().max(15)
	.has().uppercase()
	.has().lowercase()
	.has().digits()
	.has().symbols()
	.has().not().spaces()

	schemaUsername
	.is().min(8)
	.is().max(55)
	.has().lowercase()
	.has().not().spaces()

	function formValidation(){
		
		if(firstname === '' || firstname.length < 3){
			setMyError('firstname empty or first name less than 3 characters');
			setFieldEmptyVisible(true);
			window.setTimeout(()=>{
				setFieldEmptyVisible(false);
			},2000);
			return false;
		}
		if(lastname === '' || lastname.length < 3){
			setMyError('lastname empty or lastname less than 3 characters');
			setFieldEmptyVisible(true);
			window.setTimeout(()=>{
				setFieldEmptyVisible(false);
			},2000);
			return false;
		}
		if(emailId === ''){
			setMyError('email empty');
			setFieldEmptyVisible(true);
			window.setTimeout(()=>{
				setFieldEmptyVisible(false);
			},2000);
			return false;
		}
		if(username === '' || username.length < 8){
			setMyError('username empty or username less than 8 characters');
			setFieldEmptyVisible(true);
			window.setTimeout(()=>{
				setFieldEmptyVisible(false);
			},2000);
			return false;
		}
		if(password === '' || password.length < 8){
			setMyError('Password empty or password less than 8 characters');
			setFieldEmptyVisible(true);
			window.setTimeout(()=>{
				setFieldEmptyVisible(false);
			},2000);
			return false;
		}
		if(reenterpassword === ''){
			setMyError('Re-Enter Password empty');
			setFieldEmptyVisible(true);
			window.setTimeout(()=>{
				setFieldEmptyVisible(false);
			},2000);
			return false;
		}
		if(reenterpassword !== password){
			setMyError('Re-Enter Password not match with password');
			setFieldEmptyVisible(true);
			window.setTimeout(()=>{
				setFieldEmptyVisible(false);
			},2000);
			return false;
		}
		if(!validateEmail(emailId)){
			return false;
		}
		if(!validateUsername(username)){
			return false;
		}
		if(!validatePassword(password)){
			return false;
		}
		if(!validateMobileNo(mobilenumber)){
			return false;
		}
		return true;
	}

	function validateEmail(email){
		var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(email)) {
			setMyError('Invalid emailid');
			setFieldEmptyVisible(true);
			window.setTimeout(()=>{
				setFieldEmptyVisible(false);
			},2000);
          return false;
        }
		return true;
	}

	function validateUsername(username){
		if(username.includes('@')){
			if(!validateEmail(username)){
				setMyError('username should be valid emailid');
				setFieldEmptyVisible(true);
				window.setTimeout(()=>{
					setFieldEmptyVisible(false);
				},2000);
			}
		}else{
			if (!username.match(/^[a-z]*[0-9]*$/)) {
				setMyError('username only accepts alphanumeric and valid emailid');
				setFieldEmptyVisible(true);
				window.setTimeout(()=>{
					setFieldEmptyVisible(false);
				},2000);
				return false;
			  }
			  if(!schemaUsername.validate(username)){
				setMyError('username: Max 55 characters,should not space');
				setFieldEmptyVisible(true);
				return false;
			  }
		}
		return true;
	}

	function validatePassword(password){
		if (!schema.validate(password)) {
			setMyError('Password: Minimum length 8,\n Maximum length 15,\nMust have uppercase letters,\n'+
			'Must have lowercase letters,\nMust have digits,\nShould not have spaces');
			setFieldEmptyVisible(true);
			/*window.setTimeout(()=>{
				setFieldEmptyVisible(false);
			},5000);*/
			return false;
		  }
		  return true;
	}

	function validateMobileNo(mobileno){
		if(!mobileno.match(/^[0-9]{10}$/)){
			setMyError('Invalid Mobile Number (allowed 10 digits)');
			setFieldEmptyVisible(true);
			window.setTimeout(()=>{
				setFieldEmptyVisible(false);
			},2000);
			return false;
		}
		return true;
	}

	const onDismiss = () =>{
		setFieldEmptyVisible(false);
	}

	function submitFormHandler(event){
		if(formValidation()){

			fetch(EXPENSE_SERVICE_BASE_ENDPOINT+'/api/register-user',{
				method:'POST',
				headers:{
					'Accept':'application/json',
					'Content-Type':'application/json',
					'Access-Contol-Allow-Origin':'*'
				},
				body: JSON.stringify({
					'firstname':firstname,
					'lastname':lastname,
					'email':emailId,
					'username':username,
					'password':password,
					'mobilenumber':mobilenumber
				})

			}).then((response) => response.json())
			.then(data => {
				let messagecode=data.message_code;
				if(messagecode === 'USER_AVAILABLE'){
					setMyError(data.message);
					setFieldEmptyVisible(true);
					window.setTimeout(()=>{
						setFieldEmptyVisible(false);
					},2000);
				}else{
					props.history.push("/login");
				}
			}).catch((error) =>{
				setMyError(error);
			});
		}
	}

    return(
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',marginTop:'50px'}}>
        <div className="container h-50">
            <div className="d-flex justify-content-center h-50">
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
							<input type="text" name="firstname" itemRef="firstname" className="form-control input_user" value={firstname} onChange={e => setFirstName(e.target.value)} placeholder="first name"/>
						</div>
                        <div className="input-group mb-1">
							<div className="input-group-append">
								<span className="input-group-text"><i><FontAwesomeIcon icon={faPen} /></i></span>
							</div>
							<input type="text" name="lastname" className="form-control input_user" value={lastname} onChange={e => setLastName(e.target.value)} placeholder="last name"/>
						</div>
                        <div className="input-group mb-1">
							<div className="input-group-append">
								<span className="input-group-text"><i><FontAwesomeIcon icon={faAt} /></i></span>
							</div>
							<input type="text" name="email" className="form-control input_user" value={emailId} onChange={e => setEmailId(e.target.value)} placeholder="email"/>
						</div>
						<div className="input-group mb-1">
							<div className="input-group-append">
								<span className="input-group-text"><i><FontAwesomeIcon icon={faPhone} /></i></span>
							</div>
							<input type="text" name="mobilenum" className="form-control input_user" value={mobilenumber} onChange={e => setMobileNumber(e.target.value)} placeholder="mobile number"/>
						</div>
						<div className="input-group mb-1">
							<div className="input-group-append">
								<span className="input-group-text"><i><FontAwesomeIcon icon={faUser} /></i></span>
							</div>
							<input type="text" name="username" className="form-control input_user" value={username} onChange={e => setUserName(e.target.value)} placeholder="username"/>
						</div>
						<div className="input-group mb-1">
							<div className="input-group-append">
								<span className="input-group-text"><i><FontAwesomeIcon icon={faKey} /></i></span>
							</div>
							<input type="password" name="pwd" className="form-control input_pass" value={password} onChange={e => setPassword(e.target.value)} placeholder="password"/>
						</div>
                        <div className="input-group mb-2">
							<div className="input-group-append">
								<span className="input-group-text"><i><FontAwesomeIcon icon={faKey} /></i></span>
							</div>
							<input type="password" name="repwd" className="form-control input_pass" value={reenterpassword} onChange={e => setReEnterPassword(e.target.value)} placeholder="re-enter password"/>
						</div>
						
						<div className="d-flex justify-content-center mt-2 login_container">
				 	        <button type="button" name="button" onClick={submitFormHandler} className="btn login_btn">Sign Up</button>
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
			<ExpenseAlert color='danger' message={myError} visible={fieldEmptyVisible} onDismiss={onDismiss}/>
        </div>
        </div>
    );
}

export default withRouter(RegisterForm);