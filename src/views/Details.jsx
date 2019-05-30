import React, { Component } from "react";
import NavbarPage from "../components/Navbars/Navbar";
import Details from "../components/Details/Details";


class DetailsPage extends Component {

    render(){
        return(
            <div>
                <NavbarPage />
                <Details />
            </div>
        )
    }
    
}

export default DetailsPage;