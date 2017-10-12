import React, { Component } from 'react';
import Header from './header';
import {HeaderBanner} from "./header2";
import { getNextSteps, createNextSteps } from '../actions/action_nextSteps';
import { Collection, CollectionItem, Button, Input, Row, Col } from 'react-materialize';
import {connect} from "react-redux";
import { Field, reduxForm } from 'redux-form';
import Icon from 'react-icons-kit';
import { ic_delete } from 'react-icons-kit/md/ic_delete';
import _ from 'lodash';

class NextSteps extends Component {

  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.renderDropDown = this.renderDropDown.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount next steps');
    this.props.getNextSteps(this.props.match.params.id || this.props.match.params.engagementId);

  }

  removeNextStep(id) {
    // alert('TODO:');
  }

  onFormSubmit(values) {
    console.log('onFormSubmit ');
    // console.log(JSON.stringify(values));
    values.engagementId = this.props.match.params.id || this.props.match.params.engagementId;
    this.props.createNextSteps(values);
    // this.clearForm();
  }


  renderListItems() {

    let count = 0;
    return _.map(this.props.nextSteps, (nextStep) => {
        return(
          <CollectionItem key={nextStep.id}>
            <Row>
              <Col s={1} className='grid-example'>
                {++count}
              </Col>
              <Col s={6} className='grid-example'>
                {nextStep.description}
              </Col>
              <Col s={2} className='grid-example'>
                {nextStep.term}
              </Col>
              <Col s={2} className='grid-example'>
                {nextStep.priority}
              </Col>
              <Col s={1} className='grid-example'>
                <Icon size={32} onClick={this.removeNextStep(nextStep.id)} icon={ic_delete} style={{ color: 'black' }}/>
              </Col>
            </Row>
          </CollectionItem>
        )
    });
  }

  renderList() {
    return (
      <div>
        <h6 style={{ margin: '20px' }}>Recommendations and next steps </h6>
        <Collection>
            <CollectionItem>
                <Row>
                    <Col s={1} className='grid-example'>
                        #
                    </Col>
                    <Col s={6} className='grid-example'>
                        DESCRIPTION
                    </Col>
                    <Col s={2} className='grid-example'>
                        TERM
                    </Col>
                    <Col s={2} className='grid-example'>
                        PRIORITY
                    </Col>
                </Row>
            </CollectionItem>
            {this.renderListItems()}
        </Collection>
      </div>
    )
  }

  renderOptions(options) {
    console.log('rendering options');
    console.log(JSON.stringify(options));
    return _.map(options, option => {
      return <option key={option.key} value={option.value}>{option.key}</option>
    })
  }

  renderDropDown(field) {
    return (
      <Input s={3} type='select' label={field.label} {...field.input}>
        <option />
        {this.renderOptions(field.options)}
      </Input>
    );
  }

  renderText(field) {
    return (
      <Input type="text" label={field.label} s={6} {...field.input} />
    );
  }

  renderQuestions() {

    let termOptions = [{
        'key':"SHORT",
        'value':"SHORT"
      },
      {
        'key':"MEDIUM",
        'value':"MEDIUM"
      },
      {
        'key':"LONG",
        'value':"LONG"
      }
    ]

    let priorityOptions = [{
        'key':"LOW",
        'value':"LOW"
      },
      {
        'key':"MEDIUM",
        'value':"MEDIUM"
      },
      {
        'key':"HIGH",
        'value':"HIGH"
      }
    ]


    return (
      <div>
        <CollectionItem>
          <Row>
            <Field
              key="description"
              label="Recommendation"
              name="description"
              component={ this.renderText } />
            <Field
              key="term"
              label="TERM"
              name="term"
              options={termOptions}
              component={ this.renderDropDown } />
            <Field
              key="priority"
              label="PRIORITY"
              name="priority"
              options={priorityOptions}
              component={ this.renderDropDown } />
          </Row>
        </CollectionItem>
      </div>
    )
  }


  renderForm() {
    // handle submit is provided by redux form
    const { handleSubmit } = this.props;

    // console.log('props');
    // console.log(JSON.stringify(this.props));
    // style={{ margin-top: '20px' }}

    return (
      <div>
        <Collection>
          <form onSubmit={ handleSubmit(this.onFormSubmit) } >
            {this.renderQuestions()}
            <CollectionItem>
              <Row className="center-align">
                <Button style={{ 'marginTop': '25px' }} type="submit">Add Recomendation</Button>
              </Row>
            </CollectionItem>
          </form>
        </Collection>
      </div>
    )
  }


  render() {
    const curUser={
      email:"user@email.com"
    };

    return (
      <nextsteps>
        <div className="container">
          <div>
            <HeaderBanner user={curUser}></HeaderBanner>
            <Header history={this.props.history} id={this.props.match.params.engagementId || this.props.match.params.id} />
          </div>
          <div>
            { this.renderList() }
          </div>
          <div>
            { this.renderForm() }
          </div>
        </div>
      </nextsteps>
    )
  }
}


function mapStateToProps(state) {
  console.log('next steps mapStateToProps state: ', state);
  return { nextSteps: state.nextSteps };
}

// export default connect(mapStateToProps, { getNextSteps, createNextSteps })(NextSteps);

function validate (values) {
  const errors = {};

  return errors;
}

export default reduxForm({
  validate,
  form: 'RecommendataionsForm'
})(
  connect(mapStateToProps, { getNextSteps, createNextSteps })(NextSteps)
);

