import axios from 'axios'
import {EXPENSE_SERVICE_BASE_ENDPOINT,USER_NAME_SESSION_ATTRIBUTE} from '../constant'

class AuthenticationService{

    executeJwtAuthenication(username,password){

        return axios.post(EXPENSE_SERVICE_BASE_ENDPOINT+'/authenticate',{
            username,password
        });
    }

    registerSuccessfullLoginWithJwt(username,token){
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE,username);
        this.setupAxiosInterceptor(this.createJwtToken(token));
    }

    logout(){
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE);
    }

    isUserLoggedIn(){
        let user=sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE);
        return (user === null) ? false : true;
    }

    getLoggedInUserName(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE);

        return (user === null) ? 'User-Not-Found' : user;
    }

    createJwtToken(token){
        return 'Bearer '+token;
    }

    setupAxiosInterceptor(token){
        axios.interceptors.request.use((config) => {
            if(this.isUserLoggedIn()){
                config.headers.authorization = token;
            }
        });
    }
}

export default new AuthenticationService();