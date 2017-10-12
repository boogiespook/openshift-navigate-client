/**
 * Created by jkenny on 01/09/2017.
 * A container view component to render a single User Story, this class handles
 * all the User Story CRUD operations.
 */

import React, {Component} from "react";
import {Field, reduxForm, change as changeFieldValue} from "redux-form";//redux-from handles the state and validation of our form, not responsible for making post requests
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { CardPanel, MenuItem, Collection, CollectionItem, Input, Row, Col } from 'react-materialize';
import { getConfigurationData } from "../actions/action_configurations";
import { updateUserStory } from "../actions/action_userStory";
import Header from './header';
import {HeaderBanner} from "./header2";

class UserStory extends Component {
    // Automatically called by React once Component added to the DOM.
    componentWillMount() {
        console.log("componentDidMount userStory: ", this.props.match.params);

        this.props.getConfigurationData(this.props.match.params.configId);
        this.props.change("userStory", this.fetchUserStoryProperty("userStory"));
    }

    componentWillUnmount() {
        console.log("componentWillUnmount userStory: ");
    }

    renderSelect(field) {
        console.log("renderSelect field: ", field);

        return (
            <div>
                <Input type='select' label={field.label} defaultValue={field.dv} onChange={field.input.onChange}>
                    {Object.values(this.props.engagementConfig[field.configKey]).map((t) => <option key={t}
                                                                                                    value={t}>{t}</option>)}
                </Input>
                {field.touched && field.error && <div className="error">{field.error}</div>}
            </div>
        )

    };

    renderSelectWithValue(field) {
        console.log("render field: ", field);

        return (
            <div>
                <Input type='select' label={field.label} defaultValue={field.dv} onChange={field.input.onChange}>
                    {Object.values(this.props.engagementConfig[field.configKey]).map((config) =>

                        <option key={Object.values(config)[1]} value={Object.values(config)[0]}>{Object.values(config)[0]}</option>)}
                </Input>
                {field.touched && field.error && <div className="error">{field.error}</div>}
            </div>
        )
    };

    renderTextField(field) {
        console.log("render field: ", field);

        return (
            <div>

                <Input s={12} label={field.label} defaultValue={field.dv} type="text" onChange={field.input.onChange} validate>
                </Input>

                <div>
                    {field.meta.touched ? field.meta.error : ""}
                </div>
            </div>
        );
    }

    render() {
        const curUser={
            email:"user@email.com"
        };

        console.log("UserStory render ", this.props);
        console.log("UserStory render this.props.match.params ", this.props.match.params);

        const { handleSubmit} = this.props; //passed to the component by reduxForm

        if (!this.props.engagementConfig.configId) {

            return (
                <div>Loading..</div>
            );
        }

        console.log("UserStory render with configId: ", this.props.engagementConfig.configId);
        return (
            <userStory>
                <div className="container">
                    <HeaderBanner user={curUser}></HeaderBanner>
                    <Header className="header" history={this.props.history} id={this.props.match.params.engagementId || this.props.match.params.id} />
                    <span className="flex1"></span>

                    <div className="dependencybreadcrumb">
                        <MenuItem className="item">Dependencies > {this.fetchUserStoryProperty("usId")}</MenuItem>
                    </div>

                    <CardPanel>
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Collection>

                                <CollectionItem>
                                    <Row>
                                        <Col s={12}>
                                            <Field label="Content" name="userStory" dv={this.fetchUserStoryProperty("userStory")} component={this.renderTextField.bind(this)}>
                                            </Field>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col s={4}>

                                            <Field label="Type of PRE" name="preType" dv={this.fetchUserStoryProperty("preType")} configKey="preTypes" component={this.renderSelect.bind(this)}>
                                            </Field>
                                        </Col>
                                        <Col s={4}>
                                            <Field label="Actor" name="actor" dv={this.fetchUserStoryProperty("actor")} configKey="actors" component={this.renderSelect.bind(this)}>
                                            </Field>
                                        </Col>
                                        <Col s={4}>
                                            <Field label="RTI Area" name="rtiArea" dv={this.fetchUserStoryProperty("rtiArea")} configKey="rtiAreas" component={this.renderSelect.bind(this)}>
                                            </Field>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col s={4}>

                                            <Field label="Effort" name="effort" dv={this.fetchUserStoryProperty("effort")} configKey="userStoryEffort" component={this.renderSelectWithValue.bind(this)}>
                                            </Field>
                                        </Col>
                                        <Col s={4}>
                                            <Field label="Priority" name="priority" dv={this.fetchUserStoryProperty("priority")} configKey="userStoryPriority" component={this.renderSelectWithValue.bind(this)}>
                                            </Field>
                                        </Col>
                                        <Col s={4}>

                                        </Col>
                                    </Row>

                                </CollectionItem>

                                <CollectionItem>
                                    <button type="submit" className="btn">Update</button>
                                    <Link className="btn" to={`/userStories/${this.fetchUserStoryProperty("engagementId")}/${this.fetchUserStoryProperty("workshop")}`}>
                                        Cancel
                                    </Link>
                                </CollectionItem>

                            </Collection>

                        </form>
                    </CardPanel>
                    </div>
                </userStory>
        );
    }

    //called by reduxForm if everything is OK
    onSubmit(values) {
        console.log("onSubmit values: ", values);
        let userStoryUpdate = this.props.userstories[this.props.match.params.usId];
        console.log("onSubmit userStoryUpdate: ", userStoryUpdate);

        Object.keys(values).forEach(key=> userStoryUpdate[key] = values[key]);

         this.props.updateUserStory(userStoryUpdate, (response) => {
            console.log("onSubmit callback response: ", response);
            this.props.history.push(`/userStories/${this.fetchUserStoryProperty("engagementId")}/${this.fetchUserStoryProperty("workshop")}`);
        });

    }

    fetchUserStoryProperty(property) {
        return this.props.userstories[this.props.match.params.usId][property];
    }
}



function validate(values) {
    console.log("UserStoryForm validate: ", values);
    const errors = {};

    /*if(!values.userStory) {
        errors.userStory = "Enter a title";
    }*/

    return errors;
}



function mapDispatchToProps(dispatch) {
    return bindActionCreators({getConfigurationData, updateUserStory, changeFieldValue}, dispatch);
}

function mapStateToProps(state, ownProps) {
    //      key for props : key used in combinedReducers /reducers/index.js
    console.log("mapStateToProps state: ", state);
    return {userstories: state.userstories, engagementConfig: state.engagementConfig};
}

// the form property is like the name of a form in our app
// We wire up redux form to our PostNew view component, like connect helper, adds some additional properties to our component
//multiple helpers
export default reduxForm({
    form: 'UserStoryForm',
    validate: validate
})(
    connect(mapStateToProps, mapDispatchToProps)(UserStory)
);

