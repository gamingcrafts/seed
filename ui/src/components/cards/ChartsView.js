import React, { Component } from 'react';
import { connect } from 'react-redux';
import update from 'react-addons-update';
import {
EuiFlexGroup,
EuiFlexItem,
EuiPanel
} from '@elastic/eui'

import { PieChartOptions } from './options/pie';
import { TimeSeriesOptions } from './options/timeseries';



var Highcharts = require('highcharts');
var addFunnel = require('highcharts/modules/funnel');

class ChartsView extends Component {

constructor(props) {
super(props);
this.pieRef = React.createRef();
this.timeSeriesRef = React.createRef();
}

componentWillReceiveProps(nextProps) {
/**
* Timeseries data
*/
let series = [{name: 'Tokyo',
data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
}]
/**
* Pie chart data
*/
let pieData = [0, 5, 3, 5]

let pieSeries = [{
name: 'Count',
colorByPoint: true,
data: pieData
}]

Highcharts.chart(this.pieRef.current, update(PieChartOptions, {
series: { $set: pieSeries }
}))
Highcharts.chart(this.timeSeriesRef.current, update(TimeSeriesOptions, {
series: { $set: series }
}))
}

render() {
addFunnel(Highcharts);
return (
<EuiPanel>
<EuiFlexGroup>
<EuiFlexItem>
<div
ref={this.timeSeriesRef}
style={{ height: '250px' }} />
</EuiFlexItem>
<EuiFlexItem>
<div
ref={this.pieRef}
style={{ height: '250px' }} />
</EuiFlexItem>
</EuiFlexGroup>
</EuiPanel>
)
}
}

const mapStateToProps = ({ CardsReducer }) => {
return { CardsReducer }
}

export default connect(mapStateToProps, {})(ChartsView);