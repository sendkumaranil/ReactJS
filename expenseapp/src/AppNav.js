import React from 'react'
import {Nav,Navbar,NavItem,NavbarBrand,NavLink} from 'reactstrap'
import AuthenticationService from './service/AuthenticationService'
import { withRouter } from 'react-router-dom';

class AppNav extends React.Component{
    
    render(){
        
        const isUserLoggedIn=AuthenticationService.isUserLoggedIn();
        
        return(
            <div>
                <Navbar color='dark' dark>
                    <NavbarBrand href="/home">
                        <img src={process.env.PUBLIC_URL + "/expense.png"} className="brand_logo_home" alt="Logo"/>
                        &nbsp;&nbsp;Expense Tracker Application
                    </NavbarBrand>
                    <Nav className='ml-auto'>
                        <NavItem>
                            <NavLink href="/home">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            {(isUserLoggedIn) ? <NavLink href="/categories">Categories</NavLink> : ''} 
                        </NavItem>
                        <NavItem>
                            {(isUserLoggedIn) ? <NavLink href="/expense">Expense</NavLink> : ''}
                        </NavItem>
                        <NavItem>
                            {(isUserLoggedIn) ? <NavLink href="/logout">Log out</NavLink> : <NavLink href="/login">Log In</NavLink>}
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

export default withRouter(AppNav); 