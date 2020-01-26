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
               <footer>
                   Copy right 2020 Anil Kumar Expense Tracker Application
               </footer>
            </div>
        )
    }
}

export default Home