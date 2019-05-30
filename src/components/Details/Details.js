import React from 'react';
import { matchPath } from "react-router-dom";
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { loggedIn } from '../Auth/LoggedIn';
import { compareDetails } from '../Auth/Details';
import DetailsHeader from './Header';
import CopyInfo from './CopyInfo';

import './index.css';

export default class Details extends React.Component {
    state = {
        firstpercentage: 0,
        secondpercentage: 0,
        totalSentences: [],
        date: '',
        sameSentences: [],
        firstStudent: '',
        firstStudentID: '',
        secondStudent: '',
        secondStudentID: '',
        errorMessage: ''
      };

    // componentWillMount() {
    //     if(!loggedIn) {
    //         document.location.replace(`/login`);
    //     }
    // }


    async componentDidMount(){
      if(!loggedIn) {
        document.location.replace(`/login`);
    }
        const match = matchPath(window.location.pathname, {
            path: "/details/:compareId",
            exact: true,
            strict: false
          });

        let compareId = match.params.compareId;

        const request = await compareDetails(compareId);
        if(!!request === true ) {
            this.setState({
                firstpercentage: request.findComparison.noOfFirstPercentage,
                secondpercentage: request.findComparison.noOfSecondPercentage,
                totalSentences: request.findComparison.totalSentences,
                date: request.findComparison.dateOfTest,
                sameSentences: request.findComparison.sameSentence,
                firstStudent: request.students[0],
                firstStudentID: request.students[1],
                secondStudent: request.students[2],
                secondStudentID: request.students[3]
            })
        } else {
            document.location.replace(`/`);
        }
    }

    renderSentences(){
        return this.state.sameSentences.map((row, index) => {
            return (
                <li key={index}>{row}</li>
            )
        })
    };


  render() {

    let {firstStudent, firstStudentID, secondStudent,
         secondStudentID, firstpercentage, secondpercentage,
          totalSentences, sameSentences} = this.state;

    return ( 
      <div>
          <DetailsHeader
            firstStudent={firstStudent}
            firstStudentID={firstStudentID}
            secondStudent={secondStudent}
            secondStudentID={secondStudentID}
            firstpercentage={firstpercentage}
            secondpercentage={secondpercentage} 
            />

        <CopyInfo
            firstTotalSentences={totalSentences[0]}
            secondTotalSentences={totalSentences[1]}
            noOfSimilarSentences={sameSentences.length}
            firstStudent={firstStudent}
            secondStudent={secondStudent}
         />

      <Card>
        <CardBody>
          <CardTitle className="sentences-title">The Similar Sentences</CardTitle>
          <ol>
              {this.renderSentences()}
          </ol>
        </CardBody>
      </Card>

        <div style={{width:'100%'}} className="card">
            
        </div>
      </div>
    );
  }
}