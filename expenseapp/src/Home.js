import React from 'react'
import AppNav from './AppNav'
import './Home.css'

class Home extends React.Component{

    render(){
        return(
            <div>
                <AppNav/>
                <h2 id='demotext' style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
                     Expense Tracker Application
               </h2>
            </div>
        )
    }
}

export default Home