import React from 'react'
import AppNav from './AppNav'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './App.css'
import {Table,Container,Input,Button,Label,FormGroup,Form} from 'reactstrap'
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
            item:this.emptyItem
        }

        this.handleFormSubmit=this.handleFormSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleDateChange=this.handleDateChange.bind(this);
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
                    {title}
                    <Form onSubmit={this.handleFormSubmit}>
                        <FormGroup>
                            <Label for="description">Title</Label>
                            <Input type="description" name="description" id="description" onChange={this.handleChange} autoComplete="name" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="category">Category</Label>
                            <select onChange={this.handleChange}>
                                {optionList}
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label for="date">Date</Label>
                            <DatePicker selected={this.state.item.expensedate} onChange={this.handleDateChange} />
                        </FormGroup>
                        <div className="row">
                            <FormGroup className="col-md-4 mb-3">
                                <Label for="location">Location</Label>
                                <Input type="text" name="location" id="location" onChange={this.handleChange} />
                            </FormGroup>
                        </div>
                        <FormGroup>
                            <Button color="primary" type="submit">Save</Button>{'|'}
                            <Button color="secondary" tag={Link} to="/">Cancel</Button>
                        </FormGroup>
                    </Form>
                </Container>
                <hr/>
                <Container>
                    <h3>Expense List</h3>
                    <Table className="mt-4">
                        <thead>
                            <tr>
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
                </Container>
            </div>
        )
    }
}

export default Expense