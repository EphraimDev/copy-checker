import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { loggedIn } from '../Auth/LoggedIn';
import { validateForm } from '../Validation/Compare';
import token from '../Auth/GetToken';
import Progress from "../Progress/Progress";
import { domain } from '../Auth/Domain';

export default class Compare extends React.Component {
    state = {
        firstStudent: '',
        firstStudentID: '',
        first: null,
        secondStudent: '',
        secondStudentID: '',
        second: null,
        errorMessage: ''
      };

    componentWillMount() {
        if(!loggedIn) {
            document.location.replace(`/login`);
        }
    }

    handleChange(evt) {
        evt.preventDefault();
        let target = evt.target;
        if (target.name !== "first" || target.name !== "second") {
            this.setState({
                [target.name]: target.value
              }
            );
        }
        
        if(target.name === "first" || target.name === "second"){
            this.setState({
                [target.name]: target.files[0]
              });
        }

    }

    async onSubmit(e){
        e.preventDefault();
        document.getElementById("spinner").style.display = "block";
        document.getElementById("field-error").style.display = "none";

        const target = this.state;

        let newData = new FormData();

        newData.append('first', target.first);
        newData.append('second', target.second);
        newData.append('firstStudent', target.firstStudent);
        newData.append('secondStudent', target.secondStudent);
        newData.append('firstStudentID', target.firstStudentID);
        newData.append('secondStudentID', target.secondStudentID);

        let data = {
            first: target.first,
            firstStudent: target.firstStudent,
            firstStudentID: target.firstStudentID,
            second: target.second,
            secondStudent: target.secondStudent,
            secondStudentID: target.secondStudentID
        }

        const validate = await validateForm(data);

        if (!!validate === true ) {
            document.getElementById("spinner").style.display = "none";
            return validate
        }else{
            const compareResult = await axios.post(`${domain}/compare/compare-submission`, newData, { 
                headers: {
                    'Accept': 'appliation/json',
                    'Content-Type': 'multipart/form-data',
                    'authorization': token
                }
            });

            if(compareResult.status === 200){
                    document.getElementById("spinner").style.display = "none";
                    document.getElementById("field-error").style.display = "none";
                document.location.replace(`/details/${compareResult.data.result._id}`)
            }else{
                document.getElementById("spinner").style.display = "none";
                    this.setState({
                        errorMessage: 'Request was not successful, please try again'
                    })
            }
        }

    }


  render() {

    const errMessage = this.state.errorMessage;
    return (
      <div className="container">
      <Form className="col-6 compare-form login-form">
        <h4 style={{marginLeft:'25%'}}>Compare Two Submissions </h4>
        <span id="spinner" style={{display: "none", marginLeft: '40%'}}><Progress /></span>
          <span className="text-danger">{errMessage}</span>
          <span id="field-error" style={{display: "none", color: "red"}}>Fill all fields appropriately</span>
        <Row form>
          <Col md={9}>
            <FormGroup>
              <Label for="firstStudent">Student Name</Label>
              <Input type="name" name="firstStudent" id="firstStudent" onChange={evt => this.handleChange(evt)} />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="firstStudentID">Student ID</Label>
              <Input type="text" name="firstStudentID" id="firstStudentID" onChange={evt => this.handleChange(evt)} />
            </FormGroup>
          </Col>
          <FormGroup row>
          <Col sm={10}>
            <Input type="file" name="first" id="first" accept="application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={evt => this.handleChange(evt)} />
          </Col>
        </FormGroup>
        </Row>
        <Row form>
          <Col md={9}>
            <FormGroup>
              <Label for="secondStudent">Student Name</Label>
              <Input type="name" name="secondStudent" id="secondStudent" onChange={evt => this.handleChange(evt)} />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="secondStudentID">Student ID</Label>
              <Input type="text" name="secondStudentID" id="secondStudentID" onChange={evt => this.handleChange(evt)} />
            </FormGroup>
          </Col>
          <FormGroup row>
          <Col sm={10}>
            <Input type="file" name="second" id="second" accept="application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={evt => this.handleChange(evt)} />
          </Col>
        </FormGroup>
        </Row>
        <Button onClick={e => this.onSubmit(e)} color="info">Compare</Button>
      </Form>
      </div>
    );
  }
}