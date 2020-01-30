import React from 'react'
import AppNav from './AppNav'
import {Button,Input,Modal, ModalHeader, ModalBody, ModalFooter,Spinner} from 'reactstrap'
import AuthenticationService from './service/AuthenticationService'
import { withRouter } from 'react-router-dom'

class Category extends React.Component{
    state={
        isLoading:true,
        Categories:[],
        modal:false,
        maxId:0,
        catName:'',
        jwtToken:''
    }
    constructor(props){
        super(props);
        this.toggle=this.toggle.bind(this);
        this.handleFormSubmit=this.handleFormSubmit.bind(this);
        this.handleChangeName=this.handleChangeName.bind(this);
        this.loadCategories=this.loadCategories.bind(this);
    }

    async loadCategories(jwttoken){
        this.setState(
            {isLoading:true}
        )
        console.log('auth token: '+this.state.jwtToken);
        let body;
        await fetch('http://localhost:8585/api/categories/',{
            method: 'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*',
                'Authorization':jwttoken
            }
        }).then((response) => response.json())
        .then((catdata) => {
            const body=catdata;
            const maxcatId= body.reduce((max, p) => p.id > max ? p.id : max, body[0].id);
            this.setState(
                {
                    Categories:body,
                    isLoading:false,
                    maxId:maxcatId
                }
            )
        }).catch((error) => {
            console.log(error);
            this.props.history.push('/accessdenied');
        });
    }

    async componentDidMount(){
        if(AuthenticationService.isUserLoggedIn()){
            let token=AuthenticationService.getJwtToken();
            this.setState({jwtToken:token});
            this.loadCategories(token);
        }
    }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
        console.log('toggle:'+this.state.modal)
      }

    async handleChangeName(event){
        this.setState(
            {catName:event.target.value}
        );
    }

    async handleFormSubmit(event){
        event.preventDefault();
        const newcatId=(this.state.maxId)+1;
        const newcatname=this.state.catName;
        
        const catBody={
            id:newcatId,
            name:newcatname
        }
        
        await fetch('http://localhost:8585/api/categories/',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(catBody)
        });
        this.setState({
            modal: !this.state.modal
        });

        this.loadCategories();
    }

    render(){
        const{Categories,isLoading}=this.state;
        if(isLoading){
            return (<div><AppNav/><h2>Loading 
            <Spinner type="grow" color="primary" />
            <Spinner type="grow" color="warning" />
            <Spinner type="grow" color="danger" /></h2>
            </div>);
        }

        return(
            <div>
                <AppNav/>
                <ul className='list-group'>
                <li className='list-group-item active'>Categories Details</li>
                {
                    Categories.map( category =>
                            <li className='list-group-item' key={category.id} id={category.id}>
                                {category.name}
                            </li>
                    )
                }
                <li className='list-group-item active'>
                    <Button color="secondary" onClick={this.toggle}>Add Category</Button>
                </li>
                </ul>
                {console.log("maxId:"+this.state.maxId)}

                <Modal isOpen={this.state.modal}>
                <form onSubmit={this.handleFormSubmit}>
                    <ModalHeader style={{color:'blue'}}>Add Category</ModalHeader>
                    <ModalBody>
                        <div className='row'>
                            <div className="form-group col-md-4">
                                <label>Category:</label>
                                <Input type="text"  value={this.state.catName} onChange={this.handleChangeName} className="form-control" style={{width: "400px"}}/>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <input type="submit" value="Save" color="primary" className="btn btn-primary" />
                        <Button color="danger" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                    </form>
                </Modal>
            </div>
        )
    }
}

export default withRouter(Category);