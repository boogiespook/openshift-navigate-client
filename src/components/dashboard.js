import React, { Component } from 'react';
import Header from './header';
import { HeaderBanner } from "./header2";
import PieWidget from "./chartwidgets/PieWidget";
import BarWidget from "./chartwidgets/BarWidget";
import CircularProgressbar from 'react-circular-progressbar';
import { CardPanel, Collection, CollectionItem, Input, Row, Col } from 'react-materialize';
import { connect } from "react-redux";// add this because we need to get the data into our container from redux
import { getUserStories } from "../actions/action_userStories";
import { getWorkShops } from "../actions/action_workshops";
import  { getConfigurationData } from "../actions/action_configurations";
import { getBusinessGoals } from '../actions/action_business_goals';
import { bindActionCreators } from "redux";
import {mapIconNameToObject} from '../helpers/react-icon-loader';
import Icon from 'react-icons-kit';
import _ from "lodash";
import sunWhite from '../images/sun-white.png';
import cloudyWhite from '../images/cloudy-white.png';
import rainWhite from '../images/rain-white.png';
import thunderWhite from '../images/thunder-white.png';
import incompleteWhite from '../images/incomplete-white.png';


class Dashboard extends Component {

  static PEOPLE_PRETYPE = "People";
  static TECHNOLOGY_PRETYPE = "Technology";
  static PROCESS_PRETYPE = "Process";

  static LOW_PRIORITY = "Low";
  static MED_PRIORITY = "Medium";
  static HIGH_PRIORITY = "High";

  static SMALL_EFFORT = "Small";
  static MED_EFFORT = "Medium";
  static LARGE_EFFORT = "Large";
  static EXTRA_LARGE_EFFORT = "X Large";

  static PRETYPE_METRICS = [Dashboard.PEOPLE_PRETYPE, Dashboard.TECHNOLOGY_PRETYPE, Dashboard.PROCESS_PRETYPE];
  static PRIORITY_METRICS = [Dashboard.LOW_PRIORITY, Dashboard.MED_PRIORITY, Dashboard.HIGH_PRIORITY];
  static EFFORT_METRICS = [Dashboard.SMALL_EFFORT,Dashboard.MED_EFFORT,Dashboard.LARGE_EFFORT,Dashboard.EXTRA_LARGE_EFFORT];

  constructor(props) {
    super();
    this.state = { 'selectedWorkshop' : "" };
    this.preTypeAllocation = {};
  }

  componentDidMount() {
    console.log("componentDidMount props: ", this.props);
    var self = this;

    if (!this.props.dashboardState.workshops) {
        console.log("Dashboard componentDidMount getWorkShops");
        this.props.getWorkShops(this.props.match.params.id);
    }

    if (!this.props.dashboardState.proCharter) {
      console.log("Dashboard componentDidMount getBusinessGoals");
      this.props.getBusinessGoals(this.props.match.params.id);
    }

    if (!this.props.dashboardState.userstories) {
      console.log("Dashboard componentDidMount getUserStories");
      this.props.getUserStories(this.props.match.params.id, undefined, (response) => {
        console.log("Dashboard getUserStories callback response: ", response);
        //console.log("Dashboard getUserStories state: ", this.props.dashboardState.userstories);
        let configId = _.find(response.data, 'configId').configId;
        console.log("componentDidMount configId: ", configId);
        this.props.getConfigurationData(configId);

        setTimeout(function() {
          let firstWorkshop = _.find(self.props.dashboardState.workshops, 'name').name;
          self.countUserStoriesPreTypeAllocations(firstWorkshop);
          self.setState({'selectedWorkshop': firstWorkshop});
        }, 100);
      });
    }
  }

  componentWillMount() {
    console.log("componentWillMount props: ", this.props);
    var self = this;

    this.props.getUserStories(this.props.match.params.id, undefined, (response) => {
      setTimeout(function() {
        let firstWorkshop = _.find(self.props.dashboardState.workshops, 'name').name;
        self.countUserStoriesPreTypeAllocations(firstWorkshop);
        self.setState({'selectedWorkshop': firstWorkshop});
      }, 100);
    });
  }

