import React from 'react'
import AppNav from './AppNav'

class Category extends React.Component{
    state={
        isLoading:true,
        Categories:[]
    }

    async componentDidMount(){
        this.setState(
            {isLoading:true}
        )
        const response=await fetch('http://localhost:8585/api/categories/');
        const body=await response.json();
        this.setState(
            {Categories:body,isLoading:false}
        )
    }

    render(){
        const{Categories,isLoading}=this.state;
        if(isLoading){
            return (<div>Loading...</div>);
        }
        return(
            <div>
                <AppNav/>
                <h2>Categories</h2>
                {
                    Categories.map( category =>
                            <div key={category.id} id={category.id}>
                                {category.name}
                            </div>
                    )
                }
            </div>
        )
    }
}

export default Category