import React from 'react'
import AppNav from './AppNav'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './App.css'
import {Table,Container,Input,Button,Label,FormGroup,Form,Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'

class Expense extends React.Component{
    emptyItem = {
        description : '',
        expensedate : new Date(),
        id:110,
        location : '',
        category : {id:1 , name:'Travel'}
    }

    constructor(props){
        super(props);
        this.state={
            isLoading:false,
            Categories:[],
            Expenses:[],
            date:new Date(),
            item:this.emptyItem,
            modal:false
        }
        this.toggle=this.toggle.bind(this);
        this.handleFormSubmit=this.handleFormSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleDateChange=this.handleDateChange.bind(this);
    }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
        console.log('toggle:'+this.state.modal)
      }

    async handleFormSubmit(event){
        const item=this.state.item;
        await fetch('http://localhost:8585/api/expenses/',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(item),
        });

        event.preventDefault();
        this.props.history.push("/expenses");
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

    async remove(id){
        console.log('id='+'$(id)')
        await fetch('http://localhost:8585/api/expenses/'+id,{
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

    async componentDidMount(){
        const response=await fetch('http://localhost:8585/api/categories/');
        const body=await response.json();
        this.setState(
            {
                Categories:body,
                isLoading:false
            }
        );

        const expenseResponse=await fetch('http://localhost:8585/api/expenses/');
        const expData=await expenseResponse.json();
        this.setState(
            {
                Expenses:expData,
                isLoading:false
            }
        );
    }

    render(){
        const title=<h3>Add Expense</h3>
        const {Categories}=this.state;
        const {Expenses,isLoading}=this.state;

        if(isLoading)
            return(<div>Loading ...</div>);

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
                    <Button color="danger" onClick={this.toggle}>Add Expense</Button>
                </div>
                </Container>
                <Modal isOpen={this.state.modal} size="lg">
                <Form onSubmit={this.handleFormSubmit}>
                    <ModalHeader style={{color:'red'}}>Add Expense</ModalHeader>
                    <ModalBody>
                        <Table className="table table-hover table-dark">
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
                        <select onChange={this.handleChange}>
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