  render() {
    console.log("render");

    const curUser={
      email:"user@email.com"
    };

    return (
        <dashboard>
            <div className="container">
                <HeaderBanner user={curUser}></HeaderBanner>
                <Header className="header" history={this.props.history} id={this.props.match.params.id || this.props.match.params.engagementId} />
                <span className="flex1"></span>

            <Collection>
                <CollectionItem>
                    Project Charter Priority
                    <Row>
                        <Col s={4} className='grid-example'>
                            <CardPanel className='ProCharterPanel'>
                                <span>{this.getProcharter(1).goal}</span>
                            </CardPanel>
                        </Col>
                        <Col s={4} className='grid-example'>
                            <CardPanel className="ProCharterPanel">
                                <span>{this.getProcharter(2).goal}</span>
                            </CardPanel>
                        </Col>
                        <Col s={4} className='grid-example'>
                            <CardPanel className="ProCharterPanel">
                                <span>{this.getProcharter(3).goal}</span>
                            </CardPanel>
                        </Col>
                    </Row>
                    Architecture Review
                    <Row className="arch-review-row">
                        <Col s={12} className='grid-example'>
                            <CardPanel className='arch-review'>
                              <div className="row">
                                <div className="col s1">
                                    <i className="material-icons circle red avatar">
                                      <Icon size={24} icon={mapIconNameToObject("ic_library_books")} style={{ color: 'white' }}/>
                                    </i>
                                </div>
                                <div className="col s6">
                                  <div className="title">Status of Architectural Review</div>
                                  <div className="text">Last edit: 26/09/2017 12:12</div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col s4 flex sunny">
                                  <div className="square">
                                    <img alt="" src={sunWhite} />
                                  </div>
                                  <div className="arch-review-list">
                                    <div className="title">Sunny Forecast</div>
                                    <div className="text">App Lifecycles, Dependendcies</div>
                                  </div>
                                </div>

                                <div className="col s4 flex cloudy">
                                  <div className="square">
                                    <img alt="" src={cloudyWhite} />
                                  </div>
                                  <div className="arch-review-list">
                                    <div className="title">Cloudy Forecast</div>
                                    <div className="text">Storage, Security</div>
                                  </div>
                                </div>

                                <div className="col s4 flex rainy">
                                  <div className="square">
                                    <img alt="" src={rainWhite} />
                                  </div>
                                  <div className="arch-review-list">
                                    <div className="title">Rainy Forecast</div>
                                    <div className="text">ID Mgmt, Monitoring, Networking</div>
                                  </div>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col s4 flex thunder">
                                  <div className="square">
                                    <img alt="" src={thunderWhite} />
                                  </div>
                                  <div className="arch-review-list">
                                    <div className="title">Stormy Forecast</div>
                                    <div className="text">Operational Process</div>
                                  </div>
                                </div>

                                <div className="col s4 flex incomplete">
                                  <div className="square">
                                    <img alt="" src={incompleteWhite} />
                                  </div>
                                  <div className="arch-review-list">
                                    <div className="title">Incomplete</div>
                                    <div className="text">Provisioning, App Development</div>
                                  </div>
                                </div>
                              </div>

                            </CardPanel>
                        </Col>
                    </Row>






                    Workshops
                    <Row style={{ padding: '1%' }}>
                        <Col s={3} className="WorkshopsPanel" >
                            <div className='progressPanel'>
                            <CircularProgressbar percentage={this.fetchWorkshopsPercentComplete()} strokeWidth={8} textForPercentage={(pct) => `${pct}%`} />
                            </div>
                        </Col>
                        <Col s={1}><div></div></Col>



                        <Col s={8} className='WorkshopsPanel' style={{ height: '360px' }}>
                            <div>
                                <Row>
                                    <Col s={10} className='grid-example'>
                                        <Row>
                                            {this.renderSelect()}
                                        </Row>
                                    </Col>

                                    <Col s={4} className='grid-example'>
                                         <div>
                                            <PieWidget preTypeAllocation={this.preTypeAllocation}
                                                        metricsData={this.generateWorkshopPieMetricsData(Dashboard.PRETYPE_METRICS)}
                                                        metricsLabels={Dashboard.PRETYPE_METRICS} />
                                         </div>
                                    </Col>



                                    <Col s={4} className='grid-example'>
                                        <Row>
                                            <Col s={2}>
                                                <div className="wrap">
                                                  <div className="label top-left">
                                                      <div className="content">
                                                        EFFORT
                                                      </div>
                                                  </div>
                                                </div>
                                            </Col>
                                            <Col s={10} className='grid-example'>
                                                <div>
                                                    <BarWidget metricsData={this.generateWorkshopBarMetricsData(Dashboard.EFFORT_METRICS, "effortCount")}
                                                               metricsLabels={Dashboard.EFFORT_METRICS}/>
                                                </div>
                                            </Col>

                                        </Row>
                                    </Col>

                                    <Col s={4} className='grid-example'>
                                        <Row>
                                            <Col s={2}>
                                              <div className="wrap">
                                                <div className="label top-left">
                                                  <div className="content">
                                                    PRIORITY
                                                  </div>
                                                </div>
                                              </div>
                                            </Col>
                                            <Col s={10} className='grid-example'>
                                                <div>
                                                    <BarWidget metricsData={this.generateWorkshopBarMetricsData(Dashboard.PRIORITY_METRICS, "priorityCount")}
                                                               metricsLabels={Dashboard.PRIORITY_METRICS}/>
                                                </div>
                                            </Col>

                                        </Row>
                                    </Col>
                                </Row>
                            </div>

                        </Col>



                    </Row>

                  <Row>
                    <span>
                    <div className="fixed-action-btn horizontal click-to-toggle">
                      <a className="btn-floating btn-large fab-color">
                        <i className="material-icons">menu</i>
                      </a>
                      <ul>
                        <li><a className="btn-floating red"><i className="material-icons">insert_chart</i></a></li>
                        <li><a className="btn-floating yellow darken-1"><i className="material-icons">format_quote</i></a></li>
                        <li><a className="btn-floating green"><i className="material-icons">publish</i></a></li>
                        <li><a className="btn-floating blue"><i className="material-icons">attach_file</i></a></li>
                      </ul>
                    </div>
                    </span>
                  </Row>
                </CollectionItem>
            </Collection>

        </div>

      </dashboard>

    )
  }


