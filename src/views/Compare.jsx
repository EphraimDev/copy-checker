import React, { Component } from "react";
import NavbarPage from "../components/Navbars/Navbar";
import Compare from "../components/Compare/Compare";


class ComparePage extends Component {

    render(){
        return(
            <div>
                <NavbarPage />
                <Compare />
            </div>
        )
    }
    
}

export default ComparePage;