import React, { useState } from 'react'
import {Form,FormGroup,Container,Button,Toast,ToastHeader,ToastBody,Row,Col,Input,Label,Badge} from 'reactstrap'
import { PieChart, Pie, Legend} from 'recharts';

const EmiCalculator=() =>{

      const [amount,setAmount]=useState(0);
      const [totalEmi,setTotalEmi]=useState(0);
      const [interestRate,setInterestRate]=useState(0);
      const [tenure,setTenure]=useState(0);
      const [totalInterest,setTotalInterest]=useState(0);
      const [totalPayment,setTotalPayment]=useState(0);
      const [chartData,setChartData] = useState(
        [
          { name: 'Total Interest', value: 0, v: 80 },
          { name: 'Principal Amount', value: 0, v: 100 }
        ]
      )
      function handleAmount(event){
        setAmount(event.target.value);
      }
    
      const handleInterestRate=(event) =>{
        setInterestRate(event.target.value);
      }

      const handleTenure = (event) =>{
        setTenure(event.target.value);
      }

      const calculateEmi=(e) =>{
        if(amount !== 0 && interestRate !== 0){
          let rateOfInterest = (interestRate/12/100);
          let tenureInMonths = (tenure * 12);
          let rateOfMonths = Math.pow((1+Number(rateOfInterest)),tenureInMonths);
          let totEmiPerMonth = (amount * rateOfInterest * rateOfMonths/(rateOfMonths-1));
          let totInterest  = (totEmiPerMonth * tenureInMonths)-amount;
          let totPaymentInTenure = (Number(amount)+Number(totInterest));
          setTotalEmi(Math.floor(totEmiPerMonth));
          setTotalInterest(Math.ceil(totInterest));
          setTotalPayment(Math.ceil(totPaymentInTenure));
          setChartData(
            [
              { name: 'Total Interest', value: 619220, v: 80 },
              { name: 'Principal Amount', value: 1000000, v: 100 }
            ]
          );

        }else{
          alert('please enter the value');
        }
      }
    return(
      
    <Container>
        <div className="p-3 my-2 rounded">
        <Toast style={{backgroundColor:'#aa9069',color:'white',float:'left',width:'500px'}}>
          <ToastHeader>
            EMI Calculator
          </ToastHeader>
          <ToastBody>
          <Form>
            <Row>
                <Col md={12}>
                <FormGroup>
                    <Label for="amount">Amount (Rs)</Label>
                    <Input type="text" value={amount} onChange={handleAmount}  name="amount" id="amount" placeholder="Amount" />
                </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                <FormGroup>
                    <Label for="interestRate">Interest Rate (%)</Label>
                    <Input type="text" name="interestRate" id="interestRate" value={interestRate} onChange={handleInterestRate} placeholder="0.0"/>
                </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                <FormGroup>
                    <Label for="loanTenure">Loan Tenure (Year)</Label>
                    <Input type="select" name="loanTenure" id="loanTenure" value={tenure} onChange={handleTenure}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    </Input>
                </FormGroup>
                </Col>
            </Row>
      <Button onClick={calculateEmi}>Calculate</Button>
    </Form>
          </ToastBody>
        </Toast>
        <Toast style={{backgroundColor:'#b3edf1',float:'left',width:'500px',marginLeft:'50px'}}>
          <ToastHeader>
            EMI
          </ToastHeader>
          <ToastBody>
            <Row>
                <Col>
                    <h5><Badge color="primary">Loan EMI / Month</Badge></h5>
                    <span style={{fontSize:'40px',color:'green',fontFamily:'impact'}}>{totalEmi}</span>
                </Col>
            </Row>
            <hr/>
            <Row>
                <Col>
                    <h5><Badge color="primary">Total Interest Payable</Badge></h5>
                    <span style={{fontSize:'40px',color:'green',fontFamily:'impact'}}>{totalInterest}</span>
                </Col>
            </Row>
            <hr/>
            <Row>
                <Col>
                <h5><Badge color="primary">Total Payment (Principal + Interest)</Badge></h5>
                <span style={{fontSize:'40px',color:'green',fontFamily:'impact'}}>{totalPayment}</span>
                </Col>
            </Row>
          </ToastBody>
        </Toast>
        <Toast style={{backgroundColor:'#a3f0c1',float:'left',width:'500px'}}>
          <ToastHeader>
            EMI Chart
          </ToastHeader>
          <ToastBody>
          <Row>
                <Col>
                <div >
          <PieChart width={400} height={400}>
            <Legend verticalAlign="bottom"/>
            <Pie data={chartData} dataKey="value" cx={200} cy={200} innerRadius={50} outerRadius={80} fill='green'/>
          </PieChart>
        </div>
                </Col>
            </Row>
          </ToastBody>
        </Toast>
      </div>
    </Container>
    );
}

export default EmiCalculator;