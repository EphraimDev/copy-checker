import React, { Component } from "react";
import Create from "../components/CreateUser";
import NavbarPage from "../components/Navbars/Navbar";


class CreatePage extends Component {

    render(){
        return(
            <div>
                <NavbarPage />
                <Create />
            </div>
        )
    }
    
}

export default CreatePage