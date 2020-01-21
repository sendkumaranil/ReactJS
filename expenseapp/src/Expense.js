import React from 'react'
import AppNav from './AppNav'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './App.css'
import {Table,Container,Input,Button,Label,FormGroup,Form,Modal,ModalHeader,ModalBody,ModalFooter,Badge} from 'reactstrap'
import Moment from 'react-moment'
import {Link} from 'react-router-dom'
import {EXPENSE_SERVICE_BASE_ENDPOINT} from './constant'

class Expense extends React.Component{
    emptyItem = {
        description : '',
        expensedate : new Date(),
        id:0,
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
            username:''
        }
        this.toggle=this.toggle.bind(this);
        this.handleFormSubmit=this.handleFormSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleDateChange=this.handleDateChange.bind(this);
        this.handleCategoryChange=this.handleCategoryChange.bind(this);
    }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }

    async handleFormSubmit(event){
        event.preventDefault();
        
        let item=this.state.item;
        const maxExpId=this.state.maxExpenseId;
        item.id=maxExpId;
        
        await fetch(EXPENSE_SERVICE_BASE_ENDPOINT+'/api/expenses/',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(item),
        });

        this.setState({
            modal: !this.state.modal
        });

        this.loadExpenses();

    }

    async handleChange(event){
        const value=event.target.value;
        const name=event.target.name;

        let item={...this.state.item};
        item[name]=value;
        
        console.log(item);

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
        await fetch(EXPENSE_SERVICE_BASE_ENDPOINT+'/api/expenses/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*'
            }
        }).then(() => {
            let updatedExpenses=[...this.state.Expenses].filter(i => i.id !== id);
            this.setState(
                {
                    Expenses:updatedExpenses
                }
            );
        });
    }

    async loadExpenses(){
        const expenseResponse=await fetch(EXPENSE_SERVICE_BASE_ENDPOINT+'/api/expenses/');
        const expData=await expenseResponse.json();
        const expMaxId=expData.reduce((max,p) => p.id > max ? p.id : max,expData[0].id);
        const genexpNextID=Number(expMaxId) + 1;
        const user=expData[0].user.name;
        this.setState(
            {
                Expenses:expData,
                isLoading:false,
                maxExpenseId:genexpNextID,
                username:user
            }
        );
    }

    async loadCategories(){
        const response=await fetch(EXPENSE_SERVICE_BASE_ENDPOINT+'/api/categories/');
        const body=await response.json();
        this.setState(
            {
                Categories:body,
                isLoading:false
            }
        );
    }

    async componentDidMount(){
        
        this.loadCategories();

        this.loadExpenses();

    }

    render(){
        const title=<h3>Add Expense</h3>
        const {Categories}=this.state;
        const {Expenses,isLoading}=this.state;

        if(isLoading)
            return(<div>Loading ...</div>);

        let optionList=Categories.map( category =>
             <option value={category.id} key={category.name}>{category.name}</option>
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
                    <h4 className="text-danger">Expense List</h4>
                    <Table className="table table-hover table-dark">
                        <thead>
                            <tr className="bg-warning">
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
                        <Badge color="danger">{this.state.username}</Badge>
                    </h5>
                    
                </div>
                </Container>
                <Modal isOpen={this.state.modal} size="lg">
                <Form onSubmit={this.handleFormSubmit}>
                    <ModalHeader style={{color:'red'}}>Add Expense</ModalHeader>
                    <ModalBody>
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
                    <ModalFooter>
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

export default Expense