  renderSelect() {
      if(!this.props.dashboardState.workshops) {
          // return <Input s={4} type='select'/>
          // return (<div></div>);
      }
      else {
          return (
              <Input s={4} type='select' onChange={this.updateValue.bind(this)} className="workshop-select-dropdown">
                  {Object.keys(this.props.dashboardState.workshops).map((t) => <option>{this.props.dashboardState.workshops[t].name}</option>)}
              </Input>
          )
      }
  };

  fetchWorkshopsPercentComplete() {
    console.log("fetchWorkshopsPercentComplete: ", this.props);
    let workShopCount = 0;
    let workShopCompleteCount = 0;

    if (undefined !== this.props.dashboardState && undefined !== this.props.dashboardState.workshops) {
        console.log("fetchWorkshopsPercentComplete for workshops: ", this.props.dashboardState.workshops);

        for (let key of Object.keys(this.props.dashboardState.workshops)) {
            workShopCount++;
            if (this.props.dashboardState.workshops[key].status.indexOf("COMPLETE") !== -1) {
                workShopCompleteCount++;
            }
        }
    }

    return workShopCount === 0 ? 0 : Math.round((workShopCompleteCount/workShopCount) * 100);
  }

  updateValue (event) {
    console.log("Workshop select changed to ", event.target.value);
    this.countUserStoriesPreTypeAllocations(event.target.value);
    this.setState({'selectedWorkshop': event.target.value});
  }


  countUserStoriesPreTypeAllocations(workshopName) {
    this.preTypeAllocation = {};
    let preTypeAllocation = this.preTypeAllocation;

    if (workshopName !== undefined && workshopName.length > 0 && undefined !== this.props.dashboardState && undefined !== this.props.dashboardState.userstories) {
      console.log("countUserStoriesPreTypeAllocations for workshop: ", workshopName);

      for (let key of Object.keys(this.props.dashboardState.userstories)) {
        if (this.props.dashboardState.userstories[key].workshop.indexOf(workshopName) !== -1) {

          //console.log("this.props.dashboardState.userstories[key].workshop: ", this.props.dashboardState.userstories[key].workshop);
          let preType = this.props.dashboardState.userstories[key].preType;
          let effort = this.props.dashboardState.userstories[key].effort;
          let priority = this.props.dashboardState.userstories[key].priority;
          //console.log("preType: ", preType);

          if (undefined === preTypeAllocation[preType]) {
            preTypeAllocation[preType] = {
              count: 0,
              priorityCount : {[Dashboard.LOW_PRIORITY]: 0, [Dashboard.MED_PRIORITY]: 0, [Dashboard.HIGH_PRIORITY]: 0},
              effortCount : {[Dashboard.SMALL_EFFORT]: 0, [Dashboard.MED_EFFORT]: 0, [Dashboard.LARGE_EFFORT]: 0, [Dashboard.EXTRA_LARGE_EFFORT]: 0}
            };
          }

          preTypeAllocation[preType].count++;
          preTypeAllocation[preType].priorityCount[priority]++;
          preTypeAllocation[preType].effortCount[effort]++;
        }
      }
    }

    console.log("countUserStoriesPreTypeAllocations: ", preTypeAllocation);
  }


  generateWorkshopPieMetricsData(metricsArray) {
    let metricsDataArray = [];

    for (let metric of metricsArray) {
      metricsDataArray.push(
        this.preTypeAllocation[metric] !== undefined ? this.preTypeAllocation[metric].count : 0
      );
    }
    return metricsDataArray;
  }

  generateWorkshopBarMetricsData(metricsArray, criteria) {
    var self = this;

    let sumPreTypesByCriteriaAndType = function(criteria, metricType) {
      // e.g criteria: effort, metricType: X Large
      return _.reduce(self.preTypeAllocation, function(sum, object) {
        return sum + object[criteria][metricType];
      }, 0);
    };

    let metricsDataArray = [];

    for (let metric of metricsArray) {
      metricsDataArray.push(sumPreTypesByCriteriaAndType(criteria, metric ));
    }

    console.log("generateWorkshopBarMetricsData: ", metricsDataArray);
    return metricsDataArray;
  }

  getProcharter(priority) {
    let goal = {goal: "Not specified", decription: "Not specified"};

    if (undefined !== this.props.dashboardState.proCharter) {

      for (let goal of this.props.dashboardState.proCharter) {
        if (goal.priority === priority) {
          return goal;
        }
      }
    }
    return goal;
  }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({getWorkShops, getUserStories, getConfigurationData, getBusinessGoals}, dispatch);
}


function mapStateToProps({dashboardState}) {
    //      key for props : key used in combinedReducers /reducers/index.js
    console.log("mapStateToProps dashboardState: ", dashboardState);
    return {dashboardState};
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);