import React from "react";
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { validateAuthForm } from '../Validation/Auth';
import { validateState } from '../Validation/State';

import Progress from "../Progress/Progress";
import { createUser } from "../Auth/Create";


class Create extends React.Component{

  state = {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    errorMessage: ''
  };

  handleChange(evt) {
    evt.preventDefault();
    let target = evt.target;
    this.setState({
      [target.name]: target.value
    },
    ()=> {
      validateState(target.name, target.value)
    });
  }

  async onSubmit(e) {
    e.preventDefault();
    document.getElementById("spinner").style.display = "block";
    const target = this.state;
    let data = {
      email: target.email,
      password: target.password,
      firstname: target.firstname,
      lastname: target.lastname
    }

    const validate = await validateAuthForm(data);

    const create = await createUser(data.email, data.password, data.firstname, data.lastname);

    if(!!validate === false && !!create === true ) {
        document.getElementById("spinner").style.display = "none";
        document.location.replace(`/create-user`)
    } else if (!!validate === true ) {
      document.getElementById("spinner").style.display = "none";
      return validate
    } else {
      document.getElementById("spinner").style.display = "none";
        this.setState({
            errorMessage: 'Request was not successful, please try again'
        })
    }
  }

render(){
  
  let state = this.state,
  errorMessage = state.errorMessage;

  return (
    <div className="container-login">
      <div className="wrap-login wrap-create">
      <Form className="login-form">
        <span className="login-title">Create New User</span>
        <span id="spinner" style={{display: "none", marginLeft: '40%'}}><Progress /></span>
          <span className="text-danger">{errorMessage}</span>
          <FormGroup row>
          <Label for="firstname" sm={4}>First Name</Label>
          <Col sm={8}>
            <Input
             type="name"
              name="firstname"
               id="firstname" 
              onChange={evt => this.handleChange(evt)}
               />
            <span id="firstname-error" style={{display: "none", color: "red"}}>Enter first name</span>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="lastname " sm={4}>Last Name</Label>
          <Col sm={8}>
            <Input
             type="name"
              name="lastname"
               id="lastname" 
              onChange={evt => this.handleChange(evt)}
               />
            <span id="lastname-error" style={{display: "none", color: "red"}}>Enter last name</span>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="email" sm={4}>Email</Label>
          <Col sm={8}>
            <Input
             type="email"
              name="email"
               id="email" 
              onChange={evt => this.handleChange(evt)}
               />
            <span id="email-error" style={{display: "none", color: "red"}}>Please crosscheck your email</span>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="password" sm={4}>Password</Label>
          <Col sm={8}>
            <Input
             type="password"
              name="password"
               id="password"
              onChange={evt => this.handleChange(evt)}
               />
               <span id="password-error" style={{display: "none", color: "red"}}>Password should be at least 8 characters, with an uppercase, a lowercase, a number and a special character</span>
          </Col>
        </FormGroup>
        
        <FormGroup className="login-btn">
          <Col sm={{ size: 10, offset: 2 }} className="wrap-btn">
            <div className="login-btn-wrap"></div>
            <Button className="login-form-btn" onClick={e => this.onSubmit(e)}>Create</Button>
          </Col>
        </FormGroup>
      </Form>
      </div>
    </div>
  );
  }
}

export default Create;