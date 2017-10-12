/**
 * Created by jkenny on 08/09/2017.
 */

import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';

const options = {
    responsive:true,
    legend: {
        display: true,
        position: 'bottom',
        labels: {
            boxWidth: 5,
            padding: 3
        }
    }
};

const styles = {
    graphContainer: {
        border: 'none',
        padding: '5px'
    }
};

class PieWidget extends Component {

    constructor(props) {
        console.log("constructor props: ", props);
        super(props);
    }

    render() {
        console.log("PieWidget render: ");
        return (
            <div style={styles.graphContainer}>
                <Pie data={this.chartData()}
                           options={options}
                           width={600} height={500}/>
            </div>
        )
    }

    chartData() {
        console.log("PieWidget chartData: ");

        return {
            labels: this.props.metricsLabels,
            datasets: [{
                data: this.props.metricsData,
                backgroundColor: [
                    '#2a9af3',
                    '#8bc34a',
                    '#cc0000'
                ],
                borderColor: '#404043',
                borderWidth: 1
            }]
        }
}
}

export default PieWidget;


