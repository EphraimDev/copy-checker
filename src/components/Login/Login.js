import React from "react";
import decode from 'jwt-decode';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { loginUser } from '../Auth/Login';
import { validateAuthForm } from '../Validation/Auth';
import { setToken } from '../Auth/SetToken';
import { validateState } from '../Validation/State';

import './index.css';
import Progress from "../Progress/Progress";
import token from "../Auth/GetToken";


class Login extends React.Component{

  state = {
    email: '',
    password: '',
    errorMessage: ''
  };

  handleChange(evt) {
    evt.preventDefault();
    let target = evt.target;
    this.setState({
      [target.type]: target.value
    },
    ()=> {
      validateState(target.type, target.value)
    });
  }

  async onSubmit(e) {
    e.preventDefault();
    document.getElementById("spinner").style.display = "block";
    const target = this.state;
    let data = {
      email: target.email,
      password: target.password
    }

    const validate = await validateAuthForm(data);

    const login = await loginUser(data.email, data.password);

    if(!!validate === false && !!login === true ) {
        document.getElementById("spinner").style.display = "none";
        await setToken(login.token, login.findUser.firstname, login.findUser.lastname);
        document.location.replace(`/`)
    } else if (!!validate === true ) {
      document.getElementById("spinner").style.display = "none";
      return validate
    } else {
      document.getElementById("spinner").style.display = "none";
        this.setState({
            errorMessage: 'Login was not successful, please try again'
        })
    }
  }

  async UNSAFE_componentWillMount(){
    if(token !== null){
      const decoded = await decode(token);
          const dt = Date.now() / 1000;

      if(decoded.exp > dt) {
          document.location.replace(`/`);
      }
    }
  }

render(){
  
  let state = this.state,
  errorMessage = state.errorMessage;

  return (
    <div className="container">
      <Form className="col-6 login-form">
        <h4 style={{marginLeft:'25%'}}>Sign In </h4>
        <span id="spinner" style={{display: "none", marginLeft: '40%'}}><Progress /></span>
          <span className="text-danger">{errorMessage}</span>
        <FormGroup row>
          <Label for="email" sm={2}>Email</Label>
          <Col sm={10}>
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
          <Label for="password" sm={2}>Password</Label>
          <Col sm={10}>
            <Input
             type="password"
              name="password"
               id="password"
              onChange={evt => this.handleChange(evt)}
               />
               <span id="password-error" style={{display: "none", color: "red"}}>Password should be at least 8 characters, with an uppercase, a lowercase, a number and a special character</span>
          </Col>
        </FormGroup>
        
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button onClick={e => this.onSubmit(e)} color="info">Submit</Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
  }
}

export default Login;