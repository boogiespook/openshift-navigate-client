import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form';
import { Row, Input } from 'react-materialize';

class BusinessReviewQuestions extends Component {

  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.renderDropDown = this.renderDropDown.bind(this);
    this.renderFreeText = this.renderFreeText.bind(this);
    this.renderBoolean = this.renderBoolean.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
  }

  onFormSubmit(values) {
    console.log('onFormSubmit ');
    // console.log(JSON.stringify(values));
    this.props.onSave(values, this.props.review.name);
  }

  renderOptions(options) {
    console.log('rendering options');
    console.log(JSON.stringify(options));
    return _.map(options, option => {
      return <option key={option.key} value={option.value}>{option.key}</option>
    })
  }

  // {...field.input} is shorthand (Spread syntax) for onChange={field.input.onChange} onFocus={field.input.onFocus} etc etc
  // it is basically wiring the <input back into the <Field
  renderDropDown(field) {
    return (
      <Row>
        <Input s={12} type='select' label={field.label} {...field.input}>
          <option />
          {this.renderOptions(field.question.options)}
        </Input>
      </Row>
    );
  }

  renderFreeText(field) {
    return (
      <Row>
        <Input type="text" label={field.label} s={12} {...field.input} />
      </Row>
    );
  }

  renderBoolean(field) {
    delete field.input.value;
    if (field.question.answer === 'true') {
      return (
        <Row>
          <Input type='checkbox' label={field.label} s={12} {...field.input} />
        </Row>
      );
    }
    else {
      return (
        <Row>
          <Input type='checkbox' label={field.label} s={12} {...field.input}  />
        </Row>
      );
    }
  }

  renderQuestions() {
    return _.map(this.props.review.questions, (question) => {

      if (question.fieldType === 'DropDown') {
        return (
          <Field
            key={question.qid}
            label={question.questionText}
            name={question.qid}
            question={question}
            component={ this.renderDropDown } />
        )
      }
      else if (question.fieldType === 'FreeText') {
        return (
          <Field
            key={question.qid}
            label={question.questionText}
            name={question.qid}
            question={question}
            component={ this.renderFreeText } />
        )
      }
      else if (question.fieldType === 'Boolean') {
        return (
          <Field
            key={question.qid}
            label={question.questionText}
            name={question.qid}
            question={question}
            component={ this.renderBoolean } />
        )
      }
    });
  }

  render() {

    // handle submit is provided by redux form
    const { handleSubmit } = this.props;

    // console.log('props');
    // console.log(JSON.stringify(this.props));

    return (
      <div>
        <form onSubmit={ handleSubmit(this.onFormSubmit) } >
          {this.renderQuestions()}
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}


function validate (values) {
  const errors = {};

  return errors;
}

export default reduxForm({
  validate,
  form: 'BusinessReviewQuestionsForm'
})(
  connect(null, { })(BusinessReviewQuestions)
);



