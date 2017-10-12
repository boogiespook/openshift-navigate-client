/**
 * Created by jkenny on 08/09/2017.
 */

import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

const styles = {
    graphContainer: {
        border: 'none',
        padding: '5px'
    }
};

class BarWidget extends Component {

    render() {
        console.log("BarWidget render: ", this.props);

        return (
            <div style={styles.graphContainer}>
                <Bar data={this.chartData()}
                     options={{
                         responsive:true,
                         legend: {
                             display: false,
                             position: 'bottom'
                         },
                         scaleShowValues: true,
                         scales: {
                             yAxes: [{
                                 ticks: {
                                     fontColor: "white",
                                     fontSize: 10,
                                     beginAtZero: true,
                                     stepSize: 5
                                 }
                             }],
                             xAxes: [{
                                 ticks: {
                                     fontColor: "white",
                                     fontSize: 10,
                                     autoSkip: false
                                 }
                             }]
                         }
                     }}
                     width={600} height={500}/>
            </div>
        )
    }

    chartData() {
        return {
            labels: this.props.metricsLabels,
            datasets: [{
                title: "Priority",
                data: this.props.metricsData,
                backgroundColor: [
                '#2a9af3',
                '#8bc34a',
                '#cc0000',
                '#ffffff'
                ],
                borderColor: '#404043',
                borderWidth: 1
            }]
        }
    }
}

export default BarWidget;


