import React from 'react'
import {Nav,Navbar,NavItem,NavbarBrand,NavLink} from 'reactstrap'

class AppNav extends React.Component{
    render(){
        return(
            <div>
                <Navbar color='dark' dark expand='md'>
                    <NavbarBrand href="/">
                        Expense Tracker Application
                    </NavbarBrand>
                    <Nav className='ml-auto'>
                        <NavItem>
                            <NavLink href="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/categories">Categories</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/expense">Expense</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

export default AppNav