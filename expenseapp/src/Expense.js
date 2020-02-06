import React from 'react'
import AppNav from './AppNav'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './App.css'
import {Spinner,Table,Container,Input,Button,Label,FormGroup,Form,Modal,ModalHeader,ModalBody,ModalFooter,Badge} from 'reactstrap'
import Moment from 'react-moment'
import {Link, withRouter} from 'react-router-dom'
import {EXPENSE_SERVICE_BASE_ENDPOINT} from './constant'
import PaginationComp from './PaginationComp'
import AuthenticationService from './service/AuthenticationService'

class Expense extends React.Component{
    emptyItem = {
        description : '',
        expensedate : new Date(),
        location : '',
        category : {id:0},
        user: {id:1}
    }

    constructor(props){
        super(props);
        this.state={
            isLoading:false,
            Categories:[],
            Expenses:[],
            date:new Date(),
            item:this.emptyItem,
            modal:false,
            maxExpenseId:0,
            loggedInUsername:'',
            jwtToken:''
        }

        this.toggle=this.toggle.bind(this);
        this.handleFormSubmit=this.handleFormSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleDateChange=this.handleDateChange.bind(this);
        this.handleCategoryChange=this.handleCategoryChange.bind(this);
        this.loadCategories=this.loadCategories.bind(this);
        this.loadExpenses=this.loadExpenses.bind(this);
    }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }

    async handleFormSubmit(event){
        event.preventDefault();
        let item=this.state.item;        
        
        item.user={username:this.state.loggedInUsername}

        await fetch(EXPENSE_SERVICE_BASE_ENDPOINT+'/api/expenses/',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':this.state.jwtToken
            },
            body: JSON.stringify(item),
        }).catch((error) => {
            console.log(error);
            this.props.history.push("/accessdenied");
        });

        this.setState({
            modal: !this.state.modal
        });

        this.loadExpenses(this.state.jwtToken,this.state.loggedInUsername);
    }

    async handleChange(event){
        const value=event.target.value;
        const name=event.target.name;

        let item={...this.state.item};
        item[name]=value;

        this.setState(
            {item}
        )
    }

    async handleDateChange(date){
        let item={...this.state.item};
        item.expensedate=date;
        this.setState({item});
    }

    async handleCategoryChange(event){
        let item={...this.state.item};
        const value=event.target.value;
        item.category.id=value;
        
        this.setState(
            {item}
        )
    }

    async remove(id){
        
        if(!window.confirm('Are you sure')){
            return;
        }

        await fetch(EXPENSE_SERVICE_BASE_ENDPOINT+'/api/expenses/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*',
                'Authorization':this.state.jwtToken
            }
        }).then(() => {
            let updatedExpenses=[...this.state.Expenses].filter(i => i.id !== id);
            this.setState(
                {
                    Expenses:updatedExpenses
                }
            );
        }).catch((error) => {
            console.log(error);
            this.props.history.push("/accessdenied");
        });
    }

    async loadExpenses(jwttoken,loggedusername){
        this.setState(
            {
                isLoading:true
            }
        )
        let expData;
        
        await fetch(EXPENSE_SERVICE_BASE_ENDPOINT+'/api/expenses/'+loggedusername,{
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*',
                'Authorization':jwttoken
            }
        }).then((response) => response.json())
        .then((responseData) => {
            expData = responseData;
            const expMaxId=expData.reduce((max,p) => p.id > max ? p.id : max,expData[0].id);
            console.log('max id::'+expMaxId);
            const genexpNextID=Number(expMaxId) + 1;
            console.log('max id:'+genexpNextID);
            this.setState(
                {
                    Expenses:expData,
                    isLoading:false,
                    maxExpenseId:genexpNextID
                }
            );
        })
        .catch((error) =>{
            console.log(error);
            this.props.history.push("/accessdenied");
        });
        
    }

    async loadCategories(jwttoken,username){
        let body;
        await fetch(EXPENSE_SERVICE_BASE_ENDPOINT+'/api/categories/'+username,{
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*',
                'Authorization':jwttoken
            }
        }).then((response) => response.json())
        .then((data) => {
            body = data;
            this.setState(
                {
                    Categories:body,
                    isLoading:false
                }
            );
        }).catch((error) =>{
            console.log(error);
            this.props.history.push('/accessdenied');
        });
    }

    async componentDidMount(){
        let token;
        let usrname;
        if(AuthenticationService.isUserLoggedIn()){
            token = AuthenticationService.getJwtToken();
            usrname = AuthenticationService.getLoggedInUserName();
            this.setState(
                {
                    jwtToken:token,
                    loggedInUsername:usrname
                }
            );
        }

        this.loadExpenses(token,usrname);

        this.loadCategories(token,usrname);

    }

    render(){
        const {Categories}=this.state;
        const {Expenses,isLoading}=this.state;
        
        if(isLoading){
            return (<div><AppNav/><h2>Loading 
            <Spinner type="grow" color="primary" />
            <Spinner type="grow" color="danger" />
            <Spinner type="grow" color="success" /></h2>
            </div>);
        }

        let optionList=Categories.map( category =>
             <option value={category.id} key={category.id}>{category.name}</option>
        )

        let rows=Expenses.map( expense =>
                <tr key={expense.id}>
                    <td>{expense.description}</td>
                    <td>{expense.location}</td>
                    <td>{expense.category.name}</td>
                     <td><Moment date={expense.expensedate} format='DD/MM/YYYY'/></td>
                    <td><Button size="sm" color="danger" onClick={() => this.remove(expense.id)} >Delete</Button></td>
                </tr>
        )

        return(
            <div>
                <AppNav/>
                <Container>
                <div className="shadow-lg p-3 mb-5 bg-white rounded">
                    <h5 style={{float:'right'}}><Badge color="secondary">{this.state.loggedInUsername}</Badge></h5>
                    <h4 className="text-danger">Expense List</h4>
                    <Table className="table table-hover table-dark">
                        <thead>
                            <tr className="bg-danger">
                                <th width="30%">Description</th>
                                <th width="10%">Location</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th width="10%">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </Table>
                    </div>
                </Container>
                <Container>
                <div className="shadow-lg p-3 mb-5 bg-white rounded">
                    <Button color="danger" onClick={this.toggle}>Add Expense</Button>{' '}
                    <Button color="danger">
                    <Link to={'/categories'} style={{color:'white'}}>Manage Categories</Link>
                    </Button>
                    <h5 style={{float:'right'}}>
                        <PaginationComp/>
                    </h5>
                    
                </div>
                </Container>
                <Modal isOpen={this.state.modal} size="lg">
                <Form onSubmit={this.handleFormSubmit}>
                    <ModalHeader style={{color:'red',backgroundColor:'#F1D302'}}>
                    <img src={process.env.PUBLIC_URL + "/expense.png"} className="brand_logo_home" alt="Logo"/>
                        &nbsp;Add Expense</ModalHeader>
                    <ModalBody style={{backgroundColor:'gray'}}>
                        <Table className="table table-hover table-dark">
                        <tbody>
                        <tr>
                        <td>
                        <FormGroup>
                            <Label for="description">Title</Label>
                        </FormGroup>
                        </td>
                        <td>
                        <FormGroup>
                            <Input type="text" name="description" id="description" onChange={this.handleChange} autoComplete="name" />
                        </FormGroup>
                        </td>
                        </tr>
                    <tr>
                        <td>
                        <FormGroup>
                            <Label for="category">Category</Label>
                        </FormGroup>
                        </td> 
                        <td>
                        <FormGroup>
                        <select onChange={this.handleCategoryChange} name='category'>
                            {optionList}
                        </select>
                        </FormGroup>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <FormGroup>
                            <Label for="date">Date</Label>
                        </FormGroup>
                        </td>
                        <td>
                        <FormGroup>
                            <DatePicker calendarClassName="rasta-stripes" selected={this.state.item.expensedate} onChange={this.handleDateChange} />
                        </FormGroup>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <FormGroup>
                            <Label for="location">Location</Label>
                        </FormGroup>
                        </td>
                        <td>
                        <FormGroup>
                            <Input type="text" name="location" id="location" onChange={this.handleChange} />
                        </FormGroup>
                        </td>
                    </tr>
                    </tbody>
                    </Table>
                    </ModalBody>
                    <ModalFooter style={{backgroundColor:'#F1D302'}}>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="danger" onClick={this.toggle}>Cancel</Button>
                    </FormGroup>
                    </ModalFooter>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default withRouter(Expense);