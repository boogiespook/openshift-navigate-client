import React, { Component} from 'react';
import Header from './header';
import { HeaderBanner } from "./header2";
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getBusinessGoals, setBusinessGoals } from '../actions/action_business_goals';
import _ from 'lodash';
import { CardPanel, Card, Row, Col } from 'react-materialize';
import Draggable from 'react-draggable';


class ProCharter extends Component {
  static PRIORITY_KEYWORD = "TargetPriority";
  static SOURCE_GOAL_ID = "SourceGoalId";
  static GOALS_DIV = "GoalsDiv";

  constructor(props) {
    super(props);
    this.sourceGoalId = -1;
    this.targettedDropPriority = -1;
    this.sourcePriorityId = -1;
    this.highlightedDropDiv = null;
    console.log('constructor');
  }

  componentDidMount() {
    console.log('componentDidMount engagementId: ', this.props.match.params.engagementId);
    this.props.getBusinessGoals(this.props.match.params.engagementId);
  }

  componentWillUpdate() {
    console.log('componentWillUpdate props: ', this.props);
  }

  handleSourceDragStart(event, position) {
    console.log("handleSourceDragStart id: ", position.node.id);
    this.sourceGoalId = parseInt(position.node.id.replace(ProCharter.SOURCE_GOAL_ID, ""), 10);
  }

  handleSourceStop(event, position) {
    console.log("handleSourceStop targettedDropPriority: ", this.targettedDropPriority);
    console.log("handleSourceStop sourceGoalId: ", this.sourceGoalId);
    this.unhighlightPotentialPriorityDrop(this.highlightedDropDiv);

    if (this.sourceGoalId !== -1 && this.targettedDropPriority !== -1 && this.props.goals.findIndex(goal => goal.priority === this.targettedDropPriority) === -1) {
      this.updateBusinessGoalPriority();
    }
  }

  handleSourceDrag(event, position) {
    this.targettedDropPriority = -1;
    this.handleSourceDrop(event);
  }


  handleSourceDrop(event) {
    for (let [key, value] of Object.entries(this.refs)) {

      if (key.indexOf(ProCharter.PRIORITY_KEYWORD) !== -1) {
        let priorityDiv = ReactDOM.findDOMNode(value);
        let priorityDivRect = priorityDiv.getBoundingClientRect();

        if(this.isDraggableWithinPriorityBounds(event, priorityDivRect)) {
          this.highlightedDropDiv = priorityDiv;
          this.targettedDropPriority = parseInt(key.replace(ProCharter.PRIORITY_KEYWORD, ""), 10);
          this.highlightPotentialPriorityDrop(priorityDiv);
        }
        else {
          this.unhighlightPotentialPriorityDrop(priorityDiv);
        }
      }
    }

  }

  handleTargetDragStart(event, position) {
    console.log("handleTargetDragStart priority id: ", parseInt(position.node.id.replace(ProCharter.PRIORITY_KEYWORD, ""), 10));
    this.sourcePriorityId = parseInt(position.node.id.replace(ProCharter.PRIORITY_KEYWORD, ""), 10);
  }

  handleTargetDragStop(event, position) {
    let goalsRef = this.refs[ProCharter.GOALS_DIV];
    let goalsDiv = ReactDOM.findDOMNode(goalsRef);
    let goalsDivRect = goalsDiv.getBoundingClientRect();

    if(this.isDraggableWithinGoalsBound(event, goalsDivRect)) {
      if (this.sourcePriorityId !== -1) {
        this.resetBusinessGoalPriority();
      }
    }
  }

  updateBusinessGoalPriority() {
    let newGoals = this.props.goals;

    for (let goal of newGoals) {
      if (goal.goalId === this.sourceGoalId) {
        goal.priority = this.targettedDropPriority;
      }
    }

    this.sourceGoalId = -1;
    console.log("updateBusinessGoalPriority newGoals: ", newGoals);
    this.props.setBusinessGoals(this.props.match.params.engagementId, newGoals);
  }

  resetBusinessGoalPriority() {
    let newGoals = this.props.goals;

    for (let goal of newGoals) {
      if (goal.priority === this.sourcePriorityId) {
        delete goal.priority;
      }
    }

    this.sourcePriorityId = -1;
    console.log("resetBusinessGoalPriority: ", newGoals);
    this.props.setBusinessGoals(this.props.match.params.engagementId, newGoals);
  }

  isDraggableWithinGoalsBound(event, divRect) {
    if ((event.clientX + event.offsetX) <= divRect.right) {
      return true;
    }
  }

  isDraggableWithinPriorityBounds(event, divRect) {
    if (event.clientX >= divRect.left && event.clientX <= divRect.right &&
        event.clientY >= divRect.top && event.clientY <= divRect.bottom) {
      return true;
      }
  }

  highlightPotentialPriorityDrop(priorityDiv) {

    if (this.sourceGoalId !== -1 && this.targettedDropPriority !== -1 && this.props.goals.findIndex(goal => goal.priority === this.targettedDropPriority) !== -1) {
      priorityDiv.style.borderColor = "red";
      priorityDiv.style.borderStyle = "dashed";
    }
    else {
      priorityDiv.style.borderColor = "green";
      priorityDiv.style.borderStyle = "dashed";
    }

  }

