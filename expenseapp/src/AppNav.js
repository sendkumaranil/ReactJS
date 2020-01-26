import React from 'react'
import {Nav,Navbar,NavItem,NavbarBrand,NavLink} from 'reactstrap'

class AppNav extends React.Component{
    render(){
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
                            <NavLink href="/categories">Categories</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/expense">Expense</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/">Log out</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

export default AppNav