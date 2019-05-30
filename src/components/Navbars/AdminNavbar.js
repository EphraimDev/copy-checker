import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { logout } from '../Auth/LogOut';
import { firstname, lastname } from '../Auth/GetNames';

export default class AdminNavbarPage extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      firstname: '',
      lastname: '',
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  async componentDidMount(){
    this.setState({
      firstname: firstname,
      lastname: lastname
    })
  }

  logOut(e){
    e.preventDefault();
    logout();
    document.location.replace(`/login`);
  }
  render() {

    let {firstname, lastname} = this.state;
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Copy Check</NavbarBrand>
          <div style={{marginLeft:'30%'}}><h6>Welcome {firstname} {lastname}</h6></div>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">History</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/compare">Compare</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/create-user">New User</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={e => this.logOut(e)}>LogOut</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}