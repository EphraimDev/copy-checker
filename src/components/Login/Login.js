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
  constructor(props) {
    super(props);

    if(token !== null){
      const decoded = decode(token);
          const dt = Date.now() / 1000;

      if(decoded.exp > dt) {
          document.location.replace(`/`);
      }
    }
    this.state = {
      email: '',
      password: '',
      errorMessage: ''
    };
  }

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

render(){
  
  let state = this.state,
  errorMessage = state.errorMessage;

  return (
    <div className="container-login">
      <div className="wrap-login">
      <Form className="login-form">
        <span className="login-title">Welcome</span>
        <span id="spinner" style={{display: "none", marginLeft: '40%'}}><Progress /></span>
          <span className="text-danger">{errorMessage}</span>
        <FormGroup row>
          <Label for="email" sm={3}>Email</Label>
          <Col sm={9}>
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
          <Label for="password" sm={3}>Password</Label>
          <Col sm={9}>
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
            <Button className="login-form-btn" onClick={e => this.onSubmit(e)}>Login</Button>
            
          </Col>
        </FormGroup>
      </Form>
      </div>
    </div>
  );
  }
}

export default Login;