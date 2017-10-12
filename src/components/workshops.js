/**
 * Created by jkenny on 31/08/2017.
 * A container view component to render the list of currently available workshops.
 */

import React, { Component } from 'react';
import Header from './header';
import {HeaderBanner} from "./header2";
import {connect} from "react-redux";// add this because we need to get the data into our container from redux
import {getWorkShops} from "../actions/action_workshops";
import {updateWorkshop} from "../actions/action_workshops";
import Icon from 'react-icons-kit';
import {mapIconNameToObject} from '../helpers/react-icon-loader';
import {bindActionCreators} from "redux";
import _ from 'lodash';


class WorkShops extends Component {
    static STATUS_KEYWORD = "Status";

    constructor ( props ) {
        super( props );

        this.StatusEnum = {
            NOT_STARTED: 1,
            INPROGRESS: 2,
            COMPLETE: 3,
        };
    }

    // Automatically called by React once Component added to the DOM.
    componentDidMount() {
        this.props.getWorkShops(this.props.match.params.engagementId || this.props.match.params.id);
    }

    renderStatus(workshop) {
        if (workshop.status === "NOT_STARTED") {
            return (
                <div onClick={this.handleStatusClick.bind(this, workshop.workShopId)} >
                    <Icon icon={mapIconNameToObject("ic_radio_button_unchecked")} style={{ color: 'grey'}} />
                </div>
            );
        }
        if (workshop.status === "INPROGRESS") {
            return (
                <div onClick={this.handleStatusClick.bind(this, workshop.workShopId)}>
                    <Icon icon={mapIconNameToObject("ic_timelapse")} style={{ color: 'blue' }} onClick={this.handleStatusClick.bind(this)}/>
                </div>
            );
        }
        if (workshop.status === "COMPLETE") {
            return (
                <div onClick={this.handleStatusClick.bind(this, workshop.workShopId)}>
                    <Icon icon={mapIconNameToObject("ic_check_circle")} style={{ color: 'green'}} onClick={this.handleStatusClick.bind(this)}/>
                </div>
            );
        }
    }

    renderWorkShops() {
        console.log("renderWorkShops workshops: ", this.props.workshops);

        //this.props.posts is an object, so unlike array not .map available, so use lodash _map, can deal with object, will return an array

        return _.map(this.props.workshops, (workshop) => {
            return(

                  <li className="collection-item avatar" key={workshop.workShopId}>

                      <div className="row">
                          <div className="col">
                              <i className="material-icons circle red">
                                  <Icon icon={mapIconNameToObject(workshop.icon)} style={{ color: 'white' }}/>
                              </i>
                          </div>

                          <div className="col s8">
                              <span className="title">{workshop.name}</span>
                              <p>{workshop.description}</p>
                          </div>

                          <div className="col s2">
                              {this.renderStatus(workshop)}
                          </div>

                          <div className="col s2">
                              <span className="secondary-content" style={{ 'margin-top': '10px' }} onClick={this.handleNavigateClick.bind(this, workshop.engagementId, workshop.name)}>
                                <Icon icon={mapIconNameToObject("arrow_right")} style={{ color: 'green' }}/>
                              </span>
                          </div>

                      </div>
                  </li>

            )
        });
    }

    render() {
        const curUser={
            email:"user@email.com"
        };

        return (
            <workshops>
                <div className="container">
                    <HeaderBanner user={curUser}></HeaderBanner>
                    <Header className="header" history={this.props.history} id={this.props.match.params.engagementId || this.props.match.params.id} />
                    <span className="flex1"></span>

                    <div>
                        <div>
                            <h6 style={{ margin: '20px' }}>Available Workshops </h6>
                            <ul className="collection">
                                {this.renderWorkShops()}
                            </ul>
                        </div>
                    </div>
                </div>
            </workshops>
            );
    }

    handleStatusClick(workShopId, event) {
        console.log("handleStatusClick workShopId :", workShopId);
        this.updateWorkshop(workShopId);
    }

    updateWorkshop(workShopId) {
        console.log('updateWorkshop workShopId: ', workShopId);
        let updatedWorkshops = _.cloneDeep(this.props.workshops);
        console.log('updateWorkshop updatedWorkshops: ', updatedWorkshops);

        let workshopToUpdate = updatedWorkshops[workShopId];

            if(undefined !== workshopToUpdate) {
                this.toggleStatus(workshopToUpdate);
            }


        console.log('updatedWorkshops: ', updatedWorkshops);
        this.props.updateWorkshop(workshopToUpdate, (response) => {
            console.log("updatedWorkshops callback response: ", response);
            this.props.getWorkShops(this.props.match.params.engagementId);
        });
    }

    toggleStatus(workshop) {
        let statusValue = this.StatusEnum[workshop.status];
        console.log("toggleStatus current statusValue: ", statusValue);
        statusValue = statusValue !== 3 ? statusValue + 1 : 1;
        console.log("toggleStatus new statusValue: ", statusValue);

        let newStatus = _.findKey(this.StatusEnum, (val) => val === statusValue);
        workshop.status = newStatus;
        console.log("toggleStatus new status: ", newStatus);
    }

    handleNavigateClick(engagementId, workshopName, event) {
        this.props.history.push(`/userStories/${engagementId}/${workshopName}`);
    }

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getWorkShops, updateWorkshop}, dispatch);
}

function mapStateToProps({workshops}) {
    //      key for props : key used in combinedReducers /reducers/index.js
    console.log("mapStateToProps workshops: ", workshops);
    return {workshops};
}

// Another way to wire in an Action creator instead of using mapDispatchToProp
export default connect(mapStateToProps, mapDispatchToProps)(WorkShops);
