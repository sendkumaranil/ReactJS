import React from 'react'
import {
    Badge,Card, CardBody, CardLink,CardFooter,CardHeader,
    CardTitle, CardSubtitle,Row,Col
} from 'reactstrap'

const ExpenseCard = props =>{

    return(
        <div style={{display:'flex',justifyContent:'center', alignItems:'center',marginTop:'50px'}}>
        <Row>
            <Col sm="15">
            <Card>
                <CardHeader>
                    <CardTitle>{props.title}</CardTitle>
                    <CardSubtitle>{props.subtitle}</CardSubtitle>
                </CardHeader>
                <CardBody>
                    <div className="brand_logo_container_card">
                        <img src={process.env.PUBLIC_URL + "/expense.png"} className="brand_logo_animated" alt="Logo"/>
                    </div>
                    <h3><Badge color={props.textcolor}>{props.text}</Badge></h3>
                </CardBody>
                <CardFooter>
                    <CardLink href="/login">Sign In</CardLink>
                    { props.newUserDisplay === 'true' ? <CardLink href="/registeruser">New User</CardLink> : ''}
                    { (props.homedisplay === 'true') ? <CardLink href="/home">Home</CardLink> : ''}
                </CardFooter>
            </Card>
            </Col>
        </Row>
        </div>
    );
}

export default ExpenseCard;