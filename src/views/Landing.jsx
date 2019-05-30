import React, { Component } from "react";
import NavbarPage from "../components/Navbars/Navbar";
import Profile from "../components/Profile";


class Landing extends Component {

    render(){
        return(
            <div>
                <NavbarPage />
                <Profile />
            </div>
        )
    }
    
}

export default Landing