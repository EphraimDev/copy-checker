import React, { Component } from "react";
import Create from "../components/CreateUser";
import AdminNavbarPage from "../components/Navbars/AdminNavbar";


class CreatePage extends Component {

    render(){
        return(
            <div>
                <AdminNavbarPage />
                <Create />
            </div>
        )
    }
    
}

export default CreatePage