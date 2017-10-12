/**
 * Created by jkenny on 01/09/2017.
 * A container view component to render the list of currently available User Stories, note many User Stories are related
 * to a single Workshop.
 */

import React, { Component } from 'react';
import { MenuItem, Icon, Collection, CollectionItem, Row, Col } from 'react-materialize';
import Header from './header';
import {HeaderBanner} from "./header2";
import {connect} from "react-redux";// add this because we need to get the data into our container from redux
import {getUserStories} from "../actions/action_userStories";
import { deleteUserStory } from "../actions/action_userStory";
import _ from 'lodash';

// <Icon icon={ic_delete} />;

class UserStories extends Component {


    // Automatically called by React once Component added to the DOM.
    componentDidMount() {
        console.log("UserStories componentDidMount");

        this.props.getUserStories(this.props.match.params.engagementId, this.props.match.params.workshopName, (response) => {
            console.log("UserStories getUserStories callback response: ", response);
        });
    }

    renderUserStories() {
        console.log("UserStories userstories: ", this.props.userstories);

        return _.map(this.props.userstories, (userStory, index) => {
            return(
                <CollectionItem key={userStory.workShopId}>

                    <Row>
                        <div onClick={this.handleRowClick.bind(this, userStory.configId, userStory, 'load')} className="userstory-action">
                            <Col s={1} className='grid-example' >
                                {index+1}
                            </Col>
                            <Col s={4} className='grid-example'>
                                <div>
                                    {userStory.workshop}
                                </div>
                                <div>
                                    {userStory.userStory}
                                </div>
                            </Col>

                            <Col s={2} className='grid-example'>
                                {userStory.priority}
                            </Col>
                            <Col s={2} className='grid-example'>
                                {userStory.effort}
                            </Col>
                            <Col s={2} className='grid-example'>
                                {userStory.rtiArea}
                            </Col>
                        </div>

                        <div onClick={this.handleRowClick.bind(this, userStory.configId, userStory, 'delete')}>
                            <Col s={1} className='grid-example' style={{ color: 'black' }}>
                                <Icon small>delete</Icon>
                            </Col>
                        </div>
                    </Row>

                </CollectionItem>
            )
        });
    }

    render() {
        const curUser={
            email:"user@email.com"
        };

        if(!this.props.userstories) {
            return (
                <div></div>
            );
        }

        return (
            <userStories>
                <div className="container">
                    <HeaderBanner user={curUser}></HeaderBanner>
                    <Header className="header" history={this.props.history} id={this.props.match.params.engagementId || this.props.match.params.id} />
                    <span className="flex1"></span>

                    <div className="dependencybreadcrumb">
                        <MenuItem className="item">Dependencies</MenuItem>
                    </div>

                <div>
                    <h6 style={{ margin: '20px' }}>User Stories </h6>
                    <Collection>
                        <CollectionItem>
                            <Row>
                                <Col s={1} className='grid-example'>
                                    #
                                </Col>
                                <Col s={4} className='grid-example'>
                                    DESCRIPTION
                                </Col>
                                <Col s={2} className='grid-example'>
                                    PRIORITY
                                </Col>
                                <Col s={2} className='grid-example'>
                                    EFFORT
                                </Col>
                                <Col s={2} className='grid-example'>
                                    RTI AREA
                                </Col>
                                <Col s={1} className='grid-example'>

                                </Col>
                            </Row>
                        </CollectionItem>
                        {this.renderUserStories()}
                    </Collection>
                </div>
            </div>
            </userStories>
        );
    }

    handleRowClick(configId, userStory, action, event) {
        console.log("Row Click configId: ", configId);
        console.log("Row Click userStory Id: ", userStory.usId);
        console.log("Row Click userStory guid: ", userStory.storyId);
        console.log("Row Click action: ", action);

        if (action.indexOf("delete") === -1) {
            this.props.history.push(`/userStory/${configId}/${userStory.usId}`);
        }
        else {

            this.props.deleteUserStory(userStory.storyId, (response) => {
                console.log("onSubmit callback response: ", response);

                this.props.getUserStories(this.props.match.params.engagementId, this.props.match.params.workshopName, (response) => {
                    console.log("UserStories getUserStories callback response: ", response);
                });
            });
        }
    }

}

function mapStateToProps({userstories}) {
    //      key for props : key used in combinedReducers /reducers/index.js
    console.log("mapStateToProps userstories: ", userstories);
    return {userstories};
}


// Another way to wire in an Action creator instead of using mapDispatchToProp
export default connect(mapStateToProps, {getUserStories, deleteUserStory})(UserStories);
