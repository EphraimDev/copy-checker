import React from 'react';
import {Pie} from 'react-chartjs-2';



const CopyInfo = props => {

    const firstStudentChartData = []
    const secondStudentChartData = []

    const totalSentences = [props.firstTotalSentences, props.secondTotalSentences];
    const similarSentencesCount = props.noOfSimilarSentences;
    const difference = [totalSentences[0]-similarSentencesCount, totalSentences[1]-similarSentencesCount];

    firstStudentChartData.push(similarSentencesCount);
    firstStudentChartData.push(difference[0]);
    secondStudentChartData.push(similarSentencesCount);
    secondStudentChartData.push(difference[1])
    
    const dataone = {
        labels: [
            'Similar Sentences',
            'Unique Sentences',
        ],
        datasets: [{
            data: [firstStudentChartData[0], firstStudentChartData[1]],
            backgroundColor: [
            '#FF6384',
            '#36A2EB'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB'
            ]
        }]
    };

    const datatwo = {
        labels: [
            'Similar Sentences',
            'Unique Sentences',
        ],
        datasets: [{
            data: [secondStudentChartData[0], secondStudentChartData[1]],
            backgroundColor: [
            '#FF6384',
            '#36A2EB'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB'
            ],
        }]
    };

    return (
        <div style={{marginTop:'30px', height:'400px'}}>
            <div style={{width:'40%', float:'left', marginLeft:'50px', textAlign:'center'}}>
                <h6 sm="12">Pie Chart Representation of {props.firstStudent}'s Assignment</h6>
                <Pie 
                    data={dataone}
                    width={300}
                    height={200}
                    options={{ maintainAspectRatio: false }}
                    sm="12"
                     />
            </div>
            <div style={{width:'40%', float:'left', textAlign:'center'}}>
                <h6>Pie Chart Representation of {props.secondStudent}'s Assignment</h6>
                <Pie
                 data={datatwo}
                 width={300}
                 height={200}
                 options={{ maintainAspectRatio: false }}
                  />
            </div>
        </div>
        
        
    )

}

export default CopyInfo;