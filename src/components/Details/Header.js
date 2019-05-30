import React from 'react';
import { Card, CardTitle, CardText, Row, Col } from 'reactstrap';


const DetailsHeader = props => {

    return (
        <Row className="details-header">
            <Col sm="4" className="header-card">
                <Card body>
                    <CardTitle><span style={{fontWeight:'bold'}}>Name:</span> {props.firstStudent}</CardTitle>
                    <CardText><span style={{fontWeight:'bold'}}>Number:</span> {props.firstStudentID}</CardText>
                    <CardText><span style={{fontWeight:'bold'}}>Summary:</span> {props.firstpercentage}% of {props.secondStudent} work are similar to {props.firstStudent}</CardText>
                </Card>
            </Col>
            <Col sm="4" className="header-card">
                <Card body>
                    <CardTitle><span style={{fontWeight:'bold'}}>Name:</span> {props.secondStudent}</CardTitle>
                    <CardText><span style={{fontWeight:'bold'}}>Number:</span> {props.secondStudentID}</CardText>
                    <CardText><span style={{fontWeight:'bold'}}>Summary:</span> {props.secondpercentage}% of {props.firstStudent} work are similar to {props.secondStudent}</CardText>
                </Card>
            </Col>
        </Row>
    )

}

export default DetailsHeader;