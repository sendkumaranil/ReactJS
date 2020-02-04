import React from 'react'
import AppNav from './AppNav'
import {Button,Input,Modal, ModalHeader, ModalBody, ModalFooter,Spinner,Container,Table,Badge} from 'reactstrap'
import AuthenticationService from './service/AuthenticationService'
import { withRouter } from 'react-router-dom'
import {EXPENSE_SERVICE_BASE_ENDPOINT} from './constant'
import ErrorPage from './ErrorPage'

class Category extends React.Component{
    state={
        isLoading:true,
        Categories:[],
        modal:false,
        maxId:0,
        catName:'',
        jwtToken:'',
        loggedUsername:''
    }
    constructor(props){
        super(props);
        this.toggle=this.toggle.bind(this);
        this.handleFormSubmit=this.handleFormSubmit.bind(this);
        this.handleChangeName=this.handleChangeName.bind(this);
        this.loadCategories=this.loadCategories.bind(this);
    }

    async loadCategories(jwttoken,loggedusername){
        this.setState(
            {isLoading:true}
        )
        
        await fetch(EXPENSE_SERVICE_BASE_ENDPOINT+'/api/categories/'+loggedusername,{
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
            this.setState({isLoading:false});
            this.props.history.push('/accessdenied');
        });
    }

    async componentDidMount(){
        let token,username;
        if(AuthenticationService.isUserLoggedIn()){
            token=AuthenticationService.getJwtToken();
            username=AuthenticationService.getLoggedInUserName();
            this.setState({jwtToken:token,loggedUsername:username});
        }
        this.loadCategories(token,username);
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
            name:newcatname,
            user:{username:this.state.loggedUsername}
        }
        
        await fetch(EXPENSE_SERVICE_BASE_ENDPOINT+'/api/categories/',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':this.state.jwtToken
            },
            body: JSON.stringify(catBody)
        }).catch((error) =>{
            return <ErrorPage errorMessage={error} />
        });
        this.setState({
            modal: !this.state.modal
        });

        this.loadCategories(this.state.jwtToken,this.state.loggedUsername);
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
                <Container>
                <div className="shadow-lg p-3 mb-5 bg-white rounded">
                    <h5 style={{float:'right'}}><Badge color="secondary">{this.state.loggedUsername}</Badge></h5>
                    <h4 className="text-danger">Categories List</h4>
                    <Table className="table table-hover table-dark">
                        <thead>
                            <tr className="bg-warning">
                                <th width="30%">Name</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            Categories.map( category =>
                            <tr key={category.id}>
                                <td>
                                    {category.name}
                                </td>
                            </tr>
                            )
                        }
                        </tbody>
                    </Table>
                    </div>
                </Container>
                <Container>
                <div className="shadow-lg p-3 mb-5 bg-white rounded">
                    <Button color="danger" onClick={this.toggle}>Add Category</Button>
                </div>
                </Container>
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