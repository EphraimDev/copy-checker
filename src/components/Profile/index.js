import React from 'react';

import './index.css';

import token from '../Auth/GetToken';
import { userProfile } from '../Auth/GetUserName';

import { getProfile } from '../Auth/GetProfile';

class Profile extends React.Component {
    constructor(props) {
            super(props) 
            this.state = {
            email: '',
            compareHistory: [],
            submitHistory: []
        }
    }

     async componentDidMount() {
        let verifyToken = await getProfile(token);
        
        if(verifyToken){
            let profile = await userProfile(verifyToken.id);

            if(!!profile === true) {
                this.setState({
                    email: profile.user.email,
                    submitHistory: profile.submitHistory,
                    compareHistory: profile.compareHistory
                })
            }

            if(profile.compareHistory.length > 0){
                document.getElementById("limiter").style.display = "block";
            }
        }
        
     }

    async deleteRow(evt){
        evt.preventDefault()
    }

     renderTableData() {
        return this.state.compareHistory.map((row, index) => {
            let firstStudent = [];
            let secondStudent = [];
            for (let i = 0; i < this.state.submitHistory.length; i++) {
                const item = this.state.submitHistory[i];
                const submitID = JSON.stringify(item._id);
                const firstStudentData = JSON.stringify(row.students[0]);
                const secondStudentData = JSON.stringify(row.students[1]);
                if(submitID === firstStudentData){
                    firstStudent.push(item.name);
                    firstStudent.push(item.studentID)
                } else if(submitID === secondStudentData){
                    secondStudent.push(item.name);
                    secondStudent.push(item.studentID)
                }
            }
           return (
              <tr key={row._id}>
                <td>{row.dateOfTest}</td>
                 <td>{firstStudent[0]}({firstStudent[1]})</td>
                 <td>{secondStudent[0]}({secondStudent[1]})</td>
                 <td>{row.noOfFirstPercentage}</td>
                 <td><a className="table-icon text-primary" href={`/details/${row._id}`}><i className="pe-7s-look"></i></a></td>
                 
              </tr>
           )
        })
     }

     renderTableHead() {
           return (
              <tr>
                 <th className="column1">Date</th>
                 <th className="column2">Compare</th>
                 <th className="column3">With</th>
                 <th className="column4">Percentage(%)</th>
                 <th className="column5">View</th>
              </tr>
           )
        
     }
     
      render() {

        return (
            <div className="limiter" id="limiter" style={{display: "none"}}>
                <div className="table-container">
                    <div className="wrap-table">
                        <div id="table-div" >
                            <table id='students'>
                                <thead>
                                    {this.renderTableHead()}
                                </thead>
                                <tbody>
                                    {this.renderTableData()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            
            </div>
        )
    }
}

export default Profile;