  unhighlightPotentialPriorityDrop(priorityDiv) {
    priorityDiv.style.borderColor = "none";
    priorityDiv.style.borderStyle = "none";
  }

  renderGoals() {
    console.log('rendering goals: ');
    console.log(this.props.goals);
    let goals = this.props.goals;
    let orderdGoals = goals.sort((a,b) => a.order - b.order);
    console.log("orderdGoals: ", orderdGoals);

    return _.map(orderdGoals, (goal, index) =>
        !goal.priority ?

        <Col m={4} s={4} key={`${ProCharter.SOURCE_GOAL_ID}np${index}`}>

          <Draggable position={{x: 0, y: 0}} onDrag={this.handleSourceDrag.bind(this)} onStart={this.handleSourceDragStart.bind(this)} onStop={this.handleSourceStop.bind(this)} key={index+1}>
            <div id={`${ProCharter.SOURCE_GOAL_ID}${goal.goalId}`}>
              <Card className='small' textClassName='black-text' key={index+1}
                    title={goal.goal} actions={[<button>Learn</button>]}>
                <h6>{goal.description}</h6>
              </Card>
            </div>
          </Draggable>
        </Col>

        :

        <Col m={4} s={4} key={`${ProCharter.SOURCE_GOAL_ID}${index}`}>

          <Draggable onStart={() => false} key={index+1}>
            <div id={`${ProCharter.SOURCE_GOAL_ID}${goal.goalId}`} className="opacity50">
              <Card className='small' textClassName='black-text' key={index+1}
                    title={goal.goal} actions={[<button>'Learn'</button>]}>
                <h6>{goal.description}</h6>
              </Card>

            </div>
          </Draggable>
        </Col>

    );

  }

  renderPriorities() {
    console.log('rendering priorities: ');
    console.log(this.props.goals);
    let goals = this.props.goals;

    let priorities = _.map(goals, (goal, index) =>
        _.findIndex(goals, {'priority': index + 1}) !== -1 ?

        <Col m={12} s={12} key={`${ProCharter.PRIORITY_KEYWORD}${index}`}>
            <Draggable position={{x: 0, y: 0}} onStart={this.handleTargetDragStart.bind(this)} key={index+1} onStop={this.handleTargetDragStop.bind(this)}>
              <div id={`${ProCharter.PRIORITY_KEYWORD}${goal.goalId}`} ref={`${ProCharter.PRIORITY_KEYWORD}${index+1}`}>
                <Card className="light grey lighten-4 black-text" key={index+1}>
                  {goals[_.findIndex(goals, {'priority': index + 1})].goal}
                </Card>
              </div>
            </Draggable>
        </Col>
        :
        <Col m={12} s={12} key={`${ProCharter.PRIORITY_KEYWORD}${index}`}>
          <div id={`${ProCharter.PRIORITY_KEYWORD}${goal.goalId}`} ref={`${ProCharter.PRIORITY_KEYWORD}${index+1}`}>
            <CardPanel key={index+1}>
              <h6>Priority {index+1}</h6>
            </CardPanel>
          </div>
        </Col>
    );


    return[priorities];
  }


  render() {
    const curUser={
      email:"user@email.com"
    };

    console.log("render: ", this.props.goals);
    console.log("key length: ", Object.keys(this.props.goals).length);

    if (!this.props.goals || (this.props.goals && Object.keys(this.props.goals).length === 0)) {
      console.log("returning");
      return <div>Getting Goals</div>
    }

    return (
      <procharter>
        <div className="container">
            <HeaderBanner user={curUser}></HeaderBanner>
            <Header className="header" history={this.props.history} id={this.props.match.params.engagementId || this.props.match.params.id} />
            <span className="flex1"></span>

          <div>
            <h6>Drag and drop business goals in order of priority</h6>
            <div>
                <Row>
                  <Col m={9} s={9}>
                    <div id="renderGoals" ref={`${ProCharter.GOALS_DIV}`}>
                      {this.renderGoals()}
                    </div>
                  </Col>

                  <Col m={3} s={3}>
                      <h6>Drop here</h6>
                      <Row>
                        <div id="priorityTarget">
                          {this.renderPriorities()}
                        </div>
                      </Row>

                  </Col>
                </Row>
              </div>
          </div>
      </div>
      </procharter>
    )
  }

  updateState(newOrder) {
    // iterate the order
    // pull out the item
    // set the items new order
    // set the new state
    console.log('updateState ');


    let newGoals = [];
    _.each(newOrder, (id) => {
      console.log('looking for id ' + id);
      let match = _.filter(this.props.goals, (goal) => {
        return goal.goalId === id;
      })[0];
      console.log('found match ' + JSON.stringify(match));
      var copy = Object.assign({}, match);
      copy.order = newGoals.length+1;
      console.log('pushing new goal ' + JSON.stringify(copy));
      newGoals.push(copy);
    });

    // console.log('new goals');
    // console.log(JSON.stringify(newGoals));

    this.props.setBusinessGoals(newGoals);
  }

}


function mapStateToProps(state) {
  console.log('proCharter mapStateToProps state: ', state);
  return { goals: state.goals };
}

export default connect(mapStateToProps, { getBusinessGoals, setBusinessGoals })(ProCharter);