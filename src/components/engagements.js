import React, { Component } from 'react';
import { connect } from 'react-redux';  // Makes the link between react and redux
import { getEngagements, createEngagement } from '../actions/action_engagements';
import _ from 'lodash';
import { HeaderLogin } from "./header1";
import {Input, Collection, CollectionItem, Button, Preloader} from "react-materialize";
import moment from "moment";
import anonymous_user from '../images/anonymous_user.png';
import noEngagement from '../images/noEngagement.png';

class Engagements extends Component {
  constructor(props){
    super(props);
    this.state={
      newExpand:false,
      // engagements:props.engagements,
      newEngagementName:"",
      saving: false
    }
  }

  // After component appears in dom
  // lifecycle method - called by React
  componentDidMount() {
    console.log('componentDidMount, enagements');
    this.props.getEngagements();
    this.toggleSpinner = this.toggleSpinner.bind(this);
    this.goToEngagement = this.goToEngagement.bind(this);
  }

  addEngagement(){

    this.toggleSpinner();
    this.props.createEngagement(this.state.newEngagementName, (response) => {
      this.toggleSpinner();
      this.forceUpdate();
    });


    //    this.props.updateUserStory(userStoryUpdate, (response) => {
    //       console.log("onSubmit callback response: ", response);
    //       this.props.history.push(`/userStories/${this.fetchUserStoryProperty("engagementId")}/${this.fetchUserStoryProperty("workshop")}`);
    //   });

    // .then(() => {
    //   // this.toggleSpinner();
    //   alert('back from create !!');
    // });

    // let list=this.state.engagements || [];
    // if (!(list instanceof Array)){
    //   list=[];
    // }
    // list.push({
    //   engagementId:Date.now(),
    //   name:this.state.newEngagementName,
    //   status:"inprogress",
    //   date:new Date()
    // })
    // this.setState({engagements:list});
    // this.state.newEngagementName="";
    // this.state.newExpand=false;
    this.setState({'newExpand': false});
  }
  statusText(status){
    switch (status){
      case "IN_PROGRESS":
        return "In Progress";
      default:
        return "In Progress";
    }
  }

  toggleSpinner() {
    this.setState({'saving': !this.state.saving});
  }

  goToEngagement(engagement) {
    this.props.history.push(`/dashboard/${engagement.engagementId}`);
  }

  // <CollectionItem href={`/dashboard/${engagement.engagementId}`} key={engagement.engagementId} className="animated bounce ">

  renderEngagements() {
    return _.map(this.props.engagements, engagement => {
      return (
        <CollectionItem onClick={()=>this.goToEngagement(engagement)} key={engagement.engagementId} className="animated bounce">
          <div className="profile small">
            <img alt="" src={anonymous_user}/>
          </div>
          <div className="customerInfo">
            <div className="customerName">{engagement.name}</div>
            <div className="customerStatus">
              <span>Session Status:</span>
              <span className={`status ${engagement.status}`}>{this.statusText(engagement.status)}</span>
              <span className="light">| Session Created: </span>
              <span className="light">{moment(engagement.date).format('DD-MM-YYYY')}</span>
            </div>
          </div>
        </CollectionItem>
      );
    });
  }


  renderEngagementsWrapper(){
    if (this.props.engagements && _.size(this.props.engagements) > 0){
      return (<Collection>
            {this.renderEngagements()}
          </Collection>)
    }else{
      return this.renderNoEngagementFound();
    }
  }
  renderNoEngagementFound(){
    return (
      <div className="noEngagement">
        <img alt="" src={noEngagement}/>
        <div className="text">
          No Engagment Found.
        </div>
      </div>
    )
  }

  render() {

    if (this.props.engagements.error) {
      console.log('Found error ' + JSON.stringify(this.props.engagements.error));
      this.props.history.push('/');
      return (<div></div>);
    }

    const curUser={
      email:"user@email.com"
    }
    return (
      <engagements>
        <HeaderLogin user={curUser}></HeaderLogin>
        <div className="container">
          <div className="header">
            <div>Navigate Sessions</div>
            <span className="flex1"></span>
            <div className="search">
              <Input label="Search">
              </Input>
            </div>
          </div>
          { this.state.saving ? <Preloader className="preloadspinner centered big" flashing/> : null }
          {this.renderEngagementsWrapper()}
        </div>
        <div className={'newEngagement '+(this.state.newExpand?'expand':'')}>
          <Button onClick={()=>this.setState({newExpand:!this.state.newExpand})} floating large className='newBtn' waves='light' icon='navigation' />
            <div className="container">
            <Input value={this.state.newEngagementName} onChange={(evt)=>this.setState({newEngagementName:evt.target.value})} label="Session Title / Customer Name">
              </Input>
              <span className="flex1"></span>
              <button onClick={()=>this.addEngagement()} className="waves-effect waves-light btn-floating btn-large"><i className="material-icons">check</i></button>
            </div>
        </div>
      </engagements>
    )
  }
}

// Takes application state as an argument
// What ever is returned from here shows up as props
// for the class
// this function is the glue between react and redux
function mapStateToProps (state) {
  return { engagements: state.engagements };
}

// A Container (Smart Component) is a react component that has a direct
// connection to redux application state
// We want to export the Container and not simply the class Engagements
// connect takes a function and a Component and creates a container
// A container is a component that is aware of the state contained in Redux
export default connect(mapStateToProps, { getEngagements, createEngagement })(Engagements);








